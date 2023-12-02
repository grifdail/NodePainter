import styled from "styled-components";

export const ColorButton = styled.button<{ color: string; opositeColor: string }>`
  border: 2px solid black;
  background: ${(props) => props.color};
  color: ${(props) => props.opositeColor};
  width: 100px;
  flex-shrink: 0;
  flex-basis: 100px;
  display: block;
  border-radius: 5px;
`;
