// Inspired by
// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

class Attractor {
  constructor(x, y) {
      this.position = createVector(200, 200);
      this.mass = 2;
      this.G = 10;

  }
  calculateAttraction(m) {
      let force = p5.Vector.sub(this.position, m.position);
      let distance = force.mag();
      distance = constrain(distance, 1, 15);
      force.normalize();
      let strength = (this.G * this.mass * 0.02) / distance * distance;
      force.mult(strength);
      return force;

  }

  display() {
      ellipseMode(CENTER);
      ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);
  }

  update(inputX, inputY) {
      this.position.x = inputX;
      this.position.y = inputY;
  }
}