import styled from "styled-components";
import { ColorInputDiv } from "../Inputs/ColorInput";

export const PaintingToolbar = styled.div`
  //display: none;
  //background: red;
  display: flex;
  flex-direction: row;
  gap: var(--padding-small);
  align-items: stretch;
  flex-wrap: wrap;

  justify-content: center;
  //overflow: scroll;

  & > fieldset {
    padding: 0;
    margin: 0;
    border: 0;
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: var(--padding-small);
    align-items: center;
    flex: 0 1 100px;

    & > svg {
      flex: 0 0 content;
    }

    & > input[type="range"] {
      width: 100px;
    }
  }

  & ${ColorInputDiv} {
    flex: 0 0 100px;
  }
`;
