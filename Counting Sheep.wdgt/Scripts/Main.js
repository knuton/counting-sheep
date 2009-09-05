window.onload = function() {
  window.controlSize = document.getElementById('stop').width;
  window.radius = 3;
  
  var start = document.getElementById('start');
  var startCtx = start.getContext('2d');
  
  roundedTriang(startCtx, 0, 0, window.controlSize, window.controlSize, window.radius, '#2551AE', 'fill');
  
  var stop = document.getElementById('stop');
  var stopCtx = stop.getContext('2d');
  
  roundedRect(stopCtx, 0, 0, window.controlSize, window.controlSize, window.radius, '#2551AE', 'fill');
}