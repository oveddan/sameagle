var width = 1280;
var height = 720;

function setup() {
  createCanvas(1280, 720);
  // create video capture.  For PoseNet, videos must be square
  capture = createCapture({
    video: {
      width,
      height
    }
  });
  capture.size(width, height);
  capture.hide();

  makeParticles();
  makeYoyos();

  startDetectingHands(capture);
}

var imageOpacity = 1.;
function draw() {
  background(0, 15)

  drawSprings();
  drawParticles();

  if (imageOpacity > 0) {
    tint(255, imageOpacity * 255);  // Display at half opacity
    image(capture, 0, 0, capture.width, capture.height);

    noStroke();

    fill(255, 0, 0);
    ellipse(leftHandX, leftHandY, 10, 10);

    fill(0, 255, 0);
    ellipse(rightHandX, rightHandY, 10, 10);


    imageOpacity -= 0.005;
  }

  // // draw keypoints
  // for(var i = 0; i < poses.length; i++) {
  //   var pose = poses[i];

  //   if (pose.score > 0.1) {
  //     var keypoints = pose.keypoints;
  //     for(var j = 0; j < keypoints.length; j++) {
  //       var keypoint = keypoints[j];
  //       // filter out keypoints that have a low confidence
  //       if (keypoint.score > 0.0) {
  //         // for wrists, make the part red
  //         if (j == posenet.partIds['leftWrist'] || j == posenet.partIds['rightWrist']) {
  //           fill(255, 0, 0);

  //           ellipse(keypoint.position.x, keypoint.position.y, 10, 10,);
  //         }
  //       }
  //     }
  //   }
  // }
}