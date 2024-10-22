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

  & p.subtitle {
    padding-top: 0;
    padding-bottom: 0;
    margin-top: 0;
    margin-bottom: 0;
  }

  & > section {
    display: flex;
    flex-direction: column;
    gap: 2px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
    max-width: 100%;

    &.header {
      flex-direction: row;
      justify-content: stretch;
      gap: 10px;

      & fieldset {
        flex: 1 1 100%;
        gap: 10px;
        & input {
          width: 0;
        }
      }
      @media (max-width: 840px), (max-height: 500px) {
        flex-direction: column;
        gap: 1em;

        & fieldset > * {
          width: 50%;
        }
      }
    }

    & fieldset {
      border: none;
      display: flex;
      flex-direction: row;
      max-width: 100%;

      align-items: center;
      & label {
        flex: 1 1 0;
      }
      &.invalid {
        border: 1px solid red;
      }
      & input {
        flex: 1 1 0;
      }
    }

    & > div.port-field {
      display: grid;
      flex-direction: row;
      height: 50px;
      gap: 5px;
      grid-template-columns: 1fr 1fr 1fr 30px;
      align-content: stretch;

      & input {
        min-width: 25px;
        width: 0;
      }

      & button.remove {
        border: none;
        background: none;
        margin-left: 0;
        padding: 0;
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
          width: 0;
          & input[type="checkbox"] {
            justify-self: stretch;
            align-items: stretch;
            flex: 1 1 10px;
          }

          &.vector-input {
            flex-direction: row;
            align-items: stretch;
            justify-content: stretch;
            align-content: stretch;
            & > input {
              flex: 1 1 0;
            }
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
