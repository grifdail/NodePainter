import { SettingComponent, SettingProps } from "./SettingsComponents";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";
import { NumberInput } from "../Inputs/NumberInput";
import { Button } from "../Generics/Button";
import { AnimationKeyFrame, AnimationTrack, createDefaultAnimationKeyframe } from "../../Types/AnimationTrack";
import { PortColor } from "../StyledComponents/PortColor";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Easing, EasingFunctionType } from "../../libs/easing";
import { EasingIcon } from "../../libs/EasingIcon";

const ColorList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: stretch;
  justify-content: start;
  padding: 0;
  margin: 0;

  & > li {
    padding: 0;
    margin: 0;
    height: 30px;
    flex: 0 0 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: stretch;
    gap: 2px;

    background: color-mix(in srgb, var(--color-property), transparent 90%);
    border: 1px solid color-mix(in srgb, var(--color-property), transparent 50%);
    border-radius: var(--border-radius-large);

    & > input.pos {
      width: 50px;
      flex: 0 0 50px;
      text-align: center;
    }

    & > button {
      flex: 0 0 10px;
      border: none;
      cursor: pointer;
      background: none;
      padding: 0;
      margin: 0;
    }
  }
`;

export const AnimationTrackSettings: SettingComponent = function ({ onChange, value, def }: SettingProps) {
  const track = value as AnimationTrack;
  const type = track.type;
  var portDescription = PortColor[type];
  var PortSettings = portDescription.input;
  var list = track.keyframes;

  function onChangeValue(i: number, newValue: any): void {
    onChange({ ...track, keyframes: [...list.slice(0, i), { ...list[i], value: newValue }, ...list.slice(i + 1, list.length)] });
  }
  function onChangePosition(i: number, pos: any): void {
    var newList: AnimationKeyFrame[] = [...list.slice(0, i), { ...list[i], pos: Math.min(1, Math.max(pos, 0)) }, ...list.slice(i + 1, list.length)];
    newList.sort((a: AnimationKeyFrame, b: AnimationKeyFrame) => a.pos - b.pos);
    onChange({ ...track, keyframes: newList });
  }
  function onChangeLerp(i: number, newLerp: any): void {
    var newList: AnimationKeyFrame[] = [...list.slice(0, i), { ...list[i], lerp: newLerp }, ...list.slice(i + 1, list.length)];
    newList.sort((a: AnimationKeyFrame, b: AnimationKeyFrame) => a.pos - b.pos);
    onChange({ ...track, keyframes: newList });
  }

  function addNewColor(): void {
    var newList: AnimationKeyFrame[] = [...list, createDefaultAnimationKeyframe(track.type)];
    newList.sort((a: AnimationKeyFrame, b: AnimationKeyFrame) => a.pos - b.pos);
    onChange({ ...track, keyframes: newList });
  }

  function removeTrack(i: number): void {
    if (list.length > 2) {
      onChange([...list.slice(0, i), ...list.slice(i + 1, list.length)]);
    }
  }

  return (
    <div>
      <ColorList>
        {track.keyframes.map((stop: AnimationKeyFrame, i: number) => (
          <li
            key={i}
            className={type}>
            <NumberInput
              className="pos"
              value={stop.pos}
              onChange={(v) => onChangePosition(i, v)}></NumberInput>
            {PortSettings && (
              <PortSettings
                value={stop.value}
                onChange={(v) => onChangeValue(i, v)}
              />
            )}
            <Menu
              menuButton={
                <MenuButton className={"button"}>
                  <EasingIcon
                    fn={stop.lerp}
                    size={20}
                  />
                </MenuButton>
              }
              portal>
              {Object.keys(Easing).map((item) => (
                <MenuItem onClick={() => onChangeLerp(i, item)}>
                  <EasingIcon fn={item as EasingFunctionType} />
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <button
              className="delete"
              onClick={() => removeTrack(i)}
              disabled={track.keyframes.length <= 1}>
              <IconX />
            </button>
          </li>
        ))}
      </ColorList>

      <ButtonGroup>
        <Button
          onClick={addNewColor}
          label="Add"
        />
      </ButtonGroup>
    </div>
  );
};
AnimationTrackSettings.getSize = function (value, def): number {
  return 32 * value.keyframes.length + 60 + 10;
};
