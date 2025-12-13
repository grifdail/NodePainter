import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconCode } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { useTree } from "../../Hooks/useTree";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { CodeBlockSettingDefinition } from "../../Types/SettingDefinition";
import { ModalSettingGenerator } from "./ModalSettingGenerator";



export const CodeBlockSetting = ModalSettingGenerator<CodeBlockSettingDefinition>(({ onChange, value, node }) => {
    useCodeBlockModal.getState().open(value, (newCodeBlock: CodeBlock) => {
        onChange(newCodeBlock);

    })
}, "Edit", IconCode)
