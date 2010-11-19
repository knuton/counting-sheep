require("Scripts/View.js");
require("Scripts/CanvasHelper.js");
require("Scripts/Controller.js");
require("Scripts/Properties.js");
require("AppleClasses/AppleInfoButton.js");
require("AppleClasses/AppleAnimator.js");

// Setup
window.onload = function () {
  View.setup();
  
  View.draw();
}

function require(fileName) {
  document.write('<script type="text/javascript" src="' + fileName + '"><\/script>');
}