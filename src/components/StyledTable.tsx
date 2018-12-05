import styled from '@emotion/styled';

export default styled.table`
  width: 1000px;
  max-width: 90%;
  border: 1px solid black;
  border-collapse: collapse;
  border-spacing: 0;
  & td {
    text-align: left;
    padding: 8px;
    border: 1px solid black;
  }
  & thead {
    background-color: darkgray;
    color: #000;
  }
  & tr:nth-of-type(even) {
    background-color: lightgray;
  }
  tr {
    cursor: pointer;
  }
`;
