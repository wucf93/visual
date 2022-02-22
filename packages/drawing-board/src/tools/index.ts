import type { Renderer } from "../renderer";
import { ToolBase } from "./base";

export type Class<T> = new (...arg: any[]) => T;

export class ToolApplication {
    private renderer;
    public currentTool?: ToolBase;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.initEvent();
    }

    switchTool<T extends Class<ToolBase>>(Tool: T, ...rest: ConstructorParameters<T>) {
        this.currentTool = new Tool(...rest);
    }

    initEvent() {
        this.renderer.view.addEventListener("mousedown", (e) => {
            if (e.button === 0) {
                this.currentTool?.onDown?.(this.renderer, [e.offsetX, e.offsetY], e)
            }
        });
        this.renderer.view.addEventListener("mousemove", (e) => {
            if (e.button === 0) {
                this.currentTool?.onMove?.(this.renderer, [e.offsetX, e.offsetY], e)
            }
        });
        this.renderer.view.addEventListener("mouseup", (e) => {
            if (e.button === 0) {
                this.currentTool?.onUp?.(this.renderer, [e.offsetX, e.offsetY], e)
            }
        });
        this.renderer.view.addEventListener("mouseout", (e) => {
            if (e.button === 0) {
                this.currentTool?.onOut?.(this.renderer, [e.offsetX, e.offsetY], e)
            }
        });
    }
}

// export * from "./pen";
// export * from './square';
export * from './line';
