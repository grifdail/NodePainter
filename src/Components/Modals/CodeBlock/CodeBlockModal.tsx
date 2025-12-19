import { IconCodeDots } from "@tabler/icons-react";
import styled from "styled-components";
import { NodeVariableContext } from "../../../Hooks/NodeVariableContext";
import { useCodeBlockModal } from "../../../Hooks/useCodeBlockModal";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { Modal } from "../../Modal";
import { PortEditList } from "../CustomNodes/PortEditList";
import { CodeBlockStatementList } from "./CodeBlockStatementList";

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
    const variables = [...codeBlock.inputVariables, ...codeBlock.localVariables, ...codeBlock.outputVariables]

    return (
        <Modal
            onClose={state.close}
            title="Code Block"
            icon={IconCodeDots}
            size="large">
            <MainDiv>
                <VariableSection>
                    <PortEditList
                        ports={codeBlock.localVariables}
                        label="Variables"
                        prefix="var"
                        availableTypes={portTypesWithTags(["common"])}
                        onChange={(ports) => state.setVariables(ports, "local")}
                    />
                    <PortEditList
                        ports={codeBlock.inputVariables}
                        label="Inputs"
                        prefix="in"
                        availableTypes={portTypesWithTags(["common"])}
                        onChange={(ports) => state.setVariables(ports, "input")}
                    />
                    <PortEditList
                        ports={codeBlock.outputVariables}
                        label="Outputs"
                        prefix="out"
                        availableTypes={portTypesWithTags(["common"])}
                        onChange={(ports) => state.setVariables(ports, "output")}
                    />
                </VariableSection>
                <NodeVariableContext.Provider value={variables}>
                    <CodeBlockStatementList
                        statements={codeBlock.statements}
                        onChange={state.setStatements}
                    />
                </NodeVariableContext.Provider>
            </MainDiv>
        </Modal>
    );
}
