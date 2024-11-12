import styled from "styled-components";
import { CodeBlockParameterField } from "../../../Types/CodeBlock";
import { CodeBlockStatementList } from "./CodeBlockStatementList";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { CodeBlockVariableSelector } from "./CodeBlockVariableSelector";
import { RawValueField } from "../../Generics/RawValueField";
import { ParameterExpressionView } from "./ParameterExpressionView";
import { DropdownInput } from "../../Generics/Inputs/DropdownInput";
import { StatementDiv } from "./StatementDiv";
import { InvisibleButtonStyled } from "../../Generics/Button";

export const ExpressionDiv = styled.div<{ expand?: boolean }>`
  grid-column: 1 / 3;
  border-radius: var(--border-radius-small);

  display: grid;
  grid-template-columns: subgrid;

  & > label {
    grid-column: 1 / 2;
  }

  & > div.content {
    grid-column: 2 / 3;
    display: flex;
    flex-direction: row;
    justify-content: stretch;
    margin: 0;

    & > fieldset {
      flex: 1 1 content;
      align-items: stretch;
    }

    & > ${InvisibleButtonStyled} {
      padding: var(--padding-small);
    }

    & > ${StatementDiv} {
      flex: 1 1 content;
      padding-right: 0;
      background: rgba(128, 128, 128, 0.05);
    }
  }
`;
export const CodeBlockParameterView = ({ expression, id, onChange }: { expression: CodeBlockParameterField; id: string; onChange: (v: CodeBlockParameterField) => void }) => {
  return (
    <ExpressionDiv>
      <label>{expression.label || id}</label>
      <div className="content">
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
      </div>
    </ExpressionDiv>
  );
};
