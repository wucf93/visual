import { VisualNode } from "./node";
import { VisualElement } from "./element";

export interface RenderOptions {
  width?: number;
  height?: number;
}

export class Renderer extends VisualNode {
  readonly view = document.createElement("canvas");
  readonly ctx = this.view.getContext("2d");

  constructor(options?: RenderOptions) {
    super();
    this.view.width = options?.width || 500;
    this.view.height = options?.height || 500;
    if (!this.ctx) throw new Error("getContext(2d) 获取失败，请检查方法调用时机");
  }

  createElement() {
    return new VisualElement();
  }
}
