window.onload = function () {
  // Get canvas size
  window.controlSize = document.getElementById('stop').width;
  window.radius = 2;
  // List of all elements to be resized
  var resizableElements = ['front', 'hours', 'seconds', 'minutes', 'start', 'stop'];
  
  draw();
}

function multiply (factor) {
  window.controlSize *= factor;
  window.radius *= factor;
  // List of all elements to be resized
  var resizableElements = ['front', 'hours', 'seconds', 'minutes', 'start', 'stop'];
  // List of attributes to be resized
  var resizableAttributes = ['width', 'height', 'top', 'left', 'right', 'bottom',
    '-webkit-border-radius', 'padding', 'font-size'];
  
  for (var i = 0; i < resizableElements.length; i++) {
    var elemName = resizableElements[i];
    var elem = document.getElementById(elemName);
    for (var j = 0; j < resizableAttributes.length; j++) {
      var attrName = resizableAttributes[j];
      if (elem && !!getIntCssValue(elem, attrName))
        elem.style.setProperty(attrName, (getIntCssValue(elem, attrName) * factor) + 'px');
    } // end of looping through attributes
  } // end of looping through elements
  
  var start = document.getElementById('start');
  start.width = start.height = window.controlSize;
  var stop = document.getElementById('stop');
  stop.width = stop.height = window.controlSize;
  draw();
}

// Gets computed CSS style of element for given attribute and returns it
function getIntCssValue(elem, attribute) {
  return parseInt(window.getComputedStyle(elem).getPropertyValue(attribute));
}


// Draws in canvas elements
function draw () {
  // Draw start button
  var start = document.getElementById('start');
  var startCtx = start.getContext('2d');
  
  roundedTriang(startCtx, 0, 0, window.controlSize, window.controlSize, window.radius, '#2551AE', 'fill');
  
  // Draw stop button
  var stop = document.getElementById('stop');
  var stopCtx = stop.getContext('2d');
  
  roundedRect(stopCtx, 0, 0, window.controlSize, window.controlSize, window.radius, '#2551AE', 'fill');
  
  // Draw background canvas (WebKit)
  var front = document.getElementById('front');
  var frontWidth = getIntCssValue(front, 'width');
  var frontHeight = getIntCssValue(front, 'height');
  var ctx = document.getCSSCanvasContext("2d", "bgcan", frontWidth, frontHeight);

  var gradient = ctx.createLinearGradient(0, 0, 0, frontHeight);
  gradient.addColorStop(0, "#B5C4E3");
  gradient.addColorStop(1, "#ECF0FA");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, frontWidth, frontHeight);
}