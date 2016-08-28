---
layout: doc.html
description: >
  Use a function to update the value of a nested key.
see-also:
  - update
  - setIn
  - getIn
---

The `updateIn` function returns a new collection after updating the value at the path of `keys`, with the return value from calling `func` with the existing value and any additional arguments.

The existing value will be passed to `func` along with any of the additional `...args`.

If the path in `keys` doesn't already exist, then it will be created using objects.

### Examples

We can use `updateIn` to compute a new nested value inside a collection.

```js
import { updateIn } from 'zaphod';

const guide = { earth: { harmless: true } };
const not = bool => !bool;

guide::updateIn(['earth', 'harmless'], bool => !bool)
// => { earth: { harmless: false } }
```

It will create the path for us if it doesn't already exist.

```js
import { updateIn } from 'zaphod';

const guide = {};

guide::updateIn(['earth', 'harmless'], x => x);
// => { earth: { harmless: undefined } }
```

