---
layout: doc.html
description: >
  Takes leading array items whilst they pass a predicate function.
see-also:
  - take
  - dropWhile
  - drop
---

The `takeWhile` function iterates over an array, taking the leading items until an item returns false, when passed to `func`.

### Examples

```js
import { takeWhile } from 'zaphod';

const isNegative = (x) => x < 0;

[-3, -2, -1, 0, 1, 2, 3]::takeWhile(isNegative)
// => [-3, -2, -1]
```
