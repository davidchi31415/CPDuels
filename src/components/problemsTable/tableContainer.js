import { useTable } from 'react-table';
import {
  TableContainer, Table, TableCaption, Thead, Tbody, Tfoot, Th, Tr, Td,
  Center,
  useColorModeValue,
  Skeleton
} from '@chakra-ui/react';

const ReactTable = ({ loading, columns, data, rowProps }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
      columns,
      data,
    }
  );

  const fillEmptyRows = (rows, total) => {
    const leftoverRows = [];
    for (let i = rows; i < total; i++) {
      if (i === rows && rows != 0) leftoverRows.push(<Tr><Td colSpan={4} textAlign="center" borderY="solid 1px" borderColor="grey.500" fontWeight="bold"><Skeleton isLoaded={!loading}>-</Skeleton></Td></Tr>);
      else if (i === total-1) leftoverRows.push(<Tr><Td colSpan={4} textAlign="center" border="none" fontWeight="bold"><Skeleton isLoaded={!loading}>-</Skeleton></Td></Tr>);
      else leftoverRows.push(<Tr><Td colSpan={4} textAlign="center" borderBottom="solid 1px" borderColor="grey.500" fontWeight="bold"><Skeleton isLoaded={!loading}>-</Skeleton></Td></Tr>);
    }
    return (
      leftoverRows
    );
  }

  const rowHoverColor = useColorModeValue("secondary.300", "secondary.900");
  const borderColor = useColorModeValue('rgb(0, 0, 0, 0.5)', 'rgb(255, 255, 255, 0.5)');

  return (
    <TableContainer
      width="45em"
      border="1px solid"
      borderColor={borderColor}
      boxShadow='2xl'
      rounded="md"
    >
      <Table {...getTableProps()} 
        size="sm"
        mt={1}
        style={{ borderCollapse:"collapse" }}
      >
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <Th {...column.getHeaderProps()}
                  style={{maxWidth: column.maxWidth, fontSize: "1em"}}
                  borderBottom="solid 1px"
                  borderColor="grey.500"
                >
                  <Center>
                    {column.render("Header")}
                  </Center>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <Tr 
                {...row.getRowProps(rowProps(row))}
                style={{cursor: "pointer"}}
                _hover={{ bg: rowHoverColor }}
              >
                {row.cells.map(cell => {
                  console.log(cell);
                  if (rowIndex === rows.length-1) {
                    return (
                      <Td {...cell.getCellProps()}
                        style={{ maxWidth: cell.maxWidth, textAlign: "center" }}
                        borderBottom="none"
                      >
                        {cell.render("Cell")}
                      </Td>
                    );
                  }
                  return (
                    <Td {...cell.getCellProps()}
                      style={{ maxWidth: cell.maxWidth, textAlign: "center" }}
                      borderBottom="solid 1px"
                      borderColor="grey.500"
                    >
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
              </Tr>
            );
          })}
          {
            (rows.length < 10) ? fillEmptyRows(rows.length, 10) : ""
          }
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ReactTable;