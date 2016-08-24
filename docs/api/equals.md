---
layout: doc.html
description: >
  Determines whether two collections have deep value equality.
---

<div class="note">
  <i class="icon-warning"></i> <strong>Note</strong>
  <br />
  When comparing primitives, it's idiomatic to use the
  [built-in equality operators][2]. The `equals` function is only
  included for comparing values that would normally fail reference equality checks.
</div>

The `equals` function compares two values to check for equality. In addition to checking for [strict equality][1] between primitive types, it also checks for deep equality in objects and subtypes like dates and regular expressions.

### Examples
Comparing objects and arrays.

```js
import { equals } from 'zaphod';

({ a: 1 })::equals({ a: 1 })
// => true

[1, 2, 3]::equals([1, 2, 3])
// => true
```

Comparing regexes and dates.
```js
import { equals } from 'zaphod';

/hello/::equals(/hello/)
// => true

(new Date)::equals(new Date)
// => true
```

Comparing NaN values.
```js
import { equals } from 'zaphod';

NaN::equals(NaN)
// => true
```

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Identity
[2]: https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Operators/Comparison_Operators#Equality_operators
