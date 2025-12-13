import { useMemo, useCallback } from "react";
import { useParams } from "wouter";
import { useTree } from "../../../Hooks/useTree";
import { AnimationSequenceData } from "../../../Utils/animationSequence/AnimationSequenceData";
import { createDefaultAnimationSequence } from "../../../Utils/animationSequence/createDefaultAnimationSequence";

export function useAnimationSequenceModalSave() {
    const params = useParams();
    const modificationId = params.id as string;

    const defaultValue = useMemo(() => {
        return useTree.getState().nodes[modificationId]?.settings.animation as AnimationSequenceData || createDefaultAnimationSequence();

    }, [modificationId]);

    const save = useCallback((newValue: AnimationSequenceData) => {
        return useTree.getState().setNodeSetting(modificationId, "animation", newValue);
    }, [modificationId]);

    return { defaultValue, save };
}
