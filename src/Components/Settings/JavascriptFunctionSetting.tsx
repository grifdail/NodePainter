import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { Icon, IconCode, IconEdit } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { useTree } from "../../Hooks/useTree";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { CodeBlockSettingDefinition, JavascriptFunctionSettingDefinition, SettingDefinition } from "../../Types/SettingDefinition";
import { useJavascriptFunctionModal } from "../../Hooks/useJavascriptFunctionModal";
import { Port } from "../../Types/PortTypeGenerator";
import { ModalSettingGenerator } from "./Generators/ModalSettingGenerator";



export const JavascriptFunctionSetting = ModalSettingGenerator<JavascriptFunctionSettingDefinition>(({ onChange, value, node }) => {
    useJavascriptFunctionModal.getState().open(value, (newCodeBlock: CodeBlock) => {
        onChange(newCodeBlock);
    })
}, "Edit", IconCode)