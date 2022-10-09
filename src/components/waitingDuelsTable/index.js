import React, { useState, useEffect, useMemo } from 'react';
import ReactTable from './tableContainer.js';
import Database from '../../data';
import { FormControl, FormLabel, HStack, Select, VStack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const WaitingDuelsTable = () => {
  const [data, setData] = useState([]);
  const [platform, setPlatform] = useState("All");
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();

  useEffect(() => {
    Database.getDuelsWaiting().then(
      result => {
        if (result?.length) for (let index = 0; index < result.length; index++) result[index].index = index+1;
        setData(result);
        setLoading(false);
      }
    );
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: "platform",
        disableSortBy: true,
        width: "2em"
      },
      {
        Header: "Username",
        accessor: "players[0].handle",
        disableSortBy: true,
        width: "25em"
      },
      {
        Header: "Difficulty",
        accessor: row => `${row.ratingMin}-${row.ratingMax}`,
        id: row => row._id,
        width: "4em"
      },
      {
        Header: "# Problems",
        accessor: "problemCount",
        width: "3em"
      },
      {
        Header: "Time",
        accessor: "timeLimit",
        width: "3em"
      },
    ],
    []
  );

  return (
    <VStack>
      <FormControl>
        <HStack spacing={0}>
          <FormLabel my='auto'>Duel Platform: </FormLabel>
          <Select value={platform} onChange={(e) => setPlatform(e.target.value)}
            borderColor='grey.100' maxW='10em'
          >
            <option value="All">All</option>
            <option value="CF">Codeforces</option>
            <option value="AT">AtCoder</option>
            <option value="LC">LeetCode</option>
          </Select>
        </HStack>
      </FormControl>
      <ReactTable loading={loading} 
        data={(platform !== "All") ? data.filter((duel) => { return duel.platform === platform}) : data} 
        columns={columns}
        rowProps={row => ({
          onClick: () => navigate(`/play/${row.original._id}`),
        })} 
      />
    </VStack>
  );
}

export default WaitingDuelsTable;