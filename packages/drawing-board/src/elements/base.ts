export interface BaseElementOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}
export abstract class BaseElement {
  public uid: number;
  public x;
  public y;
  public width;
  public height;
  public checked = false;

  static U_ID = 1;

  constructor(options?: BaseElementOptions) {
    this.uid = BaseElement.U_ID++;
    this.x = options?.x || 0;
    this.y = options?.y || 0;
    this.width = options?.width || 0;
    this.height = options?.width || 0;
  }

  render(ctx: CanvasRenderingContext2D) {
    if (this.width === 0 && this.height === 0) return;
    // 画出控制点
    ctx.save();
    this.draw(ctx);
    ctx.restore();
    this.checked && this.drwwController(ctx);
  }

  // 画控制点
  drwwController(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.strokeStyle = "blue";
    ctx.rect(this.x, this.y, this.width, this.height);
    ctx.stroke();
    ctx.restore();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointIn(ctx: CanvasRenderingContext2D, x: number, y: number): boolean;
}
