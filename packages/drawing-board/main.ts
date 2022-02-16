import "./index.less";
import { createDraw } from "./src/draw";

window.onload = () => {
  const draw = createDraw({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  document.body.append(draw.view);
};
