const chai = require('chai');
const any = require('../src/any-eql');
const sinon = require('sinon');
const assert = require('assert');

chai.use(any);
const { expect, ANY } = chai;

describe('Comparing to ANY', () => {
  it('Works on basic deep eql', () => {
    expect(1).to.anyEql(1);
    expect([1]).to.anyEql([1]);
    expect([{ foo: 1 }]).anyEql([{ foo: 1 }]);
    expect([{ foo: { bar: { baz: '1' } } }]).anyEql([{ foo: { bar: { baz: '1' } } }]);
  });

  it('Fails on basic deep eql', () => {
    expect(1).to.not.anyEql(2);
    expect([1]).to.not.anyEql([2]);
    expect([{ foo: 1 }]).to.not.anyEql([{ foo: 2 }]);
    expect([{ foo: { bar: { baz: '1' } } }]).to.not.anyEql([{ foo: { bar: { baz: '2' } } }]);
  });

  it('Accepts any on righthand and lefthand operarands', () => {
    expect(1).to.anyEql(ANY);
    expect(ANY).to.anyEql(1);
  });

  it('Accepts any on any level', () => {
    expect(1).to.anyEql(ANY);

    expect([1]).to.anyEql([ANY]);
    expect([1, 2, 3]).to.anyEql([1, ANY, 3]);

    expect([{ foo: 1 }]).anyEql(ANY);
    expect([{ foo: 1 }]).anyEql([ANY]);
    expect([{ foo: 1 }]).anyEql([{ foo: ANY }]);

    expect([{ foo: { bar: { baz: '1' } } }]).anyEql(ANY);
    expect([{ foo: { bar: { baz: '1' } } }]).anyEql([ANY]);
    expect([{ foo: { bar: { baz: '1' } } }]).anyEql([{ foo: ANY }]);
    expect([{ foo: { bar: { baz: '1' } } }]).anyEql([{ foo: { bar: ANY } }]);
    expect([{ foo: { bar: { baz: '1' } } }]).anyEql([{ foo: { bar: { baz: ANY } } }]);
  });

  it('As extension', () => {
    expect(1).any.eq(ANY);
    expect(1).any.equal(ANY);
    expect({ foo: 1, bar: 2 }).any.eql({ foo: ANY, bar: 2 });
    expect({ foo: { bar: 2 } }).any.deep.equal({ foo: { bar: ANY } });
  });
});

describe('Assertion calls', () => {
  beforeEach(() => sinon.stub(chai.Assertion.prototype, 'assert'));
  afterEach(() => chai.Assertion.prototype.assert.restore());

  it('"anyEql" asserts with correct error messages', () => {
    const first = Math.random();
    const second = Math.random();
    expect(first).to.anyEql(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [false, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', second, first]);
  });

  it('"equal" asserts with correct error messages', () => {
    const first = Math.random();
    const second = ANY;
    expect(first).any.equal(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [true, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', second, first]);
  });

  it('"eq" asserts with correct error messages', () => {
    const first = Math.random();
    const second = ANY;
    expect(first).any.eq(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [true, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', second, first]);
  });

  it('"eql" asserts with correct error messages', () => {
    const first = Math.random();
    const second = ANY;
    expect(first).any.eql(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [true, 'expected #{this} to deep equal #{exp}', 'expected #{this} to not deep equal #{exp}', second, first]);
  });

  it('"equal" calls default assert if "any" flag is not present', () => {
    const first = Math.random();
    const second = ANY;
    expect(first).equal(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [false, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', second, first, true]);
  });

  it('"eq" calls default assert if "any" flag is not present', () => {
    const first = Math.random();
    const second = ANY;
    expect(first).eq(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [false, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', second, first, true]);
  });

  it('"eql" calls default assert if "any" flag is not present', () => {
    const first = Math.random();
    const second = ANY;
    expect(first).eql(second);

    const { callCount } = chai.Assertion.prototype.assert;
    const { args } = chai.Assertion.prototype.assert.firstCall;

    assert.equal(callCount, 1);
    assert.deepEqual(args, [false, 'expected #{this} to deeply equal #{exp}', 'expected #{this} to not deeply equal #{exp}', second, first, true]);
  });
});
