import { IconPhoto } from "@tabler/icons-react";
import gallery from "../../Data/noises.json";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheStatic } from "../../Utils/graph/execution/blackboardCache";


export const UseNoiseImage: NodeDefinition = {
    id: "Image/UseNoiseImage",
    label: "Use Noise Image",
    icon: IconPhoto,
    description: "Use one of the provided standard noise",
    dataInputs: [],
    dataOutputs: [Port.image("out")],
    tags: ["Image"],
    settings: [
        {
            id: "image",
            type: "image-select",
            options: Object.entries(gallery).map(([label, url]) => ({
                label,
                url
            })),
        },
    ],
    getData(portId, node, context) {
        const imgSetting = node.settings["image"];
        const cachedImage = readFromCacheStatic(
            context,
            node,
            "image",
            () => {
                const img = new ImageData({ url: imgSetting.url });
                return img;
            },
        );

        return cachedImage;
    },
};
