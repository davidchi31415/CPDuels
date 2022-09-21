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
import { io } from 'socket.io-client';

const socket = io('http://localhost:8081');

export default function TimeTable() {
  const [isConn, setIsConn] = useState(false);
  const [timerVal, setTimerVal] = useState(10);
  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('startTimer', timerVal);
      setIsConn(true);
    });
    socket.on('timeLeft', (val) => {
      setTimerVal(val);
    })
    return () => {
      socket.off('connect');
    };
  }, []);
  return (
    <TableContainer sx={{ width: 475 }} variant="play__table" component={Paper}>
      <Table aria-label="Time Table">
        <TableHead>
          <TableRow sx={{ height: 10, "& th": { backgroundColor: "#bebeff", fontWeight: 700 } }}>
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
