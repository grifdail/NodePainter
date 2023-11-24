import { NodeDefinition } from "./NodeDefinition";
import { NodeLibrary } from "./NodeLibrary";
import { PortConnection } from "./PortConnection";
import { uid } from "./utils";

export class NodeData {
  id: string;
  type: string;
  inputs: { [key: string]: PortConnection } = {};
  output: { [key: string]: string | null } = {};
  settings: { [key: string]: any } = {};
  blackboard: { [key: string]: any } = {};
  positionX: number = 0;
  positionY: number = 0;

  constructor(type: string) {
    this.type = type;
    this.id = uid();
    var def = this.getType();
    def.inputPorts.forEach((port) => {
      var connection = new PortConnection();
      connection.ownValue = port.defaultValue;
      this.inputs[port.id] = connection;
    });
    def.settings.forEach((setting) => {
      this.settings[setting.id] = setting.defaultValue;
    });
  }
  getType(): NodeDefinition {
    return NodeLibrary[this.type];
  }
}
