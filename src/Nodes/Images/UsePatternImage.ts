import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { useCache } from "../../Utils/useCache";

const gallery = Object.values(import.meta.glob("@assets/patterns/*.png", { eager: true, query: "?url" })) as string[];
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
    const cachedImage = useCache(
      context,
      node,
      () => {
        const img = new ImageData();
        img.load(imgSetting.url, context.p5);
        return img;
      },
      null,
      imgSetting.url
    );

    return cachedImage;
  },
};
