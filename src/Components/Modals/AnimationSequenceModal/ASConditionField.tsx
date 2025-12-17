import { IconCheck } from "@tabler/icons-react";
import { CodeBlockParameterFieldExpression } from "../../../Types/CodeBlock/CodeBlockParameterFieldExpression";
import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { Constraints } from "../../../Utils/ui/applyConstraints";
import { NumberInput } from "../../Generics/Inputs/NumberInput";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { ParameterExpressionView } from "../CodeBlock/ParameterExpressionView";

export function ASConditionField({ block, onChange }: {
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) {
    if (!("condition" in block)) {
        return null;
    }
    return <div className="field">
        <span><IconCheck /> Condition</span>
        <div>
            <ParameterExpressionView parameter={block.condition} onChange={(e) => {
                onChange({ ...block, condition: e });
            }} />
        </div>
    </div>
}
