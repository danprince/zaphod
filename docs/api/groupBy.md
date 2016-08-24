---
layout: doc.html
description: >
  Returns an map of grouped array items.
---

The `groupBy` function returns an object which groups the items in an array together, using the key returned from a call to `func` for each of the items.

### Examples

```js
import { groupBy } from 'zaphod';

const names = ['arthur', 'alicia', 'zaphod'];
const first = (name) => name[0];

names::groupBy(first)
// => { a: ['arthur', 'alicia'], z: ['zaphod'] }
```
