import { IconBrush, IconBucket, IconCircleFilled, IconClearAll, IconEraser, IconPointFilled } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { usePainting } from "../../Hooks/usePainting";
import { ColorInput } from "../Settings/ColorInput";
import { toHex } from "../../Utils/colorUtils";
import { PaintingSketch } from "./PaintingSketch";
import { PaletteColorSelector } from "./PaletteColorSelector";
import { NumberInput } from "../Settings/NumberInput";
import { PaintingToolbar } from "../StyledComponents/PaintingToolbar";

const MainDiv = styled.div`
  width: 100%;
  canvas {
    background: repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 20px 20px;
  }
`;

export function PaintModal() {
  var paintingState = usePainting();

  return (
    <Modal onClose={paintingState.close} title="Paint" icon={IconBrush}>
      <MainDiv>
        <PaintingToolbar className="toolbar">
          <div className="section">
            <button onClick={() => paintingState.clear()} data-tooltip-id="tooltip" data-tooltip-content="Clear">
              <IconClearAll />
            </button>
          </div>
          <div className="section">
            <button onClick={() => paintingState.setTool("pen")} data-tooltip-id="tooltip" data-tooltip-content="Brush" className={paintingState.tool === "pen" ? "selected" : ""}>
              <IconBrush />
            </button>
            <button onClick={() => paintingState.setTool("eraser")} data-tooltip-id="tooltip" data-tooltip-content="Eraser" className={paintingState.tool === "eraser" ? "selected" : ""}>
              <IconEraser />
            </button>
            <button onClick={() => paintingState.setTool("fill")} data-tooltip-id="tooltip" data-tooltip-content="Fill" className={paintingState.tool === "fill" ? "selected" : ""}>
              <IconBucket />
            </button>
          </div>
          <div className="section">
            <ColorInput onChange={paintingState.setColor} value={paintingState.color} disabled={paintingState.tool === "eraser"}>
              <button data-tooltip-id="tooltip" data-tooltip-content={`Color ${toHex(paintingState.color)}`} disabled={paintingState.tool === "eraser"}>
                <IconCircleFilled style={{ color: toHex(paintingState.color) }}></IconCircleFilled>
              </button>
            </ColorInput>
            <fieldset className="slider" disabled={paintingState.tool === "fill"}>
              <IconPointFilled />
              <input type="range" value={paintingState.lineWidth} min={1} max={100} onChange={(e) => paintingState.setLineWidth(parseInt(e.target.value))} />
              <IconCircleFilled />
              <NumberInput className="label" value={paintingState.lineWidth} onChange={paintingState.setLineWidth} />
            </fieldset>
          </div>
        </PaintingToolbar>
        <PaintingSketch onSaveGraphics={paintingState.saveImage} />
        <PaletteColorSelector onChangePalette={paintingState.setColorPalette} onSelectColor={paintingState.setColor} currentPalette={paintingState.colorPalette} currentColor={paintingState.color} />
      </MainDiv>
    </Modal>
  );
}
