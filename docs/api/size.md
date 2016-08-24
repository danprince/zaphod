---
layout: doc.html
description: >
  Returns the length of a collection.
---

The `size` function returns the numeric "length" of the collection it is called upon.

### Examples
When called on an array or string, size will return the length property.

```js
import { size } from 'zaphod';

[1, 2, 3]::size()
// => 3
```

When called on an object, `size` will return the number of keys.

```js
import { size } from 'zaphod';

({ a: 1, b: 2 })::size()
// => 2
```

Calling `size` on a value without a logical length will return `0` rather than throwing an error.

```js
import { size } from 'zaphod';

(null)::size()
// => 0
(undefined)::size()
// => 0
(2)::size()
// => 0
```

