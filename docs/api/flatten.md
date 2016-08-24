---
layout: doc.html
description: >
  Removes nesting inside an array.
---

The `flatten` function returns a new array after collapsing and merging any nested arrays in the original one.

### Examples

```js
import { flatten } from 'zapod';

[1, [2, 3], 4]::flatten()
// => [1, 2, 3, 4]
```

`flatten` will return an empty array when called upon `null` or `undefined`.

```js
import { flatten } from 'zaphod';

null::flatten()
// => []

undefined::flatten()
// => []
```

