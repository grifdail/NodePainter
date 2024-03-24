import { NodeLibrary } from "../Nodes/Nodes";
import { START_NODE } from "../Nodes/System/StartNode";
import { NodeCollection } from "../Types/NodeCollection";
import { createNodeData } from "./createNodeData";

export function createDefaultNodeConnection(): NodeCollection {
  const start = createNodeData(NodeLibrary.Start, 0, 0, START_NODE);
  const nthen = createNodeData(NodeLibrary.Then, 400, 0);
  const background = createNodeData(NodeLibrary.FillBackground, 800, 0);
  start.execOutputs.execute = nthen.id;
  nthen.execOutputs[0] = background.id;
  nthen.execOutputs[1] = null;
  return {
    [start.id]: start,
    [nthen.id]: nthen,
    [background.id]: background,
  };
}
