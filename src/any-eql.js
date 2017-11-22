const deepEql = require('deep-eql');

const ANY = typeof Symbol !== 'undefined' ? Symbol('ANY') : Math.random() + Date.now();

module.exports = function (chai, utils) {
  chai.ANY = ANY; // eslint-disable-line no-param-reassign
  const { flag } = utils;
  const { Assertion } = chai;

  Assertion.overwriteMethod('equal', equal);
  Assertion.overwriteMethod('eq', equal);
  Assertion.overwriteMethod('eql', eql);

  Assertion.addMethod('anyEql', function (props) {
    const areEqual = deepEql(this._obj, props, { comparator });
    const truthyErrorMsg = 'expected #{this} to equal #{exp}';
    const falsyErrorMsg = 'expected #{this} to not equal #{exp}';

    this.assert(areEqual, truthyErrorMsg, falsyErrorMsg, props, this._obj);
  });

  function comparator(leftHandOperand, rightHandOperand) {
    // When a comparator returns null, deepEqual uses its own comparators
    return (leftHandOperand === ANY || rightHandOperand === ANY) ? true : null;
  }

  function equal(_super) {
    return function (expected) {
      const actual = flag(this, 'object');
      const result = comparator(expected, actual);

      if (flag(this, 'any') && result !== null) {
        this.assert(result, 'expected #{this} to equal #{exp}', 'expected #{this} to not equal #{exp}', expected, actual);
      } else {
        _super.apply(this, arguments);
      }
    };
  }

  function eql(_super) {
    return function (expected) {
      const actual = flag(this, 'object');

      if (flag(this, 'any')) {
        this.assert(deepEql(expected, actual, { comparator }), 'expected #{this} to deep equal #{exp}', 'expected #{this} to not deep equal #{exp}', expected, actual);
      } else {
        _super.apply(this, arguments);
      }
    };
  }
};
