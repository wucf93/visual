import { ToolBase, ToolEvent } from "./base";
import { CloseElement, CloseElementOptions } from "../elements";

export class CloseTool implements ToolBase {
  private closeElement: CloseElement | null = null;
  public lineWidth;
  public strokeStyle;
  public fillStyle;
  public closeType;

  constructor(options: CloseElementOptions) {
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
    this.fillStyle = options?.fillStyle;
    this.closeType = options.closeType;
  }

  onDragStart({ renderer, offsetX, offsetY }: ToolEvent) {
    this.closeElement = new CloseElement({
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
      fillStyle: this.fillStyle,
      closeType: this.closeType,
      x: offsetX,
      y: offsetY,
    });
    renderer.exec("add", this.closeElement);
  }

  onDragMove({ renderer, offsetX, offsetY }: ToolEvent) {
    if (this.closeElement) {
      this.closeElement.width =
        offsetX - this.closeElement.x < 10 ? 10 : offsetX - this.closeElement.x;
      this.closeElement.height =
        offsetY - this.closeElement.y < 10 ? 10 : offsetY - this.closeElement.y;
      renderer.render();
    }
  }

  onDragEnd({ renderer }: ToolEvent) {
    if (this.closeElement) {
      this.closeElement.width === 0 &&
        this.closeElement.height === 0 &&
        renderer.removeElement(this.closeElement);
      this.closeElement = null;
    }
  }
}
