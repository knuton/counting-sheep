var CanvasHelper = function () {

  /**
   * Paints a rectangle with rounded corners on the provided drawing context.
   *
   * @param ctx The drawing context
   * @param x The x position of the upper left corner
   * @param y The y position of the upper left corner
   * @param width The width of the rectangle
   * @param height The height of the rectangle
   * @param color The fill/stroke color can be CSS color, pattern or gradient
   * @param fillMethod Can be one of {stroke, fill}
   */
  var roundedRect = function (ctx, x, y, width, height, radius, color, fillMethod) {
    if (!isValidFillMethod(fillMethod))
      throw { type: "IllegalArgumentException", message: "fillMethod must be `fill` or `stroke`" };
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+height-radius);
    ctx.quadraticCurveTo(x,y+height,x+radius,y+height);
    ctx.lineTo(x+width-radius,y+height);
    ctx.quadraticCurveTo(x+width,y+height,x+width,y+height-radius);
    ctx.lineTo(x+width,y+radius);
    ctx.quadraticCurveTo(x+width,y,x+width-radius,y);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    eval('ctx.' + fillMethod + 'Style = color');
    eval('ctx.' + fillMethod + '()');
  };

  /**
   * Paints a triangle with rounded corners on the provided drawing context.
   *
   * @param ctx The drawing context
   * @param x The x position of the upper left corner
   * @param y The y position of the upper left corner
   * @param width The width of the triangle
   * @param height The height of the trangle
   * @param color The fill/stroke color can be CSS color, pattern or gradient
   * @param fillMethod Can be one of {stroke, fill}
   */
  var roundedTriang = function (ctx, x, y, width, height, radius, color, fillMethod) {
    if (!isValidFillMethod(fillMethod))
      throw { type: "IllegalArgumentException", message: "fillMethod must be `fill` or `stroke`" };
    ctx.beginPath();
    ctx.moveTo(x,y+radius);
    ctx.lineTo(x,y+width-radius);
    ctx.quadraticCurveTo(x,y+width,x+radius,y+width);
    ctx.lineTo(x+height-radius,y+(width+radius)/2);
    ctx.quadraticCurveTo(x+height,y+width/2,x+height-radius,y+(width-radius)/2);
    ctx.lineTo(x+radius,y);
    ctx.quadraticCurveTo(x,y,x,y+radius);
    ctx.fillStyle = color;
    eval('ctx.' + fillMethod + 'Style = color');
    eval('ctx.' + fillMethod + '()');
  };

  var isValidFillMethod = function (fillMethod) {
    return fillMethod == 'fill' || fillMethod == 'stroke';
  };

  return {
    // public methods
    roundedRect : roundedRect,
    roundedTriang : roundedTriang
  };
}();
