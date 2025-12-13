import { useState, useCallback } from "react";
import { PortDefinition } from "../../../Types/PortDefinition";
import { AnimationSequenceData, AnimationSequenceBlockSequence } from "../../../Utils/animationSequence/AnimationSequenceData";

export function useAnimationSequenceModalControlls(defaultValue: AnimationSequenceData) {
    const [animation, setAnimation] = useState(defaultValue);

    const setInputVariables = useCallback((ports: PortDefinition[]) => {
        setAnimation({
            ...animation,
            inputVariables: ports
        });
    }, [animation, setAnimation]);

    const setProperties = useCallback((ports: PortDefinition[]) => {
        setAnimation({
            ...animation,
            properties: ports
        });
    }, [animation, setAnimation]);


    const setRoot = useCallback((newValue: AnimationSequenceBlockSequence) => {
        setAnimation({
            ...animation,
            root: newValue
        });
    }, [animation, setAnimation]);

    return { animation, setInputVariables, setProperties, setRoot };
}
