import styled from "styled-components";
import { CodeBlockParameterField } from "../../../Types/CodeBlock";
import { CodeBlockStatementList } from "./CodeBlockStatementList";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { CodeBlockVariableSelector } from "./CodeBlockVariableSelector";
import { RawValueField } from "../../Generics/RawValueField";
import { ParameterExpressionView } from "./ParameterExpressionView";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";

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

  & > div {
    flex: 1 1 10px;
  }
`;
export const CodeBlockParameterView = ({ expression, id, onChange }: { expression: CodeBlockParameterField; id: string; onChange: (v: CodeBlockParameterField) => void }) => {
  return (
    <ExpressionDiv>
      <label>{expression.label || id}</label>
      {expression.type === "statements" && (
        <CodeBlockStatementList
          statements={expression.statements}
          onChange={(statements) => {
            onChange({ ...expression, statements });
          }}
        />
      )}
      {expression.type === "option" && (
        <Fieldset
          label=""
          input={DropdownInput}
          passtrough={{ options: expression.options }}
          onChange={(value: any) => {
            onChange({ ...expression, selectedOption: value });
          }}
          value={expression.selectedOption}></Fieldset>
      )}
      {expression.type === "variable" && (
        <CodeBlockVariableSelector
          type={expression.targetType}
          value={expression.variableName}
          onChange={(variableName) => {
            onChange({ ...expression, variableName });
          }}
        />
      )}
      {expression.type === "value" && (
        <RawValueField
          onChange={(value: any) => onChange({ ...expression, value })}
          type={expression.targetType}
          value={expression.value}
        />
      )}
      {expression.type === "expression" && (
        <ParameterExpressionView
          parameter={expression}
          onChange={onChange}
        />
      )}
    </ExpressionDiv>
  );
};
