import { ToolBase, Point, ToolEvent } from "./base";
import { BezierLineElement, LineElementOptions } from "../elements";
import fitCurve from "fit-curve";
export class PenTool implements ToolBase {
  public strokeStyle;
  public lineWidth;
  private points: Array<Point> = [];

  constructor(options?: LineElementOptions) {
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
  }

  onDragStart({ renderer, offsetX, offsetY }: ToolEvent) {
    renderer.ctx.save();
    renderer.ctx.beginPath();
    renderer.ctx.moveTo(offsetX, offsetY);
    this.strokeStyle && (renderer.ctx.strokeStyle = this.strokeStyle);
    this.lineWidth && (renderer.ctx.lineWidth = this.lineWidth);
    this.points = [[offsetX, offsetY]];
  }

  onDragMove({ renderer, offsetX, offsetY }: ToolEvent) {
    this.points.push([offsetX, offsetY]);
    renderer.ctx.lineTo(offsetX, offsetY);
    renderer.ctx.stroke();
  }

  onDragEnd({ renderer }: ToolEvent) {
    renderer.ctx.restore();
    if (this.points.length < 2) return;
    const { x1, y1, x2, y2 } = this.points.reduce(
      (r, [x, y]) => ({
        x1: x <= r.x1 ? x : r.x1,
        x2: x >= r.x2 ? x : r.x2,
        y1: y <= r.y1 ? y : r.y1,
        y2: y >= r.y2 ? y : r.y2,
      }),
      {
        x1: this.points[0][0],
        x2: this.points[0][0],
        y1: this.points[0][1],
        y2: this.points[0][1],
      }
    );
    const bezierLineElement = new BezierLineElement({
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
      x: x1,
      y: y1,
      width: x2 - x1,
      height: y2 - y1,
      points: fitCurve<Point>(this.points, 2),
    });
    renderer.exec("add", bezierLineElement);
    renderer.render();
  }
}
