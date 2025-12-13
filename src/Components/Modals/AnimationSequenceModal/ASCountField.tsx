import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { Constraints } from "../../../Utils/ui/applyConstraints";
import { NumberInput } from "../../Generics/Inputs/NumberInput";
import { Fieldset } from "../../StyledComponents/Fieldset";

export function ASCountField({ block, onChange }: {
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) {
    if (!("count" in block)) {
        return null;
    }
    return <Fieldset
        label={"Count"}
        input={NumberInput}
        onChange={(value: number) => {
            onChange({ ...block, count: value });
        }}
        constrains={[Constraints.Integer(), Constraints.Positive()]}
        value={block.count} />;
}
