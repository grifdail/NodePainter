import styled from "styled-components";
import { CodeBlockExpressionField, CodeBlockStatement } from "../../../Types/CodeBlock";
import { CodeBlockStatementList } from "./CodeBlockStatementList";
import { PortType } from "../../../Types/PortType";
import { PortColor } from "../../StyledComponents/PortColor";
import { Fieldset } from "../../StyledComponents/Fieldset";

export const ExpressionDiv = styled.div<{ expand?: boolean }>`
  flex: 0 0 content;
  padding: var(--padding-small);
  border-radius: var(--border-radius-small);

  display: flex;
  flex-direction: row;
  gap: var(--padding-small);

  & > fieldset {
    flex: 1 1 10px;
  }
`;
export const CodeBlockExpressionView = ({ expression, id, onChange }: { expression: CodeBlockExpressionField; id: string; onChange: (v: CodeBlockExpressionField) => void }) => {
  let InputType = null;
  if (PortColor[expression.type as PortType]) {
    InputType = PortColor[expression.type as PortType].input;
  }

  return (
    <ExpressionDiv>
      <label>{expression.label || id}</label>
      {expression.type === "statements" && (
        <CodeBlockStatementList
          statements={expression.value as CodeBlockStatement[]}
          onChange={(value) => {
            onChange({ ...expression, value });
          }}
        />
      )}
      {expression.value == null && InputType && (
        <Fieldset
          label=""
          input={InputType}
          onChange={(value: any) => {
            onChange({ ...expression, defaultValue: value });
          }}
          value={expression.defaultValue}></Fieldset>
      )}
    </ExpressionDiv>
  );
};
