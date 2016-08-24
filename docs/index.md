---
layout: default.html
title: Zaphod
---

<center class="hero">
# Zaphod
[_(Zay-fod)_][1]
</center>
<hr />

[Clojure's][2] immutable data API for JavaScript's own data structures, using the [function bind operator][9].

```js
import { inc, update } from 'zaphod';

const state = { count: 0 };

state::update('count', inc)
// => { count: 1 }
```

However, you don't need to know Clojure to make the most of Zaphod. This library is just a set of JavaScript functions that make working with immutable data more fun!

Try [the tutorial](/tutorial/), check out [the cheatsheet](/cheatsheet/), join [the chat][10] or explore [the code][11].

## Rationale
Working with JavaScript's data structures as though they were immutable is a challenge. Although arrays have some methods which return new array instances, the only way to update objects without mutating them is to use unwieldy functions like `Object.assign`.

Some libraries reimplement these data structures with persistent interfaces, but they don't really integrate well with existing code.

The new structures need to be converted back into native structures at the edges of the project, or the code outside needs to be rewritten to work with them.

Zaphod takes the tried and tested functions from the core of Clojure's immutable data API and rewrites them so that they work with JavaScript's own data structures.

## Function Bind
The `::` (function-bind) operator is still at the proposal stage for the language, which means [Babel][12] is required to use it. Many JavaScript projects are already using Babel, but compiling this syntax will also require either the [plugin][13] or the [stage-0 preset][14].

Not everyone is ready to adopt experimental syntax, but it's completely possible to use Zaphod's functions without function-bind. Check out the [compatibility interface](/compat/).

## Usage
Zaphod is available through npm.

```js
npm install --save zaphod
```

Check out the [getting started](/getting-started/) guide for an in-depth explanation on configuring Babel to work with the function-bind operator.

[1]: https://en.wikipedia.org/wiki/Zaphod_Beeblebrox
[2]: https://clojure.org/
[8]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters
[9]: https://github.com/tc39/proposal-bind-operator
[10]: https://gitter.im/zaphod
[11]: https://github.com/danprince/zaphod
[12]: http://babeljs.io/
[13]: http://babeljs.io/docs/plugins/transform-function-bind/ 
[14]: https://babeljs.io/docs/plugins/preset-stage-0/
[15]: https://github.com/danprince/zaphod/issues/6
[16]: https://github.com/sebmarkbage/ecmascript-immutable-data-structures

