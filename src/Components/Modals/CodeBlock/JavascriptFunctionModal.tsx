import { IconCodeDots } from "@tabler/icons-react";
import styled from "styled-components";
import { Modal } from "../../Modal";
import { PortEditList } from "../CustomNodes/PortEditList";
import { portTypesWithTags } from "../../../Types/PortTypeDefinitions";
import { JavascriptFunctionModalStore, useJavascriptFunctionModal } from "../../../Hooks/useJavascriptFunctionModal";
import { Editor, useMonaco } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { editor } from "monaco-editor";
import { createDependencyProposals } from "../../../Utils/JavascriptFunction/javascriptFunctionGlobalScope";

const MainDiv = styled.div`
  width: 100%;
  //overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  gap: var(--padding-medium);
  align-items: stretch;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  & > div {
    flex-grow: 1;
  }
  
`;

const VariableSection = styled.div`
  display: flex;
  justify-content: start;
  align-items: stretch;
  gap: var(--padding-medium);
  flex-direction: column;
  flex: 0 0 200px;
`;

//A hack to prevent reregistering the monaco editor code completion every time;
let monacoRegistered = false;

export function JavascriptFunctionModal() {
    const state = useJavascriptFunctionModal();
    const codeBlock = state.current;

    return (
        <Modal
            onClose={state.close}
            title="Code Block"
            icon={IconCodeDots}
            size="large">
            <MainDiv>
                <VariableSection>
                    <PortEditList
                        ports={codeBlock.inputVariables}
                        label="Inputs"
                        prefix="in"
                        availableTypes={portTypesWithTags(["common"])}
                        onChange={(ports) => state.setVariables(ports, "input")}
                    />
                    <PortEditList
                        ports={codeBlock.outputVariables}
                        label="Outputs"
                        prefix="out"
                        availableTypes={portTypesWithTags(["common"])}
                        onChange={(ports) => state.setVariables(ports, "output")}
                    />
                </VariableSection>
                <div>
                    <CodeEditor state={state} />
                </div>
            </MainDiv>
        </Modal>
    );
}

const CodeEditor = ({ state }: { state: JavascriptFunctionModalStore }) => {
    const code = state.current.code;

    const editorRef = useRef<editor.IStandaloneCodeEditor | null>(null);

    const monaco = useMonaco();

    useEffect(() => {
        // do conditional chaining

        if (!monacoRegistered) {
            monaco?.languages.registerCompletionItemProvider("javascript", {
                provideCompletionItems: function (model, position) {
                    var word = model.getWordUntilPosition(position);
                    var range = {
                        startLineNumber: position.lineNumber,
                        endLineNumber: position.lineNumber,
                        startColumn: word.startColumn,
                        endColumn: word.endColumn,
                    };
                    return {
                        suggestions: createDependencyProposals(range, monaco),
                    };
                },
            });
            monacoRegistered = true
        }
    }, [monaco]);


    function handleEditorDidMount(editor: editor.IStandaloneCodeEditor) {
        editorRef.current = editor;
    }


    function onChange() {
        var newValue = editorRef.current?.getValue();
        if (newValue !== undefined && newValue !== code) {

            state.setCode(newValue)
        }
    }

    useEffect(() => {
        if (editorRef.current && code !== editorRef.current.getValue()) {
            editorRef.current.setValue(code);
        }
    }, [code])
    return <Editor
        defaultLanguage="javascript"
        defaultValue={code}
        onMount={handleEditorDidMount}
        onChange={onChange} />
}

