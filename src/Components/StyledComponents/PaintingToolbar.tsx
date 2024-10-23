import styled from "styled-components";
import { ButtonGroup } from "./ButtonGroup";

export const PaintingToolbar = styled(ButtonGroup)`
  //display: none;
  //background: red;
  width: 100%;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  & .section {
    display: flex;
    justify-content: center;
    gap: 10px;
    align-items: center;

    &.large {
      flex-wrap: wrap;
    }
  }

  & button {
    flex: 0 0 35px;
    height: 35px;
    align-content: center;
    display: flex;
    align-items: center;

    &.selected {
      border: 2px solid black;
      background-color: var(--color-selected);
    }

    &:disabled {
      opacity: 0.3;
    }
    &.icon {
      flex: 0 0 35px;
      margin: 0;
    }
  }

  & fieldset {
    border: none;
    display: flex;
    justify-content: center;
    height: 100%;
    padding: 0;
    align-items: center;
    flex: 1 1 250px;

    &:disabled {
      opacity: 0.3;
    }

    & input.label {
      width: 50px;
      border: none;
      text-align: left;
      margin-left: 5px;

      &:hover {
        text-decoration: underline;
      }
    }

    & input[type="range"] {
      display: block;
      flex: 1 1 120px;
      width: 100%;
    }

    & svg {
      width: 24px;
      flex: 0 0 24px;
    }
  }
`;
