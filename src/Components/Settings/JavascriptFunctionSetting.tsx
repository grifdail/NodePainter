import { IconCode } from "@tabler/icons-react";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { JavascriptFunctionSettingDefinition, } from "../../Types/SettingDefinition";
import { useJavascriptFunctionModal } from "../../Hooks/useJavascriptFunctionModal";
import { ModalSettingGenerator } from "./Generators/ModalSettingGenerator";



export const JavascriptFunctionSetting = ModalSettingGenerator<JavascriptFunctionSettingDefinition>(({ onChange, value, node }) => {
    useJavascriptFunctionModal.getState().open(value, (newCodeBlock: CodeBlock) => {
        onChange(newCodeBlock);
    })
}, "Edit", IconCode)