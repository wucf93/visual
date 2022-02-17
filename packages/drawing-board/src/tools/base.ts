import type { Renderer } from "../renderer";

export type Point = [number, number];

export interface PathOptions {
  start?: Point;
  end?: Point;
}

export abstract class Path {
  public path2d = new Path2D();
  public start;
  public end;

  static _uid = 0;

  constructor(options: PathOptions) {
    this.start = options.start;
    this.end = options.end;
    Path._uid++;
    this.init();
  }

  abstract init(): void;
  abstract render(ctx: CanvasRenderingContext2D): void;
}

export class ToolBase {
  protected renderer: Renderer | null = null;

  enabled(renderer: Renderer) {
    this.renderer = renderer;
  }

  disabled() {
    this.renderer = null;
  }
}

export type Class<T extends ToolBase> = new (renderer: Renderer) => T;

export class ToolApplication {
  private renderer;
  private tools = new Set<ToolBase>();

  constructor(renderer: Renderer) {
    this.renderer = renderer;
  }

  switchTool(tool: ToolBase) {
    Array.from(this.tools).forEach((toolItem) => toolItem.disabled());
    !this.tools.has(tool) && this.tools.add(tool);
    tool.enabled(this.renderer);
  }
}
