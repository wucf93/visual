import { DrawPathBase, ToolOptions } from "./base";
import type { Renderer } from "../renderer";

export class Line extends DrawPathBase {
  public strokeStyle;
  public lineWidth;

  constructor(options: ToolOptions) {
    super();
    this.strokeStyle = options.strokeStyle;
    this.lineWidth = options.lineWidth || 1;
  }

  get path2d() {
    return new Path2D(`M0 0 l ${this.width} ${this.height}`);
  }

  on(type: "DOWN" | 'UP' | 'MOVE', renderer: Renderer, e: MouseEvent) {
    const { button, offsetX, offsetY } = e;
    if (type === 'DOWN' && button === 0) {
      this.x = offsetX;
      this.y = offsetY;
      renderer.render();
    }

    if (type === "MOVE" && button === 0) {
      this.width = offsetX - this.x;
      this.height = offsetY - this.y;
      renderer.render();
    }
  }
}

