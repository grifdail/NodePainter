import { NodeDefinition } from "../../../Types/NodeDefinition";
import { FullCommonTypes, PortType } from "../../../Types/PortType";
import { useCustomNodeCreationContext } from "../../../Hooks/useCustomNodeCreationContext";
import { CustomFunctionModalNoLogic } from "./CustomFunctionModalNoLogic";
import { IconFunctionFilled } from "@tabler/icons-react";

const AvailableTypesInput: Array<PortType> = FullCommonTypes;
const AvailableTypesOutput: Array<PortType> = FullCommonTypes;

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
