import { IconRepeat } from "@tabler/icons-react";
import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { ParameterExpressionView } from "../CodeBlock/ParameterExpressionView";

export function ASCountField({ block, onChange }: {
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) {
    if (!("count" in block)) {
        return null;
    }
    return <div className="field">
        <span><IconRepeat /> Count</span>
        <div>
            <ParameterExpressionView parameter={block.count} onChange={(e) => {
                onChange({ ...block, count: e });
            }} />
        </div>
    </div>;
}
