import { current, produce } from "immer";
import { create } from "zustand";
import { closeAllPopup, openJSFunctionModal } from "../Actions/navigationAction";
import { JavascriptFunction } from "../Types/CodeBlock/JavascriptFunction";
import { PortDefinition } from "../Types/PortDefinition";
import { PortTypeDefinitions } from "../Types/PortTypeDefinitions";
import { createDefaultJavascriptFunction } from "../Utils/JavascriptFunction/createDefaultJavascriptFunction";

export type JavascriptFunctionModalStore = {
    setCode: (code: string) => void;
    setVariables: (newList: PortDefinition[], type: "input" | "output") => void;
    callback: ((newValue: any) => void) | null;
    current: JavascriptFunction;
    open: (current: JavascriptFunction, callback: (newValue: any) => void) => void;
    close: () => void;
};

export const useJavascriptFunctionModal = create<JavascriptFunctionModalStore>()((set, get) => {
    return {
        callback: null,
        current: createDefaultJavascriptFunction(),
        open(current, callback) {
            set({ callback: callback, current });
            openJSFunctionModal();
        },
        close: () => {
            //save the image to the node
            const cb = get().callback;
            if (cb) {
                cb(get().current);
            }
            closeAllPopup();
        },
        setVariables(newList, type) {
            set(
                produce((state) => {
                    if (type === "input") {
                        state.current.inputVariables = newList;
                    } else if (type === "output") {
                        state.current.outputVariables = newList;
                    }
                    if (!state.current.isModified) {
                        state.current.code = computeDefaultCode(current(state.current));
                    }
                })
            );
        },
        setCode(code) {
            set(
                produce((state) => {
                    state.current.code = code;
                    state.current.isModified = true;
                })
            );
        },
    };
});
function computeDefaultCode(jsFunction: JavascriptFunction): any {
    return `
return function run({${jsFunction.inputVariables.map(port => port.id).join(", ")}}) {
    //Your code here...
    
    return {
        //Your return value here
${jsFunction.outputVariables.map(port => `        "${port.id}": ${PortTypeDefinitions[port.type].convertToJs?.(port.defaultValue) || "null"}`).join(",\n")}
    }
}`
}

