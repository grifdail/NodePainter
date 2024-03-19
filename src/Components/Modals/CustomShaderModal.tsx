import { Modal } from "../Modal";
import { IconFunctionFilled } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { TextInput } from "../Settings/TextInput";
import { useCustomNodeCreationContext } from "../../Hooks/useCustomNodeCreationContext";
import { InputPortEdit } from "./InputPortEdit";
import { CustomNodeMainDiv } from "../StyledComponents/CustomNodeMainDiv";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "image"];

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
            <InputPortEdit key={i} port={port} context={context} index={i} role="inputData" availableTypes={AvailableTypesInput} />
          ))}
          <ButtonGroup>
            <button onClick={() => context.addInputs("input")}>Add</button>
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
