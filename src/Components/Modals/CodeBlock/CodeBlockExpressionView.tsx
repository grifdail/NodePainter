import styled from "styled-components";
import { CodeBlockExpressionField, CodeBlockStatement } from "../../../Types/CodeBlock";
import { CodeBlockStatementList } from "./CodeBlockStatementList";
import { PortType, PortTypeArray } from "../../../Types/PortType";
import { PortColor } from "../../StyledComponents/PortColor";
import { Fieldset } from "../../StyledComponents/Fieldset";
import { CodeBlockVariableSelector } from "./CodeBlockVariableSelector";
import { CodeBlockExpressionType as CodeBlockExpressionTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { CodeBlockStatementView } from "./CodeBlockStatementView";
import { CodeBlockExpressionMenu } from "./CodeBlockExpressionMenu";
import { DropdownInput } from "../../Inputs/DropdownInput";

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
      {expression.type === "option" && (
        <Fieldset
          label=""
          input={DropdownInput}
          passtrough={{ options: expression.options }}
          onChange={(value: any) => {
            onChange({ ...expression, value: value });
          }}
          value={expression.value}></Fieldset>
      )}
      {expression.type.indexOf("variable") === 0 && (
        <CodeBlockVariableSelector
          type={expression.type.slice(9) as PortType}
          value={expression.value as string}
          onChange={(value) => {
            onChange({ ...expression, value });
          }}
        />
      )}
      <>
        {expression.value == null && InputType && (
          <Fieldset
            label=""
            input={InputType}
            onChange={(value: any) => {
              onChange({ ...expression, defaultValue: value });
            }}
            value={expression.defaultValue}></Fieldset>
        )}
        {expression.value == null && (
          <CodeBlockExpressionMenu
            type={expression.type as PortType}
            onChange={(value) => {
              onChange({ ...expression, value: CodeBlockExpressionTypes[value].create(expression.type as PortType) });
            }}
          />
        )}
        {PortTypeArray.includes(expression.type as PortType) && expression.value && (
          <CodeBlockStatementView
            statement={expression.value as CodeBlockStatement}
            onChange={function (value: CodeBlockStatement): void {
              onChange({ ...expression, value });
            }}
            onDelete={function (): void {
              onChange({ ...expression, value: null });
            }}
          />
        )}
      </>
    </ExpressionDiv>
  );
};
