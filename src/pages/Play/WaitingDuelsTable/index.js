import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Paper from "@mui/material/Paper";
import Database from '../../../data';

export default function WaitingDuelsTable() {
  const [rowData, setRowData] = useState([]);
  const [ratingOrderDirection, setRatingOrderDirection] = useState('asc');
  const [problemCountOrderDirection, setProblemCountOrderDirection] = useState('asc');
  const [timeLimitOrderDirection, setTimeLimitOrderDirection] = useState('asc');

  useEffect(() => {
    Database.getDuelWaiting().then(
      (result) => setRowData(result)
    );
  }, []);

  const sortRatings = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.ratingMin > b.ratingMin ? 1 : b.ratingMin > a.ratingMin ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.ratingMin < b.ratingMin ? 1 : b.ratingMin < a.ratingMin ? -1 : 0
        );
    }
  };
  const sortProblemCounts = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.problemCount > b.problemCount ? 1 : b.problemCount > a.problemCount ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.problemCount < b.problemCount ? 1 : b.problemCount < a.problemCount ? -1 : 0
        );
    }
  };
  const sortTimeLimits = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.timeLimit > b.timeLimit ? 1 : b.timeLimit > a.timeLimit ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.timeLimit < b.timeLimit ? 1 : b.timeLimit < a.timeLimit ? -1 : 0
        );
    }
  };

  const handleSortRequest = (target) => {
    switch (target) {
      case "rating":
        setRowData(sortRatings(rowData, ratingOrderDirection));
        setRatingOrderDirection(ratingOrderDirection === "asc" ? "desc" : "asc");
        break;
      case "problemCount":
        setRowData(sortProblemCounts(rowData, problemCountOrderDirection));
        setProblemCountOrderDirection(problemCountOrderDirection === "asc" ? "desc" : "asc");
        break;
      case "timeLimit":
        setRowData(sortTimeLimits(rowData, timeLimitOrderDirection));
        setTimeLimitOrderDirection(timeLimitOrderDirection === "asc" ? "desc" : "asc");
        break;
      default:
        console.log("error");
    }
  };

  const ellipsisStyle = {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    width: '100px',
    maxWidth: '125px' 
  };

  return (
    <TableContainer sx={{ width: 650 }} variant="play__table" component={Paper}>
      <Table aria-label="Available Duels">
        <TableHead variant="play__table__head">
          <TableRow sx={{ "& th": { backgroundColor: "#bebeff", fontWeight: 700, borderBottom: 'solid black 0.5px' } }}>
            <TableCell align="center">Handle</TableCell>
            <TableCell align="center" onClick={() => handleSortRequest("rating")}>
              <TableSortLabel active={true} direction={ratingOrderDirection}>
                Rating
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" onClick={() => handleSortRequest("problemCount")}>
              <TableSortLabel active={true} direction={problemCountOrderDirection}>
                # Problems
              </TableSortLabel>
            </TableCell>
            <TableCell align="center" onClick={() => handleSortRequest("timeLimit")}>
              <TableSortLabel active={true} direction={timeLimitOrderDirection}>
                Time
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData ? rowData.map((row) => (
            <TableRow key={row._id} sx={{ "& td": { cursor: 'pointer', borderBottom: 'solid black 0.5px' }, ":hover": { backgroundColor: "#ffe176"} }}>
              <TableCell align="center">{row.players[0]}</TableCell>
              <TableCell align="center">{row.ratingMin}-{row.ratingMax}</TableCell>
              <TableCell align="center">{row.problemCount}</TableCell>
              <TableCell align="center">{row.timeLimit}</TableCell>
            </TableRow>
          )) : "none"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
