import { BaseElement, BaseElementOptions } from "./base";

export interface CloseElementOptions {
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  fillStyle?: CanvasRenderingContext2D["fillStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
  closeType: keyof typeof CloseType;
}

const CloseType = {
  RECT: (
    ctx: CanvasRenderingContext2D,
    { x, y, width, height }: CloseElement
  ) => {
    const path2d = new Path2D(
      `M${x} ${y} h ${width} v ${height} h ${-width} Z`
    );
    ctx.fill(path2d);
    ctx.stroke(path2d);
  },
};

export class CloseElement extends BaseElement {
  public strokeStyle;
  public lineWidth;
  public fillStyle;
  public closeType;

  constructor(options: CloseElementOptions & BaseElementOptions) {
    super(options);
    this.strokeStyle = options?.strokeStyle;
    this.lineWidth = options?.lineWidth;
    this.fillStyle = options?.fillStyle;
    this.closeType = options.closeType;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.strokeStyle && (ctx.strokeStyle = this.strokeStyle);
    this.lineWidth && (ctx.lineWidth = this.lineWidth);
    this.fillStyle && (ctx.fillStyle = this.fillStyle);
    CloseType[this.closeType]?.(ctx, this);
  }
}
