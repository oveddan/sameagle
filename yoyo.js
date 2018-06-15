// Inspired by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

function makeYoyos() {
  bobRhand = new Yoyo()
  bobRhand2 = new Yoyo()
  bobHead = new Yoyo()
  bobLhand = new Yoyo()
  bobLhand2 = new Yoyo()
  // bobLknee = new Yoyo()
  // bobRknee = new Yoyo()
  bobLankle = new Yoyo()
  bobRankle = new Yoyo()
}



function drawSprings(){ 
  Rhand = createVector(rightHandX, rightHandY)
  Lhand = createVector(leftHandX, leftHandY)

  springVisuals(Rhand, bobRhand, 0.02, 10, 0.2);
  springVisuals(Lhand, bobLhand, 0.02, 10, 0.2);
}


function springVisuals(Origin, Bob, K, Rest, G) {
  let restLen = Rest;
  let origin = Origin
  let bob = Bob
  stroke(255, 0, 0, 15)
  line(origin.x, origin.y, bob.pos.x, bob.pos.y)
  let spring = new p5.Vector.sub(bob.pos, origin)
  let currentLen = spring.mag()
  spring.normalize();
  let k = K
  let stretch = currentLen - restLen
  spring.mult(-k * stretch)
  bob.applyForce(spring)
  gravity = new p5.Vector(0, G)
  bob.applyForce(gravity);
  bob.update()
  bob.display()
}

class Yoyo {

  constructor(x, y) {
      this.pos = createVector(x, y)
      this.vel = createVector(0, 0)
      this.acc = createVector(0, 0);
  }

  applyForce(force) {
      this.acc.add(force)
  }

  update() {
      this.vel.add(this.acc)
      this.pos.add(this.vel)
      this.vel.mult(0.98)
      this.acc.mult(0)
  }

  display() {
      fill(200)
      stroke(100, 180, 255, 90)
      strokeWeight(10)
      point(this.pos.x, this.pos.y)
      strokeWeight(2)
  }
}

