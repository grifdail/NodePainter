import { NodeDefinition } from "../Types/NodeDefinition";
import { SettingDefinition } from "../Types/SettingDefinition";

export function createSettingObjectForSettingDefinition(def: NodeDefinition): { [key: string]: any } {
  return def.settings.reduce((old: any, setting: SettingDefinition) => {
    old[setting.id] = structuredClone(setting.defaultValue);
    return old;
  }, {});
}
