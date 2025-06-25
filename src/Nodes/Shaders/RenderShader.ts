import { IconPhoto } from "@tabler/icons-react";
import { ImageData } from "../../Types/ImageData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { sanitizeForShader } from "../../Utils/graph/execution/sanitizeForShader";

export const RenderShader: NodeDefinition = {
  id: "RenderShader",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Render a shader to an image an image",
  dataInputs: [Port.CacheId()],
  dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
  tags: ["Shader"],

  settings: [
    { id: "width", type: "number", defaultValue: 400 },
    { id: "height", type: "number", defaultValue: 400 },
  ],
  getData(portId, node, context) {
    const width = node.settings.width;
    const height = node.settings.height;
    const cacheId = Math.floor(context.getInputValueNumber(node, "cache-id"));
    const keyCache = `${node.id}-${cacheId}-img`;
    const keyShader = `${node.id}-${cacheId}-shader`;

    let img = createOrSelectFromCache(
      context,
      node,
      () => {
        return new ImageData({ p5Graphics: context.p5.createGraphics(width, height, context.p5.WEBGL) });
      },
      keyCache
    );
    var p5img = img.p5Graphics;
    if (p5img === null) {
      return;
    }
    let shader = createOrSelectFromCache(
      context,
      node,
      () => {
        try {
          const shaderCode: string = context.getShaderCode(node.type, Object.values(node.dataInputs));
          return (p5img as any).createFilterShader(shaderCode);
        } catch (error) {
          console.error(error);
        }
      },
      keyShader
    );

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

    p5img.clear(0, 0, 0, 0);
    p5img.filter(shader);

    return img;
  },
};
export const CUSTOM_SHADER = "RenderShader";
