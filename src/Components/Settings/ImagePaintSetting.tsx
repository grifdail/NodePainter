import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconBrush } from "@tabler/icons-react";
import { usePainting } from "../../Hooks/usePainting";
import { Button } from "../Generics/Button";
import { ImagePaintSettingDefinition } from "../../Types/SettingDefinition";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;
  & > div.file,
  & img {
    flex-grow: 1;
    display: block flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    max-height: 180px;
    background: var(--gradient-transparent);
  }
  & svg {
    height: 50%;
    width: 50%;
  }
`;

export const ImagePaintSetting: SettingComponent<ImagePaintSettingDefinition> = {
    UI: function PaletteSetting({ onChange, value, def }: SettingProps<ImagePaintSettingDefinition>) {
        return (
            <Body>
                {value === null && (
                    <div className="file">
                        <IconBrush />
                    </div>
                )}
                {value !== null && (
                    <img
                        src={value}
                        alt="loaded"></img>
                )}

                <ButtonGroup hidden={value !== null}>
                    <Button
                        onClick={() => usePainting.getState().open(value, onChange)}
                        label="Paint"
                        icon={IconBrush}
                    />
                </ButtonGroup>
            </Body>
        );
    },
    getSize: function (value, def): number {
        return 250;
    }
};
