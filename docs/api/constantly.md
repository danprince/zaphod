---
layout: doc.html
description: >
  Takes a value and returns a function which always returns that value.
see-also:
  - identity
  - repeat
---

The `constantly` function returns a function which always returns `any`, ignoring all arguments.

### Examples

```js
import { constantly } from 'zaphod';

const alwaysTrue = constantly(true);

alwaysTrue()
// => true

alwaysTrue(1, 2, 3)
// => true
```

