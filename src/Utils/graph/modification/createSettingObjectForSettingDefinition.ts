import { GroupSettingDefinition, SettingDefinition, SettingType } from "../../../Types/SettingDefinition";

const identity = (x: any) => x;

export const CustomInitializer: { [key in SettingType]: <T extends SettingDefinition>(clonedValue: any, setting: T) => any } = {
  string: identity,
  "text-area": identity,

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
  path: () => [],
  "bezier-path": () => [],
  "graph-area": () => ({ name: "", relative: true, x: -400, y: -400, width: 400, height: 400, color: [0, 0.3, 0.9, 0.8] }),
};

export function createSettingObjectForSettingDefinition(def: SettingDefinition[]): { [key: string]: any } {
  return def.reduce((old: any, setting: SettingDefinition) => {
    var base = "defaultValue" in setting ? structuredClone(setting.defaultValue) : undefined;
    var initializer = (old[setting.id] = CustomInitializer[setting.type](base, setting));
    return old;
  }, {});
}
