---
layout: doc.html
description: >
  Use a function to update the value of a key in collection
see-also:
  - updateIn
  - assoc
---

The `update` function returns a new collection after updating the value at `key`, with the return value from calling `func` with the existing value and any additional arguments.

### Examples

```js
import { update } from 'zaphod';

const life = { meaning: 41 };

life::update('meaning', n => n + 1)
// => { meaning: 42 }
```

It can also handle extra arguments.

```js
import { update } from 'zaphod';

const life = { meaning: 2 };
const add = (a, b) => a + b;

life::update('meaning', add, 40);
// => { meaning: 42 }
```

