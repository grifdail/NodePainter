import styled from "styled-components";

export const ButtonGroup = styled.div<{ vertical?: boolean }>`
  display: flex;
  justify-content: stretch;
  gap: 50px;
  padding: 10px;
  flex-direction: ${(state) => (state.vertical ? "column" : "row")};

  & button {
    flex: 1 0 200px;
    height: 50px;
    background: white;
    border: 2px solid black;
    border-radius: 5px;
    transition: background 0.3s;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.2);
      &:disabled {
        background: rgba(0, 0, 0, 0);
      }
    }
    &:disabled {
      cursor: default;
      background: rgba(0, 0, 0, 0.1);
      border: 2px solid #888888;
      color: #888888;
    }
  }
`;
