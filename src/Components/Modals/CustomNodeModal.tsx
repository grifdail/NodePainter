import { Modal } from "../Modal";
import { IconFunctionFilled } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { TextInput } from "../Settings/TextInput";
import { useCustomNodeCreationContext } from "../../Hooks/useCustomNodeCreationContext";
import { CustomNodeMainDiv } from "../StyledComponents/CustomNodeMainDiv";
import { InputPortEdit } from "./InputPortEdit";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "image", "string", "material"];
const AvailableTypesOutput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "string", "material"];

export function CustomNodeModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <Modal onClose={close} title="Edit Node" icon={IconFunctionFilled}>
      <CustomNodeMainDiv>
        <section className="header">
          <fieldset className={context.isNameValid() ? "" : "invalid"}>
            <label>Name</label>
            <TextInput disabled={context.mode === "edit"} value={def.id} onChange={context.setId}></TextInput>
          </fieldset>
          <fieldset>
            <label>Can be executed</label>
            <input type="checkbox" onChange={(e) => context.setCanBeExecuted(!def.canBeExecuted)}></input>
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
        <section>
          <h3>Outputs</h3>
          {def.dataOutputs.map((port, i) => (
            <InputPortEdit key={i} port={port} index={i} role="outputData" availableTypes={AvailableTypesOutput} context={context} />
          ))}
          <ButtonGroup>
            <button onClick={() => context.addOutput("output")}>Add</button>
          </ButtonGroup>
        </section>
        <ButtonGroup>
          <button onClick={context.cancel}>Cancel</button>
          <button disabled={!context.isNameValid()} onClick={context.create}>
            Create
          </button>
        </ButtonGroup>
      </CustomNodeMainDiv>
    </Modal>
  );
}
