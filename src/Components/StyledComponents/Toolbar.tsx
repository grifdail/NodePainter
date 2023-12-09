import styled from "styled-components";

export var Toolbar = styled.menu<{ vertical?: boolean; reversed?: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column-reverse;
  flex-direction: ${(props) => (props.vertical ? (props.reversed ? "column-reverse" : "column") : props.reversed ? "row-reverse" : "row")};

  --border-radius: 5px;
  margin: 0;
  padding: 0;

  & > button {
    border: 2px solid #333;
    background: white;
    pointer-events: all;
    cursor: pointer;
    display: flex;
    padding: 10px;

    transition: background-color 0.3s ease-in-out;

    justify-content: center;
    align-items: center;
    gap: 10px;
  }

  & > button:hover {
    background-color: #eee;
  }

  & > button:not(${(props) => (props.reversed ? ":last-child" : ":first-child")}) {
    ${(props) => (props.vertical ? "border-top: none" : "border-left: none")}
  }

  & > button:first-child {
    border-radius: ${(props) => (props.vertical ? (props.reversed ? "0 0 var(--border-radius) var(--border-radius)" : "var(--border-radius) var(--border-radius) 0 0") : props.reversed ? "0 var(--border-radius) var(--border-radius) 0" : "var(--border-radius) 0 0 var(--border-radius)")};
  }
  & > button:last-child {
    border-radius: ${(props) => (props.vertical ? (props.reversed ? "var(--border-radius) var(--border-radius) 0 0" : "0 0 var(--border-radius) var(--border-radius)") : props.reversed ? "var(--border-radius) 0 0 var(--border-radius)" : "0 var(--border-radius) var(--border-radius) 0")};
  }
`;
