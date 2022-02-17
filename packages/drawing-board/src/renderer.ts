import type { Path } from "./tools/base";
export interface RenderOptions {
  /**
   * 元素宽度
   */
  width: number;
  /**
   * 元素高度
   */
  height: number;
}

function createView({ width, height }: RenderOptions) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  if (!ctx) throw new Error("getContext(2d) 获取失败，请检查方法调用时机");
  return { view: canvas, ctx };
}

function initStage(ctx: CanvasRenderingContext2D, dom: HTMLCanvasElement) {
  const gutter = 20;
  ctx.fillStyle = "rgba(0,0,0,0.6)";
  for (let i = gutter / 2; i < dom.width; i = i + gutter) {
    for (let j = gutter / 2; j < dom.height; j = j + gutter) {
      ctx.beginPath();
      ctx.arc(i, j, 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export class Renderer {
  public view;
  public sections: Array<Path>;
  public ctx;

  constructor(options: RenderOptions) {
    const { view, ctx } = createView(options);
    this.view = view;
    this.ctx = ctx;
    this.sections = [];
  }

  render() {
    this.ctx.clearRect(0, 0, this.view.width, this.view.height);
    initStage(this.ctx, this.view);
    this.sections.forEach((section) => section.render(this.ctx));
  }

  resize(width: number, height: number) {
    this.view.width = width;
    this.view.height = height;
    this.render();
  }
}
