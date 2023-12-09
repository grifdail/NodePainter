import styled from "styled-components";

export const PortForeignObject = styled.foreignObject`
  margin: 0;
  padding: 0;
  padding-right: 5px;
  position: relative;
  display: block;
  & > div {
    padding: 0;
    margin: 0;
    width: 100%;
    height: 100%;
    max-width: 175px;
    //overflow: hidden;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    flex: 1 0;
    flex-wrap: nowrap;

    & > p {
      flex: 1 1;
      min-width: 50px;
    }

    & input {
      flex: 1 1 10px;
      display: block;
      flex-direction: row;
      max-width: 150px;
      width: 10px;
      text-align: right;
      margin: 1px;
    }

    & > div {
      flex: 1 1 10px;
      max-width: 175px;
      display: flex;
      flex-direction: row;
      overflow: 0;
    }
  }
`;
