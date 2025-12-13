import { useMemo, useCallback } from "react";
import { useParams } from "wouter";
import { useTree } from "../../../Hooks/useTree";
import { Flipbook } from "../../../Types/FlipBook";

export function useFlipbookModalSave() {
    const params = useParams();
    const modificationType = params.type as string;
    const modificationId = params.id as string;

    const defaultValue = useMemo(() => {
        if (modificationType === "node") {
            return useTree.getState().nodes[modificationId]?.settings.flipbook || [[]];
        }
        return [[]];
    }, [modificationId, modificationType]);

    const save = useCallback((newValue: Flipbook) => {
        if (modificationType === "node") {
            return useTree.getState().setNodeSetting(modificationId, "flipbook", newValue);
        }

    }, [modificationId, modificationType]);

    return { defaultValue, save };
}
