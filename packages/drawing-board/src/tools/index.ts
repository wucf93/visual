import type { Renderer } from "../renderer";
import { ToolOptions, DrawPathBase } from "./base";

export type Class<T extends DrawPathBase> = new (options: ToolOptions) => T;

export class ToolApplication {
    private renderer;
    public currentTool?: Class<DrawPathBase>;
    private options: ToolOptions = {};

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        this.initEvent();
    }

    switchTool(Tool: Class<DrawPathBase>, options: ToolOptions) {
        this.currentTool = Tool;
        this.options = options;
    }

    initEvent() {
        let instance: DrawPathBase | null = null;
        this.renderer.view.addEventListener("mousedown", (e) => {
            if (this.currentTool) {
                instance = new this.currentTool(this.options);
                this.renderer.sections.push(instance);
                instance.on("DOWN", this.renderer, e);
            }
        });
        this.renderer.view.addEventListener("mousemove", (e) => {
            instance?.on("MOVE", this.renderer, e)
        });
        this.renderer.view.addEventListener("mouseup", (e) => {
            instance?.on("UP", this.renderer, e)
            instance && (instance = null);
        });
        this.renderer.view.addEventListener("mouseout", (e) => {
            instance?.on("OUT", this.renderer, e)
            instance && (instance = null);
        });
    }
}

export * from "./pen";
export * from './square';
export * from './line';
