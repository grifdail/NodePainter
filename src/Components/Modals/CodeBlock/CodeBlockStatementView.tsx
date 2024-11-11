import styled from "styled-components";
import { CodeBlockStatement } from "../../../Types/CodeBlock";
import { CodeBlockParameterView } from "./CodeBlockParameterView";
import { IconArrowMoveDown, IconArrowMoveUp, IconX } from "@tabler/icons-react";
import { InvisibleButton } from "../../Generics/Button";
import { ButtonGroup } from "../../StyledComponents/ButtonGroup";

export const StatementDiv = styled.div<{ expand?: boolean }>`
  background: var(--color-background);
  flex: 0 0 content;
  padding: var(--padding-small);
  border-radius: var(--border-radius-small);

  & > div.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    & > h4 {
      margin: 0;
    }

    & > ${ButtonGroup} {
      padding: 0;
    }
  }
`;

type Props = {
  statement: CodeBlockStatement;
  onChange: (n: CodeBlockStatement) => void;
  onDelete?: () => void;
  onMove?: (dir: "up" | "down") => void;
};

export const CodeBlockStatementView = ({ statement, onDelete, onMove, onChange }: Props) => {
  return (
    <StatementDiv>
      <div className="header">
        <h4>{statement.type}</h4>
        <ButtonGroup>
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
    </StatementDiv>
  );
};
