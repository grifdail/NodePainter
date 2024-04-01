import { original } from "immer";
import { useTree } from "../Hooks/useTree";
import { NodeData } from "../Types/NodeData";
import { PortDefinition } from "../Types/PortDefinition";
import { PortRole } from "../Types/PortRole";
import { canConvertCode } from "./convertTypeValue";
import { createDefaultValue } from "./createDefaultValue";

export const dynamicNodeType = {
  bindPort(portId: string, self: NodeData, outputPorts: PortDefinition, selfPosition: PortRole) {
    if (portId === "a") {
      console.log(original(self));
      console.log(self.dataInputs);
      self.dataInputs["a"].type = outputPorts.type;
      if (!canConvertCode(self.dataInputs["b"].type, outputPorts.type)) {
        useTree.getState().removeDataConnection(self.id, "b");
      }
      self.dataInputs["b"].type = outputPorts.type;
      self.dataInputs["a"].ownValue = createDefaultValue(outputPorts.type);
      self.dataInputs["b"].ownValue = createDefaultValue(outputPorts.type);
      self.dataOutputs["out"].type = outputPorts.type;
    }
    return true;
  },
  unbindPort(portId: string, self: NodeData, selfPosition: PortRole) {
    if (portId === "a") {
      if (self.dataInputs["b"].hasConnection) {
        self.dataInputs["a"].connectedNode = self.dataInputs["b"].connectedNode;
        self.dataInputs["a"].connectedPort = self.dataInputs["b"].connectedPort;
        self.dataInputs["a"].hasConnection = self.dataInputs["b"].hasConnection;
        self.dataInputs["b"].hasConnection = false;
        self.dataInputs["a"].type = useTree.getState().getOutputPort(self.dataInputs["a"].connectedNode as string, self.dataInputs["a"].connectedPort as string).type;
        self.dataInputs["a"].ownValue = createDefaultValue(self.dataInputs["a"].type);
        self.dataInputs["b"].ownValue = createDefaultValue(self.dataInputs["a"].type);
        self.dataOutputs["out"].type = self.dataInputs["a"].type;
      } else {
        self.dataInputs["a"].type = "vector";
        self.dataInputs["b"].type = "vector";
        self.dataOutputs["out"].type = "vector";
        self.dataInputs["a"].ownValue = createDefaultValue("vector");
        self.dataInputs["b"].ownValue = createDefaultValue("vector");
      }
    }
    return true;
  },
};
