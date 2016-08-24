---
layout: doc.html
description: >
  Sets a nested key to a new value.
see-also:
  - assoc
  - getIn
  - updateIn
---

The `assocIn` function will associate the nested key described by `keys` with the `value`. It is similar to [`assoc`](../assoc) but also works for nested paths.

If the path in `keys` doesn't already exist, then it will be created using objects.

## Examples

`assocIn` can be used to set a nested value inside an object.

```js
import { assocIn } from 'zaphod';

({ a: { b: 1 } })::assocIn(['a', 'b'], 2)
// => { a: { b: 2 } }
```

It will use objects to create the path if it doesn't already exist.

```js
import { assocIn } from 'zaphod';

({})::assocIn(['z', 'b'], 'me')
// => { z: { b: 'me' } }
```

Here's an example of a helper for specifying paths as strings instead.

```js
import { assocIn } from 'zaphod';

const p = str => str.split('.');

({ bee: { ble: 'brox' } })::assocIn(p('bee.ble'), 'brix');
```

