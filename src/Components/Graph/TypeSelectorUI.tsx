import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortTypeDefinitions } from "../../Types/PortTypeDefinitions";
import styled from "styled-components";
import { Icon, IconPlus } from "@tabler/icons-react";
import { Menu, MenuItem, MenuRadioGroup } from "@szhsin/react-menu";
import { NODE_WIDTH } from "./NodeVisualConst";
import { PortType } from "../../Types/PortType";
import { memo } from "react";

const MAX_TYPE_SINGLE_LINE = NODE_WIDTH / (30 + 2) - 1;

var StyledButton = styled.button<{ selected: boolean }>`
  width: 30px;
  text-align: center;
  height: 30px;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  animation: transform 0.3s ease-in-out;
  border-radius: 24px 24px 0 0;
  border: 2px solid var(--color-property);
  border-bottom: none;
  background: ${(props) => (props.selected ? "var(--color-property)" : "var(--color-background-card)")};
  padding: 0;
  display: flex;
  margin-top: 3px;
  cursor: pointer;

  &.plus {
    --color-property: black;
    border-radius: 3px;
  }

  &[class^="array-"],
  &[class*=" array-"] {
    border-style: dashed;
  }

  & svg {
    height: 80%;
    width: 80%;
    color: ${(props) => (props.selected ? "black" : "var(--color-property)")};
  }

  &:hover {
    transform: scale(1.1);
    background: ${(props) => (props.selected ? "var(--color-property)" : "var(--color-background-highghlight)")};
  }
`;
var StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  display: block flex;
  justify-content: left;
  align-items: center;
  padding-right: 2px;
  gap: var(--padding-small);
`;

var StyledSpan = styled.span<{ selected?: boolean }>`
  margin-right: var(--padding-small);
  border-radius: 50px;

  & svg {
    color: var(--color-property);
  }
`;

function TypeMenuItem({ type, onClick, selectedtype }: { type: PortType; selectedtype: PortType; onClick: (type: PortType) => void }) {
  const portDescription = PortTypeDefinitions[type];
  const Icon = portDescription.smallIcon as Icon;
  return (
    <MenuItem
      type="radio"
      value={type}
      onClick={() => onClick(type)}>
      <StyledSpan className={type}>
        <Icon />
      </StyledSpan>
      {type}
    </MenuItem>
  );
}

export const TypeSelectorUI = memo(function TypeSelectorUI({ node, def }: { node: NodeData; def: NodeDefinition }) {
  const types = def.availableTypes as PortType[];
  const onClick = (type: PortType) => useTree.getState().changeNodeType(node.id, type);
  return (
    <foreignObject
      x={0}
      y="-30"
      height="30"
      width={NODE_WIDTH}>
      <StyledDiv>
        {types.slice(0, MAX_TYPE_SINGLE_LINE).map((item) => (
          <TypeButton
            key={item}
            type={item}
            onClick={onClick}
            selectedtype={node.selectedType}
          />
        ))}
        {types.length > MAX_TYPE_SINGLE_LINE && (
          <Menu
            overflow="auto"
            portal={true}
            menuButton={
              <StyledButton
                selected={false}
                className="plus">
                <IconPlus />
              </StyledButton>
            }>
            <MenuRadioGroup value={node.selectedType}>
              {types.map((type) => (
                <TypeMenuItem
                  key={type}
                  onClick={onClick}
                  type={type}
                  selectedtype={node.selectedType}></TypeMenuItem>
              ))}
            </MenuRadioGroup>
          </Menu>
        )}
      </StyledDiv>
    </foreignObject>
  );
});

export function TypeButton({ type, onClick, selectedtype }: { type: PortType; selectedtype: PortType; onClick: (type: PortType) => void }) {
  const portDescription = PortTypeDefinitions[type];
  const Icon = portDescription.smallIcon as Icon;
  return (
    <StyledButton
      className={type}
      onClick={() => onClick(type)}
      selected={type === selectedtype}>
      <Icon />
    </StyledButton>
  );
}
