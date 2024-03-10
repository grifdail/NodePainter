import { NodeData, useTree } from "../../Hooks/useTree";
import { NodeDefinition, PortType } from "../../Data/NodeDefinition";
import styled from "styled-components";
import { PortColor } from "../StyledComponents/PortColor";
import { Icon } from "@tabler/icons-react";

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
`;

export function TypeSelectorUI({ node, def }: { node: NodeData; def: NodeDefinition }) {
  const types = def.availableTypes as PortType[];
  const onClick = (type: PortType) => useTree.getState().changeNodeType(node.id, type);
  return (
    <foreignObject x={260 - types.length * 20} y="10" height="30" width={types.length * 20}>
      <StyledDiv>
        {types.map((item) => (
          <TypeButton type={item} onClick={onClick} selectedtype={node.selectedType} />
        ))}
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
