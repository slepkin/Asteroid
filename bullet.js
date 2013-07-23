function Bullet(position, ship_velocity, game) {
  this.position = position;
  this.radius = 2;

  // Set bullet velocity
  var ship_speed = Math.sqrt(Math.pow(ship_velocity[0], 2) + Math.pow(ship_velocity[1], 2));
  var ship_direction = [ship_velocity[0]/ship_speed, ship_velocity[1]/ship_speed];
  var bullet_speed = 10; // arbitrary
  this.velocity = [ship_direction[0]*bullet_speed, ship_direction[1]*bullet_speed];
}

//===================
function Surrogate() {};
Surrogate.prototype = MovingObject.prototype;

Bullet.prototype = new Surrogate();
//===================

Bullet.prototype.draw = function () {
  var c = canvas.getContext('2d');
  c.fillStyle = 'yellowd';
  c.beginPath();
  c.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
  c.closePath();
  c.fill();
}

Bullet.prototype.update = function() {
  this.position[0] += this.velocity[0];
  this.position[1] += this.velocity[1];

  // Check for collisions with asteroids and return true/false
}