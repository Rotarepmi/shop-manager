import styled from 'styled-components';

const MainDiv = styled.div`
  font-family: arial, sans-serif;
`;

const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const TableData = styled.td`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
  font-size: 0.8em;
`;

const TableHeader = styled.th`
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #dddddd;
  }
`;

const Input = styled.input`
  margin: 5px;
  border-radius: 5px;
  padding: 5px;
  font-size: inherit;
`;

const FormTable = styled.form`
  width: 90%;
`;

const InputTable = styled.input`
  width: 100%;
  border: none;
  padding: 5px;
  background-color: transparent;
`;

const DeleteBtn = styled.button`
  border: none;
  background: none;
  color: red;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: black;
  }
`;

const SortBtn = styled.button`
  border: none;
  background: none;
  color: black;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    color: silver;
  }
`;

const styles = { MainDiv, Table, TableData, TableHeader, TableRow, Input, FormTable, InputTable, DeleteBtn, SortBtn };

export default styles;
