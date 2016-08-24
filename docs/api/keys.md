---
layout: doc.html
description: >
  Returns array of the keys for a collection.
see-also:
  - vals
---

The `keys` function returns an array of the string keys for a collection. It is the counterpart of [vals](../vals).

Under the hood it uses `Object.keys`, but rather than throwing a runtime exception when called on a bad value, it returns an empty array.

### Examples
Calling `keys` on an object will return an array of the strings that are used as keys inside that object.

```js
import { keys } from 'zaphod';

({ a: 'dent', f: 'prefect', t: 'mcmillan' })::keys()
// => ['a', 'f', 't']
```

It's important to notice that arrays store their indexes as strings and `keys` respects this.

```js
import { keys } from 'zaphod';

['arthur', 'ford', 'trillian']::keys()
// => ['0', '1', '2']
```

Rather than throwing an error, `keys` returns an empty array for values that don't have "keys".

```js
import { keys } from 'zaphod';

(null)::keys()
// => []

(undefined)::keys()
// => []
```

