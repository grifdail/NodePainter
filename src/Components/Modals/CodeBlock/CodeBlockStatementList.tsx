import styled, { css } from "styled-components";
import { CodeBlockStatement } from "../../../Types/CodeBlock/CodeBlockStatement";
import { CodeBlockStatementView } from "./CodeBlockStatementView";
import { useListManipulator } from "../../../Hooks/useListManipulator";
import { CodeBlockStatementTypes } from "../../../CodeBlocks/CodeBlockTypes";
import { Menu } from "@szhsin/react-menu";
import { IconPlus } from "@tabler/icons-react";
import { buildMenuItems } from "./buildMenuItems";

export const RootDiv = styled.div<{ $expand: boolean }>`
  background: var(--color-background-card);
  flex: 1 1 content;
  padding: var(--padding-medium);
  border-radius: var(--border-radius-medium);
  display: flex;
  flex-direction: column;
  gap: var(--padding-small);
  ${(state) =>
    state.$expand
      ? css`
          flex: 1 1 content;
          overflow-y: auto;
        `
      : css`
          flex: 0 0 content;
          overflow: auto;
        `};
`;

export const AddButtonStyled = styled.button`
  flex: 0 0 content;
  background: var(--color-background-card);
  align-self: center;
  width: 25px;
  display: block;
  border: 0;
  padding: 0;
  cursor: pointer;
`;

export const CodeBlockStatementList = ({ statements, onChange }: { statements: CodeBlockStatement[]; onChange: (statements: CodeBlockStatement[]) => void }) => {
  var { addNew, remove, change, move } = useListManipulator(statements, onChange);

  const addStatement = (type: string) => {
    var t = CodeBlockStatementTypes[type];
    if (t) {
      addNew(t.create());
    }
  };

  return (
    <RootDiv $expand>
      {statements.map((statement, index) => (
        <CodeBlockStatementView
          key={index}
          statement={statement}
          onChange={(v) => change(index, v)}
          onDelete={() => remove(index)}
          onMove={(dir: "up" | "down") => move(index, dir)}></CodeBlockStatementView>
      ))}

      <Menu
        menuButton={
          <AddButtonStyled>
            <IconPlus></IconPlus>
          </AddButtonStyled>
        }
        portal
        align="center"
        arrow
        overflow="auto">
        {buildMenuItems(CodeBlockStatementTypes, addStatement)}
      </Menu>
    </RootDiv>
  );
};
