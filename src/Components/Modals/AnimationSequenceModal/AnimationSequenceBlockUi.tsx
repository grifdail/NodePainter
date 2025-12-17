import { Menu, MenuItem } from "@szhsin/react-menu";
import { AnimationSequenceBlock, AnimationSequenceBlockDelay, AnimationSequenceBlockLerp, AnimationSequenceBlockLoop, AnimationSequenceBlockParallel, AnimationSequenceBlockSequence, AnimationSequenceBlockSet, AnimationSequenceBlockType, AnimationSequenceData } from "../../../Utils/animationSequence/AnimationSequenceData";
import { Button, InvisibleButton } from "../../Generics/Button";
import { IconArrowMoveDown, IconArrowMoveUp, IconPlus, IconTrash } from "@tabler/icons-react";
import styled from "styled-components";
import { Black } from "../../../Utils/math/colorUtils";
import { ASTargetDropdown } from "./ASTargetDropdown";
import { ASValueField } from "./ASValueField";
import { ASDurationField } from "./ASDurationField";
import { ASCountField } from "./ASCountField";
import { ASEasingField } from "./ASEasingField";
import { ASChildrenBlock } from "./ASChildrenBlock";
import { ASChildBlock } from "./ASChildBlock";
import { Fieldset, FieldsetStyled } from "../../StyledComponents/Fieldset";
import { ASConditionField } from "./ASConditionField";

export const EmptyDiv = () => <div className="empty" />

export const AnimationSequenceBlockUiDiv = styled.div`

margin: 0px;
border-left: 2px solid var(--color-hightlight-light);
padding-left: var(--padding-medium);
align-self: stretch;
display: grid;
grid-template-columns: max-content 1fr;

        gap: var(--padding-small);

 &:hover:not(:has(.children > .block:hover, .child > .block:hover)) {
        background-color: var(--color-input-predefined);
        border-left: 2px solid var(--color-hightlight);
    }


    & > .field {
        grid-column: 1 / 3;
        grid-template-columns: subgrid;
        display: grid;

        & > span {
            grid-column: 1 / 2;
            align-items: center;
            vertical-align: center;
            display: flex;
           gap: var(--padding-small);
        }
        & > div {
            grid-column: 2 / 3;


            /*&:has(:nth-child(2)) {*/
                display: flex;
                justify-content: stretch;
                align-content: center;

                & > fieldset, &> div {
                    flex: 1 1 auto;
                }


            /*}*/
        }
    }

& header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--padding-medium);
    justify-content: space-between;

    grid-column: 1 / 3;

    h2 {
        margin: 0;
        flex-grow: 1;
    }

    & > ${FieldsetStyled} {
        flex-grow: 1;
    }

    & > .button {
        flex: 0 0 30px;
        justify-self: end;
    }

    
}

& > .child, & >.children {
    display: flex;
    flex-direction: column;
    gap: var(--padding-small);
    align-items: stretch;
    grid-column: 1 / 3;
}


`

export function AnimationSequenceBlockUi({ block, animation, onChange, onRemove, onMove }: {
    block: AnimationSequenceBlock;
    animation: AnimationSequenceData;
    onChange: (newBlock: AnimationSequenceBlock) => void;
    onRemove?: () => void,
    onMove?: (direction: "up" | "down") => void
}) {


    return <AnimationSequenceBlockUiDiv className="block">
        <header>
            <h2>{block.type}</h2>
            {onMove && (
                <InvisibleButton
                    icon={IconArrowMoveUp}
                    onClick={() => onMove("up")}
                    tooltip="Move up"></InvisibleButton>
            )}
            {onMove && (
                <InvisibleButton
                    icon={IconArrowMoveDown}
                    onClick={() => onMove("down")}
                    tooltip="Move down"></InvisibleButton>
            )}
            {onRemove && (
                <InvisibleButton className="button" tooltip="delete" onClick={onRemove} icon={IconTrash} />
            )}
        </header>
        <ASTargetDropdown animation={animation} block={block} onChange={onChange} />
        <ASValueField block={block} onChange={onChange} />
        <ASDurationField block={block} onChange={onChange} />
        <ASCountField block={block} onChange={onChange} />
        <ASConditionField block={block} onChange={onChange} />
        <ASEasingField block={block} onChange={onChange} />
        <ASChildBlock animation={animation} block={block} onChange={onChange} />
        <ASChildrenBlock onChange={onChange} animation={animation} block={block} />
    </AnimationSequenceBlockUiDiv>;
}



