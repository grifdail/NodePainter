import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { ImageData } from "../Data/ImageCache";

export const ShaderNodes: Array<NodeDefinition> = [
  {
    id: "RenderShader",
    icon: IconPhoto,
    description: "Upload an image",
    dataInputs: [],
    dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
    tags: ["Image"],
    executeOutputs: [],
    settings: [
      { id: "shader", type: "shader", defaultValue: null },
      { id: "width", type: "number", defaultValue: 400 },
      { id: "height", type: "number", defaultValue: 400 },
      { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
    ],
    getData(portId, node, context) {
      var keyComputed = `${node.id}-image-cache`;
      return context.blackboard[keyComputed];
    },
    execute(node, context) {
      const width = node.settings.width;
      const height = node.settings.height;
      const when = node.settings.when;
      const keyCache = `${node.id}-image-cache`;
      const keyComputed = `${node.id}-is-computed`;
      const keyShader = `${node.id}-shader`;

      let img = context.blackboard[keyCache];
      if (!img) {
        img = new ImageData();
        img.set(context.p5.createGraphics(width, height, context.p5.WEBGL));
        context.blackboard[keyCache] = img;
      }
      var shader = context.blackboard[keyShader];
      if (!shader) {
        try {
          const shaderCode: string = context.getShaderCode(node.settings.shader);
          shader = (context.p5 as any).createFilterShader(shaderCode);
        } catch (error) {
          console.error(error);
        }
      }

      let needRedraw = false;
      needRedraw ||= when === "Once" && !context.blackboard[keyComputed];
      needRedraw ||= when === "Per frame" && !context.frameBlackboard[keyComputed];
      needRedraw ||= when === "Everytime";
      if (needRedraw) {
        var oldTarget = context.target;
        context.target = img.image;
        if (node.execOutputs["image"]) {
          context.execute(node.execOutputs["image"] as string);
        }

        context.target = oldTarget;
        context.blackboard[keyComputed] = true;
        context.frameBlackboard[keyComputed] = true;
      }
      if (node.execOutputs["execute"]) {
        context.execute(node.execOutputs["execute"] as string);
      }
    },
  },
];
