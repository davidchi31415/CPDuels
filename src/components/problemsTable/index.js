import { Td } from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import Database, { handleUID } from '../../data';
import ReactTable from './tableContainer';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';

const ProblemsTable = ({ id, duelStatus, playerNum}) => {
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getProblems = async () => {
      let duel = await Database.getDuelById(id);
      setProblems(duel.problems);
      setLoading(false);
    }
    getProblems();

    socket.on('time-left', async () => {
      await getProblems();
    })
    
    socket.on('problem-change', async ({ roomId }) => {
      if (roomId === id) {
        await getProblems();
      }
    });

    return () => {
      socket.off('time-left');
      socket.off('problem-change');
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "",
        accessor: (row, index) => index+1,
        id: row => row._id,
        maxWidth: "5em",
      },
      {
        Header: "Problem",
        accessor: "name",
        maxWidth: "15em",
      },
      {
        Header: "Difficulty",
        accessor: "rating",
        maxWidth: "5em",
      },
      {
        Header: "Duel Points",
        accessor: "points",
        maxWidth: "10em",
      },
    ],
    []
  );


  return (
    <ReactTable loading={loading}
      data={problems ? problems : []} columns={columns} 
      rowProps={row => ({
        onClick: () => window.open(`https://www.codeforces.com/problemset/problem/${row.original.contestId}/${row.original.index}`)
      })} 
    />
  );
}

export default ProblemsTable;