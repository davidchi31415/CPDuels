import React, { useState } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";

function createData(problemName, problemLink, status) {
  return { problemName, problemLink, status };
}

// na = not attempted, wa = wrong answer, ac = accepted

const rows = [
  createData("1729G Cut Substrings", "https://codeforces.com/problemset/problem/1729/G", "ac"),
  createData("1729F Kirei and the Linear Function", "https://codeforces.com/problemset/problem/1729/F", "ac"),
  createData("1728F Fishermen", "https://codeforces.com/problemset/problem/1728/F", "wa"),
  createData("1728B Best Permutation", "https://codeforces.com/problemset/problem/1728/B", "wa"),
  createData("1728A Colored Balls: Revisited", "https://codeforces.com/problemset/problem/1728/A", "na")
];

export default function ProblemsTable() {
  const [rowData, setRowData] = useState(rows);

  return (
    <TableContainer sx={{ width: 650, maxHeight: 330, borderBottom: '0.5px' }} variant="play__table" component={Paper}>
      <Table aria-label="Duel Problems">
        <TableHead>
          <TableRow sx={{ "& th": { backgroundColor: "#bebeff", fontWeight: 700, borderBottom: "solid black 0.5px" } }}>
            <TableCell align="center">
              <Typography variant="h6" align="center">
                #
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" align="center">
                Problem
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index+1} sx={{ "& td": { cursor: 'pointer', borderBottom: "solid black 0.5px" }, ":hover": { backgroundColor: "#ffe176"} }}
            onClick={() => { window.open(row.problemLink) }}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{row.problemName}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
