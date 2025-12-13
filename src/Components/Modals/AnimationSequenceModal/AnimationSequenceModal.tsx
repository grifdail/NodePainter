import { IconCodeDots, IconKeyframes } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../../Modal";
import { useCodeBlockModal } from "../../../Hooks/useCodeBlockModal";
import { PortEditList } from "../CustomNodes/PortEditList";
import { CodeBlockStatementList } from "../CodeBlock/CodeBlockStatementList";
import { CodeBlockContext } from "../../../Hooks/CodeBlockContext";
import { portTypesWithProperty, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { AnimationSequenceBlockSequence } from "../../../Utils/animationSequence/AnimationSequenceData";
import { closeAllPopup } from "../../../Actions/navigationAction";
import { AnimationSequenceBlockUi, AnimationSequenceBlockUiDiv } from "./AnimationSequenceBlockUi";
import { useAnimationSequenceModalControlls } from "./useAnimationSequenceModalControlls";
import { useAnimationSequenceModalSave } from "./useAnimationSequenceModalSave";

const MainDiv = styled.div`
    width: 100%;
    //overflow: hidden;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    gap: var(--padding-medium);
    align-items: stretch;

    & > div:nth-child(2) {
        flex-grow: 1;
        align-self: start;
    }

    @media (max-width: 800px) {
        flex-direction: column;
    }

   
`;

const VariableSection = styled.div`
    display: flex;
    justify-content: start;
    align-items: stretch;
    gap: var(--padding-medium);
    flex-direction: column;
    flex: 0 0 200px;
`;

export function AnimationSequenceModal() {
    const { defaultValue, save } = useAnimationSequenceModalSave();
    const { animation, setInputVariables, setProperties, setRoot } = useAnimationSequenceModalControlls(defaultValue)

    return (
        <Modal
            onClose={() => {
                save(animation);
                closeAllPopup();
            }}
            title="Animation Sequence"
            icon={IconKeyframes}
            size="large" >
            <MainDiv>
                <VariableSection>
                    < PortEditList
                        ports={animation.inputVariables}
                        label="Inputs"
                        prefix="in"
                        availableTypes={portTypesWithTags(["common"])}
                        onChange={setInputVariables}
                    />
                    < PortEditList
                        ports={animation.properties}
                        label="Properties"
                        prefix="out"
                        availableTypes={portTypesWithProperty('lerpOperator')}
                        onChange={setProperties}
                    />
                </VariableSection>

                <AnimationSequenceBlockUi block={animation.root} animation={animation} onChange={(block) => setRoot(block as AnimationSequenceBlockSequence)} />
            </MainDiv>
        </Modal>
    );
}


