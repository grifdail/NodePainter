import { IconPhoto } from "@tabler/icons-react";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";
import { sanitizeForShader } from "../../Utils/graph/execution/sanitizeForShader";

export const VARYING: Record<string, { type: PortType; identifier: string }> = {
  worldPosition: {
    type: "vector4",
    identifier: "vWorldPosition",
  },
  uv: {
    type: "vector2",
    identifier: "vUv",
  },
  normal: {
    type: "vector3",
    identifier: "vNormal",
  },
  viewPosition: {
    type: "vector3",
    identifier: "vViewPosition",
  },
};

export const ShaderMaterialStart: NodeDefinition = {
  id: "ShaderMaterial-start",
  hideInLibrary: true,
  icon: IconPhoto,
  description: "Render a shader to an image an image",
  dataInputs: [],
  dataOutputs: [],
  tags: ["Shader"],

  settings: [],
  getShaderCode(node, context) {
    return [
      ...Object.values(node.dataOutputs).map((port) => {
        if (VARYING[port.id]) {
          return generateShaderCodeFromNodeData(node, context, port.id, {}, () => VARYING[port.id].identifier);
        }
        return generateShaderCodeFromNodeData(node, context, port.id, {}, () => sanitizeForShader(`uniform_${port.id}`) as string);
      }),
    ].join("\n");
  },
};
