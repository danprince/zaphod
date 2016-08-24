---
layout: default.html
title: Zaphod
---

# Compatibility

Not everyone wants to use experimental language features, so it's also possible to use Zaphod without the function-bind operator.

The following snippets of code both work in the same way.

```js
import { assoc } from 'zaphod';

obj::assoc('key', value);
```

```js
var z = require('zaphod');

z.assoc.call(obj, key, value);
```

