import { Modal } from "../Modal";
import { IconFunctionFilled } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { useCustomNodeCreationContext } from "../../Hooks/useCustomNodeCreationContext";
import { InputPortEdit } from "./InputPortEdit";
import { CustomNodeMainDiv } from "../StyledComponents/CustomNodeMainDiv";
import { CustomNodeModalHeader } from "./CustomNodeModalHeader";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "image"];

export function CustomShaderModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <Modal onClose={close} title="Edit Node" icon={IconFunctionFilled}>
      <CustomNodeMainDiv>
        <CustomNodeModalHeader context={context} def={def} hasExecuteOption={false}></CustomNodeModalHeader>
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
