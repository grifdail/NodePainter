import { useContext } from "react";
import { PortType } from "../../../Types/PortType";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { CodeBlockContext } from "../../../Hooks/CodeBlockContext";
import { MenuItem } from "@szhsin/react-menu";
import { PortDefinition } from "../../../Types/PortDefinition";
import { PortColor } from "../../StyledComponents/PortColor";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";

export const CodeBlockVariableSelector = ({ type, value, onChange }: { type: PortType | "any"; value?: string; onChange: (name: string) => void }) => {
  var CodeBlock = useContext(CodeBlockContext);
  if (!CodeBlock) {
    return null;
  }

  var variables = [...CodeBlock.ownVariables, ...CodeBlock.inputVariables, ...CodeBlock.outputVariables];
  const filterredVariable = type === "any" ? variables : variables.filter((port) => port.type === type);

  const selected = filterredVariable.find((port) => port.id === value);
  return (
    <Fieldset
      label=""
      input={DropdownInput}
      onChange={(data) => onChange(data.id)}
      value={value}
      className={selected?.type}
      passtrough={{
        options: filterredVariable,
        templateRaw: (option: PortDefinition, args: any) => {
          var Icon = PortColor[option.type].icon;
          return (
            <MenuItem
              key={option.id}
              onClick={args.onClick}
              value={option.id}>
              <Icon />
              {option.id}
            </MenuItem>
          );
        },
      }}></Fieldset>
  );
};
