import { DrawPathBase, ToolOptions, Point } from "./base";
import type { Renderer } from "../renderer";
import fitCurve from "fit-curve";

export class Pen extends DrawPathBase {
  public strokeStyle;
  public lineWidth;
  public bezierPoints?: Array<[Point, Point, Point, Point]>;
  private _pointList: Array<Point> = [];
  private _path2d: Path2D = new Path2D();

  constructor(options: ToolOptions) {
    super();
    this.strokeStyle = options.strokeStyle;
    this.lineWidth = options.lineWidth || 1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (this.bezierPoints) {
      this._path2d = new Path2D(this.bezierPoints.reduce((y, [begin, c1, c2, end]) => y + `M${begin[0]} ${begin[1]} C ${c1[0]} ${c1[1]}, ${c2[0]} ${c2[1]}, ${end[0]} ${end[1]} `, ""));
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(this._path2d);
  }

  on(type: "DOWN" | 'UP' | 'MOVE', renderer: Renderer, e: MouseEvent) {
    const { button, offsetX, offsetY } = e;
    if (type === 'DOWN' && button === 0) {
      this.x = offsetX;
      this.y = offsetY;
      this._pointList.push([0, 0]);
    }

    if (type === "MOVE" && button === 0) {
      const x = offsetX - this.x;
      const y = offsetY - this.y;
      this._pointList.push([x, y]);
      this._path2d.lineTo(x, y);
      this.render(renderer.ctx);
    }

    if (type === "UP" && button === 0) {
      const x = offsetX - this.x;
      const y = offsetY - this.y;
      this._pointList.push([x, y]);
      this.bezierPoints = fitCurve<Point>(this._pointList, 2);
      renderer.render();
    }
  }
}
