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

export interface RenderProps {
  view: HTMLCanvasElement;
  resize: (width: number, height: number) => void;
}

function createView({ width, height }: RenderOptions) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
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

export function createRenderer(options: RenderOptions): RenderProps {
  const view = createView(options);

  return {
    view,
    resize: function (width: number, height: number) {
      this.view.width = width;
      this.view.height = height;
    },
  };
}
