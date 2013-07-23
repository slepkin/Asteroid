function Game() {
  this.dims = [800,600]
  this.canvas = document.getElementById('canvas');
  this.bullets = [];
  this.available_bullets = 10;
  this.cheating = false;
  this.game_over = false;
  this.mute = false;
  this.shoot_sound = document.getElementById("shoot_sound");
  this.saucer_sound = document.getElementById("saucer_sound");
  this.explosion_sound = document.getElementById("explosion_sound");
  this.win_sound = document.getElementById("win_sound");
  this.lose_sound = document.getElementById("lose_sound");

  // Background image
  this.img = new Image();
  this.img.src = 'space.jpg';

  //Create asteroids
  this.asteroids = [];
  for(var i = 0; i < 1; i++) {    this.asteroids.push(Asteroid.prototype.randomAsteroid(this.dims));
  }

  //Create ship
  this.ship = new Ship([Math.floor(this.dims[0]/2), Math.floor(this.dims[1]/2)], this);
}

Game.prototype.draw = function() {
  console.log("Mute status: " + this.mute);
  var c = this.canvas.getContext('2d');

  c.clearRect(0,0,this.dims[0],this.dims[1]);

  // // Add border to canvas
  // c.lineWidth = 5;
  // c.strokeStyle = 'black';
  // c.strokeRect(0,0,this.dims[0],this.dims[1]);

  // Draw background image
  c.drawImage(this.img,
              0, 0, 320, 240,
              0, 0, 800, 600)

  // c.fillStyle = "rgba(255, 255, 255, 0.5)";
//   c.fillRect(0, 0, 800, 600);

  //Draw ship
  this.ship.draw();

  //Draw asteroids
  this.asteroids.forEach(function (asteroid) {
    asteroid.draw();
  });

  // Draw bullets
  this.bullets.forEach(function (bullet) {
    bullet.draw();
  });

  // Draw number of available bullets
  c.fillStyle = "white";
  c.font = "8pt PressStart2P";
  var bullet_str = ("00"+this.available_bullets).slice(-3);
  c.fillText("Bullets: " + (this.available_bullets === -1 ? 999 : bullet_str), 665, 20);

  // Display mute status if muted
  if(this.mute)
    c.fillText("MUTED", 740, 585);

  c.font = "20pt PressStart2P";
  // Display win
  if(this.asteroids.length === 0) {
    c.fillText("YOU WIN", 300 , 300);
    this.game_over = true;
    if(!this.mute)
      this.win_sound.play();

    // Display Game Over
  } else if(this.ship.isHit(this.asteroids) || this.available_bullets + this.bullets.length <= 0) {
    c.fillText("GAME OVER", 275 , 300);
    this.game_over = true;
    if(!this.mute)
      this.lose_sound.play();
  }
  if(this.game_over) {
    c.fillText("ENTER TO RESTART", 180, 400);
    clearInterval(this.refreshIntervalID);
  }
}

Game.prototype.update = function() {
  var that = this;
  this.ship.move(this.dims);
  // this.ship.update(this.dims);

  this.asteroids.forEach(function (asteroid) {
    asteroid.update(that.dims);
  });

  var i = 0;
  var collision;
  while(i < this.bullets.length) {
    this.bullets[i].update(this);

    if(this.bullets[i].offScreen(this.dims)) {
      this.bullets.splice(i,1);
    } else {

      var j = 0;
      collision = false;
      while(j < this.asteroids.length) {
        if(this.bullets[i].intersects(this.asteroids[j])) {
          this.bullets.splice(i,1);
          this.asteroids.splice(j,1);
          if(!this.cheating)
            this.available_bullets += 2;
          collision = true;
          if(!this.mute)
            this.explosion_sound.play();
          break;
        }

        j++;
      }

      if(!collision)
        i++;
    }
  }
}

Game.prototype.power = function() {
  var that = this;

  Mousetrap.bind('enter', function() {
    if(that.game_over) {
      g = new Game(canvas.getContext());
      g.play();
    }
  });

  Mousetrap.bind('m', function() {
    that.mute = !that.mute;
    if(!that.mute)
      that.saucer_sound.play();
  });

  Mousetrap.bind('up up down down left right left right b a', function() {
    that.available_bullets = 999;
    that.cheating = true;
    that.ship.acceleration[0] = 0;
  });
}

Game.prototype.play = function() {
  if(!this.mute)
    this.saucer_sound.play();
  this.ship.power();
  this.power();

  var that = this;
  this.refreshIntervalID = window.setInterval(
    function () {
      that.update();
      that.draw();
    }, 1000/32
  );
}

g = new Game(canvas.getContext());
g.play();