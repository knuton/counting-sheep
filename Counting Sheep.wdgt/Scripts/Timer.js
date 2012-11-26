function Timer (initial) {
  this.remaining = initial || 0;
  this.intervalHandle = null;
  this.onElapse = null;
  this.observers = [];
  this.tick = _.bind(this.tick, this);
}

//
// Time
//

Timer.prototype.hours = function (hours) {
  if (!arguments.length) return _.intdiv(this.remaining, 3600);
  else {
    if (this.isRunning()) return false;
    return this._set(this.remaining + 3600 * (parseInt(hours, 10) - this.hours()));
  }
};

Timer.prototype.minutes = function (minutes) {
  if (!arguments.length) return _.intdiv(this.remaining % 3600, 60);
  else {
    if (this.isRunning()) return false;
    return this._set(this.remaining + 60 * (parseInt(minutes, 10) - this.minutes()));
  }
};

Timer.prototype.seconds = function (seconds) {
  if (!arguments.length) return this.remaining % 60;
  else {
    if (this.isRunning()) return false;
    return this._set(this.remaining + (parseInt(seconds, 10) - this.seconds()));
  }
};

Timer.prototype.set = function (hours, minutes, seconds) {
  return this.hours(hours) && this.minutes(minutes) && this.seconds(seconds);
};

Timer.prototype.reset = function () {
  if (this.isRunning()) return false;
  this._set(0);
};

Timer.prototype.decrease = function () {
  this._set(this.remaining - 1);
};

Timer.prototype._set = function (seconds) {
  if (typeof seconds !== 'number') seconds = parseInt(seconds, 10);

  // don't accept negative numbers or NaN values
  if (seconds < 0 || (!(seconds < 0) && !(seconds >= 0))) {
    return false;
  } else {
    this.remaining = seconds;
    this.push();
    return true;
  }
}

//
// Countdown
//

Timer.prototype.start = function () {
  // start only if there is no running countdown and time is not zero
  if (this.isRunning() || this.isElapsed()) return;
  this.intervalHandle = window.setInterval(this.tick, 1000);
};

Timer.prototype.stop = function () {
  if (this.isRunning()) {
    window.clearInterval(this.intervalHandle);
    delete this.intervalHandle;
  }
  else this.reset();
};

Timer.prototype.tick = function () {
  if (this.isElapsed()) {
    this.stop();
    this.execute();
  } else
    this.decrease();
};

Timer.prototype.isRunning = function () {
  return !!this.intervalHandle;
};

//
// Elapse Actions
//

Timer.prototype.execute = function () {
  if (typeof this.onElapse === 'function') this.onElapse();
};

// Schedule an action to be performed when timer elapses.
Timer.prototype.schedule = function (action) {
  this.onElapse = action;
};

Timer.prototype.isElapsed = function () {
  return !this.remaining;
};

//
// Event System
//

// Registers observer for being notified when remaining time changes.
// Observers are functions that will receive a reference to the timer and the
// remaining time in seconds as arguments.
Timer.prototype.notify = function (observer) {
  for (var i = 0; i < this.observers.length; i++) {
    if (this.observers[i] === observer) return;
  }
  this.observers.push(observer);
};

// Push notifications to observers
Timer.prototype.push = function () {
  for (var i = 0; i < this.observers.length; i++)
    this.observers[i](this, this.remaining);
};
