require("Scripts/View.js");
require("Scripts/CanvasHelper.js");
require("Scripts/Controller.js");
require("Scripts/Properties.js");
//require("AppleClasses/Fader.js"); // should work in Dashboard

// Setup
window.onload = function () {
  View.setup();
  // Set handlers for flip button
  var flipButton = document.getElementById('flip');
  flipButton.onclick = Controller.showPrefs;
  flipButton.onmouseover = function () {
    document.getElementById('fliprollie').style.display = 'block';
  } 
  flipButton.onmouseout = function() {
    document.getElementById('fliprollie').style.display = 'none';
  }
  
  View.draw();
}

function require(fileName) {
  document.write('<script type="text/javascript" src="' + fileName + '"><\/script>');
}