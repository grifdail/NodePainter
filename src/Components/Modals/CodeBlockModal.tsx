import { IconCodeDots } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../Modal";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { PortEditList } from "./CustomNodes/PortDiv";
import { FullCommonTypes } from "../../Types/PortType";
import { CodeBlockStatementList } from "./CodeBlock/CodeBlockStatementList";

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

const VariableSection = styled.div`
  display: flex;
  justify-content: start;
  align-items: stretch;
  gap: var(--padding-medium);
  flex-direction: column;
  flex: 0 0 200px;
`;

export function CodeBlockModal() {
  const state = useCodeBlockModal();
  const codeBlock = state.current;
  return (
    <Modal
      onClose={state.close}
      title="Code Block"
      icon={IconCodeDots}
      size="large">
      <MainDiv>
        <VariableSection>
          <PortEditList
            ports={codeBlock.ownVariables}
            label="Variables"
            prefix="var"
            availableTypes={FullCommonTypes}
            onChange={state.setOwnVariable}
          />
          <PortEditList
            ports={codeBlock.inputVariables}
            label="Inputs"
            prefix="var"
            availableTypes={FullCommonTypes}
          />
          <PortEditList
            ports={codeBlock.outputVariables}
            label="Outputs"
            prefix="var"
            availableTypes={FullCommonTypes}
          />
        </VariableSection>
        <CodeBlockStatementList
          statements={codeBlock.statements}
          onChange={state.setStatements}></CodeBlockStatementList>
      </MainDiv>
    </Modal>
  );
}
