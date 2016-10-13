---
layout: default.html
title: Zaphod
---

# Compatibility

Not everyone wants to use experimental language features, so it's also possible to use Zaphod without the function-bind operator.

If you require a function from `zaphod/compat` it will take the collection as its first argument, query instead.

```js
import { set } from 'zaphod/compat';

set(obj, 'key', value)

// obj::set('key', value)
//  ^       ^
//   \_____/
//
// We moved this argument
```

This only applies to the functions that use `::`. Others like [`identity`](/api/identity) and [`constantly`](/api/constantly) are unchanged.

Alternatively, you can shortcut the compilation step and write the resulting ES5 code yourself.

```js
var z = require('zaphod');

z.set.call(obj, 'key', value);
```

