import { ToolBase, ToolEvent } from "./base";
import { LineElement } from "../elements/line";

export class EraserTool implements ToolBase {
  onClick({ renderer, pageX, pageY }: ToolEvent) {
    const element = renderer.findElement((value) => {
      if (!(value instanceof LineElement)) return false;
      renderer.ctx.save();
      value.lineWidth && (renderer.ctx.lineWidth = value.lineWidth);
      const status = renderer.ctx.isPointInStroke(value.path2d, pageX, pageY);
      renderer.ctx.restore();
      return status;
    });

    if (element) {
      renderer.exec("remove", element);
      renderer.render();
    }
  }
}
