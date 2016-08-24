---
layout: doc.html
description: >
  Gets a nested value from a collection, optionally returning a default value if the key is missing.
see-also:
  - get
---

The `getIn` function will try to return the value at the path in the `keys` array in the collection.

The `notFound` argument, it will be returned if the path does not exist or has a value of `undefined`.

### Examples
Trying to access a nested object with accessor syntax can result in a runtime error if the structure of the object doesn't match the path.

```js
const going = { down: { the: { rabbit: { hole: NaN } } } };

going.down.a.rabbit.hole
// Uncaught TypeError: Cannot read property 'rabbit' of undefined
```

Using `getIn` makes nested property access safer.

```js
import { getIn } from 'zaphod';

going::getIn(['down', 'a', 'rabbit', 'hole'], 'mad')
// => 'mad'
```

