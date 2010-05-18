var View = {
  "setup" : function () {
    // Get canvas size
    Properties.controlSize = document.getElementById('stop').width;
    Properties.radius = 2;
    
    // Get front and back
    View.front = document.getElementById('front');
    View.back = document.getElementById('back');
    
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
    
    // Set action for CMD+ and CMD-
    View.cmdHeld = false;
    window.onkeydown = View.keyCombination;
    window.onkeyup   = View.clearKeyCombination;
    
    // Accept only numerical input
    View.hours.onkeypress = View.stripLetters;
    View.minutes.onkeypress = View.stripLetters;
    View.seconds.onkeypress = View.stripLetters;
    
    Controller.setToZero();
  },
  
  // Blur inputs for neat optic
  "blurInputs" : function () {
    View.hours.blur();
    View.minutes.blur();
    View.seconds.blur();
  },
  
  // Check whether pressed key was a number or control key
  // returns true if it is a legit input or command, so that
  // the input will be accepted, false else which leads to
  // discarding of the input
  "stripLetters" : function (event) {
    return event.keyCode in Properties.numberAndControlChars;
  },
  
  // React on key combination
  // CMD-plus to increase size by 1
  // CMD-minus to decrease size by 1
  // This is currently working only for German layout #todo
  "keyCombination" : function (event) {
    // Take note when CMD is being pressed
    if (event.which == 93) View.cmdHeld = true;
    // If + is pressed while CMD still pressed
    else if (event.which == 187 && View.cmdHeld) {
      View.multiply((Properties.lastFactor + 1)/Properties.lastFactor);
    }
    // If - is pressed while CMD still pressed
    else if (event.which == 189 && View.cmdHeld && Properties.lastFactor > 1) {
      View.multiply((Properties.lastFactor - 1)/Properties.lastFactor);
    }
  },
  
  // Take note when CMD key is being released
  "clearKeyCombination" : function (event) {
    if (event.which == 93) View.cmdHeld = false;
  },
  
  // Scale several elements by factor
  "multiply" : function (factor) {
    Properties.controlSize *= factor;
    Properties.radius *= factor;
    Properties.lastFactor = Properties.lastFactor * factor;
    
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
    View.start.width = View.start.height = Properties.controlSize;
    View.stop.width = View.stop.height = Properties.controlSize;
    View.draw();
  },
  
  // Gets computed CSS style of element for given attribute and returns it
  "getIntCssValue" : function (elem, attribute) {
    return parseInt(window.getComputedStyle(elem).getPropertyValue(attribute));
  },
  
  // Draws in canvas elements
  "draw": function () {
    // Draw start button
    var startCtx = View.start.getContext('2d');
    CanvasHelper.roundedTriang(startCtx, 0, 0, Properties.controlSize, Properties.controlSize, Properties.radius, '#2551AE', 'fill');
    
    // Draw stop button
    var stopCtx = View.stop.getContext('2d');
    CanvasHelper.roundedRect(stopCtx, 0, 0, Properties.controlSize, Properties.controlSize, Properties.radius, '#2551AE', 'fill');
    
    // Draw background canvas (WebKit)
    var frontWidth = View.getIntCssValue(View.front, 'width');
    var frontHeight = View.getIntCssValue(View.front, 'height');
    var ctx = document.getCSSCanvasContext("2d", "bgcan", frontWidth, frontHeight);
    // Fill background canvas with gradient
    var gradient = ctx.createLinearGradient(0, 0, 0, frontHeight);
    gradient.addColorStop(0, "#B5C4E3");
    gradient.addColorStop(1, "#ECF0FA");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, frontWidth, frontHeight);
  }
}