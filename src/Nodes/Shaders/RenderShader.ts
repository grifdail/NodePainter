import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { sanitizeForShader } from "../../Utils/sanitizeForShader";

export const RenderShader: NodeDefinition = {
  id: "RenderShader",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Render a shader to an image an image",
  dataInputs: [],
  dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
  tags: ["Shader"],

  settings: [
    { id: "width", type: "number", defaultValue: 400 },
    { id: "height", type: "number", defaultValue: 400 },
    { id: "when", type: "dropdown", defaultValue: "Once", options: ["Once", "Per frame", "Everytime"] },
  ],
  getData(portId, node, context) {
    const width = node.settings.width;
    const height = node.settings.height;
    const when = node.settings.when;
    const keyCache = `${node.id}-image-cache`;
    const keyComputed = `${node.id}-is-computed`;
    const keyShader = `${node.id}-shader`;

    let img = context.blackboard[keyCache];
    if (!img) {
      img = new ImageData({ p5Graphics: context.p5.createGraphics(width, height, context.p5.WEBGL) });
      context.blackboard[keyCache] = img;
    }
    let shader = context.blackboard[keyShader];
    if (!shader) {
      try {
        const shaderCode: string = context.getShaderCode(node.type, Object.values(node.dataInputs));
        shader = (img.image as any).createFilterShader(shaderCode);
        context.blackboard[keyShader] = shader;
      } catch (error) {
        console.error(error);
      }
    }

    let needRedraw = false;
    needRedraw ||= when === "Once" && !context.blackboard[keyComputed];
    needRedraw ||= when === "Per frame" && !context.frameBlackboard[keyComputed];
    needRedraw ||= when === "Everytime";
    if (needRedraw) {
      shader.setUniform("time", context.time);
      Object.values(node.dataInputs).forEach((port) => {
        if (port.type === "image") {
          const data = context.getInputValueImage(node, port.id);
          if (!data || !data.getP5(context.p5)) {
            return;
          }
          shader.setUniform(sanitizeForShader(`uniform_${port.id}`), data.getP5(context.p5));
        } else {
          const data = context.getInputValue(node, port.id, port.type);
          const converter = PortTypeDefinitions[port.type].convertToShaderP5Uniform;
          shader.setUniform(sanitizeForShader(`uniform_${port.id}`), converter ? converter(data) : data);
        }
      });
      img.image.clear(0, 0, 0, 0);
      img.image.filter(shader);
      context.blackboard[keyComputed] = true;
      context.frameBlackboard[keyComputed] = true;
    }

    return context.blackboard[keyCache];
  },
};
export const CUSTOM_SHADER = "RenderShader";
