import { CodeBlockExpressionTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { CodeBlockParameterFieldExpression } from "../../../Types/CodeBlock/CodeBlockParameterFieldExpression";
import { PortType } from "../../../Types/PortType";
import { RawValueField } from "../../Generics/RawValueField";
import { CodeBlockExpressionMenu } from "./CodeBlockExpressionMenu";
import { CodeBlockStatementView } from "./CodeBlockStatementView";

export const ParameterExpressionView = ({ onChange, parameter }: { parameter: CodeBlockParameterFieldExpression; onChange: (value: CodeBlockParameterFieldExpression) => void }) => {
  if (parameter.expression === null) {
    return (
      <>
        <RawValueField
          type={parameter.targetType}
          value={parameter.constantValue}
          onChange={(constantValue: any) => onChange({ ...parameter, constantValue })}
        />
        <CodeBlockExpressionMenu
          type={parameter.targetType}
          onChange={(v: string) => {
            if (CodeBlockExpressionTypes[v]) {
              onChange({ ...parameter, expression: CodeBlockExpressionTypes[v].create(parameter.targetType as PortType) });
            }
          }}
        />
      </>
    );
  } else {
    return (
      <CodeBlockStatementView
        statement={parameter.expression}
        onChange={(expression) => onChange({ ...parameter, expression })}
        onDelete={() => onChange({ ...parameter, expression: null })}
      />
    );
  }
};
