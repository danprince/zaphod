const start = Date.now();

const fs = require('fs');
const path = require('path');
const metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown');
const define = require('metalsmith-define');
const metallic = require('metalsmith-metallic');
const hbs = require('handlebars');
const matter = require('gray-matter');

const parseApi = require('./parse-api');
const package = require('../package.json');

const dir = process.cwd();
const src = fs.readFileSync(`${dir}/src/index.js`).toString();
const api = parseApi(src);

const metadata = { package, api };

metalsmith(dir)
  .source('docs')
  .use(define(metadata))
  .use(injectAPI)
  .use(exposeAPI)
  .use(exposePath)
  .use(metallic())
  .use(markdown())
  .use(permalinks)
  .use(handlebars)
  .destination('_docs')
  .build(err => {
    if(err) throw err;
    const end = Date.now();
    const duration = end - start;
    const seconds = (duration / 1000).toFixed(2);
    console.log(`Built docs in ${seconds}s`);
  });

/**
 * Make the file's path available for templating.
 */
function exposePath(files, metalsmith, done) {
  const filenames = Object.keys(files);

  filenames.forEach(filename => {
    const [path] = filename.replace('/', '-').split('.');
    files[filename].active = { [path]: true };
    files[filename].src = filename;
  });
  done();
}

/**
 * Make collection front-matter available as part of the global
 * metadata, in a keyed object, using function names as keys.
 */
function exposeAPI(files, metalsmith, done) {
  const metadata = metalsmith.metadata();
  metadata.docs = {};

  Object.keys(files)
    .filter(filename => filename.startsWith('api/'))
    .map(filename => files[filename])
    .forEach(file => {
      metadata.docs[file.title] = file;
    });

  done();
}

/**
 * Extracts and injects function names, parameters and code
 * locations into metadata for the appropriate doc files.
 */
function injectAPI(files, metalsmith, done) {
  const filenames = Object.keys(files);
  const { api } = metalsmith.metadata();

  filenames
    .filter(name => name.match('api/.*\.md'))
    .forEach(name => {
      const file = files[name];
      const funcName = path.basename(name, '.md');
      file.func = api[funcName];
      file.title = funcName;
    });

  done();
}

/**
 * Custom handlebars renderer that respects recursive layout
 * directives in front matter.
 */
function handlebars(files, metalsmith, done) {
  const filenames = Object.keys(files);

  filenames.forEach(filename => {
    const file = files[filename];
    const metadata = Object.assign({}, metalsmith.metadata(), file);

    if(file.layout) {
      const contents = renderInside(
        file.contents.toString(),
        file.layout,
        metadata
      );
      file.contents = new Buffer(contents);
    }
  });

  done();
}

/**
 * Recursive renderer helper
 */
function renderInside(content, layoutPath, metadata) {
  const path = `${dir}/tools/layouts/${layoutPath}`;
  const contents = hbs.compile(content)(metadata);
  const layout = fs.readFileSync(path).toString();
  const file = matter(layout);
  const template = hbs.compile(file.content);
  const output = template(Object.assign({}, metadata, file.data, { contents }));

  if(file.data.layout) {
    return renderInside(output, file.data.layout, metadata);
  } else {
    return output
  }
}

/**
 * Rewrite /path.html to /path/index.html for nicer urls.
 */
function permalinks(files, metalsmith, done) {
  const paths = Object.keys(files);

  paths
    .filter(path => path.endsWith('html'))
    .forEach(path => {
      const file = files[path];
      // don't rewrite index.htmt or 404 etc
      if(path.endsWith('index.html') || path.match(/\d\d\d\.html/)) {
        file.path = path;
      } else {
        const newPath = path.replace(/\.html$/, '/index.html');
        delete files[path];
        files[newPath] = file;
      }
    });

  done();
}

/**
 * Handlebars helper for accessing an object with a dynamic
 * mutli-key lookup.
 */
hbs.registerHelper('at', function(object, ...args) {
  let path = args.slice(0, -1);
  let ref = object;

  while(path.length > 0) {
    const key = path[0];
    if(key in ref) {
      ref = ref[key];
      path = path.slice(1);
    } else {
      return undefined;
    }
  }

  return ref;
});


