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

let _uid = 0;
export function createDrawPath<T extends Record<string | number, any>>(onRender: (ctx: CanvasRenderingContext2D) => void, options?: T) {
  console.log(options);
  return {
    ...options,
    _uid: _uid + 1,
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    scale: { x: 1, y: 1 },
    render(ctx: CanvasRenderingContext2D) {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.scale.x, this.scale.y);
      ctx.moveTo(0, 0);
      onRender(ctx);
      ctx.restore();
    }
  }
}
export type DrawPath = ReturnType<typeof createDrawPath>;

export class Renderer {
  public view;
  public ctx;
  private isRender: boolean = false;
  private drawMap: Map<number, DrawPath> = new Map();
  private drawList: Set<DrawPath> = new Set();

  constructor(options: RenderOptions) {
    const { view, ctx } = createView(options);
    this.view = view;
    this.ctx = ctx;
  }

  exec(type: "add", drapPath: DrawPath): void;
  exec(type: "add", params: DrawPath) {
    if (type === "add") {
      this.drawMap.set(params._uid, params);
      this.drawList.add(params);
    }
  }

  render() {
    if (this.isRender) return;
    window.requestAnimationFrame(() => {
      this.ctx.clearRect(0, 0, this.view.width, this.view.height);
      initStage(this.ctx, this.view);
      this.drawList.forEach(drap => drap.render(this.ctx))
      this.isRender = false;
    })
  }

  getDrawPath(id?: number) {
    return id === undefined ? id : this.drawMap.get(id);
  }

  resize(width: number, height: number) {
    this.view.width = width;
    this.view.height = height;
    this.render();
  }
}
