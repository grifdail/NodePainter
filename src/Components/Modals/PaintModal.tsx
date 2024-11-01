import { IconBrush, IconBucketDroplet, IconCircle, IconCircleFilled, IconClearAll, IconEraser, IconLine, IconPointFilled, IconSquare, IconSquareFilled } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { usePainting } from "../../Hooks/usePainting";
import { ColorInput } from "../Inputs/ColorInput";
import { toHex } from "../../Utils/colorUtils";
import { PaintingSketch } from "./Drawing/PaintingSketch";
import { PaletteColorSelector } from "./PaletteColorSelector";
import { NumberInput } from "../Inputs/NumberInput";
import { PaintingToolbar } from "../StyledComponents/PaintingToolbar";
import { Tools } from "./Drawing/Tools";

const MainDiv = styled.div`
  width: 100%;
  canvas {
    background: repeating-conic-gradient(#eee 0% 25%, transparent 0% 50%) 50% / 20px 20px;
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
              <IconBucketDroplet />
            </button>
            <button onClick={() => paintingState.setTool("line")} data-tooltip-id="tooltip" data-tooltip-content="Line" className={paintingState.tool === "line" ? "selected" : ""}>
              <IconLine />
            </button>
            <button onClick={() => paintingState.setTool("circle")} data-tooltip-id="tooltip" data-tooltip-content="Circle" className={paintingState.tool === "circle" ? "selected" : ""}>
              <IconCircle />
            </button>
          </div>
          <div className="section">
            <ColorInput onChange={paintingState.setColor} value={paintingState.color} disabled={!Tools[paintingState.tool].hasColor}>
              <button data-tooltip-id="tooltip" data-tooltip-content={`Color ${toHex(paintingState.color)}`} disabled={!Tools[paintingState.tool].hasColor}>
                <IconCircleFilled style={{ color: toHex(paintingState.color) }}></IconCircleFilled>
              </button>
            </ColorInput>
            <fieldset className="slider" disabled={!Tools[paintingState.tool].hasLineWidth} data-tooltip-id="tooltip" data-tooltip-content={`line width: ${paintingState.lineWidth}`}>
              <IconPointFilled />
              <input type="range" value={paintingState.lineWidth} min={1} max={100} onChange={(e) => paintingState.setLineWidth(parseInt(e.target.value))} />
              <IconCircleFilled />
              <NumberInput className="label" value={paintingState.lineWidth} onChange={paintingState.setLineWidth} />
            </fieldset>
            <button onClick={paintingState.togleFillMode} data-tooltip-id="tooltip" data-tooltip-content={`Fill mode: ${paintingState.fillMode}`} disabled={!Tools[paintingState.tool].hasFillMode}>
              {paintingState.fillMode === "stroke" ? <IconSquare /> : <IconSquareFilled />}
            </button>
          </div>
        </PaintingToolbar>
        <PaintingSketch onSaveGraphics={paintingState.saveImage} />
        <PaletteColorSelector onChangePalette={paintingState.setColorPalette} onSelectColor={paintingState.setColor} currentPalette={paintingState.colorPalette} currentColor={paintingState.color} />
      </MainDiv>
    </Modal>
  );
}
