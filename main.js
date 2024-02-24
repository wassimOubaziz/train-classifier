let classifier;
let featureExtractor;

window.addEventListener("load", function () {
  featureExtractor = ml5.featureExtractor("MobileNet", modelLoaded);
});

function modelLoaded() {
  console.log("Model Ready");
  classifier = featureExtractor.classification(videoElement, videoReady);
}

function videoReady() {
  console.log("Video Ready");
  loadData();
}

document.getElementById("phone").addEventListener("click", function () {
  classifier.addImage("phone");
});

document.getElementById("book").addEventListener("click", function () {
  classifier.addImage("book");
});

document.getElementById("training").addEventListener("click", function () {
  classifier.train(function (lossValue) {
    console.log("Loss is", lossValue);
    if (lossValue === null) {
      console.log("Training Complete");
      document.getElementById("save").addEventListener("click", function () {
        classifier.save();
      });
    }
  });
});

function loadData() {
  classifier.load("./model.json", readyToClassify);
}

function readyToClassify() {
  console.log("Model Ready");
  featureExtractor.classify(videoElement, gotResults);
}

function gotResults(error, results) {
  if (error) {
    console.error(error);
  } else {
    result.innerHTML = results[0].label + " " + results[0].confidence;
    setTimeout(function () {
      readyToClassify();
    }, 1000);
  }
}
