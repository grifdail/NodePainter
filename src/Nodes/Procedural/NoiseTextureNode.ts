/* eslint-disable react-hooks/rules-of-hooks */
import { IconArrowsShuffle, IconGridDots, IconWaveSine } from "@tabler/icons-react";
import Rand from "rand-seed";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { createVector2, Vector2 } from "../../Types/vectorDataType";


export const NoiseTextureNode: NodeDefinition = {
    id: "Procedural/NoiseTexture",
    label: "Noise Texture",
    icon: DoubleIconGen(IconGridDots, IconWaveSine),
    description: "Generate a static random noise texture",
    dataInputs: [],
    dataOutputs: [
        { id: "image", type: "image", defaultValue: null }],
    tags: ["Image", "Noise"],

    settings: [
        { type: "vector2", id: "dimension", defaultValue: createVector2(400, 400) },
        { type: "bool", id: "alphaOnly", "label": "Alpha only", defaultValue: true },
        { type: "number", id: "clip", tooltip: "Pixel bellow this value will be discarded", defaultValue: 0 },
        { type: "number", id: "seed", tooltip: "use -1 to generate a new seed everytime", defaultValue: -1 },
        { type: "image-preview", id: "image" },
        {
            type: "button", id: "generate", button: {
                label: "generate",
                icon: IconArrowsShuffle,
                onClick: (node) => {
                    node.settings.image = generateNoiseTexture( //
                        node.settings.dimension,
                        node.settings.alphaOnly,
                        node.settings.clip,
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


function generateNoiseTexture(dim: Vector2, alphaOnly: boolean, clip: number, seed: number) {
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
    const rand = new Rand(seed.toString());


    // Iterate through every pixel
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            // Modify pixel data
            const i = (x * height + y) * 4;


            if (alphaOnly) {
                imageData.data[i + 0] = 255; // R value
                imageData.data[i + 1] = 255; // G value
                imageData.data[i + 2] = 255; // B value
                imageData.data[i + 3] = useClip(clip, rand); // A value
            } else {
                imageData.data[i + 0] = useClip(clip, rand); // A value
                imageData.data[i + 1] = useClip(clip, rand); // A value
                imageData.data[i + 2] = useClip(clip, rand) // A value
                imageData.data[i + 3] = 255
            }

        }
    }

    // Draw image data to the canvas
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL("image/png");
}

function useClip(clip: number, rand: Rand) {
    var v = rand.next();
    if (v < clip) {
        return 0;
    } else {
        return Math.round(v * 255); // A value
    }
}