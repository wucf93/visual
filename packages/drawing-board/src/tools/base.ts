import type { Renderer } from "../renderer";

export type Point = [number, number];
export interface ToolOptions {
  fillStyle?: CanvasRenderingContext2D["fillStyle"];
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export abstract class DrawPathBase {
  public x = 0;
  public y = 0;
  public width = 0;
  public height = 0;
  public scale = { x: 1, y: 1 };
  public _uid;
  public fillStyle?;
  public strokeStyle?;
  public lineWidth?;

  static _uid = 0;

  constructor(options?: ToolOptions) {
    this._uid = DrawPathBase._uid++;
    this.fillStyle = options?.fillStyle;
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.moveTo(0, 0);
    this.fillStyle && (ctx.fillStyle = this.fillStyle);
    this.strokeStyle && (ctx.strokeStyle = this.strokeStyle);
    this.lineWidth && (ctx.lineWidth = this.lineWidth);
    this.draw(ctx);
    ctx.restore();
  }

  on(type: "DOWN" | 'UP' | 'MOVE' | 'OUT', renderer: Renderer, e: MouseEvent) {
    const { button, offsetX, offsetY } = e;
    if (type === 'DOWN' && button === 0) {
      this.x = offsetX;
      this.y = offsetY;
      renderer.render();
    }

    if (type === "MOVE" && button === 0) {
      this.width = offsetX - this.x < 10 ? 10 : offsetX - this.x;
      this.height = offsetY - this.y < 10 ? 10 : offsetY - this.y;
      renderer.render();
    }
  }
}