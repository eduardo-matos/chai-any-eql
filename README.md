# chai-any-eql

[![Build Status](https://travis-ci.org/eduardo-matos/chai-any-eql.svg?branch=master)](https://travis-ci.org/eduardo-matos/chai-any-eql)
[![Coverage Status](https://coveralls.io/repos/github/eduardo-matos/chai-any-eql/badge.svg?branch=master)](https://coveralls.io/github/eduardo-matos/chai-any-eql?branch=master)

Allows you to wildcard values.

## Config

```js
const chai = require('chai');
const chaiAnyEql = require('chai-any-eql');

chai.use(chaiAnyEql);
```

## Assertion

```js
expect(1).to.anyEql(chai.ANY);
expect(ANY).to.anyEql(1); // Both ways

expect([1, 2, 3]).to.anyEql([1, chai.ANY, 3]); // For any item

expect({foo: 1, bar: 2}).to.anyEql({foo: 1, bar: chai.ANY});
expect([{ foo: { bar: { baz: 1 } } }]).anyEql([{ foo: chai.ANY }]);
expect([{ foo: { bar: { baz: 1 } } }]).anyEql([{ foo: { bar: { baz: chai.ANY } } }]); // On any level
```
