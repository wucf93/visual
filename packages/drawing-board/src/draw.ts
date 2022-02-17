import { Renderer, RenderOptions } from "./renderer";
import { createTicker } from "./ticker";
import { ToolApplication } from "./tools";

function transformOptions(options: DrawOptions): Required<DrawOptions> {
  return { width: 256, height: 256, ...options };
}

type DrawOptions = Partial<RenderOptions>;

export class DrawApplication {
  public renderer;
  public view;
  public tool;

  constructor(options: Required<DrawOptions>) {
    this.renderer = new Renderer(options);
    this.view = this.renderer.view;
    this.tool = new ToolApplication(this.renderer);
    this.renderer.render();
  }

  addTicker(cb: () => void) {
    createTicker(cb);
  }
}

export function createDraw(options: DrawOptions) {
  return new DrawApplication(transformOptions(options));
}
