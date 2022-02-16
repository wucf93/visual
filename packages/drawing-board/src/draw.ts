import { createRenderer, RenderOptions, RenderProps } from "./renderer";
import { PenTools } from "./tools/pen";
import { Path } from "./tools/base";

function transformOptions(options: DrawOptions): Required<DrawOptions> {
  return { width: 256, height: 256, ...options };
}

function initTools(view: HTMLCanvasElement) {
  const pathHistory: Path[] = [];
  [PenTools].forEach((Tool) => {
    const instance = new Tool(view);
    instance.onPathCreate((path) => pathHistory.push(path));
  });
  return pathHistory;
}

type DrawOptions = Partial<RenderOptions>;

export class DrawApplication {
  public renderer: RenderProps;
  public view: HTMLCanvasElement;

  constructor(options: Required<DrawOptions>) {
    this.renderer = createRenderer(options);
    this.view = this.renderer.view;
  }
}

function createTicker(cb: () => void) {
  (function step(cb: () => void) {
    window.requestAnimationFrame(() => {
      cb();
      step(cb);
    });
  })(cb);
}

export function createDraw(options: DrawOptions) {
  const app = new DrawApplication(transformOptions(options));
  const ctx = app.view.getContext("2d");
  if (!ctx) {
    throw new Error("cant not find cancas getContext methods");
  }

  // 初始化工具
  const drawHistory = initTools(app.view);
  // 画图
  createTicker(() => {
    ctx.clearRect(0, 0, app.view.width, app.view.height);
    drawHistory.forEach((path) => path.render(ctx));
  });

  return app;
}
