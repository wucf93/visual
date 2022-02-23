import type { Renderer } from "../renderer";

export type Point = [number, number];

export type ToolEvent = MouseEvent & { renderer: Renderer };

export interface ToolBase {
  onClick?(e: ToolEvent): void;
  onMouseDown?(e: ToolEvent): void;
  onMouseUp?(e: ToolEvent): void;
  onMouseMove?(e: ToolEvent): void;
  onDragStart?(e: ToolEvent): void;
  onDragMove?(e: ToolEvent): void;
  onDragEnd?(e: ToolEvent): void;
}
