import React from 'react';
import { Input, Center } from '@chakra-ui/react';
import { GoSearch } from 'react-icons/go'

export const DefaultColumnFilter = ({
  column: {
    filterValue,
    setFilter,
    preFilteredRows: { length },
  },
}) => {
  return (
    <Input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined)
      }}
      borderColor="grey.100"
      size="xs"
      rounded="md"
      // children={<GoSearch />}
    />
  )
}

const Filter = ({ column }) => {
  return (
    <Center mt={1}>
      {column.canFilter && column.render("Filter")}
    </Center>
  );
}

export default Filter;