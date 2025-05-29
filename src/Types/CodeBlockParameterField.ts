import { CodeBlockParameterFieldExpression } from "./CodeBlockParameterFieldExpression";
import { CodeBlockParameterFieldOption } from "./CodeBlockParameterFieldOption";
import { CodeBlockParameterFieldStatements } from "./CodeBlockParameterFieldStatements";
import { CodeBlockParameterFieldValue } from "./CodeBlockParameterFieldValue";
import { CodeBlockParameterFieldVariable } from "./CodeBlockParameterFieldVariable";

export type CodeBlockParameterField = CodeBlockParameterFieldStatements | CodeBlockParameterFieldExpression | CodeBlockParameterFieldOption | CodeBlockParameterFieldVariable | CodeBlockParameterFieldValue;
