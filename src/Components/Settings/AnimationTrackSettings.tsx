import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconX } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { AnimationKeyFrame, AnimationTrack, createDefaultAnimationKeyframe } from "../../Types/AnimationTrack";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { Easing, EasingFunctionType } from "../../libs/easing";
import { EasingIcon } from "../../libs/EasingIcon";
import { NumberInput } from "../Generics/Inputs/NumberInput";
import { useListManipulator } from "../../Hooks/useListManipulator";
import { AnimationTrackSettingDefinition } from "../../Types/SettingDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";

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

export const AnimationTrackSettings: SettingComponent<AnimationTrackSettingDefinition> = function ({ onChange, value, def }: SettingProps<AnimationTrackSettingDefinition>) {
  const track = value as AnimationTrack;
  const type = track.type;
  var portDescription = PortTypeDefinitions[type];
  var PortSettings = portDescription.inlineInput;

  var { change, addNew, remove } = useListManipulator(
    track.keyframes,
    (list) => {
      list.sort((a: AnimationKeyFrame, b: AnimationKeyFrame) => a.pos - b.pos);
      onChange({ ...track, keyframes: list });
    },
    () => createDefaultAnimationKeyframe(type),
    false
  );

  function onChangeValue(i: number, newValue: any): void {
    change(i, { ...track.keyframes[i], value: newValue });
  }
  function onChangePosition(i: number, pos: any): void {
    change(i, { ...track.keyframes[i], pos: pos });
  }
  function onChangeLerp(i: number, newLerp: any): void {
    change(i, { ...track.keyframes[i], lerp: newLerp });
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
                <MenuItem
                  key={item}
                  onClick={() => onChangeLerp(i, item)}>
                  <EasingIcon fn={item as EasingFunctionType} />
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <button
              className="delete"
              onClick={() => remove(i)}
              disabled={track.keyframes.length <= 1}>
              <IconX />
            </button>
          </li>
        ))}
      </ColorList>

      <ButtonGroup>
        <Button
          onClick={() => addNew()}
          label="Add"
        />
      </ButtonGroup>
    </div>
  );
};
AnimationTrackSettings.getSize = function (value, def): number {
  return 32 * value.keyframes.length + 60 + 10;
};
