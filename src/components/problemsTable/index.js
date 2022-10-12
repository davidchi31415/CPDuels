import { Td } from '@chakra-ui/react';
import React, { useState, useEffect, useMemo } from 'react';
import Database, { handleUID } from '../../data';
import ReactTable from './tableContainer';
import socket from '../../socket';
import { useNavigate } from 'react-router-dom';

const SubmissionsTable = ({ id, duelStatus, playerNum}) => {
  const [submissions, setSubmissions] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const getSubmissions = async () => {
      let duel = await Database.getDuelById(id);
      // setSubmissions(duel.submissions); TODO
    }
    getSubmissions();
    
    socket.on('problem-change', async ({ roomId }) => {
      if (roomId === id) {
        await getSubmissions();
      }
    });

    return () => {
      socket.off('problem-change');
    }
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Time",
        
      },
      {
        Header: "Submission Id",
        accessor: "cf_id", // TODO
        maxWidth: "10em",
      },
      {
        Header: "Name",
        accessor: "name", // TODO
        maxWidth: "15em",
      },
      {
        Header: "Verdict",
        accessor: "points",
        maxWidth: "10em",
      },
    ],
    []
  );


  return (
    submissions ?
    <ReactTable
      data={submissions ? submissions : []} columns={columns} 
      rowProps={row => ({
        onClick: () => window.open(`https://www.codeforces.com/problemset/problem/${row.original.contestId}/${row.original.index}`)
      })} 
    />
    : <p>No submissions yet.</p>
  );
}

export default SubmissionsTable;