import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';

export default function TimeTable({timerVal}) {

  return (
    <TableContainer sx={{ width: 475 }} variant="play__table" component={Paper}>
      <Table aria-label="Time Table">
        <TableHead>
          <TableRow sx={{ height: 10, "& th": { backgroundColor: "#bebeff", fontWeight: 700, borderBottom: 'solid black 0.5px' } }}>
            <TableCell align="center">
              <Typography variant="h6" align="center">
                Time
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={1} align="center" sx={{ fontSize: '2em' }}>
              {(Number.isInteger(timerVal) && timerVal > 0) ?
              `${`${Math.floor(timerVal/3600)}`.padStart(2, '0') + ':' + `${Math.floor(timerVal/60)%60}`.padStart(2, '0') + ':' + `${timerVal%60}`.padStart(2, '0')}`
              : "Time's up."}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
