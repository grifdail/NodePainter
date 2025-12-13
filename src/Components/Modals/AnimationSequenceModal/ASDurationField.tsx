import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { NumberInput } from "../../Generics/Inputs/NumberInput";
import { Fieldset } from "../../StyledComponents/Fieldset";

export const ASDurationField = ({ block, onChange }: {
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) => {
    if (!("duration" in block)) {
        return null;
    }
    return <Fieldset
        label={"Duration"}
        input={NumberInput}
        onChange={(value: number) => {
            onChange({ ...block, duration: value });
        }}
        value={block.duration} />;
};
