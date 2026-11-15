import { MaterialData } from "../../../Types/MaterialData";
import { Color } from "../../../Types/vectorDataType";
import { ColorInput } from "./ColorInput";

export function MaterialInput({ onChange, value, disabled }: { onChange: (value: any) => void; value: any, disabled?: boolean }) {
    var mat = value as MaterialData;
    if (!mat || mat.type !== "FlatMaterialType") {
        return null;
    }

    const onInputChange = (newValue: Color) => {
        var newMat = { ...mat, props: [newValue, mat.props.slice(1)] } as MaterialData;
        onChange(newMat);
    };

    return (
        <ColorInput
            value={mat.props[0] as Color}
            disabled={disabled}
            onChange={onInputChange}></ColorInput>
    );
}
