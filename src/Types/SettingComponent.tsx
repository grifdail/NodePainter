import { FunctionComponent } from "react";
import { NodeData } from "./NodeData";
import { SettingDefinition } from "./SettingDefinition";
import { SettingProps } from "./SettingProps";

export type SettingComponent<T extends SettingDefinition> = {
    UI: FunctionComponent<SettingProps<T>>
    getSize: (value: any, def: T, node?: NodeData) => number,
    generate?: () => T
    initializeValue?: (clonedValue: any, setting: T) => any
}