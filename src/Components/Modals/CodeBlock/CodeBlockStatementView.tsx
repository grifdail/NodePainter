import { CodeBlockStatement } from "../../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockParameterField } from "../../../Types/CodeBlock/CodeBlockParameterField";
import { CodeBlockParameterView } from "./CodeBlockParameterView";
import { IconArrowMoveDown, IconArrowMoveUp, IconFoldDown, IconFoldUp, IconX } from "@tabler/icons-react";
import { InvisibleButton } from "../../Generics/Button";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { CodeBlockBlocksTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { StatementDiv } from "./StatementDiv";
import { useToggle } from "@uidotdev/usehooks";
import { convertTypeValue } from "../../../Utils/graph/execution/convertTypeValue";
import { PortType } from "../../../Types/PortType";
import { useContext } from "react";
import { CodeBlockContext } from "../../../Hooks/CodeBlockContext";

type Props = {
  statement: CodeBlockStatement;
  onChange: (n: CodeBlockStatement) => void;
  onDelete?: () => void;
  onMove?: (dir: "up" | "down") => void;
};

export const CodeBlockStatementView = ({ statement, onDelete, onMove, onChange }: Props) => {
  var def = CodeBlockBlocksTypes[statement.type];
  var [isOpen, toggleIsOpen] = useToggle(true);
  var context = useContext(CodeBlockContext);

  var variables = context ? [...context.localVariables, ...context.inputVariables, ...context.outputVariables] : [];

  const changeParameter = (changedParam: CodeBlockParameterField, id: string) => {
    let newParameters = { ...statement.parameters, [id]: changedParam };
    if (changedParam.type === "variable" && changedParam.affectTypes) {
      const newType = variables.find((port) => port.id === changedParam.variableName)?.type;
      if (!newType) {
        return;
      }
      changedParam.affectTypes.forEach((element) => {
        var oldParam = newParameters[element];
        if (oldParam.type === "expression" && oldParam.targetType !== newType) {
          newParameters[element] = { ...oldParam, expression: null, targetType: newType, constantValue: convertTypeValue(oldParam.constantValue, oldParam.targetType, newType as PortType) };
        } else if (oldParam.type === "value" && oldParam.targetType !== newType) {
          newParameters[element] = { ...oldParam, targetType: newType, value: convertTypeValue(oldParam.value, oldParam.targetType, newType as PortType) };
        }
      });
    }
    onChange({ ...statement, parameters: newParameters });
  };

  return (
    <StatementDiv>
      <div className="header">
        <h4>{def?.toString(statement) || statement.type}</h4>
        <ButtonGroup>
          <InvisibleButton
            icon={isOpen ? IconFoldUp : IconFoldDown}
            tooltip={isOpen ? "Fold up" : "Fold Down"}
            onClick={() => toggleIsOpen()}></InvisibleButton>
          {onMove && (
            <InvisibleButton
              icon={IconArrowMoveUp}
              onClick={() => onMove("up")}
              tooltip="Move up"></InvisibleButton>
          )}
          {onMove && (
            <InvisibleButton
              icon={IconArrowMoveDown}
              onClick={() => onMove("down")}
              tooltip="Move down"></InvisibleButton>
          )}
          {onDelete && (
            <InvisibleButton
              icon={IconX}
              onClick={onDelete}
              tooltip="Delete"></InvisibleButton>
          )}
        </ButtonGroup>
      </div>
      {isOpen && (
        <div className="parameters">
          {Object.entries(statement.parameters).map(([key, expression]) => (
            <CodeBlockParameterView
              key={key}
              id={key}
              expression={expression}
              onChange={(p) => changeParameter(p, key)}
            />
          ))}
        </div>
      )}
    </StatementDiv>
  );
};
