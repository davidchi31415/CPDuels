import React, { useState, useEffect, useMemo } from 'react';
import ReactTable from './tableContainer.js';
import Database from '../../data';

const WaitingDuelsTable = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    Database.getDuelsWaiting().then(
      result => {
        setData(result);
      }
    );
  }, []);

  const columns = useMemo(
    () => [
      {
        Header: "Username",
        accessor: "players[0].handle",
        disableSortBy: true,
        maxWidth: "12vw"
      },
      {
        Header: "Difficulty",
        accessor: row => `${row.ratingMin}-${row.ratingMax}`,
        id: row => row._id,
        maxWidth: "8vw"
      },
      {
        Header: "# Problems",
        accessor: "problemCount",
        maxWidth: "5vw"
      },
      {
        Header: "Time",
        accessor: "timeLimit",
        maxWidth: "5vw"
      },
    ],
    []
  );

  return (
    <ReactTable data={data} columns={columns} />
  );
}

export default WaitingDuelsTable;