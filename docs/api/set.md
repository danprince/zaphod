---
layout: doc.html
description: >
 Set a key in a collection to a new value.
see-also:
  - unset
  - setIn
  - merge
  - update
---

The `set` function returns a new collection, after setting the `key` property to `value`.

### Examples
`set` is the immutable alternative to directly setting a property with syntax.

```js
const foo = { bar: 'baz' };
foo.qux = 'quz';
```

Use `set` to change a property inside an object.

```js
import { set } from 'zaphod';

const foo = { bar: 'baz' };

foo::set('qux', 'quz');
// => { bar: 'baz' }
```

`set` also works with arrays.

```js
import { set } from 'zaphod';

const xs = [1, 2, 3];

xs::set(0, 5);
// => [5, 2, 3]
```

