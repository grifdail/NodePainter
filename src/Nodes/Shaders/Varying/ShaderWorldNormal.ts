import { IconCube, IconMatrix } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ShaderWorldNormal: NodeDefinition = {
  id: "Shader/Varying/WorldNormal",
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
