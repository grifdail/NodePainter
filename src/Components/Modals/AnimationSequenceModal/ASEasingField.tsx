import { IconEaseInOut } from "@tabler/icons-react";
import { EasingFunctionType } from "../../../libs/easing";
import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { EasingDropdownFieldset } from "../../Generics/EasingDropdownFieldset";

export const ASEasingField = ({ block, onChange }: {
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) => {
    if (!("easing" in block)) {
        return null;
    }
    return <div className="field">
        <span><IconEaseInOut /> Easing</span>
        <div>
            <EasingDropdownFieldset
                onChange={(value: EasingFunctionType) => {
                    onChange({ ...block, easing: value });
                }}
                value={block.easing} />
        </div>
    </div>
};
