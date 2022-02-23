import type { Renderer } from "../renderer";
import { ToolBase } from "./base";

export type Class<T> = new (...arg: any[]) => T;

export class ToolApplication {
  private renderer;
  public currentTool?: ToolBase;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    this.initEvent();
  }

  switchTool<T extends Class<ToolBase>>(
    Tool: T,
    ...rest: ConstructorParameters<T>
  ) {
    this.currentTool = new Tool(...rest);
  }

  initEvent() {
    this.renderer.view.addEventListener("click", (e) =>
      this.currentTool?.onClick?.(Object.assign(e, { renderer: this.renderer }))
    );

    this.renderer.view.addEventListener("mousedown", (e) => {
      const event = Object.assign(e, { renderer: this.renderer });
      this.currentTool?.onMouseDown?.(event);
      e.button === 0 && this.currentTool?.onDragStart?.(event);
    });

    this.renderer.view.addEventListener("mousemove", (e) => {
      const event = Object.assign(e, { renderer: this.renderer });
      this.currentTool?.onMouseMove?.(event);
      e.button === 0 &&
        e.buttons === 1 &&
        this.currentTool?.onDragMove?.(event);
    });

    this.renderer.view.addEventListener("mouseup", (e) => {
      const event = Object.assign(e, { renderer: this.renderer });
      this.currentTool?.onMouseUp?.(event);
      e.button === 0 && this.currentTool?.onDragEnd?.(event);
    });
  }
}

export * from "./pen";
export * from './close';
export * from "./staright";
export * from './eraser';
