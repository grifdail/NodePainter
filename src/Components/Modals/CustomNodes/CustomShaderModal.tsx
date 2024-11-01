import { IconFunctionFilled } from "@tabler/icons-react";
import { NodeDefinition } from "../../../Types/NodeDefinition";
import { PortType } from "../../../Types/PortType";
import { useCustomNodeCreationContext } from "../../../Hooks/useCustomNodeCreationContext";
import { CustomFunctionModalNoLogic } from "./CustomFunctionModalNoLogic";

const AvailableTypesInput: Array<PortType> = ["number", "vector2", "vector3", "vector4", "color", "bool", "image"];

export const CustomShaderModalSettings = {
  creationTitle: "Create a custom Shader",
  editionTitlePrefix: "Edit shader",
  subtitle: "Render an image by computing it's color pixel by pixels.",
  icon: IconFunctionFilled,
  inputTitle: "Inputs / Uniforms",
  inputTooltip: "These value are passed to your shader and are accessible by all pixels",
  inputPrefix: "input",
  outputTitle: "",
  outputTooltip: "",
  outputPrefix: "",
};

export function CustomShaderModal({ close }: { close: () => void }) {
  var context = useCustomNodeCreationContext();
  var def = context.model as NodeDefinition;

  return <CustomFunctionModalNoLogic close={close} nodeDefinition={def} availableTypesInput={AvailableTypesInput} settings={CustomShaderModalSettings} {...context} />;
}
