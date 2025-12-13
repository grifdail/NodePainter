import { PortType } from "../../../Types/PortType";
import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { RawValueField } from "../../Generics/RawValueField";

export const ASValueField: React.FC<{
    block: AnimationSequenceBlock;
    type?: PortType;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}> = ({ block, onChange, type }) => {
    type ||= ("target" in block ? block.target.type : "unknown");
    if (type === undefined || type === "unknown" || !("value" in block)) {
        return null;
    }

    return <RawValueField
        label={"Value"}
        type={type}
        value={block.value}
        onChange={(value: any) => {
            onChange({ ...block, value });
        }} />;
};
