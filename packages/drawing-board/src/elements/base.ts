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
    ctx.save();
    this.draw(ctx);
    ctx.restore();
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
  abstract isPointIn(ctx: CanvasRenderingContext2D, x: number, y: number): boolean;
}
