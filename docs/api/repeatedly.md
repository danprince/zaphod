---
layout: doc.html
description:
  Creates an array of the result of calling a function n times.
see-also:
  - repeatedly
---

The `repeatedly` function creates an array with length `n` and populates it by calling `func` for each index.

### Examples

```js
import { repeatedly } from 'zaphod';

repeatedly(3, Math.random)
// => [0.6402904910501093, 0.6904983669519424, 0.06449449714273214]
```
