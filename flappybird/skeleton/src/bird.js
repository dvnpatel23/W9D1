export default class Bird {
  constructor(dimensions) {
    this.dimensions = dimensions;
    this.velocity = 0;
    this.y = dimensions["height"] / 2;
    this.x = dimensions["width"] / 3;
  }

  drawBird(ctx) {
    ctx.fillStyle = "yellow";
    ctx.fillRect(this.x, this.y, 40, 30);
  }

  animate(ctx) {
    this.drawBird(ctx);
  }
}