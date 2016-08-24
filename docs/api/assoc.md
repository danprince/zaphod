---
layout: doc.html
description: >
 Set a key in a collection to a new value.
see-also:
  - dissoc
  - assocIn
  - merge
  - update
---

The `assoc` function returns a new collection, after assoc[iating] the `key` property with `value`.

### Examples
`assoc` is the immutable alternative to directly setting a property with syntax.

```js
const foo = { bar: 'baz' };
foo.qux = 'quz';
```

Use `assoc` to change a property inside an object.

```js
import { assoc } from 'zaphod';

const foo = { bar: 'baz' };

foo::assoc('qux', 'quz');
// => { bar: 'baz' }
```

It also works with arrays.

```js
import { assoc } from 'zaphod';

const xs = [1, 2, 3];

xs::assoc(0, 5);
// => [5, 2, 3]
```

