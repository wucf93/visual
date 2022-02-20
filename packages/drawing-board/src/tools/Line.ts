import { ToolBase, Path, Point, PathOptions } from "./base";
import { Renderer } from "../renderer";

interface LineToolOption  {
  strokeStyle: CanvasRenderingContext2D["fillStyle"];
  lineWidth: CanvasRenderingContext2D["lineWidth"];
}

export class LinePath extends Path {
  public strokeStyle;
  public lineWidth;

  constructor(options: PathOptions & LineToolOption) {
    super(options);
    this.strokeStyle = options.strokeStyle;
    this.lineWidth = options.lineWidth;
  }

  init() {
    if (this.start && this.end) {
      this.path2d = new Path2D();
      this.path2d.moveTo(this.start[0], this.start[1]);
      this.path2d.lineTo(this.end[0], this.end[1]);
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.save();
    ctx.strokeStyle = this.strokeStyle;
    ctx.lineWidth = this.lineWidth;
    this.init();
    ctx.stroke(this.path2d);
    ctx.restore();
  }
}

export class LineTool extends ToolBase {
  private currentPath?: LinePath;
  public strokeStyle;
  public lineWidth;

  constructor(options?: Partial<LineToolOption>) {
    super();
    this.strokeStyle = options?.strokeStyle || "#333";
    this.lineWidth = options?.lineWidth || 1;
  }

  private _downHander = (e: MouseEvent) => {
    if (e.button !== 0 || !this.renderer) return;
    const point: Point = [e.offsetX, e.offsetY];
    this.currentPath = new LinePath({
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
    });
    this.currentPath.start = point;
    this.renderer.sections.push(this.currentPath);
  };

  private _upHander = (e: MouseEvent) => {
    if (this.currentPath && e.button === 0 && this.renderer) {
      const point: Point = [e.offsetX, e.offsetY];
      this.currentPath.end = point;
      this.renderer.render();
      this.currentPath = undefined;
    }
  };

  private _moveHander = (e: MouseEvent) => {
    if (!this.currentPath || !this.renderer) return;
    const point: Point = [e.offsetX, e.offsetY];
    this.currentPath.end = point;
    this.renderer.render();
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
      this.renderer.view.removeEventListener("mousedown", this._downHander);
      this.renderer.view.removeEventListener("mousemove", this._moveHander);
      this.renderer.view.removeEventListener("mouseup", this._upHander);
      this.renderer.view.removeEventListener("mouseout", this._upHander);
    }
    super.disabled();
  }
}
