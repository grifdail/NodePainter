import { SettingDefinition } from "../Data/NodeDefinition";
import { SettingComponent } from "./SettingsComponents";
import { ColorInput } from "./ColorInput";
import { ButtonGroup } from "./StyledComponents/ButtonGroup";
import { createColor } from "../Nodes/Color";

export const PaletteSetting: SettingComponent = function PaletteSetting({ onChange, value, def }: { onChange: (value: any) => void; value: any; def: SettingDefinition }) {
  var list = value as Array<any>;
  function onChangeColor(i: number, v: any): void {
    onChange([...list.slice(0, i), v, ...list.slice(i + 1, list.length)]);
  }

  function addNewColor(event: any): void {
    onChange([...list, createColor()]);
  }

  return (
    <div>
      {list.map((color: any, i: number) => (
        <ColorInput value={color} onChange={(v) => onChangeColor(i, v)}></ColorInput>
      ))}
      <ButtonGroup>
        <button onClick={addNewColor}>Add</button>
      </ButtonGroup>
    </div>
  );
};
PaletteSetting.getSize = function (value, def): number {
  return 32 * value.length + 50;
};
