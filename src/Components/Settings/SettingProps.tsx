import { NodeData } from "../../Types/NodeData";
import { SettingDefinition } from "../../Types/SettingDefinition";

export type SettingProps<T extends SettingDefinition> = {
  onChange: (value: any) => void;
  value: any;
  def: T;
  node: NodeData;
};
