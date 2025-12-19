import { SettingComponent } from "../../Types/SettingComponent";
import { SettingProps } from "../../Types/SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconCode } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { useTree } from "../../Hooks/useTree";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { AnimationSequenceSettingDefinition, CodeBlockSettingDefinition, JavascriptFunctionSettingDefinition } from "../../Types/SettingDefinition";
import { useJavascriptFunctionModal } from "../../Hooks/useJavascriptFunctionModal";
import { Port } from "../../Types/PortTypeGenerator";
import { ModalSettingGenerator } from "./Generators/ModalSettingGenerator";
import { openAnimationSequenceModal } from "../../Actions/navigationAction";

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: stretch;
  align-items: stretch;
  flex-direction: column;
  padding: 0;
  margin: 0;
  & > div.file,
  & img {
    flex-grow: 1;
    display: block flex;
    object-fit: contain;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.2);
    max-height: 180px;
    background: var(--gradient-transparent);
  }
  & svg {
    height: 50%;
    width: 50%;
  }
`;

export const AnimationSequenceSetting = ModalSettingGenerator<AnimationSequenceSettingDefinition>(({ node }) => {
    openAnimationSequenceModal(node.id)
});