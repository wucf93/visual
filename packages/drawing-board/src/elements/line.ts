import { BaseElement, BaseElementOptions } from "./base";

type Point = [number, number];

interface Points<T> {
  points?: Array<T>;
}

export interface LineElementOptions {
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export abstract class LineElement<T> extends BaseElement {
  public strokeStyle;
  public lineWidth;
  public points: Array<T>;
  protected abstract get path2d(): Path2D;

  constructor(options?: LineElementOptions & BaseElementOptions & Points<T>) {
    super(options);
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
    this.points = options?.points || [];
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.strokeStyle && (ctx.strokeStyle = this.strokeStyle);
    this.lineWidth && (ctx.lineWidth = this.lineWidth);
  }

  isPointIn(ctx: CanvasRenderingContext2D, x: number, y: number) {
    ctx.save();
    this.lineWidth && (ctx.lineWidth = this.lineWidth);
    const status = ctx.isPointInStroke(this.path2d, x, y);
    ctx.restore();
    return status;
  }
}

export class StarightElement extends LineElement<[Point, Point]> {
  get path2d(): Path2D {
    return new Path2D(this.points.map(([begin, end]) => `M ${begin.join(" ")} L ${end.join(" ")}`).join(" "));
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length === 0) return;
    super.draw(ctx);
    ctx.beginPath();
    ctx.stroke(this.path2d);
  }
}

export class BezierLineElement extends LineElement<[Point, Point, Point, Point]> {
  get path2d(): Path2D {
    return new Path2D(
      this.points
        .map(([begin, c1, c2, end]) => `M ${begin.join(" ")} C ${c1.join(" ")} , ${c2.join(" ")} , ${end.join(" ")}`)
        .join(" ")
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length === 0) return;
    super.draw(ctx);
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(this.path2d);
  }
}
