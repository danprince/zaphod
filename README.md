# Zaphod
[![Travis](https://img.shields.io/travis/danprince/zaphod.svg?maxAge=2592000)](https://travis-ci.org/danprince/zaphod)
[![Coveralls](https://img.shields.io/coveralls/danprince/zaphod.svg?maxAge=2592000)](https://coveralls.io/github/danprince/zaphod)
[![npm](https://img.shields.io/npm/v/zaphod.svg?maxAge=2592000)](https://npmjs.com/package/zaphod)
[![Gitter](https://img.shields.io/gitter/room/zaphodjs/Lobby.svg?maxAge=2592000)](https://gitter.im/zaphodjs/Lobby)
[![API Docs](https://img.shields.io/badge/API-Docs-blue.svg)][4]

[Clojure's][2] immutable data API for JavaScript's own data structures, using the [function bind operator][9].

```js
import { inc, update } from 'zaphod';

const state = { count: 0 };

state::update('count', inc)
// => { count: 1 }
```

However, you don't need to know Clojure to make the most of Zaphod. This library is just a set of JavaScript functions that make working with immutable data more fun!

Find the [docs][4], [cheatsheet][5] and [rationale][6] at [the website][3].

```js
npm install --save zaphod
```

Check out the [getting started][7] guide for an in-depth explanation on configuring Babel to work with the function-bind operator.

[1]: https://en.wikipedia.org/wiki/Zaphod_Beeblebrox
[2]: https://clojure.org/
[3]: https://zaphod.surge.sh
[4]: https://zaphod.surge.sh/api
[5]: https://zaphod.surge.sh/cheatsheet
[6]: https://zaphod.surge.sh/tutorial
[7]: https://zaphod.surge.sh/getting-started
[8]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/rest_parameters
[9]: https://github.com/tc39/proposal-bind-operator
[10]: https://gitter.im/zaphod
[11]: https://github.com/danprince/zaphod
[12]: http://babeljs.io/
[13]: http://babeljs.io/docs/plugins/transform-function-bind/ 
[14]: https://babeljs.io/docs/plugins/preset-stage-0/
[15]: https://github.com/danprince/zaphod/issues/6
[16]: https://github.com/sebmarkbage/ecmascript-immutable-data-structures

