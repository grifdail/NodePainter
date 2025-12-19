import { NodeData } from "./NodeData";
import { SettingDefinition } from "./SettingDefinition";

export type SettingProps<T extends SettingDefinition> = {
  onChange: (value: any) => void;
  value: any;
  def: T;
  node: NodeData;
};
