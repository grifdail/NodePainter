import { IconBrush, IconClearAll } from "@tabler/icons-react";
import styled from "styled-components";
import { PaintingStore, PaintingTool, usePainting } from "../../../Hooks/usePainting";
import { useDialog } from "../../../Hooks/useDialog";
import { Tools } from "../Drawing/Tools";
import { Modal } from "../../Modal";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { ColorInput } from "../../Generics/Inputs/ColorInput";
import { SliderInput } from "../../Generics/Inputs/SliderInput";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { PaletteColorSelector } from "../Drawing/PaletteColorSelector";
import { Button } from "../../Generics/Button";
import { PaintingSketch } from "../Drawing/PaintingSketch";
import { createDimensionPrompt } from "../../../Utils/ui/createDimensionPrompt";


const MainDiv = styled.div`
  width: 100%;
  //overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: var(--padding-medium);
  align-items: stretch;

  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

const ToolDiv = styled.div`
  gap: var(--padding-medium);
  display: flex;
  flex-direction: column;
  flex: 1 1 400px;

  & > hr {
    appearance: none;
    flex: 1 1 0;
    align-items: stretch;
    opacity: 0;
  }

  @media (max-width: 800px) {
    flex: 1 1 0;

    & > hr {
      appearance: none;
      flex: 0 0 0;
      align-items: stretch;
      opacity: 0;
    }
  }
`;

export function PaintedAnimationModal() {
    var paintingState = usePainting();

    const onClear = () => {
        useDialog.getState().openConfirm((confirmed) => {
            if (!confirmed) {
                return;
            }
            createDimensionPrompt(() => { });
        });
    };

    return (
        <Modal
            onClose={paintingState.close}
            title="Paint"
            icon={IconBrush}
            size="small">
            <MainDiv>
                <PaintingSketch onSaveGraphics={paintingState.saveImage} />
                <ToolDiv>
                    <Fieldset
                        input={DropdownInput}
                        value={paintingState.tool}
                        onChange={(tool) => paintingState.setTool(tool as PaintingTool)}
                        label="Tool"
                        passtrough={{
                            options: Object.keys(Tools),
                            useTemplateForField: true,
                            template: (toolId: PaintingTool) => {
                                const tool = Tools[toolId];
                                if (tool) {
                                    const Icon = tool.icon;
                                    return (
                                        <>
                                            <Icon></Icon>
                                            {tool.label}
                                        </>
                                    );
                                } else {
                                    return tool;
                                }
                            },
                        }}
                    />

                    <Fieldset
                        label="Color"
                        value={paintingState.color}
                        input={ColorInput}
                        onChange={paintingState.setColor}
                    />
                    <Fieldset
                        label="Line Width"
                        input={SliderInput as any}
                        value={paintingState.lineWidth}
                        onChange={paintingState.setLineWidth}
                        passtrough={{ min: 1, max: 100 }}
                    />
                    <hr></hr>
                    <PaletteColorSelector
                        onChangePalette={paintingState.setColorPalette}
                        onSelectColor={paintingState.setColor}
                        currentPalette={paintingState.colorPalette}
                        currentColor={paintingState.color}
                    />
                    <ButtonGroup>
                        <Button
                            icon={IconClearAll}
                            label="New image"
                            onClick={onClear}
                            data-tooltip-id="tooltip"
                            data-tooltip-content="Clear"
                        />
                    </ButtonGroup>
                </ToolDiv>
            </MainDiv>
        </Modal>
    );
}

