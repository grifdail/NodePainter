import { AnimationSequenceData, AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";
import { AnimationSequenceGenerator } from "../../../Utils/animationSequence/AnimationSequenceGenerator";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { AnimationSequenceBlockUi, EmptyDiv } from "./AnimationSequenceBlockUi";
import { AnimationSequenceSelectorDropdown } from "./AnimationSequenceSelectorDropdown";

export function ASChildBlock({ animation, block, setChild }: {
    animation: AnimationSequenceData;
    block: AnimationSequenceBlock;
    setChild: (child: any) => void;
}) {
    if (!("child" in block)) {
        return null;
    }
    return <div className="child">
        {block.child !== null ? <AnimationSequenceBlockUi
            onChange={setChild} block={block.child}
            animation={animation}
            onRemove={() => setChild(null)} /> : <ButtonGroup align="stretch">
            <AnimationSequenceSelectorDropdown label="Add" onSelect={(type) => setChild(AnimationSequenceGenerator[type]())} />
        </ButtonGroup>}


    </div>;
}
