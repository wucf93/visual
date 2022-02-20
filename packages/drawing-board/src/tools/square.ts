import { DrawPathBase, ToolOptions } from "./base";

export class Square extends DrawPathBase {
    public strokeStyle;
    public fillStyle;
    public lineWidth: CanvasRenderingContext2D["lineWidth"] = 1;

    constructor(options: ToolOptions) {
        super();
        this.width = 50;
        this.height = 50;
        this.strokeStyle = options.strokeStyle;
        this.fillStyle = options.fillStyle;
    }

    get path2d() {
        return new Path2D(`M0 0 h ${this.width} v ${this.width} h -${this.width} Z`);
    }
}

