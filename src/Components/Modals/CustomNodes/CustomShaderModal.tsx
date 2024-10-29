import { Modal } from "../../Modal";
import { IconFunctionFilled } from "@tabler/icons-react";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import { useCustomNodeCreationContext } from "../../../Hooks/useCustomNodeCreationContext";
import { InputPortEdit } from "./InputPortEdit";
import { CustomNodeModalHeader } from "./CustomNodeModalHeader";
import { CustomNodeMainDiv } from "./CustomNodeMainDiv";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "image"];

export function CustomShaderModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <Modal onClose={close} title={context.mode === "edit" ? `Edit Shader ${context.model?.id}` : "Create a shader"} icon={IconFunctionFilled}>
      <CustomNodeMainDiv>
        <p className="subtitle">Render an image by computing it's color pixel by pixels</p>
        <CustomNodeModalHeader def={def} hasExecuteOption={false} isNameValid={context.isNameValid} setCanBeExecuted={context.setCanBeExecuted} setDescription={context.setDescription} setId={context.setId} mode={context.mode}></CustomNodeModalHeader>
        <section>
          <h3>Inputs / Uniforms</h3>
          {def.dataInputs.map((port, i) => (
            <InputPortEdit key={i} port={port} index={i} role="inputData" availableTypes={AvailableTypesInput} {...context} />
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
