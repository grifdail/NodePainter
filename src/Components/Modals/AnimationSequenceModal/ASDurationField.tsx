import { IconClock } from "@tabler/icons-react";
import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { NumberInput } from "../../Generics/Inputs/NumberInput";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { ParameterExpressionView } from "../CodeBlock/ParameterExpressionView";

export const ASDurationField = ({ block, onChange }: {
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) => {
    if (!("duration" in block)) {
        return null;
    }
    return <div className="field">
        <span><IconClock /> Duration</span>
        <div>
            <ParameterExpressionView parameter={block.duration} onChange={(e) => {
                onChange({ ...block, duration: e });
            }} />
        </div>
    </div>;
};
