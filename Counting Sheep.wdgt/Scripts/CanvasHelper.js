var CanvasHelper = {
  "roundedRect" : function (ctx, x, y, width, height, radius, color, fillMethod) {
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
  },
  "roundedTriang" : function (ctx, x, y, width, height, radius, color, fillMethod) {
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
  }
}