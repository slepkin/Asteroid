Number.prototype.sign = function() {
  return this.valueOf()?this.valueOf()<0?-1:1:0
}

function Ship(position, game) {
  this.position = position;
  this.acceleration = [0,0];
  this.acceleration_constant = 0.4;
  this.velocity = [0,0];
  this.radius = 10;
  this.game = game;
  this.top_speed = 5;
  this.drag = 0.05;

  // Asteroid image
  this.img = new Image();
  this.img.src = 'ship.png';
}



//===================
function Surrogate() {};
Surrogate.prototype = MovingObject.prototype;

Ship.prototype = new Surrogate();
//===================

Ship.prototype.draw = function () {
  var c = canvas.getContext('2d');

  c.drawImage(this.img,
              0, 0, 306, 193,
              this.position[0]-this.radius, this.position[1]-this.radius, this.radius*2, this.radius*2)

  // c.beginPath();
  // c.arc(this.position[0], this.position[1], this.radius, 0, 2 * Math.PI, false);
  // c.fillStyle = 'red';
  // c.closePath();
  // c.fill();
}

Ship.prototype.isHit = function(asteroids){
  for(var i = 0; i < asteroids.length; i++) {
    if(this.intersects(asteroids[i]))
      return true;
  }
  return false;
}

Ship.prototype.speed = function() {
  return Math.sqrt(Math.pow(this.velocity[0],2) + Math.pow(this.velocity[1],2));
}

Ship.prototype.move = function(dims) {
  this.velocity[0] += this.acceleration[0] - (this.drag * this.velocity[0].sign());
  this.velocity[1] += this.acceleration[1] - (this.drag * this.velocity[1].sign());

  this.update(dims);
}

Ship.prototype.power = function() {
  var that = this;

  Mousetrap.bind('w', function() {
    that.acceleration[1] = -that.acceleration_constant;
  }, 'keydown');

  Mousetrap.bind('w', function() {
    that.acceleration[1] = 0;
  }, 'keyup');

  Mousetrap.bind('s', function(){
    that.acceleration[1] = that.acceleration_constant;

  }, 'keydown');

  Mousetrap.bind('s', function() {
    that.acceleration[1] = 0;
  }, 'keyup');

  Mousetrap.bind('a', function(){
    that.acceleration[0] = -that.acceleration_constant;

  }, 'keydown');

  Mousetrap.bind('a', function() {
    that.acceleration[0] = 0;
  }, 'keyup');

  Mousetrap.bind('d', function(){
    that.acceleration[0] = that.acceleration_constant;

  }, 'keydown');

  Mousetrap.bind('d', function() {
    that.acceleration[0] = 0;
  }, 'keyup');

  Mousetrap.bind('space', function(){
    if(that.game.available_bullets > 0)
      that.fireBullet();
  });
}


Ship.prototype.fireBullet = function() {
  if(this.game.available_bullets > 0) {
    if(!this.game.mute)
      this.game.shoot_sound.play();
    this.game.bullets.push(new Bullet([this.position[0], this.position[1]],
      this.velocity , this.game));
    if(!this.game.cheating)
      this.game.available_bullets--;
  }
};