import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { readFromCacheStatic } from "../../Utils/graph/execution/blackboardCache";

import { ImageData } from "../../Types/ImageData";

export function CreateImageLibraryNode(type: string, library: Record<string, string>) {

    const Node: NodeDefinition = {
        id: `Image/Library/${type}`,
        label: `Use ${type} image`,
        icon: IconPhoto,
        description: `Use one of the provided ${type} image.`,
        dataInputs: [],
        dataOutputs: [Port.image("out")],
        tags: ["Image"],
        settings: [
            {
                id: "image",
                type: "image-select",
                options: Object.entries(library).map(([label, url]) => ({
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
    return Node;
}