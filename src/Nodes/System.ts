import { AddNode } from "../Data/NodeLibrary";

AddNode({
  id: "Start",
  tags: ["System"],
  inputPorts: [],
  outputPorts: [],
  executeOutputPorts: ["execute"],
  settings: [],
  getData: (portId, nodeData, getNodeOutput) => {},
  execute: (data, execute) => {
    if (data.output.execute) {
      execute(data.output.execute);
    }
  },
});
