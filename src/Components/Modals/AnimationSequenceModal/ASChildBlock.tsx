import { AnimationSequenceData, AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { AnimationSequenceGenerator } from "../../../Utils/animationSequence/AnimationSequenceGenerator";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { AnimationSequenceBlockUi, EmptyDiv } from "./AnimationSequenceBlockUi";
import { AnimationSequenceSelectorDropdown } from "./AnimationSequenceSelectorDropdown";

export function ASChildBlock({ animation, block, onChange }: {
    animation: AnimationSequenceData;
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void;
}) {
    if (!("child" in block)) {
        return null;
    }



    return <div className="child">
        {block.child !== null ? <AnimationSequenceBlockUi
            onChange={child => onChange({ ...block, child })} block={block.child}
            animation={animation}
            onRemove={() => onChange({ ...block, child: null })} /> : <ButtonGroup align="stretch">
            <AnimationSequenceSelectorDropdown label="Add" onSelect={(type) => onChange({ ...block, child: AnimationSequenceGenerator[type]() })} />
        </ButtonGroup>}


    </div>;
}
