import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, FormControl, TextField, InputLabel, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import socket from '../../../components/socket.js';
import { handleUID } from "../../../data/index.js";
import Database from "../../../data/index.js";

const JoinDuelSection = ({ id }) => {
  const [handle, setHandle] = useState('');

  return (
    <>
      <FormControl required fullWidth>
        <InputLabel id="handle-input-label" shrink>CF Handle</InputLabel>
        <TextField
            required
            id="outlined-required"
            labelID="handle-input-label"
            onChange={(e) => setHandle(e.target.value)}
        /> 
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button
            variant="contained"
            onClick={() => {
              handleUID();
              let uid = localStorage.getItem('uid');
              socket.emit('join-duel', {roomId: id, handle: handle, uid: uid});
            }}
            sx={{ margin: "0 auto", mt: "1em" }}
        >
            Join
        </Button>
      </Box>
    </>
  )
}

export default function TimeTable({id, duelStatus, duelOwnership}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [startButtonClicked, setStartButtonClicked] = useState(false);
  const [winner, setWinner] = useState("");

  const renderContent = () => {
    if (duelStatus === 'WAITING') {
      return duelOwnership ? "Wait for someone to join." : <JoinDuelSection id={id} />
    } else if (duelStatus === 'READY') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button 
            variant="contained"
            onClick={() => setStartButtonClicked(true)}
            sx={{ margin: "0 auto", mt: "1em" }}
            >
              Start Duel
          </Button>
        </Box>
      )
    } else {
      return (duelStatus === 'FINISHED') ? `${winner} wins!`
      : `${`${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0')}`
    }
  }

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

  useEffect(() => {
    const getWinner = async () => {
      let duel = await Database.getDuelById(id);
      let winner = duel.result;
      if (winner) {
        if (winner[0] === 'TIE') {
          setWinner('TIE');
        } else {
          setWinner(winner[1]);
        }
      }
    }
    getWinner();
  });

  return (
    <TableContainer sx={{ width: 475 }} variant="play__table" component={Paper}>
      <Table aria-label="Time Table">
        <TableHead>
          <TableRow sx={{ height: 10, "& th": { backgroundColor: "#bebeff", fontWeight: 700, borderBottom: 'solid black 0.5px' } }}>
            <TableCell align="center">
              <Typography variant="h6" align="center">
                {
                  (duelStatus === 'WAITING' && !duelOwnership) ? "Join"
                  : (
                      (duelStatus === 'WAITING' && duelOwnership) ? "Wait"
                      : (
                          (duelStatus === 'READY') ? "Start"
                          : (
                            (duelStatus === 'ONGOING') ? "Time" : "Result"
                          )
                        )
                    )
                }
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={1} align="center" sx={{ fontSize: '2em' }}>
              {
                renderContent()
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
