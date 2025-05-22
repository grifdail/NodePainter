import { GroupSettingDefinition, SettingDefinition, SettingType } from "../Types/SettingDefinition";

const identity = (x: any) => x;

export const CustomInitializer: { [key in SettingType]: <T extends SettingDefinition>(clonedValue: any, setting: T) => any } = {
  string: identity,

  number: identity,
  hidden: identity,

  dropdown: identity,
  palette: identity,
  gradient: identity,
  "image-upload": identity,
  "image-paint": identity,
  envelope: identity,
  buttons: identity,
  "mesh-upload": identity,
  "easing-preview": identity,
  "code-block": identity,
  "image-select": identity,
  group: function (clonedValue: any, setting: GroupSettingDefinition) {
    return { ...createSettingObjectForSettingDefinition(setting.settings), _open: false };
  } as any,
  bool: identity,
  "animation-track": identity,
};

export function createSettingObjectForSettingDefinition(def: SettingDefinition[]): { [key: string]: any } {
  return def.reduce((old: any, setting: SettingDefinition) => {
    var base = "defaultValue" in setting ? structuredClone(setting.defaultValue) : undefined;
    var initializer = (old[setting.id] = CustomInitializer[setting.type](base, setting));
    return old;
  }, {});
}
