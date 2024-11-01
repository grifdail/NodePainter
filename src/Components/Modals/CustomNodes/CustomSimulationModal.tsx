import { IconFunctionFilled } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import { useCustomNodeCreationContext } from "../../../Hooks/useCustomNodeCreationContext";
import { CustomFunctionModalNoLogic } from "./CustomFunctionModalNoLogic";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "image", "string"];
const AvailableTypesOutput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "gradient", "string"];

export const CustomSimulationModalSettings = {
  creationTitle: "Create a simulation node",
  editionTitlePrefix: "Edit simulation node",
  subtitle: "Update some simulation variable based on their previous value and some input value.",
  icon: IconFunctionFilled,
  inputTitle: "Inputs",
  inputTooltip: "These params can be passed from outside the simulation",
  inputPrefix: "input",
  outputTitle: "Simulations Variables",
  outputTooltip: "These parameters are saved in between runs.",
  outputPrefix: "state",
};

export function CustomSimulationModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return <CustomFunctionModalNoLogic close={close} nodeDefinition={def} availableTypesInput={AvailableTypesInput} availableTypesOutput={AvailableTypesOutput} settings={CustomSimulationModalSettings} {...context} />;
}
