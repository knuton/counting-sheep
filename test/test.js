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
