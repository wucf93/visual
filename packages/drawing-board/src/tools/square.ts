import { DrawPathBase, ToolOptions } from "./base";

export class Square extends DrawPathBase {
    public lineWidth: CanvasRenderingContext2D["lineWidth"] = 1;

    constructor(options?: ToolOptions) {
        super(options);
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const path2d = new Path2D(`M0 0 h ${this.width} v ${this.height} h ${-this.width} Z`);
        ctx.fill(path2d);
        ctx.stroke(path2d);
    }
}

