---
layout: doc.html
description: >
 Deletes a key from a collection.
see-also:
  - set
---

The `unset` function returns a new collection, after removing the property at `key`.

### Examples
`unset` is the immutable equivalent of the `delete` keyword.

```js
const foo = { bar: 'baz' };
delete foo.bar;
```

Use `unset` to remove properties from objects.

```js
import { unset } from 'zaphod';

const foo = { bar: 'baz' };

foo::unset('bar');
// => { }
```

Calling `unset` on an array won't change the length of the array.

```js
import { unset } from 'zaphod';

const xs = [1, 2, 3];

xs::unset(0);
// => [undefined, 2, 3]
```

