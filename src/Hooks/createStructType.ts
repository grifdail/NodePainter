import { NodeDefinition } from "../Types/NodeDefinition";
import { PortDefinition } from "../Types/PortDefinition";
import { TreeStore } from "../Types/TreeStore";
import { createDefaultValue } from "../Utils/createDefaultValue";

export function createStructType(ports: PortDefinition[], name: string, state: TreeStore) {
  const composeNodeDef: NodeDefinition = {
    hideInLibrary: false,
    description: `Compose a structure matching the type ${name} you've created`,
    id: `Compose-${name}`,
    label: `Compose ${name}`,
    tags: ["Custom", "Struct"],
    dataInputs: structuredClone(ports),
    dataOutputs: [
      {
        id: "out",
        type: "struct",
        defaultValue: createDefaultValue("struct"),
      },
    ],
    settings: [],
    executeAs: "ComposeStruct",
    canBeExecuted: false,
    executeOutputs: [],
  };

  const decomposeNodeDef: NodeDefinition = {
    hideInLibrary: false,
    description: `Decompose a structure matching the type ${name} into it's individual component`,
    id: `Decompose-${name}`,
    label: `Decompose ${name}`,
    tags: ["Custom", "Struct"],
    dataInputs: [
      {
        id: "struct",
        type: "struct",
        defaultValue: createDefaultValue("struct"),
      },
    ],
    dataOutputs: structuredClone(ports),
    settings: [],
    executeAs: "DecomposeStruct",
    canBeExecuted: false,
    executeOutputs: [],
  };

  state.customNodes[composeNodeDef.id] = composeNodeDef;
  state.customNodes[decomposeNodeDef.id] = decomposeNodeDef;
}
