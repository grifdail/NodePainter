import { IconList, IconQuestionMark } from "@tabler/icons-react";
import Rand from "rand-seed";
import { DoubleIconGen } from "../../Components/Generics/DoubleIcon";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { portTypesWithTags } from "../../Types/PortTypeDefinitions";
import { Port } from "../../Types/PortTypeGenerator";
import { changeTypeGenerator } from "../../Utils/graph/definition/changeTypeGenerator";
import { createOrSelectFromCache } from "../../Utils/graph/execution/blackboardCache";

export const ShuffleNode: NodeDefinition = {
  id: "Array/Shuffle",
  description: "Count the number of element in an array",
  icon: DoubleIconGen(IconList, IconQuestionMark),
  alias: "",
  tags: ["Array"],
  dataInputs: [
    {
      id: "array",
      type: "array-color",
      defaultValue: [],
    },
    Port.bool("cycle", false, "If this is on, all item are guaranted to move"),
    Port.CacheId(),
  ],
  dataOutputs: [Port["array-color"]("out")],
  settings: [],
  ...changeTypeGenerator(portTypesWithTags(["array"]), ["array"], ["out"]),
  getData: (portId, node, context) => {
    const seed = createOrSelectFromCache(context, node, () => context.RNG.next());
    const array = context.getInputValue(node, "array", node.selectedType) as any[];
    const cycle = context.getInputValueBoolean(node, "cycle");
    const rand = new Rand(seed.toString())
    return cycle ? shuffleOneCycle(array, rand) : shuffle(array, rand);
  },
};

function shuffle<T>(array: T[], rng: Rand) {
  var r = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i + 1));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}

function shuffleOneCycle<T>(array: T[], rng: Rand) {
  var r = [...array];
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(rng.next() * (i));
    [r[i], r[j]] = [r[j], r[i]];
  }
  return r;
}