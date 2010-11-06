// Holds global properties & resources
var Properties = {
   // size of the control buttons
  "controlSize" : 0,
  // radius of the rounded corners
  "radius"      : 0,
  "lastFactor"  : 1,
  // List of all elements to be resized
  "resizableElements" : [
    'front', 'hours', 'minutes',
    'seconds', 'start', 'stop',
    'drag'
  ],
  // List of attributes to be resized
  "resizableAttributes" : [
    'width', 'height', 'top', 'left', 'right', 'bottom',
    '-webkit-border-radius', 'padding', 'font-size'
  ],
  // hours, minutes & seconds
  "hours" : 0,
  "minutes" : 0,
  "seconds"  : 0,
  
  // Allowed keys for number input
  // (man, this is hard to get right)
  "numberAndControlChars" : {
    8 : "Backspace", 13 : "Enter", 27 : "Escape", 37 : "Left", 38 : "Up",
    39 : "Right", 40 : "Down", 46 : "Delete",
    48 : "0", 49 : "1", 50 : "2", 51 : "3", 52 : "4", 53 : "5", 54 : "6",
    55 : "7", 56 : "8", 57 : "9"
  }
}