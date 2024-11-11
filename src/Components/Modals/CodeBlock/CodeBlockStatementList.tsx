import styled, { css } from "styled-components";
import { CodeBlockStatement } from "../../../Types/CodeBlock";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { DropdownInput } from "../../Inputs/DropdownInput";
import { CodeBlockStatementType } from "../../../Nodes/CodeBlockTypes";
import { CodeBlockStatementView, StatementDiv } from "./CodeBlockStatementView";
import { useListManipulator } from "../../../Hooks/useListManipulator";

export const RootDiv = styled.div<{ expand?: boolean }>`
  background: var(--color-background-card);
  flex: 1 1 content;
  padding: var(--padding-medium);
  border-radius: var(--border-radius-medium);
  display: flex;
  flex-direction: column;
  gap: var(--padding-small);
  ${(state) =>
    state.expand
      ? css`
          flex: 1 1 content;
          overflow-y: auto;
        `
      : css`
          flex: 0 0 content;
          overflow: auto;
        `};
`;

export const CodeBlockStatementList = ({ statements, onChange }: { statements: CodeBlockStatement[]; onChange: (statements: CodeBlockStatement[]) => void }) => {
  var { addNew, remove, change, move } = useListManipulator(statements, onChange);

  const addStatement = (type: string) => {
    var t = CodeBlockStatementType[type];
    if (t) {
      addNew(t.create());
    }
  };

  return (
    <RootDiv expand>
      {statements.map((statement, index) => (
        <CodeBlockStatementView
          statement={statement}
          onChange={(v) => change(index, v)}
          onDelete={() => remove(index)}
          onMove={(dir: "up" | "down") => move(index, dir)}></CodeBlockStatementView>
      ))}
      <StatementDiv>
        <Fieldset
          input={DropdownInput}
          label=""
          value="..."
          onChange={addStatement}
          passtrough={{ options: Object.keys(CodeBlockStatementType) }}
        />
      </StatementDiv>
    </RootDiv>
  );
};
