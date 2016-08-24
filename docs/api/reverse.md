---
layout: doc.html
description: >
  Returns a reversed copy of an array.
see-also:
  - sort
---

The `reverse` function copies, then reverses an array using [the native `reverse` method][1].

### Examples

```js
import { reverse } from 'zaphod';

[3, 2, 1]::reverse()
// => [1, 2, 3]
```

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
