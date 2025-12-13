import { AnimationSequenceBlock, AnimationSequenceData } from "../../../Utils/animationSequence/AnimationSequenceData";
import { AnimationSequenceGenerator } from "../../../Utils/animationSequence/AnimationSequenceGenerator";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { AnimationSequenceBlockUi } from "./AnimationSequenceBlockUi";
import { AnimationSequenceSelectorDropdown } from "./AnimationSequenceSelectorDropdown";

export const ASChildrenBlock = ({ addChildren, animation, block, removeChildren, setChildren }: {
    addChildren: (newChild: AnimationSequenceBlock) => void;
    animation: AnimationSequenceData;
    block: AnimationSequenceBlock;
    removeChildren: (index: number) => void;
    setChildren: (index: number, newBlock: AnimationSequenceBlock) => void;
}) => {
    if (!("children" in block)) {
        return null;
    }
    return <div className="children">
        {block.children.map((block, index) => <AnimationSequenceBlockUi
            key={index}
            onChange={newBlock => setChildren(index, newBlock)}
            block={block}
            animation={animation}
            onRemove={() => removeChildren(index)} />)}

        <ButtonGroup align="stretch">
            <AnimationSequenceSelectorDropdown label="Add" onSelect={(type) => addChildren(AnimationSequenceGenerator[type]())} />
        </ButtonGroup>
    </div>;
};
