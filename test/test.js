module("CanvasHelper.js");

test("rejection of fill method `strill`", function () {
  var canvas = document.createElement('canvas');
  var caughtIllegalArgumentException = false;
  try {
    CanvasHelper.roundedRect(canvas.getContext("2d"), 0, 0, 0, 0, 0, '#000', 'strill');
    CanvasHelper.roundedTriang(canvas.getContext("2d"), 0, 0, 0, 0, 0, '#000', 'strill');
  } catch (e) {
    caughtIllegalArgumentException = e.type == 'IllegalArgumentException' ? true : false;
  }
  ok(caughtIllegalArgumentException, "No or wrong exception has been thrown.");
});

test("acceptance of fill method `fill`", function () {
  var canvas = document.createElement('canvas');
  var caughtError = false;
  try {
    CanvasHelper.roundedRect(canvas.getContext("2d"), 0, 0, 0, 0, 0, '#000', 'fill');
    CanvasHelper.roundedTriang(canvas.getContext("2d"), 0, 0, 0, 0, 0, '#000', 'fill');
  } catch (e) {
    caughtError = true;
  }
  ok(!caughtError, "An error has been thrown, but shouldn't have been.");
});

test("acceptance of fill method `stroke`", function () {
  var canvas = document.createElement('canvas');
  var caughtError = false;
  try {
    CanvasHelper.roundedRect(canvas.getContext("2d"), 0, 0, 0, 0, 0, '#000', 'stroke');
    CanvasHelper.roundedTriang(canvas.getContext("2d"), 0, 0, 0, 0, 0, '#000', 'stroke');
  } catch (e) {
    caughtError = true;
  }
  ok(!caughtError, "An error has been thrown, but shouldn't have been.");
});

module('Counter');

test('initially set to zero', function () {
  equals(Counter.hours(), 0);
  equals(Counter.minutes(), 0);
  equals(Counter.seconds(), 0);
});

test('initially elapsed', function () {
  ok(Counter.isElapsed(), 'Counter is not initially elapsed');
});

test('setting hours', function () {
  var hours = 5;
  Counter.hours(hours);
  equals(Counter.hours(), hours);
});

test('setting minutes', function () {
  var minutes = 5;
  Counter.minutes(minutes);
  equals(Counter.minutes(), minutes);
});

test('setting seconds', function () {
  var seconds = 5;
  Counter.seconds(seconds);
  equals(Counter.seconds(), seconds);
});

test('setting multiple and then some', function () {
  Counter.set(12, 13, 14);
  equals(Counter.hours(), 12);
  equals(Counter.minutes(), 13);
  equals(Counter.seconds(), 14);
  Counter.set(3, 4);
  equals(Counter.seconds(), 14);
});

test('resetting', function () {
  Counter.set(1, 2, 3);
  Counter.reset();
  equals(Counter.hours(), 0);
  equals(Counter.minutes(), 0);
  equals(Counter.seconds(), 0);
});

test('running after valid start', function () {
  Counter.set(0,0,10);
  Counter.start();
  ok(Counter.isRunning(), 'Counter is not running');
  Counter.stop();
});

test('stopping on call', function () {
  Counter.set(0,0,10);
  Counter.start();
  Counter.stop();
  ok(!Counter.isRunning(), 'Counter is running after calling stop');
});

test('not running for zero-countdown', function () {
  Counter.reset();
  Counter.start();
  ok(!Counter.isRunning(), 'Counter is running for 0:0:0');
});

test('executes onelapse handler', 1, function () {
  Counter.set(0,0,1);
  Counter.elapse(function () {
    ok(true, 'Did not call elapse handler');
  });
  Counter.start();
});
