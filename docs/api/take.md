---
layout: doc.html
description: >
  Takes the first n items from an array.
see-also:
  - takeWhile
  - drop
---

The `take` function returns a new array of the first `n` items of the array it was called on.

When there are fewer than `n` items in the target array, they will all be returned.

### Examples

```js
import { take } from 'zaphod';

[1, 2, 3]::take(2)
// [1, 2]

[1]::take(10)
// [1]
```
