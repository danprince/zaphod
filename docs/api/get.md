---
layout: doc.html
description: >
  Gets a value from a collection, optionally returning a default
  value if the key is missing.
see-also:
  - getIn
---

<div class="note">
  <i class="icon-warning"></i> <strong>Note</strong>
  <br />
  Normally you should use JavaScript's own [property accessor][1] syntax. The `get` function is only included for accessing properties when you need to provide a default value. 
</div>

The `get` function will try to return the value at `key` in the collection. The `notFound` argument will be returned if the `key` can't be found or has a value of `undefined`.

### Examples
You can use `get` to get a property from an object.

```js
import { get } from 'zaphod';

({ a: 1 }).a
// => 1

({ a: 1 })::get('a')
// => 1
```

You can also pass a `notFound` argument which will be returned if the key doesn't exist in the object, or it's value is `undefined`.

```js
import { get } from 'zaphod';

({ a: 1 })::get('b', 0)
// => 0

({ a: undefined })::get('a', 3)
// => 3
```

It also works with arrays.

```js
import { get } from 'zaphod';

[1, 2, 3][2]
// => 3

[1, 2, 3]::get(2)
// => 3

[1]::get(2, 'foo')
// => 'foo'
```

[1]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Property_accessors
