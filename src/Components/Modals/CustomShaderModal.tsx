import { Modal } from "../Modal";
import styled from "styled-components";
import { IconFunctionFilled, IconX } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NodeDefinition, PortType } from "../../Data/NodeDefinition";
import { PortColor } from "../StyledComponents/PortColor";
import { TextInput } from "../Settings/TextInput";
import { CustomFunctionCreationContextStore, useCustomNodeCreationContext } from "../../Hooks/useCustomNodeCreationContext";
import { CustomNodeMainDiv, InputPortEdit } from "./CustomNodeModal";

const AvailableTypes: Array<PortType> = ["number", "vector2", "color", "bool", "gradient"];

export function CustomShaderModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <Modal onClose={close} title="Edit Node" icon={IconFunctionFilled}>
      <CustomNodeMainDiv>
        <section className="header">
          <fieldset>
            <label>Name</label>
            <TextInput value={def.id} onChange={context.setId}></TextInput>
          </fieldset>
        </section>
        <section>
          <h3>Inputs</h3>
          {def.dataInputs.map((port, i) => (
            <InputPortEdit key={i} port={port} context={context} index={i} role="inputData" />
          ))}
          <ButtonGroup>
            <button onClick={context.addInputs}>Add</button>
          </ButtonGroup>
        </section>
        <ButtonGroup>
          <button onClick={context.cancel}>Cancel</button>
          <button onClick={context.create}>Create</button>
        </ButtonGroup>
      </CustomNodeMainDiv>
    </Modal>
  );
}
