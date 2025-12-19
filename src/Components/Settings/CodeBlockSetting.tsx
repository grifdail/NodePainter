import { IconCode } from "@tabler/icons-react";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { CodeBlockSettingDefinition } from "../../Types/SettingDefinition";
import { ModalSettingGenerator } from "./Generators/ModalSettingGenerator";


export const CodeBlockSetting = ModalSettingGenerator<CodeBlockSettingDefinition>(({ onChange, value, node }) => {
    useCodeBlockModal.getState().open(value, (newCodeBlock: CodeBlock) => {
        onChange(newCodeBlock);

    })
}, "Edit", IconCode)
