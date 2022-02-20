import type { Renderer } from "../renderer";

export type Point = [number, number];

export interface ToolOptions {
  fillStyle?: CanvasRenderingContext2D["fillStyle"];
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export interface PathOptions {
  start?: Point;
  end?: Point;
}

export abstract class Path {
  public path2d = new Path2D();
  public start;
  public end;

  static _uid = 0;

  constructor(options: PathOptions) {
    this.start = options.start;
    this.end = options.end;
    Path._uid++;
    this.init();
  }

  abstract init(): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}

export class ToolBase {
  protected renderer: Renderer | null = null;

  enabled(renderer: Renderer) {
    this.renderer = renderer;
  }

  disabled() {
    this.renderer = null;
  }
}

export abstract class DrawPathBase {
  public x = 0;
  public y = 0;
  public width = 0;
  public height = 0;
  public scale = { x: 1, y: 1 };
  public _uid;

  public abstract path2d: Path2D;
  static _uid = 0;

  constructor() {
    this._uid = DrawPathBase._uid++;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.fill(this.path2d);
    ctx.stroke(this.path2d);
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
      this.height = offsetY - this.y < 10 ? 10 : offsetY - this.x;
      renderer.render();
    }
  }
}