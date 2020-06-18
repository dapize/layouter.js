if (typeof Object.assign !== 'function') {
  Object.defineProperty(Object, 'assign', {
    value: function assign(target, varArgs) {
      'use strict';
      if (target === null) throw new TypeError('Cannot convert undefined or null to object');

      let to = Object(target);
      let index;
      const nArguments = arguments.length;
      let nextSource;
      for (index = 1; index < nArguments; index++) {
        nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    },
    writable: true,
    configurable: true,
  });
};