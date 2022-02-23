import { BaseElement, BaseElementOptions } from "./base";

type Point = [number, number];

interface Points<T> {
  points?: Array<T>;
}

export interface LineElementOptions {
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export class LineElement<T> extends BaseElement {
  public strokeStyle;
  public lineWidth;
  public points: Array<T>;

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
}

export class StarightElement extends LineElement<[Point, Point]> {
  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length === 0) return;
    super.draw(ctx);
    ctx.beginPath();
    this.points.forEach(([begin, end]) => {
      ctx.moveTo(...begin);
      ctx.lineTo(...end);
    });
    ctx.stroke();
  }
}

export class BezierLineElement extends LineElement<
  [Point, Point, Point, Point]
> {
  draw(ctx: CanvasRenderingContext2D) {
    if (this.points.length === 0) return;
    super.draw(ctx);
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    this.points.forEach(([begin, c1, c2, end]) => {
      ctx.moveTo(...begin);
      ctx.bezierCurveTo(...c1, ...c2, ...end);
    });
    ctx.stroke();
  }
}
