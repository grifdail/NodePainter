import { EasingFunctionType, Easing } from "../../libs/easing";
import { EasingIcon } from "../../libs/EasingIcon";
import { DropdownInput } from "./Inputs/DropdownInput";
import { Fieldset } from "../StyledComponents/Fieldset";

export function EasingDropdownFieldset({ onChange, value }: { onChange: (key: EasingFunctionType) => void; value: EasingFunctionType; }) {
    return <Fieldset
        label="Easing"
        input={DropdownInput}
        onChange={onChange}
        passtrough={{
            options: Object.values(Easing),
            template: (name: EasingFunctionType) => (
                <>
                    <EasingIcon fn={name} /> {name}
                </>
            ),
        }}
        value={value}></Fieldset>;
}
