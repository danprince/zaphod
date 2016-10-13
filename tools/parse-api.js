const fs = require('fs');
const path = require('path');
const babylon = require('babylon');

function getParamName(node) {
  if(node.type === 'Identifier') {
    return node.name;
  }
  if(node.type === 'AssignmentPattern') {
    return `${node.left.name}=${node.right.raw}`;
  }
  if(node.type === 'RestElement') {
    return `...${node.argument.name}`;
  }

  return node.name;
}

function flatParams(params) {
  return `(${params.join(', ')})`;
}

function parseApi(src) {
  const ast = babylon.parse(src, {
    locations: true,
    sourceType: 'module',
    plugins: ['functionBind']
  });

  const api = ast.program.body
    // we only care about named exports (all other vars are private)
    .filter(node => node.type === 'ExportNamedDeclaration')
    // grab the actual function declaration
    .map(node => node.declaration)
    // we only want to document exported functions
    .filter(node => node.type === 'FunctionDeclaration')
    // extract the name, params and location in source
    .map(node => ({
      name: node.id.name,
      params: flatParams(node.params.map(getParamName)),
      loc: node.loc
    }));

  return invertOn('name', api);
}

function invertOn(key, objects) {
  const inverted = {};

  objects.forEach(obj => {
    inverted[obj[key]] = obj;
  });

  return inverted;
}

module.exports = parseApi;

