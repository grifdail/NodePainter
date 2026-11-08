import { IconBrush } from "@tabler/icons-react";
import { Graphics } from "p5";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { createDefaultFlipbook, Flipbook } from "../../Types/FlipBook";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { computeResolution } from "../../Utils/graph/execution/computeResolution";
import { toP5Color } from "../../Utils/math/colorUtils";
import { Constraints } from "../../Utils/ui/applyConstraints";

export const FlipbookNode: NodeDefinition = {
    id: "Image/Flipbook",
    icon: IconBrush,
    description: "Paint a flipbook animation",
    dataInputs: [Port.number("image", 0, "Loop when going above the frame count", [Constraints.Integer(), Constraints.Positive()])],
    dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
    tags: ["Image"],

    settings: [
        { id: "flipbook", type: "flipbook", defaultValue: createDefaultFlipbook() },
        SettingGenerator.resolution("resolution", { mode: "original" })
    ],
    getData(portId, data, context) {
        const keyImg = `${data.id}-image-cache`;
        let img = context.blackboard[keyImg];
        if (!img) {

            const { width, height } = computeResolution(context, data.settings.resolution)
            img = new ImageData({ p5Graphics: context.p5.createGraphics(width, height) });
            context.blackboard[keyImg] = img;
        }
        const keyid = `${data.id}-imageId`;
        const imageId = Math.floor(context.getInputValueNumber(data, "image")) % data.settings.flipbook.length;
        var previousImageId = context.blackboard[keyid];
        if (previousImageId !== imageId) {
            context.blackboard[keyid] = imageId
            drawFrame(img.p5Graphics, data.settings.flipbook, imageId);

        }


        return img;
    },
};
function drawFrame(p5: Graphics, flipbook: Flipbook, imageId: number) {
    var frame = flipbook[imageId];
    p5.clear();
    p5.strokeCap(p5.ROUND)
    p5.noFill();
    frame.forEach(line => {
        p5.stroke(toP5Color(line.color, p5))
        p5.strokeWeight(line.lineWidth * p5.width)
        p5.beginShape();
        for (let index = 0; index < line.points.length; index += 2) {
            p5.vertex(line.points[index + 0] * p5.width, line.points[index + 1] * p5.width);
        }
        p5.endShape();
    })


}

