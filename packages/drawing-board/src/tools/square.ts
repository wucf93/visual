import type { Renderer } from "../renderer";
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

    on(type: "DOWN" | 'UP' | 'MOVE' | 'OUT', renderer: Renderer, e: MouseEvent) {
        const { button, offsetX, offsetY } = e;
        if (type === 'DOWN' && button === 0) {
            this.x = offsetX;
            this.y = offsetY;
            renderer.render();
        }

        if (type === "MOVE" && button === 0) {
            this.width = offsetX - this.x < 10 ? 10 : offsetX - this.x;
            this.height = offsetY - this.y < 10 ? 10 : offsetY - this.y;
            renderer.render();
        }
    }
}

