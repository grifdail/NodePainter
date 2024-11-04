import { IconBrush, IconCircleFilled, IconClearAll, IconPointFilled, IconSquare, IconSquareFilled } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { PaintingTool, usePainting } from "../../Hooks/usePainting";
import { ColorInput } from "../Inputs/ColorInput";
import { toHex } from "../../Utils/colorUtils";
import { PaintingSketch } from "./Drawing/PaintingSketch";
import { PaletteColorSelector } from "./PaletteColorSelector";
import { NumberInput } from "../Inputs/NumberInput";
import { PaintingToolbar } from "../StyledComponents/PaintingToolbar";
import { Tools } from "./Drawing/Tools";
import { DialogData, useDialog } from "../../Hooks/useDialog";

const MainDiv = styled.div`
  width: 100%;
  //overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  gap: var(--padding-medium);
  align-items: stretch;

  & > ${PaintingToolbar} {
    flex: 0 0 content;
  }
`;

const ToolbarButton = styled.button`
  border: 0;
  padding: 0;
  flex: 0 0 24px;
  color: white;
  padding: var(--padding-small);

  border-radius: var(--border-radius-small);
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

  return (
    <Modal onClose={paintingState.close} title="Paint" icon={IconBrush}>
      <MainDiv>
        <PaintingToolbar className="toolbar">
          <ToolbarButton onClick={onClear} data-tooltip-id="tooltip" data-tooltip-content="Clear">
            <IconClearAll />
          </ToolbarButton>
          {Object.entries(Tools).map(([id, tool]) => {
            const Icon = tool.icon;
            return (
              <ToolbarButton onClick={() => paintingState.setTool(id as PaintingTool)} data-tooltip-id="tooltip" data-tooltip-content={tool.label} className={paintingState.tool === id ? "selected" : ""}>
                <Icon></Icon>
              </ToolbarButton>
            );
          })}

          <ColorInput onChange={paintingState.setColor} value={paintingState.color} disabled={!Tools[paintingState.tool].hasColor}>
            <button data-tooltip-id="tooltip" data-tooltip-content={`Color ${toHex(paintingState.color)}`} disabled={!Tools[paintingState.tool].hasColor}>
              <IconCircleFilled style={{ color: toHex(paintingState.color) }}></IconCircleFilled>
            </button>
          </ColorInput>
          <ToolbarButton onClick={paintingState.togleFillMode} data-tooltip-id="tooltip" data-tooltip-content={`Fill mode: ${paintingState.fillMode}`} disabled={!Tools[paintingState.tool].hasFillMode}>
            {paintingState.fillMode === "stroke" ? <IconSquare /> : <IconSquareFilled />}
          </ToolbarButton>
          <fieldset className="slider" disabled={!Tools[paintingState.tool].hasLineWidth} data-tooltip-id="tooltip" data-tooltip-content={`line width: ${paintingState.lineWidth}`}>
            <IconPointFilled />
            <input type="range" value={paintingState.lineWidth} min={1} max={100} onChange={(e) => paintingState.setLineWidth(parseInt(e.target.value))} />
            <IconCircleFilled />
            <NumberInput className="label" value={paintingState.lineWidth} onChange={paintingState.setLineWidth} />
          </fieldset>
        </PaintingToolbar>

        <PaintingSketch onSaveGraphics={paintingState.saveImage} />
        <PaletteColorSelector onChangePalette={paintingState.setColorPalette} onSelectColor={paintingState.setColor} currentPalette={paintingState.colorPalette} currentColor={paintingState.color} />
      </MainDiv>
    </Modal>
  );
}
