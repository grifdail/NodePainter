import { SettingComponent } from "./SettingComponent";
import { SettingProps } from "./SettingProps";
import { ButtonGroup } from "../StyledComponents/ButtonGroup";
import styled from "styled-components";
import { IconCode } from "@tabler/icons-react";
import { Button } from "../Generics/Button";
import { useCodeBlockModal } from "../../Hooks/useCodeBlockModal";
import { useTree } from "../../Hooks/useTree";
import { CodeBlock } from "../../Types/CodeBlock/CodeBlock";
import { CodeBlockSettingDefinition, JavascriptFunctionSettingDefinition } from "../../Types/SettingDefinition";
import { useJavascriptFunctionModal } from "../../Hooks/useJavascriptFunctionModal";
import { Port } from "../../Types/PortTypeGenerator";

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

export const JavascriptFunctionSetting: SettingComponent<JavascriptFunctionSettingDefinition> = function ({ onChange, value, def, node }: SettingProps<JavascriptFunctionSettingDefinition>) {
    return (
        <Body>
            <ButtonGroup hidden={value !== null}>
                <Button
                    onClick={() =>
                        useJavascriptFunctionModal.getState().open(value, (newCodeBlock: CodeBlock) => {
                            onChange(newCodeBlock);
                            var tree = useTree.getState();
                            tree.replaceInputs((t) => t.id === node.id, [Port.CacheId(), ...newCodeBlock.inputVariables]);
                            tree.replaceOutput((t) => t.id === node.id, newCodeBlock.outputVariables);
                        })
                    }
                    label="Edit"
                    icon={IconCode}
                />
            </ButtonGroup>
        </Body>
    );
};
JavascriptFunctionSetting.getSize = function (value, def): number {
    return 60;
};
