import { IconBrush, IconClearAll } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { PaintingTool, usePainting } from "../../Hooks/usePainting";
import { ColorInput } from "../Inputs/ColorInput";
import { PaintingSketch } from "./Drawing/PaintingSketch";
import { PaletteColorSelector } from "./PaletteColorSelector";
import { NumberInput } from "../Inputs/NumberInput";
import { Tools } from "./Drawing/Tools";
import { DialogData, useDialog } from "../../Hooks/useDialog";
import { Fieldset } from "../StyledComponents/Fieldset";
import { DropdownInput } from "../Inputs/DropdownInput";
import { SliderInput } from "../Inputs/SliderInput";
import { Button } from "../Generics/Button";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";

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

export function PaintModal() {
  var paintingState = usePainting();

  const onClear = () => {
    useDialog.getState().openConfirm((confirmed) => {
      if (!confirmed) {
        return;
      }
      var modal: DialogData = {
        callback: function (button: any, fieldResult: { [key: string]: any } | undefined): void {
          if (button === "cancel" || fieldResult === undefined) {
            return;
          }
          paintingState.newImage(fieldResult.width, fieldResult.height);
        },
        buttons: [
          {
            key: "cancel",
            label: "Cancel",
            style: "invisible",
          },
          {
            key: "confirm",
            label: "Confirm",
            style: "normal",
          },
        ],
        fields: [
          {
            key: "width",
            label: "width",
            input: NumberInput,
            defaultValue: 400,
          },
          {
            key: "height",
            label: "height",
            input: NumberInput,
            defaultValue: 400,
          },
        ],
      };
      useDialog.getState().open(modal);
    });
  };

  var currentTool = Tools[paintingState.tool];
  return (
    <Modal onClose={paintingState.close} title="Paint" icon={IconBrush} size="small">
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
          {currentTool.hasColor && <Fieldset label="Color" value={paintingState.color} input={ColorInput} onChange={paintingState.setColor} />}
          {currentTool.hasFillMode && <Fieldset label="Fill Mode" input={DropdownInput} value={paintingState.fillMode} onChange={paintingState.setFillMode} passtrough={{ options: ["stroke", "fill"] }} />}
          {currentTool.hasLineWidth && <Fieldset label="Line Width" input={SliderInput as any} value={paintingState.lineWidth} onChange={paintingState.setLineWidth} passtrough={{ min: 1, max: 100 }} />}
          <hr></hr>
          <PaletteColorSelector onChangePalette={paintingState.setColorPalette} onSelectColor={paintingState.setColor} currentPalette={paintingState.colorPalette} currentColor={paintingState.color} />

          <ButtonGroup>
            <Button icon={IconClearAll} label="New image" onClick={onClear} data-tooltip-id="tooltip" data-tooltip-content="Clear" />
          </ButtonGroup>
        </ToolDiv>
      </MainDiv>
    </Modal>
  );
}
