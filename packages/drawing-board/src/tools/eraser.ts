import { ToolBase, ToolEvent } from "./base";
import { LineElement } from "../elements/line";

export class EraserTool implements ToolBase {
  onClick({ renderer, offsetX, offsetY }: ToolEvent) {
    const element = renderer.findElement(
      (value) => value instanceof LineElement && value.isPointIn(renderer.ctx, offsetX, offsetY)
    );

    if (element) {
      renderer.exec("remove", element);
      renderer.render();
    }
  }
}
