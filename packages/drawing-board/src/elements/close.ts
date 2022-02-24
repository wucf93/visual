import { BaseElement, BaseElementOptions } from "./base";

export interface CloseElementOptions {
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  fillStyle?: CanvasRenderingContext2D["fillStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export abstract class CloseElement extends BaseElement {
  public strokeStyle;
  public lineWidth;
  public fillStyle;
  protected abstract get path2d(): Path2D;

  constructor(options: CloseElementOptions & BaseElementOptions) {
    super(options);
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
    this.fillStyle = options?.fillStyle;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.strokeStyle && (ctx.strokeStyle = this.strokeStyle);
    this.lineWidth && (ctx.lineWidth = this.lineWidth);
    this.fillStyle && (ctx.fillStyle = this.fillStyle);
  }

  isPointIn(ctx: CanvasRenderingContext2D, x: number, y: number) {
    return ctx.isPointInPath(this.path2d, x, y);
  }
}

export class RectElement extends CloseElement {
  protected get path2d() {
    return new Path2D(`M${this.x} ${this.y} h ${this.width} v ${this.height} h ${-this.width} Z`);
  }

  draw(ctx: CanvasRenderingContext2D) {
    super.draw(ctx);
    ctx.fill(this.path2d);
    ctx.stroke(this.path2d);
  }
}
