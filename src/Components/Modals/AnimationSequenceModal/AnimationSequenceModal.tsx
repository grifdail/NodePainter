import { IconKeyframes } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../../Modal";
import { PortEditList } from "../CustomNodes/PortEditList";
import { portTypesWithProperty, portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { AnimationSequenceBlockSequence } from "../../../Utils/animationSequence/AnimationSequenceData";
import { closeAllPopup } from "../../../Actions/navigationAction";
import { AnimationSequenceBlockUi } from "./AnimationSequenceBlockUi";
import { useAnimationSequenceModalControlls } from "./useAnimationSequenceModalControlls";
import { useAnimationSequenceModalSave } from "./useAnimationSequenceModalSave";
import { NodeVariableContext } from "../../../Hooks/NodeVariableContext";
import { evalASBlockDuration } from "../../../Utils/animationSequence/AnimationSequenceDuration";
import { useMemo } from "react";

const MainDiv = styled.div`
    width: 100%;
    //overflow: hidden;
    height: 100%;
    display: grid;
    grid-template-columns: 200px 1fr;
    grid-template-rows: 100%;
    justify-content: stretch;
    gap: var(--padding-medium);
    align-items: stretch;
    overflow: auto;

    section:has(&) {
        overflow: hidden;
    }


    & > div:nth-child(2) {
        flex-grow: 1;
        align-self: start;
        overflow-y: scroll;
        max-height: 100%;
        grid-column: 2/3;

        grid-row: 1/2;
        scrollbar-gutter: stable;
        padding-right: 10px;
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

        grid-row: 1/2;
        grid-column: 1/2;
`;

export function AnimationSequenceModal() {
    const { defaultValue, save } = useAnimationSequenceModalSave();
    const { animation, setInputVariables, setProperties, setRoot } = useAnimationSequenceModalControlls(defaultValue)
    const variables = [...animation.inputVariables, ...animation.properties]
    const [estimatedDuration, isEstimatedDurationUnknown] = useMemo(() => evalASBlockDuration(animation.root), [animation.root])

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
                    <p>Estimated duration: {isEstimatedDurationUnknown ? "???" : estimatedDuration} seconds</p>
                </VariableSection>
                <NodeVariableContext.Provider value={variables}>
                    <AnimationSequenceBlockUi block={animation.root} animation={animation} onChange={(block) => setRoot(block as AnimationSequenceBlockSequence)} />
                </NodeVariableContext.Provider>
            </MainDiv>
        </Modal>
    );
}


