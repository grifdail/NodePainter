import { SettingDefinition } from "../Types/SettingDefinition";
import { SettingType } from "../Types/SettingType";

const identity = (x: any) => x;

export const CustomInitializer: { [key in SettingType]: (clonedValue: any, setting: SettingDefinition) => any } = {
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
  animationTrack: identity,
  "mesh-upload": identity,
  "easing-preview": identity,
  "code-block": identity,
  group: function (clonedValue: any, setting: SettingDefinition) {
    return { ...createSettingObjectForSettingDefinition(setting.settings), _open: false };
  },
  bool: identity,
};

export function createSettingObjectForSettingDefinition(def: SettingDefinition[]): { [key: string]: any } {
  return def.reduce((old: any, setting: SettingDefinition) => {
    var base = structuredClone(setting.defaultValue);
    var initializer = (old[setting.id] = CustomInitializer[setting.type](base, setting));
    return old;
  }, {});
}
