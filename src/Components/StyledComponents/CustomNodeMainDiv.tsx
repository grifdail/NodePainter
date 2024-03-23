import styled from "styled-components";

export const CustomNodeMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  align-content: stretch;
  align-self: stretch;
  justify-content: stretch;
  flex-grow: 1;
  flex: 1 0 100px;
  gap: 10px;
  overflow: auto;

  & > section {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);

    &.header {
      flex-direction: row;
      justify-content: stretch;
      gap: 10px;

      & fieldset {
        flex: 1 1 100%;
      }
    }

    & fieldset {
      border: none;
      display: flex;
      flex-direction: row;

      align-items: center;
      & label {
        flex: 1 1 0;
      }
      &.invalid {
        border: 1px solid red;
      }
    }

    & > div.port-field {
      display: flex;
      flex-direction: row;
      height: 50px;
      gap: 10px;

      & button.remove {
        border: none;
        background: none;
      }

      & > div {
        display: flex;
        flex: 1 1 100%;
        align-items: stretch;

        & > * {
          display: block;
          flex: 1 1 10px;
        }
        &.type button {
          border: 2px solid black;
          background: none;
        }

        &.default-value > * {
          display: block flex;
          flex: 1 1 10px;
          flex-direction: column;
          margin: 0;
          padding: 0;
          & input[type="checkbox"] {
            justify-self: stretch;
            align-items: stretch;
            flex: 1 1 10px;
          }
        }
        &.default-value > button {
          justify-content: center;
          align-items: center;
        }
      }
      & > button {
        flex: 0 0 50px;
      }
    }
  }
`;
