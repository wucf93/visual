import "./index.less";
import { createDraw } from "./src/draw";
import { Square, Line } from "./src/tools";

window.onload = () => {
  const draw = createDraw({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  document.body.append(draw.view);

  draw.tool.switchTool(Square, { fillStyle: "red" });
  draw.tool.switchTool(Line, { fillStyle: "red" });
};
