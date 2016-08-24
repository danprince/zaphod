---
layout: doc.html
description: >
  Returns the final item from an array.
see-also:
  - pop
---

The `peek` function returns the item at the last index in an array.

This operation is equivalent to accessing the item at index `array.length - 1`.

### Examples
```js
import { peek } from 'zaphod';

[1, 2, 3]::peek()
// => 3
```

