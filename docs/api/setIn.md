---
layout: doc.html
description: >
  Sets a nested key to a new value.
see-also:
  - set
  - getIn
  - updateIn
---

The `setIn` function will set the nested key described by `keys` to `value`. It is similar to [`set`](../set) but also works for nested paths.

If the path in `keys` doesn't already exist, then it will be created using values that correspond to the keys (objects will be created for strings, arrays will be created for numbers).

## Examples

`setIn` can be used to set a nested value inside an object.

```js
import { setIn } from 'zaphod';

({ a: { b: 1 } })::setIn(['a', 'b'], 2)
// => { a: { b: 2 } }
```

It will use objects to create the path if it doesn't already exist.

```js
import { setIn } from 'zaphod';

({})::setIn(['z', 'b'], 'me')
// => { z: { b: 'me' } }
```

Here's an example of a helper for specifying paths as strings instead.

```js
import { setIn } from 'zaphod';

const p = str => str.split('.');

({ bee: { ble: 'brox' } })::setIn(p('bee.ble'), 'brix');
```

