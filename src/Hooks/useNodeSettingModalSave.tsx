import { useMemo, useCallback } from "react";
import { useParams } from "wouter";
import { useTree } from "./useTree";


export function useNodeSettingModalSave<T>(settingId: string, defaultGenerator: () => T) {
    const params = useParams();
    const modificationId = params.id as string;

    const defaultValue = useMemo(() => {
        return useTree.getState().nodes[modificationId]?.settings[settingId] as T || defaultGenerator();

    }, [modificationId, settingId, defaultGenerator]);

    const save = useCallback((newValue: T) => {
        return useTree.getState().setNodeSetting(modificationId, settingId, newValue);
    }, [modificationId, settingId]);

    return { defaultValue, save };
}
