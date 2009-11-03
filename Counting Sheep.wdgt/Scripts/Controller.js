var Controller = {
  "stop" : function () {
      if (typeof (Properties.countdown) != 'undefined')
        window.clearInterval(Properties.countdown);
  },
  "start" : function () {
    // Get hours
    if (Properties.hours.length == 0)
      Properties.hours = 0;
    else
      Properties.hours = document.getElementById('hours').value;
    
    // Get minutes
    if (Properties.minutes.length == 0)
      Properties.minutes = 0;
    else
      Properties.minutes = document.getElementById('minutes').value;
    
    // Get seconds
    if (Properties.seconds.length == 0)
      Properties.seconds  = 0;
    else
      Properties.seconds = document.getElementById('seconds').value;
    
    // Calculate time in seconds
    Properties.time = Properties.hours*3600 + Properties.minutes*60 + Properties.seconds*1;
    // Start countdown unless total time is <= 0
    if (Properties.time > 0)
      Properties.countdown = window.setInterval('Controller.countdown()',1000);
  },
  "countdown" : function () {
      // 1 second has passed
      Properties.time = Properties.time - 1;
      var remaining, amount = Properties.time;
      // set new hours
      var hours = Math.floor(amount/3600);
      Properties.hours = hours < 10 ? '0' + hours : hours;
      // reduce to minutes
      amount %= 3600;
      // set new minutes
      var minutes = Math.floor(amount/60);
      Properties.minutes = minutes < 10 ? '0' + minutes : minutes;
      // reduce to seconds
      amount %= 60;
      // set new seconds
      var seconds = amount;
      Properties.seconds  = seconds < 10 ? '0' + seconds : seconds;
      View.hours.value = Properties.hours;
      View.minutes.value = Properties.minutes;
      View.seconds.value = Properties.seconds;
      if (remaining == 0) {
        Controller.stop();
        Controller.timeUp('Sleep');
      }
  },
  "showPrefs" : function () {
      window.resizeTo(131,112);
      var front = document.getElementById("front");
    var back = document.getElementById("back");
    if (window.widget)
          widget.prepareForTransition("ToBack");
          front.style.display="none";
          back.style.display="block";
    if (window.widget)
          setTimeout ('widget.performTransition();', 0);
          document.getElementById('fliprollie').style.display = 'none';
          flipper.fadeOut();
  }
}