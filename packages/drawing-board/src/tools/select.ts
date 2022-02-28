import { ToolBase, ToolEvent } from "./base";

export class SelectTool implements ToolBase {
  onMouseDown({ renderer, offsetX, offsetY }: ToolEvent) {
    const element = renderer.findElement((value) => value.isPointIn(renderer.ctx, offsetX, offsetY));
    if (element) {
      console.log(element);
      element.checked = true;
      // renderer.exec("remove", element);
      // renderer.render();
    }
  }
}
