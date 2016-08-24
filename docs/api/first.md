---
layout: doc.html
description: >
  Returns the first item in an array.
see-also:
  - rest
---

Returns the "head" (or first item) from an array.

### Examples

```js
import { first } from 'zaphod';

[1, 2, 3]::first()
// => 1
```

```js
import { first } from 'zaphod';

[]::first()
// => undefined
```
