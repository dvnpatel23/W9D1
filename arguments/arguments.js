// function sum(...nums) {
//   let total = 0;
//   for (let i = 0; i < nums.length; i++) {
//     total += nums[i];
//   }

//   return total;
// }


// console.log(sum(1, 2, 3, 4)); // === 10
// console.log(sum(1, 2, 3, 4, 5)); //=== 15


// Version 1
// Function.prototype.myBind = function () {
//   let bindArgs = Array.prototype.slice.call(arguments);
//   let ctx = bindArgs[0];
//   let that = this;
//   bindArgs = bindArgs.slice(1);
//   return function() {
//     let callArgs = Array.prototype.slice.call(arguments);
//     return that.apply(ctx, bindArgs.concat(callArgs));
//   };
// };


// Version 2

Function.prototype.myBind = function (ctx, ...bindArgs) {
  return (...callArgs) => {
    return this.apply(ctx, bindArgs.concat(callArgs));
  };
};

class Cat {
  constructor(name) {
    this.name = name;
  }

  says(sound, person) {
    console.log(`${this.name} says ${sound} to ${person}!`);
    return true;
  }
}

class Dog {
  constructor(name) {
    this.name = name;
  }
}

const markov = new Cat("Markov");
const pavlov = new Dog("Pavlov");

markov.says("meow", "Ned");
// Markov says meow to Ned!
// true

// bind time args are "meow" and "Kush", no call time args
markov.says.myBind(pavlov, "meow", "Kush")();
// Pavlov says meow to Kush!
// true

// no bind time args (other than context), call time args are "meow" and "a tree"
markov.says.myBind(pavlov)("meow", "a tree");
// Pavlov says meow to a tree!
// true

// bind time arg is "meow", call time arg is "Markov"
markov.says.myBind(pavlov, "meow")("Markov");
// Pavlov says meow to Markov!
// true

// no bind time args (other than context), call time args are "meow" and "me"
const notMarkovSays = markov.says.myBind(pavlov);
notMarkovSays("meow", "me");
// Pavlov says meow to me!
// true

function sumThree(num1, num2, num3) {
  return num1 + num2 + num3;
}


function curriedSum(numArgs) {
  let numbers = [];

  function _curriedSum(num) {
    numbers.push(num);

    if (numbers.length === numArgs) {
      let total = 0;
      numbers.forEach(num => {
        total += num;
      });
      return total;
    } else {
      return _curriedSum;
    }

  }
  return _curriedSum;

}

const sum = curriedSum(4)(5)(30)(20)(1);

console.log(sum);

//Version 1
// Function.prototype.curry = function(numArgs) {
//   let allArguments = Array.prototype.slice.call(arguments)
//   allArguments = allArguments.slice(1);
//   let that = this;
//   return function _curry() {
//     let callArgs = Array.prototype.slice.call(arguments);
//     allArguments = allArguments.concat(callArgs);
//     // debugger;
//     if (allArguments.length === numArgs) {
//       return that.apply(null, allArguments);
//     } else {
//       return _curry;
//     }
//   };
// };

//Version 2
Function.prototype.curry = function (numArgs) {
  let allArguments = Array.prototype.slice.call(arguments)
  allArguments = allArguments.slice(1);
  let that = this;
  return function _curry() {
    let callArgs = Array.prototype.slice.call(arguments);
    allArguments = allArguments.concat(callArgs);
    // debugger;
    if (allArguments.length === numArgs) {
      return that(...allArguments);
    } else {
      return _curry;
    }
  };
};

console.log(sumThree.curry(3)(2)(2)(2));



