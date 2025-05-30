import { NodeDefinition } from "../../../Types/NodeDefinition";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { useCustomNodeCreationContext } from "../../../Hooks/useCustomNodeCreationContext";
import { CustomFunctionModalNoLogic } from "./CustomFunctionModalNoLogic";
import { IconFunctionFilled } from "@tabler/icons-react";
import { PortType } from "../../../Types/PortType";

const AvailableTypesInput: Array<PortType> = portTypesWithTags(["common"]);
const AvailableTypesOutput: Array<PortType> = portTypesWithTags(["common"]);

export const CustomFunctionModalSettings = {
  creationTitle: "Create a custom node",
  editionTitlePrefix: "Edit node",
  subtitle: "A custom function allow you to reuse code across your sketch.",
  icon: IconFunctionFilled,
  inputTitle: "Inputs",
  inputTooltip: "These are the values passed from outside to your function",
  inputPrefix: "input",
  outputTitle: "Output",
  outputTooltip: "These are the value that come out of your function",
  outputPrefix: "output",
};

export function CustomNodeModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return (
    <CustomFunctionModalNoLogic
      close={close}
      nodeDefinition={def}
      hasExecuteOption
      availableTypesInput={AvailableTypesInput}
      availableTypesOutput={AvailableTypesOutput}
      settings={CustomFunctionModalSettings}
      {...context}
    />
  );
}
