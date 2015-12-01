'use strict';

module.exports = {
  fnOptimizationStatus: function fnOptimizationStatus(fn, name) {
    switch(%GetOptimizationStatus(fn)) {
      case 1: console.log(`Function ${name} is optimized`); break;
      case 2: console.log(`Function ${name} is not optimized`); break;
      case 3: console.log(`Function ${name} is always optimized`); break;
      case 4: console.log(`Function ${name} is never optimized`); break;
      case 6: console.log(`Function ${name} is maybe deoptimized`); break;
      case 7: console.log(`Function ${name} is Turbo`); break;
    }
  }
};