import { AnimationSequenceBlock } from "../../../Utils/animationSequence/AnimationSequenceData";

export function useAnimationSequenceBlockStateControls(block: AnimationSequenceBlock, onChange: (newBlock: AnimationSequenceBlock) => void) {
    const setChild = (child: AnimationSequenceBlock | null): void => {
        if ("child" in block) {
            onChange({
                ...block,
                child: child
            });
        }
    };

    const setChildren = (index: number, newBlock: AnimationSequenceBlock): void => {
        if ("children" in block) {
            onChange({
                ...block,
                children: block.children.toSpliced(index, 1, newBlock)
            });
        }
    };

    const removeChildren = (index: number): void => {
        if ("children" in block) {
            onChange({
                ...block,
                children: block.children.toSpliced(index, 1)
            });
        }
    };

    const addChildren = (newChild: AnimationSequenceBlock): void => {
        if ("children" in block) {
            onChange({
                ...block,
                children: [...block.children, newChild]
            });
        }
    };
    return { setChild, setChildren, removeChildren, addChildren };
}
