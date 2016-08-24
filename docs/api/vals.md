---
layout: doc.html
description: >
  Returns array of the values for a collection.
see-also:
  - keys
---

The `vals` function returns an array of the values in a collection. It is the counterpart of [keys](../keys).

Under the hood it uses `Object.keys`, but rather than throwing a runtime exception when called on a bad value, it returns an empty array.

### Examples
Calling `vals` on an object will return an array of the values inside the object.

```js
import { vals } from 'zaphod';

({ a: 'dent', f: 'prefect', t: 'mcmillan' })::vals()
// => ['dent', 'prefect', 'mcmillan']
```

`vals` returns an empty array for values that don't have logical "values".

```js
import { keys } from 'zaphod';

(null)::keys()
// => []

(undefined)::keys()
// => []
```

