---
layout: doc.html
description:
  Creates an array of a repeated value.
see-also:
  - repeatedly
---

The `repeat` function creates an array with length `n` and populates it exclusively with `any`.

### Examples

```js
import { repeat } from 'zaphod';

repeat(5, 'z')
// => ['z', 'z', 'z', 'z', 'z']
```

