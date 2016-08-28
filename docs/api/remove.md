---
layout: doc.html
description: >
 Deletes a key from a collection.
see-also:
  - set
---

The `remove` function returns a new collection, after removing the property at `key`.

### Examples
`remove` is the immutable equivalent of the `delete` keyword.

```js
const foo = { bar: 'baz' };
delete foo.bar;
```

Use `remove` to remove properties from objects.

```js
import { remove } from 'zaphod';

const foo = { bar: 'baz' };

foo::remove('bar');
// => { }
```

Calling `remove` on an array won't change the length of the array.

```js
import { remove } from 'zaphod';

const xs = [1, 2, 3];

xs::remove(0);
// => [undefined, 2, 3]
```

