import { IconPhoto } from "@tabler/icons-react";
import gallery from "../../Data/patterns.json";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";


export const UsePatternImage: NodeDefinition = {
    id: "Image/UsePatternImage",
    label: "Use Pattern Image",
    icon: IconPhoto,
    description: "Use one of the provided standard Pattern",
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
        const cachedImage = readFromCache(
            context,
            node,
            () => {
                const img = new ImageData({ url: imgSetting.url });
                return img;
            },
            imgSetting.url
        );

        return cachedImage;
    },
};
