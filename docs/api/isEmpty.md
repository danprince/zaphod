---
layout: doc.html
description: >
  Returns true for empty collections.
see-also:
  - size
---

The `isEmpty` function can be called on a collection to determine whether it contains any values.

* Arrays and strings are considered to be empty when their length property is equal to 0.
* All other values are considered empty when they have no [`keys`](../keys).

### Examples

```js
import { isEmpty } from 'zaphod';

[1, 2, 3]::isEmpty()
// => false

[]::isEmpty()
// => true

({ a: 1 })::isEmpty()
// => false

({})::isEmpty()
// => true
```

