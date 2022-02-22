import type { Renderer } from "../renderer";

export type Point = [number, number];
export interface ToolOptions {
  fillStyle?: CanvasRenderingContext2D["fillStyle"];
  strokeStyle?: CanvasRenderingContext2D["strokeStyle"];
  lineWidth?: CanvasRenderingContext2D["lineWidth"];
}

export interface ToolBase {
  onDown?(renderer: Renderer, point: Point, e: MouseEvent): void;
  onMove?(renderer: Renderer, point: Point, e: MouseEvent): void;
  onUp?(renderer: Renderer, point: Point, e: MouseEvent): void;
  onOut?(renderer: Renderer, point: Point, e: MouseEvent): void;
}
