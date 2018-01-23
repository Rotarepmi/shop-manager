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
`;

const styles = { MainDiv, Table, TableData, TableHeader, TableRow, Input };

export default styles;
