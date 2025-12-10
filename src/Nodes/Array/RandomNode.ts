import { IconBrackets, IconList } from "@tabler/icons-react";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { readFromCache } from "../../Utils/graph/execution/blackboardCache";

export const RandomNode: NodeDefinition = {
  id: "Array/Random",
  label: "Random From Array",
  description: "Select a random element from an array",
  alias: "Pick",
  icon: DoubleIconGen(IconList, IconBrackets),
  tags: ["Array", "Random"],
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
  ...changeTypeGenerator(portTypesWithTags(["common"], ["array"]), [], ["out"], ["array"]),
  getData: (portId, node, context) => {
    const array = context.getInputValue(node, "array", `array-${node.selectedType}` as PortType) as any[];
    if (array.length < 1) {
      return PortTypeDefinitions[node.selectedType].createDefaultValue();
    }
    const r = readFromCache(context, node, () => context.RNG.next());
    return array[Math.floor(r * array.length)];
  },
};
