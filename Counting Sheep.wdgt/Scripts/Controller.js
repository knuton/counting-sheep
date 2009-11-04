var Controller = {
  // Act on start of countdown
  "start" : function () {
    // Get hours
    if (Properties.hours.length == 0)
      Properties.hours = 0;
    else
      Properties.hours = View.hours.value;
    
    // Get minutes
    if (Properties.minutes.length == 0)
      Properties.minutes = 0;
    else
      Properties.minutes = View.minutes.value;
    
    // Get seconds
    if (Properties.seconds.length == 0)
      Properties.seconds  = 0;
    else
      Properties.seconds = View.seconds.value;
    
    // Calculate time in seconds
    Properties.time = Properties.hours*3600 + Properties.minutes*60 + Properties.seconds*1;
    // Start countdown unless total time is <= 0
    if (Properties.time > 0)
      Properties.countdown = window.setInterval('Controller.countdown()',1000);
    
    View.blurInputs();
    
    return false;
  },
  // Act on stop of countdown
  "stop" : function () {
    if (typeof (Properties.countdown) != 'undefined') {
      window.clearInterval(Properties.countdown);
    }
    else { // #todo
      Controller.setToZero();
    }
    
    return false;
  },
  // Countdown one second
  "countdown" : function () {
    // 1 second has passed
    Properties.time = Properties.time - 1;
    var amount = Properties.time;
    // Take action when 00:00:00 is reached
    if (amount == 0) {
      Controller.stop();
      Controller.timeUp();
    }
    // set new hours
    var hours = Math.floor(amount/3600);
    Properties.hours = hours < 10 ? '0' + hours : hours;
    View.hours.value = Properties.hours;
    // reduce to minutes
    amount %= 3600;
    // set new minutes
    var minutes = Math.floor(amount/60);
    Properties.minutes = minutes < 10 ? '0' + minutes : minutes;
    View.minutes.value = Properties.minutes;
    // reduce to seconds
    amount %= 60;
    // set new seconds
    var seconds = amount;
    Properties.seconds  = seconds < 10 ? '0' + seconds : seconds;
    View.seconds.value = Properties.seconds;
  },
  // Set the time to 00:00:00
  "setToZero" : function () {
    Properties.hours = 0;
    View.hours.value = '00';
    Properties.minutes = 0;
    View.minutes.value = '00';
    Properties.seconds = 0;
    View.seconds.value = '00';
  },
  "timeUp" : function () {
    if (false)
      widget.system("/usr/bin/osascript -e 'tell application \"Finder\" to shut down'", null);
    else
      widget.system("/usr/bin/osascript -e 'tell application \"Finder\" to sleep'", null);
  },
  "showPrefs" : function () {
    window.resizeTo(131,112);
    if (window.widget)
      widget.prepareForTransition("ToBack");
    View.front.style.display="none";
    View.back.style.display="block";
    if (window.widget)
      setTimeout('widget.performTransition();', 0);
    document.getElementById('fliprollie').style.display = 'none';
    flipper.fadeOut();
  }
}