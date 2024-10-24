import { Modal } from "../Modal";
import { IconFunctionFilled } from "@tabler/icons-react";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import { useCustomNodeCreationContext } from "../../Hooks/useCustomNodeCreationContext";
import { CustomNodeMainDiv } from "../StyledComponents/CustomNodeMainDiv";
import { InputPortEdit } from "./InputPortEdit";
import { CustomNodeModalHeader } from "./CustomNodeModalHeader";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "image", "string"];
const AvailableTypesOutput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "string"];

export function CustomSimulationModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <Modal onClose={close} title={context.mode === "edit" ? `Edit simulation node ${context.model?.id}` : "Create a simulation node"} icon={IconFunctionFilled}>
      <CustomNodeMainDiv>
        <p className="subtitle">Update some simulation variable based on their previous value and some input value.</p>
        <CustomNodeModalHeader context={context} def={def} hasExecuteOption={false} />
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
