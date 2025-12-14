import { useContext } from "react";
import { PortTypeDefinitions } from "../../../Types/PortTypeDefinitions";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { NodeVariableContext } from "../../../Hooks/NodeVariableContext";
import { MenuItem } from "@szhsin/react-menu";
import { PortDefinition } from "../../../Types/PortDefinition";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { PortType } from "../../../Types/PortType";

export const CodeBlockVariableSelector = ({ type, value, onChange }: { type: PortType | "any"; value?: string; onChange: (name: string) => void }) => {
  var availableVariables = useContext(NodeVariableContext);
  if (!availableVariables) {
    return null;
  }
  const filterredVariable = type === "any" ? availableVariables : availableVariables.filter((port) => port.type === type);

  const selected = filterredVariable.find((port) => port.id === value);
  return (
    <Fieldset
      label=""
      input={DropdownInput}
      onChange={(data: any) => onChange(data.id)}
      value={value}
      className={selected?.type}
      passtrough={{
        options: filterredVariable,
        templateRaw: (option: PortDefinition, args: any) => {
          var Icon = PortTypeDefinitions[option.type].icon;
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
