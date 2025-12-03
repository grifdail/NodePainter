import p5 from "p5";
import Rand from "rand-seed";
import { SketchSave } from "./Types/SketchTemplate";
import { createExecutionContext, ExecutionContext } from "./Utils/graph/execution/createExecutionContext";
import { getNodeStart } from "./Utils/graph/execution/getNode";

console.log("helloWorld");


function initGame(tree: SketchSave) {
    var game = new p5((p5) => {

        var context: ExecutionContext = createExecutionContext(tree, p5 as p5);
        var seed = 0;
        var close = () => { };
        p5.setup = () => {
            seed = Date.now();
            var start = getNodeStart(tree);
            p5.createCanvas(start.settings.width || 400, start.settings.height || 400);
            context.RNG = new Rand(seed.toString());
            //Do we need cleanup ?
            //props.setCleanup(context.endOfRunCleanup);
            //TODO: Implement error handling
            //close = props.close;
        };


        p5.draw = () => {
            context.frameBlackboard = {};

            context.time = p5.millis();
            context.deltaTime = p5.deltaTime;
            if (tree) {
                try {
                    var result = context.getInputValue(getNodeStart(tree), "drawing", "drawing2d");
                    if (typeof result === "function") {
                        result();
                    }
                } catch (err: any) {
                    console.error(err);
                }

                context.endOfFrameCleanup();
            };
        }
    })
}


export { };
