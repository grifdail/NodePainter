import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";

const gallery = Object.values(import.meta.glob("@assets/patterns/*.png", { eager: true, query: "?url" })).map((item: any) => item.default) as string[];
//const gallery = [] as string[];
function basename(path: string) {
  console.log(path);
  return path.split("/").reverse()[0];
}

export const UsePatternImage: NodeDefinition = {
  id: "UsePatternImage",
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
      options: gallery.map((item) => ({
        label: basename(item),
        url: item,
      })),
    },
  ],
  getData(portId, node, context) {
    const imgSetting = node.settings["image"];
    const cachedImage = createOrSelectFromCache(
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
