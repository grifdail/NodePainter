import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { SettingComponents } from "../Settings/SettingsComponents";
import { NODE_HEADER_HEIGHT, PORT_HEIGHT_WITH_SPACING, NODE_FOOTER_HEIGHT } from "./NodeVisualConst";

export function GetNodeHeight(node: NodeData, typeDef: NodeDefinition) {
  var inputCount = Object.keys(node.dataInputs).length;
  var outputCount = Object.keys(node.dataOutputs).length;
  var sumSetting = typeDef.settings.reduce((prev, def) => prev + SettingComponents[def.type].getSize(node.settings[def.id], def as any, node), 0);
  return NODE_HEADER_HEIGHT + PORT_HEIGHT_WITH_SPACING * (inputCount + outputCount) + NODE_FOOTER_HEIGHT + sumSetting + typeDef.settings.length * 2;
}
