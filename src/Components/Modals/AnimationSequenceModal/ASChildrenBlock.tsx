import { useListManipulator } from "../../../Hooks/useListManipulator";
import { AnimationSequenceBlock, AnimationSequenceData } from "../../../Utils/animationSequence/AnimationSequenceData";
import { AnimationSequenceGenerator } from "../../../Utils/animationSequence/AnimationSequenceGenerator";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { AnimationSequenceBlockUi } from "./AnimationSequenceBlockUi";
import { AnimationSequenceSelectorDropdown } from "./AnimationSequenceSelectorDropdown";

function SubASChildrenBlock({ animation, block, onChange }: {
    animation: AnimationSequenceData;
    block: AnimationSequenceBlock & { children: AnimationSequenceBlock[] };
    onChange: (newBlock: AnimationSequenceBlock & { children: AnimationSequenceBlock[] }) => void
}) {
    const { addNew, remove, change, move } = useListManipulator(block.children, children => onChange({ ...block, children }));

    return <div className="children">
        {block.children.map((block, index) => <AnimationSequenceBlockUi
            key={block.id}
            onChange={newBlock => change(index, newBlock)}
            block={block}
            animation={animation}
            onMove={direction => move(index, direction)}
            onRemove={() => remove(index)} />)}

        <ButtonGroup align="stretch">
            <AnimationSequenceSelectorDropdown label="Add" onSelect={(type) => addNew(AnimationSequenceGenerator[type]())} />
        </ButtonGroup>
    </div>;
}

export const ASChildrenBlock = ({ animation, block, onChange }: {
    animation: AnimationSequenceData;
    block: AnimationSequenceBlock;
    onChange: (newBlock: AnimationSequenceBlock) => void
}) => {

    if (!("children" in block)) {
        return null;
    }

    return <SubASChildrenBlock animation={animation} block={block} onChange={onChange} />;
};
