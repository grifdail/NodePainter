import { capitalCase } from "change-case";
import { PortType } from "../../../Types/PortType";
import { PortTypeDefinitions, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { Fieldset } from "../../StyledComponents/Fieldset";

export function PortTypeDropdown({ onChange: setPortType, value, availableTypes = portTypesWithTags(["common"]), disabled, label }: { onChange: (value: string) => void; label?: string; value: PortType; availableTypes?: PortType[]; disabled?: boolean }) {
    return (
        <Fieldset
            label={label || "Type"}
            input={DropdownInput}
            onChange={setPortType}
            value={value}
            passtrough={{ options: availableTypes, template: TypeTemplate }}
            disabled={disabled}
        />
    );
}
const TypeTemplate = (option: string) => {
    const portColor = PortTypeDefinitions[option as PortType];
    const Icon = portColor.icon;
    return (
        <>
            <Icon />
            {capitalCase(option)}
        </>
    );
};
