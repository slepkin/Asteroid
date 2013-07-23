Function.prototype.inherits = function(parent_class) {
  // function Surrogate() {};
  // Surrogate.prototype = Parent.prototype;

  // this.prototype = new Surrogate();
  var args = Array.prototype.slice.call(arguments,1);
  parent_class.apply(this, args);
}

function MovingObject(num) {
  this.type = "moving object #" + num;
}

function Ship(num) {};

Ship.inherits(MovingObject);
var s = new Ship(2);

console.log(s.type);