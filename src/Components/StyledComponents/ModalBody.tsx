import { animated } from "@react-spring/web";
import styled from "styled-components";

export const ModalBody = styled(animated.div)<{ big: boolean }>`
  width: 80%;
  min-height: 500px;
  max-height: 80%;
  ${(props) => (props.big ? "height: 80%;" : "")}
  overflow: auto;
  margin: auto;
  background: var(--color-background);
  color: var(--color-text);
  padding: var(--padding-large);
  border: var(--border-size) solid #333;
  border-radius: var(--border-radius-large);
  box-shadow: var(--card-shadow);
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  position: relative;

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
      background: transparent;
      aspect-ratio: 1;
      padding: 0px;
      border: none;

      border-radius: var(--border-radius-large);

      position: absolute;
      top: var(--padding-large);
      right: var(--padding-large);

      transition: color 0.3s;

      &:hover {
        color: rgba(0, 0, 0, 0.3);
      }

      & > svg {
        width: 100%;
        height: 100%;
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
    }
  }
`;
