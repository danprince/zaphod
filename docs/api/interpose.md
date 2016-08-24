---
layout: doc.html
description: >
  Separates all items in an array with a value. 
---

The `interpose` function returns a new array, with `separator` found between each of the items from the array it was called on.

## Examples

```js
import { interpose } from 'zaphod';

[1, 2, 3]::interpose('+')
// => [1, '+', 2, '+', 3]
```

