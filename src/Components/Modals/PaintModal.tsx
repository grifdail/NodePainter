import { IconBrush, IconBucket, IconCircleFilled, IconClearAll, IconEraser, IconNumber10Small, IconNumber1Small, IconNumber25Small, IconNumber5Small } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { usePainting } from "../../Hooks/usePainting";
import { ColorInput } from "../Settings/ColorInput";
import { toHex } from "../../Utils/colorUtils";
import { PaintingSketch } from "./PaintingSketch";
import { PaletteColorSelector } from "./PaletteColorSelector";

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
        <ButtonGroup className="toolbar">
          <button onClick={() => paintingState.clear()}>
            <IconClearAll />
          </button>
          <button onClick={() => paintingState.setTool("pen")}>
            <IconBrush />
          </button>
          <button onClick={() => paintingState.setTool("eraser")}>
            <IconEraser />
          </button>
          <button onClick={() => paintingState.setTool("fill")}>
            <IconBucket />
          </button>
          <ColorInput onChange={paintingState.setColor} value={paintingState.color}>
            <button>
              <IconCircleFilled style={{ color: toHex(paintingState.color) }}></IconCircleFilled>
            </button>
          </ColorInput>
          <button onClick={() => paintingState.setLineWidth(1)}>
            <IconNumber1Small />
          </button>
          <button onClick={() => paintingState.setLineWidth(5)}>
            <IconNumber5Small />
          </button>
          <button onClick={() => paintingState.setLineWidth(10)}>
            <IconNumber10Small />
          </button>
          <button onClick={() => paintingState.setLineWidth(25)}>
            <IconNumber25Small />
          </button>
        </ButtonGroup>
        <PaintingSketch onSaveGraphics={paintingState.saveImage} />
        <PaletteColorSelector onChangePalette={paintingState.setColorPalette} onSelectColor={paintingState.setColor} currentPalette={paintingState.colorPalette} currentColor={paintingState.color} />
      </MainDiv>
    </Modal>
  );
}
