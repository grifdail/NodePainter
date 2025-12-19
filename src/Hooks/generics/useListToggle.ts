import { useCallback, useState } from "react";

export function useListToggle<T>(options: T[]): [T, (v?: T) => void] {
    var [state, setState] = useState<T>(options[0])

    return [state, useCallback((v) => {
        if (v === undefined) {
            const index = options.indexOf(state)
            v = options[(index + 1) % options.length];
        }
        setState(v)
    }, [state, setState])]

}

