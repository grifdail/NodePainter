import { CodeBlockStatement } from "../../../Types/CodeBlock";
import { CodeBlockParameterView } from "./CodeBlockParameterView";
import { IconArrowMoveDown, IconArrowMoveUp, IconFoldDown, IconFoldUp, IconX } from "@tabler/icons-react";
import { InvisibleButton } from "../../Generics/Button";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";
import { CodeBlockBlocksTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { StatementDiv } from "./StatementDiv";
import { useToggle } from "@uidotdev/usehooks";

type Props = {
  statement: CodeBlockStatement;
  onChange: (n: CodeBlockStatement) => void;
  onDelete?: () => void;
  onMove?: (dir: "up" | "down") => void;
};

export const CodeBlockStatementView = ({ statement, onDelete, onMove, onChange }: Props) => {
  var def = CodeBlockBlocksTypes[statement.type];
  var [isOpen, toggleIsOpen] = useToggle(true);
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
              onChange={(v) => {
                onChange({ ...statement, parameters: { ...statement.parameters, [key]: v } });
              }}
            />
          ))}
        </div>
      )}
    </StatementDiv>
  );
};
