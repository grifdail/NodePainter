import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconBrush } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { openPaintAnimationModal } from "../../Actions/navigationAction";
import { FlipbookAnimationSettingDefinition } from "../../Types/SettingDefinition";
import { Frame } from "../Modals/FlipbookDrawingModal/Frame";

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
`;

export const FlipbookAnimationSetting: SettingComponent<FlipbookAnimationSettingDefinition> = {
    UI: function FlipbookAnimationSetting({ onChange, value, def, node }: SettingProps<FlipbookAnimationSettingDefinition>) {
        return (
            <Body>

                <div className="file" >
                    <svg width={180} height={180} viewBox="0 0 1 1">
                        <Frame frame={value[0]} />
                    </svg>
                </div>



                <ButtonGroup hidden={value !== null}>
                    <Button
                        onClick={() => openPaintAnimationModal("node", node.id)}
                        label="Paint"
                        icon={IconBrush}
                    />
                </ButtonGroup>
            </Body>
        );

    },
    getSize: function (value, def) {
        return 250;
    }
};

