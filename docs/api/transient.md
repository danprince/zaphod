---
layout: doc.html
description:
  Safely perform mutations to an object without changing the original reference.
---

The `transient` function can be called on an object to safely apply mutations to it, without worrying about mutating the original reference for any other code using it.

Incredibly high performance apps can hit roadblocks with the copying and re-allocating required for preventing mutations. For "hot" sections of code, it's possible to use a `transient` transaction. 

When called on an object or array, a copy will be created and passed into `func`, with the expectation that `func` will mutate it. 

In fact, the return value from `func` will be ignored and `transient` instead just returns the reference to the mutated object.

### Examples

```js
import { transient } from 'zaphod';

const foo = { bar: 1 };

foo::transient(foo => {
  foo.bar = 2;
})
// => { bar: 2 }
```
