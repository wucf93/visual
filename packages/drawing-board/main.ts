import { createDraw } from "./src/draw";
import { StarightTool, PenTool, CloseTool, EraserTool } from "./src/tools";
import "./index.less";

window.onload = () => {
  const draw = createDraw({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  document.body.append(draw.view);

  document.querySelector("button#pen")?.addEventListener("click", () => {
    draw.tool.switchTool(PenTool, { strokeStyle: "red", lineWidth: 10 });
  })
  document.querySelector("button#eraser")?.addEventListener("click", () => {
    draw.tool.switchTool(EraserTool);
  })
  document.querySelector("button#rect")?.addEventListener("click", () => {
    draw.tool.switchTool(CloseTool, { closeType: "RECT", fillStyle: "red", lineWidth: 20, strokeStyle: "yellow" });
  })
  document.querySelector("button#staright")?.addEventListener("click", () => {
    draw.tool.switchTool(StarightTool, { strokeStyle: "red", lineWidth: 10 });
  })
};
