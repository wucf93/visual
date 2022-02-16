import { ToolsBase, Path } from "./base";

type Point = [number, number];

export class PenPath extends Path {
  public fillStyle: CanvasRenderingContext2D["fillStyle"] = "#333";
  public lineWidth: CanvasRenderingContext2D["lineWidth"] = 2;
  public points: Array<Point> = [];

  constructor() {
    super("stroke");
  }

  setColor(fillStyle: CanvasRenderingContext2D["fillStyle"]) {
    this.fillStyle = fillStyle;
  }

  setLineWidth(width: CanvasRenderingContext2D["lineWidth"]) {
    this.lineWidth = width;
  }

  addPoint(point: Point) {
    this.points.push(point);
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.fillStyle = this.fillStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    super.render(ctx);
    ctx.restore();
  }
}

export class PenTools extends ToolsBase {
  public currentPath?: PenPath;
  private view: HTMLCanvasElement;

  constructor(view: HTMLCanvasElement) {
    super();
    this.view = view;
    this._init();
  }

  private _downHander(point: Point) {
    this.currentPath = new PenPath();
    this.cb?.(this.currentPath);
    this.currentPath.setStart(point);
    this.currentPath.path2d.moveTo(point[0], point[1]);
    this.currentPath.addPoint(point);
  }

  private _upHander() {
    if (this.currentPath) {
      const { points } = this.currentPath;
      // 使用二次贝塞尔曲线抗锯齿
      if (points.length >= 3) {
        const path2d = new Path2D();
        let begin = points[0];
        let index = 0;

        while (index < points.length - 1) {
          const control = points[index];
          const end: Point = points[index + 1]
            ? [
                (control[0] + points[index + 1][0]) / 2,
                (control[1] + points[index + 1][1]) / 2,
              ]
            : control;

          path2d.moveTo(begin[0], begin[1]);
          path2d.quadraticCurveTo(control[0], control[1], end[0], end[1]);
          begin = end;
          index++;
        }

        this.currentPath.path2d = path2d;
      }
      this.currentPath = undefined;
    }
  }

  private _moveHander(point: Point) {
    if (!this.currentPath) return;
    this.currentPath.addPoint(point);
    this.currentPath.path2d.lineTo(point[0], point[1]);
  }

  _init() {
    this.view.addEventListener(
      "mousedown",
      ({ offsetX, offsetY, button }) =>
        button === 0 && this._downHander([offsetX, offsetY])
    );

    this.view.addEventListener(
      "mousemove",
      ({ offsetX, offsetY }) =>
        this.currentPath && this._moveHander([offsetX, offsetY])
    );

    this.view.addEventListener(
      "mouseup",
      ({ button }) => button === 0 && this._upHander()
    );

    this.view.addEventListener(
      "mouseout",
      ({ button }) => button === 0 && this._upHander()
    );
  }
}
