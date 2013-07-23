function Asteroid(position, velocity) {
  this.position = position;
  this.velocity = velocity;
  this.radius = 20;
  this.wrapping = true;

  // Asteroid image
  this.img = new Image();
  this.img.src = 'asteroid.png';
}

//===================
function Surrogate() {};
Surrogate.prototype = MovingObject.prototype;

Asteroid.prototype = new Surrogate();
//===================

Asteroid.prototype.randomAsteroid = function (dims) {
  side = Math.floor(Math.random()*4);
  switch(side) {
  case 0:
    var pos = [dims[0], Math.floor(Math.random() * dims[1])];
    break;
  case 1:
    var pos = [Math.floor(Math.random() * dims[0]), dims[1]]
    break;
  case 2:
    var pos = [0, Math.floor(Math.random() * dims[1])]
    break;
  case 3:
    var pos = [Math.floor(Math.random() * dims[0]), 0]
    break;
  }

  var dir = (Math.random() * 2*Math.PI)
  var speed_mult = 2*Math.random() + 1

  return new Asteroid(pos, [speed_mult*Math.cos(dir), speed_mult*Math.sin(dir)]);
}

Asteroid.prototype.draw = function () {
  var c = canvas.getContext('2d');
  // c.beginPath();
  // c.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
  // c.fillStyle = 'black';
  // c.closePath();
  // c.fill();

  c.drawImage(this.img,
              0, 0, 156, 156,
              this.position[0]-this.radius, this.position[1]-this.radius, this.radius*2, this.radius*2)

  // c.fillStyle = "rgba(255, 255, 255, 0.5)";
  // c.fillRect(0, 0, 800, 600);
}