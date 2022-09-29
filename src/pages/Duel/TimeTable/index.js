import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import socket from '../../../components/socket.js';

export default function TimeTable({id, duelStatus}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startButtonClicked, setStartButtonClicked] = useState(false);

  useEffect(() => {
    socket.on('time-left', ({roomId, timeLeft}) => {
      if (roomId == id) {
        setHours(Math.floor(timeLeft/3600));
        setMinutes(Math.floor(timeLeft/60)%60);
        setSeconds(timeLeft%60);
      }
    });
    return () => {
      socket.off('time-left');
    };
  }, []);

  useEffect(() => {
    if (startButtonClicked) {
      console.log('button clicked');
      socket.emit('start-duel', {roomId: id});
    }
  }, [startButtonClicked]);

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
              {(duelStatus==="WAITING" ?
                <button onClick={() => setStartButtonClicked(true)}>Start Duel</button>
                  : (duelStatus==="FINISHED" ?
                    "Time's up."
                    : `${`${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0')}`
                    )  
                )
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
