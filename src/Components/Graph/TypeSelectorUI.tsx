import { useTree } from "../../Hooks/useTree";
import { NodeData } from "../../Types/NodeData";
import { NodeDefinition } from "../../Types/NodeDefinition";
import { PortType } from "../../Types/PortType";
import styled from "styled-components";
import { PortColor } from "../StyledComponents/PortColor";
import { Icon, IconPlus } from "@tabler/icons-react";
import { Menu, MenuItem } from "@szhsin/react-menu";

const MAX_TYPE_SINGLE_LINE = 5;

var StyledButton = styled.button<{ selected: boolean }>`
  width: 20px;
  text-align: center;
  height: 20px;
  align-items: center;
  justify-content: center;
  transform: scale(1);
  animation: transform 0.3s ease-in-out;
  border-radius: 50%;
  border: 2px solid var(--color-property);
  background: ${(props) => (props.selected ? "var(--color-property)" : "none")};
  padding: 0;
  display: flex;

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
    stroke: ${(props) => (props.selected ? "black" : "var(--color-property)")};
  }

  &:hover {
    transform: scale(1.1);
    background: ${(props) => (props.selected ? "var(--color-property)" : "rgba(0, 0, 0, 0.2)")};
  }
`;
var StyledDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  display: block flex;
  justify-content: right;
  align-items: center;
  padding-right: 2px;
`;

function TypeMenuItem({ type, onClick, selectedtype }: { type: PortType; selectedtype: PortType; onClick: (type: PortType) => void }) {
  const portDescription = PortColor[type];
  const Icon = portDescription.tinyIcon as Icon;
  return (
    <MenuItem onClick={() => onClick(type)}>
      <StyledButton className={type} selected={type === selectedtype} style={{ marginRight: "10px" }}>
        <Icon />
      </StyledButton>

      {type}
    </MenuItem>
  );
}

export function TypeSelectorUI({ node, def }: { node: NodeData; def: NodeDefinition }) {
  const types = def.availableTypes as PortType[];
  const onClick = (type: PortType) => useTree.getState().changeNodeType(node.id, type);
  var width = Math.min(types.length, MAX_TYPE_SINGLE_LINE + 1) * 20;
  return (
    <foreignObject x={260 - width} y="10" height="30" width={width}>
      <StyledDiv>
        {types.slice(0, MAX_TYPE_SINGLE_LINE).map((item) => (
          <TypeButton key={item} type={item} onClick={onClick} selectedtype={node.selectedType} />
        ))}
        {types.length > MAX_TYPE_SINGLE_LINE && (
          <Menu
            overflow="auto"
            portal={true}
            menuButton={
              <StyledButton selected={false} className="plus">
                <IconPlus />
              </StyledButton>
            }>
            {types.map((type) => (
              <TypeMenuItem onClick={onClick} type={type} selectedtype={node.selectedType}></TypeMenuItem>
            ))}
          </Menu>
        )}
      </StyledDiv>
    </foreignObject>
  );
}

export function TypeButton({ type, onClick, selectedtype }: { type: PortType; selectedtype: PortType; onClick: (type: PortType) => void }) {
  const portDescription = PortColor[type];
  const Icon = portDescription.tinyIcon as Icon;
  return (
    <StyledButton className={type} onClick={() => onClick(type)} selected={type === selectedtype}>
      <Icon />
    </StyledButton>
  );
}
