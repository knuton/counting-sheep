window._ = {
  intdiv: function (a, b) { return (a - a % b)/b; },
  bind: function (fn, obj) {
    var slice = Array.prototype.slice, args = slice.call(arguments, 2);
    return function() { return fn.apply(obj, args.concat(slice.call(arguments))); };
  }
};
