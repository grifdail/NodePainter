import { NodeData } from "../../Types/NodeData";
import { SettingDefinition } from "../../Types/SettingDefinition";
import { SettingProps } from "./SettingProps";

export type SettingComponent<T extends SettingDefinition> = ((props: SettingProps<T>) => any) & {
  getSize: (value: any, def: T, node?: NodeData) => number;
};
