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
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { CodeBlockVariableList } from "./CodeBlock/CodeBlockVariableList";
import { PortDiv } from "./CustomNodes/PortDiv";
import { PortRole } from "../../Types/PortRole";
import { PortType } from "../../Types/PortType";

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

export function CodeBlockModal() {
  const state = useCodeBlockModal();
  const codeBlock = state.current;
  return (
    <Modal
      onClose={state.close}
      title="Paint"
      icon={IconBrush}
      size="small">
      <MainDiv>
        <div></div>
      </MainDiv>
    </Modal>
  );
}
