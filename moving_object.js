function MovingObject(position) {
  this.position = position;
}

MovingObject.prototype.update = function(dims) {

  // Move object
  this.position[0] += this.velocity[0];
  this.position[1] += this.velocity[1];

  this.position[0] = (this.position[0] + dims[0]) % dims[0]
  this.position[1] = (this.position[1] + dims[1]) % dims[1]
}

MovingObject.prototype.offScreen = function(dims) {
  // later, only be offscreen if entire object offscreen
  return (this.position[0] < 0 || this.position[0] > dims[0] ||
    this.position[1] < 0 || this.position[1] > dims[1]);
}

MovingObject.prototype.intersects = function(other_mo){
  return this.radius + other_mo.radius >
      Math.sqrt(Math.pow(this.position[0] - other_mo.position[0], 2) +
      Math.pow(this.position[1] - other_mo.position[1], 2))
}