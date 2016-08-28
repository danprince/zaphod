---
layout: doc.html
description: >
  Adds items to the end of an array.
---

Returns a new array by pushing other items onto an existing one.

### Examples
`push` is the immutable alternative to JavaScript's [`push`][1].

```js
import { push } from 'zaphod';

[1, 2]::push(3, 4)
// => [1, 2, 3, 4]
```

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push

