import { ToolBase, ToolEvent } from "./base";
import { LineElement } from '../elements/line'

export class EraserTool implements ToolBase {
    onMouseDown({ renderer, pageX, pageY }: ToolEvent) {
        const element = renderer.findElement(value => {
            console.log(renderer.ctx.isPointInStroke(value.path2d, pageX, pageY))
            return value instanceof LineElement && renderer.ctx.isPointInPath(value.path2d, pageX, pageY)
        })
        // console.log(element);
        if (element) {
            // renderer.exec("remove", element)
            // renderer.render()
        }
    }
}
