import { IconCube, IconMatrix } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { Port } from "../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ShaderWorldPosition: NodeDefinition = {
  id: "Shader/WorldPosition",
  label: "World Position",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the world position of the current texel",
  dataInputs: [],
  dataOutputs: [Port.vector3("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `vWorldPosition`);
  },
};
export const ShaderViewPosition: NodeDefinition = {
  id: "Shader/ViewPosition",
  label: "View Position",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the position of the current texel relative to the camera",
  dataInputs: [],
  dataOutputs: [Port.vector3("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `vViewPosition`);
  },
};
export const ShaderLocalPosition: NodeDefinition = {
  id: "Shader/LocalPosition",
  label: "Local Position",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the position of the current texel relative to the model",
  dataInputs: [],
  dataOutputs: [Port.vector3("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `vLocalPosition`);
  },
};
export const ShaderWorldNormal: NodeDefinition = {
  id: "Shader/WorldNormal",
  label: "World Normal",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the normal of the texel in world space",
  dataInputs: [],
  dataOutputs: [Port.vector3("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `vWorldNormal`);
  },
};
export const ShaderLocalNormal: NodeDefinition = {
  id: "Shader/LocalNormal",
  label: "Local Normal",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the normal of the texel in model space",
  dataInputs: [],
  dataOutputs: [Port.vector3("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `vNormal`);
  },
};
export const ShaderUV: NodeDefinition = {
  id: "Shader/UV",
  label: "UV",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the uv coordinate of the current texel",
  dataInputs: [],
  dataOutputs: [Port.vector2("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `vUv`);
  },
};

export const VaryingNodes = [ShaderLocalNormal, ShaderLocalPosition, ShaderViewPosition, ShaderWorldPosition, ShaderWorldNormal, ShaderUV];
