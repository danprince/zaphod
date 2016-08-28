---
layout: default.html
title: Getting Started
---

# Getting Started

This guide runs through the process of adding Zaphod to a project and getting it working with Babel.

## Install Zaphod
Start by installing the latest version of Zaphod from npm.

```
$ npm install --save zaphod
```

Then create the following `hello.js` file.

```js
import { set, remove } from 'zaphod';

let greeting = { goodbye: 'world' };

greeting = greeting
  ::remove('goodbye')
  ::set('hello', 'world');

console.log(greeting);
```

## Configuring Babel
<div class="note">
  <i class="icon-warning"></i> <strong>Note</strong>
  <br />
  It's possible to use Zaphod with no additional configuration if you're already using Babel with the [stage-0 preset](https://babeljs.io/docs/plugins/preset-stage-0/).
</div>

We'll also need to install both Babel and the plugin which will allow us to use the function bind operator.

```
npm install --save-dev babel babel-plugin-transform-function-bind
```

We need to tell Babel to use the function-bind plugin, so we'll create the following `.babelrc` file too.

```json
{
  "plugins": ["transform-function-bind"]
}
```

Normally we'd use a module bundler like Webpack, Rollup or Browserify to actually run the Babel transform, but for this example, we'll just test that everything's working by installing the babel-cli and running our file with babel-node.

Follow these commands and you should get the same output.

```
$ npm install -g babel-cli
$ babel-node hello.js
{ hello: 'world' }
```



