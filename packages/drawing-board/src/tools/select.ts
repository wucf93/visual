import { ToolBase, ToolEvent } from "./base";
import { LineElement, CloseElement } from "../elements";

export class SelectTool implements ToolBase {
  onMouseDown({ renderer, offsetX, offsetY }: ToolEvent) {
    const element = renderer.findElement((value) => value.isPointIn(renderer.ctx, offsetX, offsetY));
    if (element) {
      console.log(element);
      // renderer.exec("remove", element);
      // renderer.render();
    }
  }
}
