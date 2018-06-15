// the size of the neural network model to load. Must be 0.50, 0.75, 1.00, or 1.01
// The higher the number, the larger the model and the more accurate it is, but
// the slower the speed.
var modelSize = 0.50;

// A number between 0.2 and 1.0. How much posenet should scale the image by before feeding
// it through the network.  Set this number lower to scale down the image and increase
// the speed at the cost of accuracy.
var imageScaleFactor = 0.2;

// the minimum score of keypoints from posenet to show.
// Should be between 0.0 and 1.0. Use this to filter out
// lower accuracy parts
var minPartConfidence = 0.3;

// if the pose results should be flipped horizontally. Useful for webcam videos.
var flipHorizontal = true;

var capture;
var net;

var leftHandX = 0;
var leftHandY = 0;
var rightHandX = 0;
var rightHandY = 0;

function estimatePoses(capture) {
  // call posenet to estimate a pose
  net.estimateMultiplePoses(capture.elt, imageScaleFactor, flipHorizontal, 16, 1)
    .then(function(poses) {
      if (poses.length > 0) {
        const pose = poses[0];

        if (pose.score > 0.1) {
          const leftHand = pose.keypoints[posenet.partIds['leftWrist']];
          if (leftHand.score > 0.1) {
            leftHandX = leftHand.position.x;
            leftHandY = leftHand.position.y;
          }

          const rightHand = pose.keypoints[posenet.partIds['rightWrist']];
          if (rightHand.score > 0.1) {
            rightHandX = rightHand.position.x;
            rightHandY = rightHand.position.y;
          }
        }
      }

      // next animation loop, call posenet again to estimate poses
      requestAnimationFrame(function() {
        estimatePoses(capture);
      });
    });
}

function startDetectingHands(capture) {
  // load posenet by downloading the weights for the model.
  posenet.load(modelSize).then(function(loadedNet) {
    net = loadedNet;
    // when it's loaded, start estimating poses
    requestAnimationFrame(function() {
      estimatePoses(capture);
    });
  })
}