import styled from "styled-components";

export const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  align-items: stretch;
  justify-content: stretch;
  gap: 5px;
  height: 45px;
  position: sticky;

  & input {
    text-align: left;
    padding-left: 35px;
  }

  & span {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    flex: 1 1 auto;
    position: relative;

    & > svg {
      position: absolute;
      left: 5px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
`;
