function sum() {
  var total = 0;
  for(var i = 0; i < arguments.length; i++) {
    total += arguments[i];
  }
  return total;
}

Function.prototype.myBind = function(obj) {
  var args = Array.prototype.slice.call(arguments,1);
  this.apply(obj, args);
};

// var myObj = {
//   attr: "foo"
// };
//
// Object.prototype.func1 = function(arg1) {
//   console.log(this.attr + " " + arg1);
// }
//
// myObj.func1.myBind(myObj, "bar")

function curriedSum(count) {

  var count = count;
  var arr = [];

  var fun = function(el) {
    arr.push(el);

    if(arr.length === count) {
      var total = 0;
      for(var i = 0; i < arr.length; i++) {
        total += arr[i];
      }
      return total;
    }
    else {
      return fun;
    }
  }

  return fun;
}

var sum = curriedSum(4);
console.log(sum(5)(30)(20)(1)); // => 56