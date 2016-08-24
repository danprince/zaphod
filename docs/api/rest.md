---
layout: doc.html
description: >
  Returns the array items after the first.
see-also:
  - first
  - drop
---

Returns the "tail" (or the items after the first) from an array.

### Examples

```js
import { rest } from 'zaphod';

[1, 2, 3]::rest()
// => [2, 3]
```

```js
import { rest } from 'zaphod';

[]::rest()
// => []
```

