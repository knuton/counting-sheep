var View = {
  "setup" : function () {
    // Get canvas size
    Properties.controlSize = document.getElementById('stop').width;
    Properties.radius = 2;
    
    // Set handlers for control buttons
    View.start = document.getElementById('start');
    View.stop = document.getElementById('stop');
    View.start.onclick = Controller.start;
    View.stop.onclick = Controller.stop;
    
    // Get input elements
    View.hours = document.getElementById('hours');
    View.minutes = document.getElementById('minutes');
    View.seconds = document.getElementById('seconds');
    
    // Set action for form submission
    document.timeinput.onsubmit = Controller.start;
    
    // Accept only numerical input
    View.hours.onkeypress = View.stripLetters;
    View.minutes.onkeypress = View.stripLetters;
    View.seconds.onkeypress = View.stripLetters;
  },
  
  "blurInputs" : function () {
    View.hours.blur();
    View.minutes.blur();
    View.seconds.blur();
  },
  
  // Check whether pressed key was a number or control key
  "stripLetters" : function (event) {
    event = event || window.event
    return event.keyCode in Properties.numberAndControlChars;
  },
  
  // Scale several elements by factor
  "multiply" : function (factor) {
    Properties.controlSize *= factor;
    Properties.radius *= factor;
    
    // Loop through resizable elements to resize
    for (var i = 0; i < Properties.resizableElements.length; i++) {
      var elemName = Properties.resizableElements[i];
      var elem = document.getElementById(elemName);
      for (var j = 0; j < Properties.resizableAttributes.length; j++) {
        var attrName = Properties.resizableAttributes[j];
        if (elem && !!View.getIntCssValue(elem, attrName))
          elem.style.setProperty(attrName, (View.getIntCssValue(elem, attrName) * factor) + 'px');
      } // end of looping through attributes
    } // end of looping through elements
    
    // set non-CSS attributes separately
    var start = document.getElementById('start');
    start.width = start.height = Properties.controlSize;
    var stop = document.getElementById('stop');
    stop.width = stop.height = Properties.controlSize;
    View.draw();
  },
  
  // Gets computed CSS style of element for given attribute and returns it
  "getIntCssValue" : function (elem, attribute) {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(attribute));
  },
  
  // Draws in canvas elements
  "draw": function () {
    // Draw start button
    var start = document.getElementById('start');
    var startCtx = start.getContext('2d');
    
    CanvasHelper.roundedTriang(startCtx, 0, 0, Properties.controlSize, Properties.controlSize, Properties.radius, '#2551AE', 'fill');
    
    // Draw stop button
    var stop = document.getElementById('stop');
    var stopCtx = stop.getContext('2d');
    
    CanvasHelper.roundedRect(stopCtx, 0, 0, Properties.controlSize, Properties.controlSize, Properties.radius, '#2551AE', 'fill');
    
    // Draw background canvas (WebKit)
    var front = document.getElementById('front');
    var frontWidth = View.getIntCssValue(front, 'width');
    var frontHeight = View.getIntCssValue(front, 'height');
    var ctx = document.getCSSCanvasContext("2d", "bgcan", frontWidth, frontHeight);
    // Fill background canvas with gradient
    var gradient = ctx.createLinearGradient(0, 0, 0, frontHeight);
    gradient.addColorStop(0, "#B5C4E3");
    gradient.addColorStop(1, "#ECF0FA");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, frontWidth, frontHeight);
  }
}