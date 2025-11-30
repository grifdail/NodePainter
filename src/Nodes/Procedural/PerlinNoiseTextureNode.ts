import { IconArrowsShuffle, IconGridDots, IconWaveSine } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2, Vector2 } from "../../Types/vectorDataType";
import { Constraints } from "../../Utils/ui/applyConstraints";
import Perlin from "../../libs/perlin";


export const PerlinNoiseTextureNode: NodeDefinition = {
    id: "Procedural/PerlinNoiseTexture",
    label: "Perlin Noise Texture",
    icon: DoubleIconGen(IconGridDots, IconWaveSine),
    description: "Generate a static perlin noise image",
    dataInputs: [],
    dataOutputs: [
        { id: "image", type: "image", defaultValue: null }],
    tags: ["Image", "Noise"],

    settings: [
        { type: "vector2", id: "dimension", defaultValue: createVector2(400, 400) },
        { type: "vector2", id: "offset", defaultValue: createVector2(0, 0) },
        { type: "vector2", id: "scale", defaultValue: createVector2(1, 1) },
        { type: "number", id: "octave", defaultValue: 1, constrains: [Constraints.Integer(), Constraints.GreaterThan(1)] },
        { type: "number", id: "influence", defaultValue: 2 },
        { type: "bool", id: "useAlpha", tooltip: "If this is enabled, a transparent texture will be used, otherwise a black and white texture will be generated", defaultValue: true },
        { type: "number", id: "seed", defaultValue: 0 },
        { type: "image-preview", id: "image" },
        {
            type: "button", id: "generate", button: {
                label: "generate",
                icon: IconArrowsShuffle,
                onClick: (node) => {
                    node.settings.image = generateNoiseTexture( //
                        node.settings.dimension,
                        node.settings.offset,
                        node.settings.scale,
                        node.settings.octave,
                        node.settings.influence,
                        node.settings.useAlpha,
                        node.settings.seed)

                }
            }
        }
    ],
    getData(portId, data, context) {
        if (data.settings.image != null) {
            var key = `${data.id}-image-cache`;
            if (!context.blackboard[key]) {
                const img = new ImageData({ url: data.settings.image });
                context.blackboard[key] = img;
                return img;
            } else {
                return context.blackboard[key];
            }
        }

        return;
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