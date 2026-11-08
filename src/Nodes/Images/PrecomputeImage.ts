import { IconPhoto } from "@tabler/icons-react";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { computeResolution } from "../../Utils/graph/execution/computeResolution";

export const PrecomputeImage: NodeDefinition = {
    id: "Image/Precompute",
    label: "Render image",
    icon: IconPhoto,
    description: "Render the 'image' port first to an image you can use in the 'execute' port.",

    dataInputs: [Port.drawing2d("drawing"), Port.CacheId()],
    dataOutputs: [
        {
            id: "image",
            type: "image",
            defaultValue: null,
        },
    ],
    tags: ["Image"],
    settings: [
        SettingGenerator.resolution("resolution", { mode: "original" })
    ],
    getData(portId, node, context) {
        const { width, height } = computeResolution(context, node.settings.resolution)
        const cacheId = context.getInputValueNumber(node, "cache-id");
        const keyCache = `${node.id}-${cacheId}-image-cache`;
        let img = context.blackboard[keyCache];
        if (!img) {
            img = new ImageData({ p5Graphics: context.p5.createGraphics(width, height) });
            context.blackboard[keyCache] = img;
        }
        var oldTarget = context.target;
        context.target = img.p5Graphics;
        const drawing = context.getInputValueDrawing(node, "drawing");
        drawing();
        context.target = oldTarget;
        return img;
    },
};
