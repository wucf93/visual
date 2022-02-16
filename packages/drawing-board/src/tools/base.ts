export class Path {
  public start: [number, number];
  public end: [number, number];
  public path2d = new Path2D();
  public type: "stroke" | "fill";

  static _uid = 0;

  constructor(type: "stroke" | "fill") {
    this.start = [0, 0];
    this.end = [0, 0];
    this.type = type;
    Path._uid++;
  }

  setStart(point: [number, number]) {
    this.start = point;
  }

  setEnd(point: [number, number]) {
    this.end = point;
  }

  render(ctx: CanvasRenderingContext2D) {
    ctx[this.type]?.(this.path2d);
  }
}

export class ToolsBase {
  public cb?: (path: Path) => void;

  onPathCreate(cb: (path: Path) => void) {
    this.cb = cb;
  }
}

export interface ToolsType extends ToolsBase {
  new (view: HTMLCanvasElement): unknown;
}
