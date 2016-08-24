---
layout: doc.html
description: >
  Returns a new array without the final item.
see-also:
  - peek
---

The `pop` function returns an new array with the item at the last index omitted.

### Examples

```js
import { pop } from 'zaphod';

[1, 2, 3]::pop()
// => [1, 2]
```

