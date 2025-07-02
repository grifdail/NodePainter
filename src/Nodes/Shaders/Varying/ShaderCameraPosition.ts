import { IconCube, IconMatrix } from "@tabler/icons-react";
import { DoubleIconGen } from "../../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { Port } from "../../../Types/PortTypeGenerator";
import { generateShaderCodeFromNodeData } from "../../../Utils/graph/execution/generateShaderCodeFromNodeData";

export const ShaderCameraPosition: NodeDefinition = {
  id: "Shader/Varying/CameraPosition",
  label: "Camera Position",
  hideInLibrary: false,
  icon: DoubleIconGen(IconCube, IconMatrix),
  description: "Return the position of the camera",
  dataInputs: [],
  dataOutputs: [Port.vector3("value")],
  tags: ["Shader", "Input"],
  settings: [],
  onlyAvailableIn: ["shaderMaterial"],
  getShaderCode(node, context) {
    return generateShaderCodeFromNodeData(node, context, "value", [], () => `cameraPosition`);
  },
};
