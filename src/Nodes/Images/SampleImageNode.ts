import { IconGizmo } from "@tabler/icons-react";
import { SettingGenerator } from "../../Components/Settings/SettingGenerator";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createColor, createVector2 } from "../../Types/vectorDataType";
import { readFromCacheWithVersion } from "../../Utils/graph/execution/blackboardCache";
import { clamp01 } from "../../Utils/math/clamp01";
import { trueMod } from "../../Utils/math/trueMod";
import { vectorLerp, vectorScale } from "../../Utils/math/vectorUtils";

export const SampleImageNode: NodeDefinition = {
    id: "Shader/SampleImage",
    hideInLibrary: false,
    icon: IconGizmo,
    description: "Sample a pixel from a UV",
    dataInputs: [
        { id: "source", type: "vector2", defaultValue: createVector2(0, 0) },
        { id: "image", type: "image", defaultValue: null },
        Port.CacheId(),
        Port.Version()
    ],

    dataOutputs: [{ id: "out", type: "color", defaultValue: createColor() }],
    tags: ["Shader", "Image"],

    settings: [
        SettingGenerator.dropdown("coordinate", "relative", { options: ["absolute", "relative"] }),
        SettingGenerator.dropdown("loop", "loop", { options: ["loop", "clamp"] }),
        SettingGenerator.dropdown("interpolation", "points", { options: ["points", "bilinear"] })
    ],
    getData(portId, node, context) {
        var pixels = readFromCacheWithVersion<{ width: number, height: number, pixels: number[] }>(context, node, () => {
            var imgData = context.getInputValueImage(node, "image");
            if (imgData) {
                var p5Img = imgData.getPixelData(context.p5) as any;
                if (p5Img === null) {
                    return undefined
                }
                return p5Img
            } else {
                return {
                    width: 0,
                    height: 0,
                    pixels: 0
                }
            }
        })
        if (pixels) {
            const pt = context.getInputValueVector2(node, "source");
            let coor = node.settings.coordinate === "absolute" ? createVector2(pt[0] / pixels.width, pt[1] / pixels.height) : pt;
            coor = node.settings.coordinate === "clamp" ? [clamp01(coor[0]), clamp01(coor[1])] : [trueMod(coor[0], 1), trueMod(coor[1], 1)];
            if (node.settings.interpolation === "bilinear") {
                const coorX = Math.floor(coor[0] * pixels.width);
                const coorY = Math.floor(coor[1] * pixels.height);
                const i1 = (coorY * pixels.width + coorX) * 4;
                const i2 = (coorY * pixels.width + (coorX + 1)) * 4;
                const i3 = ((coorY + 1) * pixels.width + coorX) * 4;
                const i4 = ((coorY + 1) * pixels.width + (coorX + 1)) * 4;
                const tx = (coor[0] * pixels.width) % 1;
                const ty = (coor[1] * pixels.height) % 1;
                const c0 = vectorLerp(
                    [pixels.pixels[i1 + 0], pixels.pixels[i1 + 1], pixels.pixels[i1 + 2], pixels.pixels[i1 + 3]],
                    [pixels.pixels[i2 + 0], pixels.pixels[i2 + 1], pixels.pixels[i2 + 2], pixels.pixels[i2 + 3]],
                    tx
                );
                const c1 = vectorLerp(
                    [pixels.pixels[i3 + 0], pixels.pixels[i3 + 1], pixels.pixels[i3 + 2], pixels.pixels[i3 + 3]],
                    [pixels.pixels[i4 + 0], pixels.pixels[i4 + 1], pixels.pixels[i4 + 2], pixels.pixels[i4 + 3]],
                    tx
                )
                return vectorScale(vectorLerp(c0, c1, ty), 1 / 256)
            } else {
                const coorX = Math.round(coor[0] * pixels.width);
                const coorY = Math.round(coor[1] * pixels.height);
                const i1 = (coorY * pixels.width + coorX) * 4;
                return vectorScale([pixels.pixels[i1 + 0], pixels.pixels[i1 + 1], pixels.pixels[i1 + 2], pixels.pixels[i1 + 3]], 1 / 256)
            }
        }
        return createColor();
    },
};
