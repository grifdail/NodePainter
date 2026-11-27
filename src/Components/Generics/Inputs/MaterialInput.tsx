
import { FakeMaterialData } from "../../../Types/MaterialData";
import { Color } from "../../../Types/vectorDataType";
import { ColorInput } from "./ColorInput";

export function MaterialInput({ onChange, value, disabled }: { onChange: (value: any) => void; value: any, disabled?: boolean }) {
    var mat = value as FakeMaterialData;
    if (!mat || !mat.color) {
        return null;
    }

    const onInputChange = (newValue: Color) => {
        var newMat = { color: newValue } as FakeMaterialData;
        onChange(newMat);
    };

    return (
        <ColorInput
            value={mat.color as Color}
            disabled={disabled}
            onChange={onInputChange}></ColorInput>
    );
}
