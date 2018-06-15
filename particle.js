// Inspired by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

let movers = [];
let attractor;
let pAmount = 100

  
function makeParticles(){
    for (i = 0; i < pAmount; i++) {
        movers.push(new Particle(random(width), random(height),
            random(0.01, 0.6), random(150), random(50), random(250)));
    }
    attractorLhand = new Attractor(leftHandX, leftHandY);
    attractorRhand = new Attractor(rightHandX, rightHandY);
}


function drawParticles() {
    for (i = 0; i < pAmount; i++) {
        if (i < 50) {
            let forceL = attractorLhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorLhand);
            movers[i].applyForce(forceL);
        } else {
            let forceR = attractorRhand.calculateAttraction(movers[i]);
            // movers[i].arrive(attractorRhand);
            movers[i].applyForce(forceR);
            // movers[i].update();
            // movers[i].display();
        }
        movers[i].update();
        movers[i].display();
    }
    // attractor.display();
    attractorRhand.update(rightHandX, rightHandY);
    attractorLhand.update(leftHandX, leftHandY);
}


class Particle  {
  constructor (x,y,M,r,g,b){
  this.position = createVector(x,y);
  this.velocity = createVector(0, 0);
  this.acceleration = createVector(0, 0);
  this.mass = M+M;
  this.r = r
  this.g = g
  this.b = b
  this.maxspeed = 5
  }
  
  applyForce (force) {
    var f = p5.Vector.div(force,this.mass);
    this.acceleration.add(f);
  }
    
  update () {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.99);
  }

  display() {
    noStroke();
    fill(this.r, this.g, this.b,200);
    ellipse(this.position.x, this.position.y, this.mass*10, this.mass*10);
  }
  
}
