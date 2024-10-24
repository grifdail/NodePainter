import { animated } from "@react-spring/web";
import styled from "styled-components";

export const ModalBody = styled(animated.div)<{ big: boolean }>`
  width: 80%;
  min-height: 500px;
  max-height: 80%;
  ${(props) => (props.big ? "height: 80%;" : "")}
  overflow: hidden;
  margin: auto;
  background: light-dark(var(--color-background-light), var(--color-background-dark));
  color: light-dark(var(--color-text-light), var(--color-text-dark));
  padding: 10px;
  border: 2px solid #333;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 0 30px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;

  & > header {
    display: flex;
    align-items: center;
    gap: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding: 0;
    flex-grow: 0;
    flex-shrink: 0;
    height: 62px;

    & h2 {
      flex-grow: 1;
    }

    & button {
      justify-self: flex-end;
      border: 1px solid light-dark(var(--color-border-light), var(--color-border-dark));
      background: none;
      aspect-ratio: 1;
      display: flex;
      padding: 5px;
      align-items: center;
      justify-content: center;
      aspect-ratio: 1;
      border-radius: Z 50%;

      &:hover {
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
  }

  & > section {
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    overflow: hidden;
    flex-shrink: 1;
    flex-grow: 1;
  }

  @media (max-width: 840px), (max-height: 500px) {
    width: 100%;
    border-radius: 0;
    border: none;
    height: 100%;
    max-height: 100%;
    min-height: 0;

    & > header {
      height: 32px;

      & > h2 {
        font-size: 15px;
      }

      & > button {
        height: 24px;
        padding: 2px;
      }
    }
  }
`;
