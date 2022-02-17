import "./index.less";
import { createDraw } from "./src/draw";
import { PenTool, LineTool } from "./src/tools";

window.onload = () => {
  const draw = createDraw({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  document.body.append(draw.view);

  const line = new LineTool({ lineWidth: 10, strokeStyle: "red" });
  draw.tool.switchTool(line);
};
