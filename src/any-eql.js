const deepEql = require('deep-eql');

const ANY = typeof Symbol !== 'undefined' ? Symbol('ANY') : Math.random() + Date.now();

module.exports = function (chai) {
  chai.ANY = ANY; // eslint-disable-line no-param-reassign

  function comparator(leftHandOperand, rightHandOperand) {
    // When a comparator returns null, deepEqual uses its own comparators
    return (leftHandOperand === ANY || rightHandOperand === ANY) ? true : null;
  }

  chai.Assertion.addMethod('anyEql', function (props) {
    const areEqual = deepEql(this._obj, props, { comparator });
    const truthyErrorMsg = 'expected #{this} to equal #{exp}';
    const falsyErrorMsg = 'expected #{this} to not equal #{exp}';

    this.assert(areEqual, truthyErrorMsg, falsyErrorMsg, props, this._obj);
  });
};
