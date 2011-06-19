var Counter = (function () {
  var counter = {
        hours: 0, minutes: 0, seconds: 0
      },
      // holds the interval ID of a running countdown
      countdownInterval,
      // currently only one handler for the elapse-event
      eventHandler,
      observers = [];

  function _setX (X, value) {
    // no outside manipulation when running
    if (isRunning()) return false;

    if (!counter.hasOwnProperty(X))
      throw new TypeError('Counter has no property ' + X);

    if (typeof value !== 'number') value = parseInt(value, 10);

    // don't accept negative numbers or NaN values
    if (value < 0 || (!(value < 0) && !(value >= 0))) {
      counter[X] = counter[X] || 0;
      return false;
    } else {
      counter[X] = value;
      return true;
    }
  }

  function set (hours, minutes, seconds) {
    return _setX('hours', hours) && _setX('minutes', minutes) && _setX('seconds', seconds);
  }

  function hours (hours) {
    if (arguments.length === 0) return counter.hours;
    return _setX('hours', hours);
  }

  function minutes (minutes) {
    if (arguments.length === 0) return counter.minutes;
    return _setX('minutes', minutes);
  }

  function seconds (seconds) {
    if (arguments.length === 0) return counter.seconds;
    return _setX('seconds', seconds);
  }

  function reset () {
    set(0, 0, 0);
  }

  function countdown () {
    if (isElapsed()) {
      // time is up!
      stop();
      // execute payload
      if (typeof eventHandler === 'function') eventHandler();
    } else {
      // count down
      if (counter.seconds === 0) {
        counter.seconds = 59;
        if (counter.minutes === 0) {
          counter.minutes = 59;
          counter.hours -= 1;
        } else counter.minutes -= 1;
      } else counter.seconds -= 1;
    }
    // notify observers
    push();
  }


  function start () {
    // start only if there is no running countdown and time is not zero
    if (isRunning() || isElapsed())
      return;
    countdownInterval = window.setInterval(countdown, 1000); 
  }

  function stop () {
    if (isRunning()) {
      window.clearInterval(countdownInterval);
      countdownInterval = void 0;
    }
    else
      reset();
  }

  function isElapsed() {
    return !counter.seconds && !counter.minutes && !counter.hours;
  }

  function isRunning () {
    return !!countdownInterval;
  }

  function elapse (fn) {
    eventHandler = fn;
  }

  function notify (observer) {
    for (var i = 0; i < observers.length; i++) {
      if (observers[i] === observer) return;
    }
    observers.push(observer);
  }

  function push () {
    for (var i = 0; i < observers.length; i++) {
      observers[i](counter.hours, counter.minutes, counter.seconds);
    }
  }

  // Return Counter object
  return {
    hours: hours,
    minutes: minutes,
    seconds: seconds,
    set: set,
    reset: reset,
    start: start,
    stop: stop,
    isElapsed: isElapsed,
    isRunning: isRunning,
    elapse: elapse,
    notify: notify,
  };
})();

