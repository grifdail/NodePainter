import { IconFunctionFilled } from "@tabler/icons-react";
import { Button, InvisibleButton } from "../../Generics/Button";
import { Modal } from "../../Modal";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { CustomNodeMainDiv } from "./CustomNodeMainDiv";
import { CustomNodeModalHeader } from "./CustomNodeModalHeader";
import { CustomFunctionCreationContextStore } from "../../../Types/CustomFunctionCreationContextStore";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import styled from "styled-components";
import { PortDiv } from "./PortDiv";

export const PortRootDiv = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--padding-medium);
`;

type CustomNodeModalNoLogicProps = {
  close: () => void;
  nodeDefinition: NodeDefinition;
  availableTypesOutput: Array<PortType>;
  availableTypesInput: Array<PortType>;
} & CustomFunctionCreationContextStore;

export const CustomFunctionModalNoLogic = ({ close, nodeDefinition, mode, addInputs, addOutput, cancel, isNameValid, create, availableTypesOutput, availableTypesInput, ...context }: CustomNodeModalNoLogicProps) => {
  return (
    <Modal onClose={close} title={mode === "edit" ? `Edit node ${nodeDefinition?.id}` : "Create a custom node"} icon={IconFunctionFilled} size="small" stretch>
      <CustomNodeMainDiv>
        <p className="subtitle">A custom function allow you to reuse code across your sketch.</p>
        <CustomNodeModalHeader def={nodeDefinition} hasExecuteOption={true} isNameValid={isNameValid} setCanBeExecuted={context.setCanBeExecuted} setDescription={context.setDescription} setId={context.setId} mode={mode}></CustomNodeModalHeader>
        <PortRootDiv>
          <PortDiv label="Inputs" ports={nodeDefinition.dataInputs} tooltip="Test" addPort={() => addInputs("input")} role="inputData" availableTypes={availableTypesInput} {...context} />
          <PortDiv label="Output" ports={nodeDefinition.dataOutputs} tooltip="Test" addPort={() => addOutput("input")} role="outputData" availableTypes={availableTypesOutput} {...context} />
        </PortRootDiv>
        <ButtonGroup>
          <InvisibleButton onClick={cancel}>Cancel</InvisibleButton>
          <Button disabled={!isNameValid()} onClick={create}>
            Create
          </Button>
        </ButtonGroup>
      </CustomNodeMainDiv>
    </Modal>
  );
};
