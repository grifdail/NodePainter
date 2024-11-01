import { Icon, IconFunctionFilled } from "@tabler/icons-react";
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
  availableTypesOutput?: Array<PortType>;
  availableTypesInput?: Array<PortType>;
  hasExecuteOption?: boolean;
  settings: {
    creationTitle: string;
    editionTitlePrefix: string;
    subtitle: string;
    icon: Icon;
    inputTitle: string;
    inputTooltip: string;
    inputPrefix: string;
    outputTitle: string;
    outputTooltip: string;
    outputPrefix: string;
  };
} & CustomFunctionCreationContextStore;

export const CustomFunctionModalNoLogic = ({ settings, hasExecuteOption, close, nodeDefinition, mode, addInputs, addOutput, cancel, isNameValid, create, availableTypesOutput, availableTypesInput, ...context }: CustomNodeModalNoLogicProps) => {
  return (
    <Modal onClose={close} title={mode === "edit" ? `${settings.editionTitlePrefix} ${nodeDefinition?.id}` : settings.creationTitle} icon={settings.icon} size="small" stretch>
      <CustomNodeMainDiv>
        <p className="subtitle">{settings.subtitle}</p>
        <CustomNodeModalHeader def={nodeDefinition} hasExecuteOption={!!hasExecuteOption} isNameValid={isNameValid} setCanBeExecuted={context.setCanBeExecuted} setDescription={context.setDescription} setId={context.setId} mode={mode}></CustomNodeModalHeader>
        <PortRootDiv>
          {availableTypesInput && <PortDiv label={settings.inputTitle} ports={nodeDefinition.dataInputs} tooltip={settings.inputTooltip} addPort={() => addInputs(settings.inputPrefix)} role="inputData" availableTypes={availableTypesInput} {...context} />}
          {availableTypesOutput && <PortDiv label={settings.outputTitle} ports={nodeDefinition.dataOutputs} tooltip={settings.outputTooltip} addPort={() => addOutput(settings.outputPrefix)} role="outputData" availableTypes={availableTypesOutput} {...context} />}
        </PortRootDiv>
        <ButtonGroup>
          <InvisibleButton label="Cancel" onClick={cancel}></InvisibleButton>
          <Button label="Create" disabled={!isNameValid()} onClick={create}></Button>
        </ButtonGroup>
      </CustomNodeMainDiv>
    </Modal>
  );
};
