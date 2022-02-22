import { ToolBase, Point } from "./base";
import { Renderer, createDrawPath } from "../renderer";

export interface LineToolOptions {
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export class LineTool implements ToolBase {
  public strokeStyle;
  public lineWidth;
  private drawId?: number;

  constructor(options?: LineToolOptions) {
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
  }

  onDown(renderer: Renderer, [x, y]: Point) {
    const drapPath = createDrawPath<LineToolOptions>(
      (ctx) => {
        ctx.strokeStyle = drapPath.strokeStyle;
        ctx.lineWidth = drapPath.lineWidth;
        ctx.lineTo(drapPath.width, drapPath.height);
        ctx.stroke();
      }, { strokeStyle: this.strokeStyle, lineWidth: this.lineWidth }
    )
    drapPath.x = x;
    drapPath.y = y;
    this.drawId = drapPath._uid;
    renderer.exec("add", drapPath)
  }

  onMove(renderer: Renderer, [x, y]: Point) {
    let drapPath;
    if (this.drawId && (drapPath = renderer.getDrawPath(this.drawId))) {
      drapPath.width = x - drapPath.x;
      drapPath.height = y - drapPath.y;
      renderer.render();
    }
  }

  onUp(renderer:Renderer,[x, y]: Point){
    let drapPath;
    if (this.drawId && (drapPath = renderer.getDrawPath(this.drawId))) {
      drapPath.width = x - drapPath.x;
      drapPath.height = y - drapPath.y;
      this.drawId = undefined;
      renderer.render();
    }
  }

}
