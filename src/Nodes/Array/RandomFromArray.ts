import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";
import { convertTypeValue } from "../../Utils/graph/execution/convertTypeValue";

export const RandomFromArray: NodeDefinition = {
  id: "RandomFromArray",
  description: "Select a random element from an array",
  alias: "Pick",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-number",
      defaultValue: [],
    },
    Port.CacheId(),
  ],
  dataOutputs: [{ id: "out", defaultValue: 0, type: "number" }],

  settings: [],
  availableTypes: portTypesWithTags(["common"], ["array"]),
  onChangeType(node, type) {
    node.dataInputs["array"].ownValue = convertTypeValue(node.dataInputs["array"].ownValue, node.dataInputs["array"].type, `array-${type}` as PortType);
    node.dataInputs["array"].type = `array-${type}` as PortType;
    node.dataOutputs["out"].type = type;
  },
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    if (array.length < 1) {
      return PortTypeDefinitions[node.selectedType].createDefaultValue();
    }
    const r = createOrSelectFromCache(context, node, () => context.RNG.next());
    return array[Math.floor(r * array.length)];
  },
};
