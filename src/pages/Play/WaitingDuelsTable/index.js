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

function createData(duelID, handle, rating, problemCount, timeLimit, style) {
  return { duelID, handle, rating, problemCount, timeLimit, style };
}

export default function WaitingDuelsTable() {
  const [rowData, setRowData] = useState([]);
  const [ratingOrderDirection, setRatingOrderDirection] = useState('asc');
  const [problemCountOrderDirection, setProblemCountOrderDirection] = useState('asc');
  const [timeLimitOrderDirection, setTimeLimitOrderDirection] = useState('asc');
  const [styleOrderDirection, setStyleOrderDirection] = useState('asc');

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
          a.rating > b.rating ? 1 : b.rating > a.rating ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.rating < b.rating ? 1 : b.rating < a.rating ? -1 : 0
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
  const sortStyles = (arr, orderBy) => {
    switch (orderBy) {
      case "asc":
      default:
        return arr.sort((a, b) =>
          a.style > b.style ? 1 : b.style > a.style ? -1 : 0
        );
      case "desc":
        return arr.sort((a, b) =>
          a.style < b.style ? 1 : b.style < a.style ? -1 : 0
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
      case "styles":
        setRowData(sortStyles(rowData, styleOrderDirection));
        setStyleOrderDirection(styleOrderDirection === "asc" ? "desc" : "asc");
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
          <TableRow sx={{ "& th": { backgroundColor: "#bebeff", fontWeight: 700 } }}>
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
            <TableCell align="center" onClick={() => handleSortRequest("styles")}>
              <TableSortLabel active={true} direction={styleOrderDirection}>
                Style
              </TableSortLabel>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowData ? rowData.map((row) => (
            <TableRow key={row._id} sx={{ "& td": { cursor: 'pointer' }, ":hover": { backgroundColor: "#ffe176"} }}>
              <TableCell align="center">{row.players[0]}</TableCell>
              <TableCell align="center">{row.rating}</TableCell>
              <TableCell align="center">{row.problemCount}</TableCell>
              <TableCell align="center">{row.timeLimit}</TableCell>
              <TableCell align="center">{row.style}</TableCell>
            </TableRow>
          )) : "none"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
