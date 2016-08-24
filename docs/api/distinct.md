---
layout: doc.html
description: >
  Removes duplicate values from an array.
---

The `distinct` function returns a new array which contains only unique values, by omitting duplicates.

<div class="note">
  <i class="icon-warning"></i> <strong>Note</strong>
  <br />
  Often it will be more idiomatic to use a native [`Set`][1] data
  structure instead, which prevents duplicate values from being added
  in the first place.
</div>

### Examples

```js
import { distinct } from 'zaphod';

[1, 2, 2, 3, 4, 4]::distinct()
// => [1, 2, 3, 4]
```

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set
