---
layout: doc.html
description:
  Generates a range of numbers.
see-also:
  - repeat
  - repeatedly
---

The `range` function returns an array of numbers from 0 to (but not including) `end`.

### Examples
```js
import { range } from 'zaphod';

range(5)
// => [0, 1, 2, 3, 4]

range(-5)
// => [0, -1, -2, -3, -4]
```

