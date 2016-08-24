---
layout: doc.html
description: >
 Deletes a key from a collection.
see-also:
  - assoc
---

The `dissoc` function returns a new collection, after dissoc[iating] the property at `key`.

### Examples
`dissoc` is the immutable equivalent of the `delete` keyword.

```js
const foo = { bar: 'baz' };
delete foo.bar;
```

Use `dissoc` to remove properties from objects.

```js
import { dissoc } from 'zaphod';

const foo = { bar: 'baz' };

foo::dissoc('bar');
// => { }
```

Calling `dissoc` on an array won't change the length of the array.

```js
import { dissoc } from 'zaphod';

const xs = [1, 2, 3];

xs::dissoc(0);
// => [undefined, 2, 3]
```

