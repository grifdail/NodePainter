import { IconBrush } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { PortEditList } from "./CustomNodes/PortDiv";
import { FullCommonTypes } from "../../Types/PortType";

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
        <PortEditList
          ports={codeBlock.ownVariables}
          label="Variables"
          prefix="var"
          availableTypes={FullCommonTypes}
          onChange={state.setOwnVariable}
        />
      </MainDiv>
    </Modal>
  );
}
