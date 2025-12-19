import { IconGridDots, IconWaveSine } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import Perlin from "../../libs/perlin";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createVector2, Vector2 } from "../../Types/vectorDataType";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";
import { Constraints } from "../../Utils/ui/applyConstraints";


export const PerlinNoiseTextureNode: NodeDefinition = {
    id: "Procedural/PerlinNoiseTexture",
    label: "Perlin Noise Texture",
    icon: DoubleIconGen(IconGridDots, IconWaveSine),
    description: "Generate a static perlin noise image",
    dataInputs: [
        Port.vector2("offset"),
        Port.vector2("scale", createVector2(2, 2)),
        Port.number("octave", 1, "How many layer of noise to add", [Constraints.Integer(), Constraints.GreaterThan(1)]),
        Port.number("influence", 2),
        Port.bool("useAlpha", true, "If this is enabled, a transparent texture will be used, otherwise a black and white texture will be generated"),
        Port.CacheId()
    ],
    dataOutputs: [
        { id: "image", type: "image", defaultValue: null }],
    tags: ["Image", "Noise"],

    settings: [
        { type: "vector2", id: "dimension", defaultValue: createVector2(400, 400) },

    ],
    getData(portId, data, context) {
        var img = readFromCache(context, data, () => {
            const str = generateNoiseTexture( //
                data.settings.dimension,
                context.getInputValueVector2(data, "offset"),
                context.getInputValueVector2(data, "scale"),
                context.getInputValueNumber(data, "octave"),
                context.getInputValueNumber(data, "influence"),
                context.getInputValueBoolean(data, "useAlpha"),
                context.RNG.next()) || ""

            const img = new ImageData({ url: str });
            return img;
        })


        return img;
    },
};


function generateNoiseTexture(dim: Vector2, offset: Vector2, scale: Vector2, octave: number, influence: number, useAlpha: boolean, seed: number) {
    if (seed < 0) {
        seed = Math.random();
    }
    const canvas = document.createElement("canvas");
    const width = canvas.width = Math.floor(dim[0]);
    const height = canvas.height = Math.floor(dim[1]);
    const ctx = canvas.getContext("2d");
    if (!ctx) {
        return null;
    }
    const imageData = ctx.createImageData(width, height);
    const perlin = new Perlin(seed);


    // Iterate through every pixel
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // Modify pixel data
            const i = (x * height + y) * 4;


            let value = 0
            let total = 0
            for (let o = 0; o < octave; o++) {
                value += perlin.perlin2(x / width * scale[0] * (o + 1) + offset[0], y / height * scale[1] * (o + 1) + offset[1]) / Math.pow(influence, o);
                total += 1 / Math.pow(influence, o)
            }
            value /= total;

            if (useAlpha) {
                imageData.data[i + 0] = 255; // R value
                imageData.data[i + 1] = 255; // G value
                imageData.data[i + 2] = 255; // B value
                imageData.data[i + 3] = Math.round(value * 255); // A value
            } else {
                imageData.data[i + 0] = Math.round(value * 255); // R value
                imageData.data[i + 1] = Math.round(value * 255); // G value
                imageData.data[i + 2] = Math.round(value * 255); // B value
                imageData.data[i + 3] = 255 // A value
            }

        }
    }

    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
}