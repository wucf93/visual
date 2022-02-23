import { ToolBase, ToolEvent } from "./base";
import { StarightElement, LineElementOptions } from "../elements";

export class StarightTool implements ToolBase {
  private starightElement: StarightElement | null = null;
  public strokeStyle;
  public lineWidth;

  constructor(options?: LineElementOptions) {
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
  }

  onDragStart({ renderer, offsetX, offsetY }: ToolEvent) {
    this.starightElement = new StarightElement({
      strokeStyle: this.strokeStyle,
      lineWidth: this.lineWidth,
      x: offsetX,
      y: offsetY,
      points: [
        [
          [offsetX, offsetY],
          [offsetX, offsetY],
        ],
      ],
    });
    renderer.exec("add", this.starightElement);
  }

  onDragMove({ renderer, offsetX, offsetY }: ToolEvent) {
    if (this.starightElement) {
      this.starightElement.width = Math.abs(offsetX - this.starightElement.x);
      this.starightElement.height = Math.abs(offsetY - this.starightElement.y);
      this.starightElement.points = [
        [
          [this.starightElement.x, this.starightElement.y],
          [offsetX, offsetY],
        ],
      ];
      renderer.render();
    }
  }

  onDragEnd({ renderer, offsetX, offsetY }: ToolEvent) {
    if (this.starightElement) {
      this.starightElement.width === 0 &&
        this.starightElement.height === 0 &&
        renderer.removeElement(this.starightElement);
      offsetX <= this.starightElement.x && (this.starightElement.x = offsetX);
      offsetY <= this.starightElement.y && (this.starightElement.y = offsetY);
      this.starightElement = null;
    }
  }
}
