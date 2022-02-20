import { ToolBase, Path, Point, PathOptions } from "./base";
import { Renderer } from "../renderer";
import fitCurve from "fit-curve";

interface PenToolOption {
  strokeStyle: CanvasRenderingContext2D["fillStyle"];
  lineWidth: CanvasRenderingContext2D["lineWidth"];
}

interface PenPathOptions extends PathOptions {
  bezierPoints?: BezierPoints;
}

function renderBezierCurve(path2d: Path2D, bezierPoints: BezierPoints) {
  bezierPoints.forEach(([begin, c1, c2, end]) => {
    path2d.moveTo(begin[0], begin[1]);
    path2d.bezierCurveTo(c1[0], c1[1], c2[0], c2[1], end[0], end[1]);
  });
}

export class PenPath extends Path {
  public strokeStyle;
  public lineWidth;
  public bezierPoints;

  constructor(options: PenPathOptions & PenToolOption) {
    super(options);
    this.strokeStyle = options.strokeStyle;
    this.lineWidth = options.lineWidth;
    this.bezierPoints = options.bezierPoints;
  }

  init() {
    this.bezierPoints && renderBezierCurve(this.path2d, this.bezierPoints);
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke(this.path2d);
    ctx.restore();
  }
}

export class PenTool extends ToolBase {
  private currentPath?: PenPath;
  private points: Array<Point> = [];
  public strokeStyle;
  public lineWidth;

  constructor(options?: Partial<PenToolOption>) {
    super();
    this.strokeStyle = options?.strokeStyle || "#333";
    this.lineWidth = options?.lineWidth || 2;
  }

  private _downHander = (e: MouseEvent) => {
    if (e.button !== 0 || !this.renderer) return;
    const point: Point = [e.offsetX, e.offsetY];
    this.currentPath = new PenPath({
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
    });
    this.renderer.sections.push(this.currentPath);
    this.currentPath.start = point;
    this.currentPath.path2d.moveTo(point[0], point[1]);
    this.points = [];
  };

  private _upHander = (e: MouseEvent) => {
    if (this.currentPath && e.button === 0 && this.renderer) {
      const path2d = new Path2D();
      const bezierPoints = fitCurve<Point>(this.points, 2);
      renderBezierCurve(path2d, bezierPoints);
      this.currentPath.path2d = path2d;
      this.currentPath = undefined;
      this.renderer.render();
    }
  };

  private _moveHander = (e: MouseEvent) => {
    if (!this.currentPath || !this.renderer) return;
    const point: Point = [e.offsetX, e.offsetY];
    this.points.push(point);
    this.currentPath.path2d.lineTo(point[0], point[1]);
    this.currentPath.render(this.renderer.ctx);
  };

  public enabled(renderer: Renderer) {
    super.enabled(renderer);
    renderer.view.addEventListener("mousedown", this._downHander);
    renderer.view.addEventListener("mousemove", this._moveHander);
    renderer.view.addEventListener("mouseup", this._upHander);
    renderer.view.addEventListener("mouseout", this._upHander);
  }

  public disabled() {
    if (this.renderer) {
      console.log("remove");
      this.renderer.view.removeEventListener("mousedown", this._downHander);
      this.renderer.view.removeEventListener("mousemove", this._moveHander);
      this.renderer.view.removeEventListener("mouseup", this._upHander);
      this.renderer.view.removeEventListener("mouseout", this._upHander);
    }
    super.disabled();
  }
}
