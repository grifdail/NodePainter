import { IconCube, IconMatrix } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ShaderWorldPosition: NodeDefinition = {
  id: "Shader/Varying/WorldPosition",
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
