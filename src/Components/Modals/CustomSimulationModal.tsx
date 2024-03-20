import { Modal } from "../Modal";
import { IconFunctionFilled } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { TextInput } from "../Settings/TextInput";
import { useCustomNodeCreationContext } from "../../Hooks/useCustomNodeCreationContext";
import { CustomNodeMainDiv } from "../StyledComponents/CustomNodeMainDiv";
import { InputPortEdit } from "./InputPortEdit";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "image", "string"];
const AvailableTypesOutput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "string"];

export function CustomSimulationModal({ close }: { close: () => void }) {
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
          <h3>Params</h3>
          <p>These params can be passed from outside the simulation</p>
          {def.dataInputs.map((port, i) => (
            <InputPortEdit key={i} port={port} context={context} index={i} role="inputData" availableTypes={AvailableTypesInput} />
          ))}
          <ButtonGroup>
            <button onClick={() => context.addInputs("params")}>Add</button>
          </ButtonGroup>
        </section>
        <section>
          <h3>Simulations Variables</h3>
          <p>These parameters are saved in between runs.</p>
          {def.dataOutputs.map((port, i) => (
            <InputPortEdit key={i} port={port} index={i} role="outputData" availableTypes={AvailableTypesOutput} context={context} />
          ))}
          <ButtonGroup>
            <button onClick={() => context.addOutput("state")}>Add</button>
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
