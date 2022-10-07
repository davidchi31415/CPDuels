import { useTable, useSortBy, useFilters, usePagination, useRowSelect } from 'react-table';
import Filter, { DefaultColumnFilter } from './filters';
import {
  TableContainer, Table, TableCaption, Thead, Tbody, Tfoot, Th, Tr, Td,
  Center,
  Button, ButtonGroup, 
  NumberInput, NumberInputField, NumberInputStepper, NumberIncrementStepper, NumberDecrementStepper,
  Flex, Spacer,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';

const ReactTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter },
      initialState: { pageIndex: 0, pageSize: 10 }
    },
    useFilters,
    useSortBy,
    usePagination
  );

  const fillEmptyRows = (rows, total) => {
    const leftoverRows = [];
    for (let i = rows; i < total; i++) {
      if (i === rows && rows != 0) leftoverRows.push(<Tr><Td colSpan={4} textAlign="center" borderY="solid 1px" borderColor="grey.500" fontWeight="bold">-</Td></Tr>);
      else if (i === total-1) leftoverRows.push(<Tr><Td colSpan={4} textAlign="center" border="none" fontWeight="bold">-</Td></Tr>);
      else leftoverRows.push(<Tr><Td colSpan={4} textAlign="center" borderBottom="solid 1px" borderColor="grey.500" fontWeight="bold">-</Td></Tr>)
    }
    return (
      leftoverRows
    );
  }

  const generateSortingIndicator = column => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""
  }

  const onChangeInSelect = event => {
    setPageSize(Number(event.target.value))
  }
  
  const onChangeInInput = event => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0
    gotoPage(page)
  }

  const rowHoverColor = useColorModeValue("secondary.300", "secondary.900");
  const rowBorderColor = useColorModeValue("grey.500", "gray.300");
  const buttonBgColor = useColorModeValue("primary.500", "primary.300");
  const buttonTextColor = useColorModeValue("white", "grey.900");

  return (
    <>
      <VStack width="fit-content">
      <Center>
        <Text my={0}>Showing Page {`${pageIndex+1} out of ${pageCount}`} of Waiting Duels</Text>
      </Center>
      <TableContainer
        maxW="fit-content"
        border="1px solid"
        rounded="md"
      >
        <Table {...getTableProps()} 
          maxW="fit-content"
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
                    <Center {...column.getSortByToggleProps()}>
                      {column.render("Header")}
                      {generateSortingIndicator(column)}
                    </Center>
                    <Filter column={column} />
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {page.map((row, rowIndex) => {
              prepareRow(row);
              return (
                <Tr 
                  {...row.getRowProps()}
                  style={{cursor: "pointer"}}
                  _hover={{ bg: rowHoverColor }}
                >
                  {row.cells.map(cell => {
                    if (rowIndex === page.length-1) {
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
              (page.length < 10) ? fillEmptyRows(page.length, 10) : ""
            }
          </Tbody>
        </Table>
      </TableContainer>
      <Flex width="100%" align="center" justifyContent="space-between">
        <ButtonGroup>
          <Button 
            size="xs" fontSize="1.5rem" bg={buttonBgColor} color={buttonTextColor}
            onClick={() => gotoPage(0)} disabled={!canPreviousPage}
          >{"<<"}</Button>
          <Button 
            size="xs" fontSize="1.5rem" bg={buttonBgColor} color={buttonTextColor}
            onClick={previousPage} disabled={!canPreviousPage}
          >{"<"}</Button>
        </ButtonGroup>
        <HStack gap={1}>
          <Text>Go to Page:</Text>
          <NumberInput defaultValue={pageIndex+1} min={1} max={pageCount}
            size='sm' borderColor="grey.500"
            onChange={(pageNum) => gotoPage(pageNum-1)}
          >
            <NumberInputField maxW={5}/>
            <NumberInputStepper borderColor="grey.500">
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </HStack>
        <ButtonGroup>
          <Button 
            size="xs" fontSize="1.5rem" bg={buttonBgColor} color={buttonTextColor}
            onClick={nextPage} disabled={!canNextPage}
          >{">"}</Button>
          <Button 
            size="xs" fontSize="1.5rem" bg={buttonBgColor} color={buttonTextColor}
            onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}
          >{">>"}</Button>
        </ButtonGroup>
      </Flex>
      </VStack>
    </>
  );
}

export default ReactTable;