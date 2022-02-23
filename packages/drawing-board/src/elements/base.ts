export interface BaseElementOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export abstract class BaseElement {
  public _uid: number;
  public x;
  public y;
  public width;
  public height;

  static _uid = 1;

  constructor(options?: BaseElementOptions) {
    this._uid = BaseElement._uid++;
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
  abstract get path2d(): Path2D;
}
