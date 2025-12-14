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
    return <ParameterExpressionView parameter={block.condition} onChange={(e) => {
        onChange({ ...block, condition: e });
    }} />;
}
