import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../Data/NodeDefinition";
import { ImageData } from "../Data/ImageData";
import { genShader } from "./genShader";
import { convertToUniform, getShaderType } from "../Data/convertToShaderValue";

export const ShaderNodes: Array<NodeDefinition> = [
  {
    id: "RenderShader",
    hideInLibrary: true,
    icon: IconPhoto,
    description: "Render a shader to an image an image",
    dataInputs: [],
    dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
    tags: ["Shader"],
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
      let shader = context.blackboard[keyShader];
      if (!shader) {
        try {
          const shaderCode: string = context.getShaderCode(node.type, Object.values(node.dataInputs));
          console.log(shaderCode);
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
          var data = context.getInputValue(node, port.id);
          if (port.type === "image" && (!data || !data.isLoaded)) {
            return;
          }
          shader.setUniform(`uniform_${port.id}`, convertToUniform(port.type, data));
        });
        img.image.clear(0, 0, 0, 0);
        img.image.filter(shader);
        context.blackboard[keyComputed] = true;
        context.frameBlackboard[keyComputed] = true;
      }
      if (node.execOutputs["execute"]) {
        context.execute(node.execOutputs["execute"] as string);
      }
    },
  },
  {
    id: "CustomShader-end",
    hideInLibrary: true,
    icon: IconPhoto,
    description: "Render a shader to an image an image",
    dataInputs: [],
    dataOutputs: [{ id: "image", type: "image", defaultValue: null }],
    tags: ["Shader"],
    executeOutputs: [],
    settings: [],
    getShaderCode(node, context) {
      return `gl_FragColor  = ${context.getShaderVar(node, "color")};`;
    },
  },
  {
    id: "CustomShader-start",
    hideInLibrary: true,
    icon: IconPhoto,
    description: "Render a shader to an image an image",
    dataInputs: [],
    dataOutputs: [],
    tags: ["Shader"],
    executeOutputs: [],
    settings: [],
    getShaderCode(node, context) {
      return [
        genShader(node, context, "vec4", "uv", [], () => `vec4(vTexCoord.xy, 0.0, 0.0)`),
        ...Object.values(node.dataOutputs)
          .filter((port) => port.id !== "uv" && port.type !== "image")
          .map((port) => {
            return genShader(node, context, getShaderType(port.type), port.id, [], () => `uniform_${port.id}`);
          }),
      ].join("\n");
    },
  },
];
