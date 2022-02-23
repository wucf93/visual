import { createDraw } from "./src/draw";
import { StarightTool, PenTool, CloseTool } from "./src/tools";
import "./index.less";

window.onload = () => {
  const draw = createDraw({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  document.body.append(draw.view);

  // draw.tool.switchTool(CloseTool, { closeType: "RECT", fillStyle: "red" });
  // draw.tool.switchTool(StarightTool, { strokeStyle: "red", lineWidth: 10 });
  // draw.tool.switchTool(PenTool, { strokeStyle: "red", lineWidth: 2 });
};
