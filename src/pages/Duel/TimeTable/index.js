import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography, FormControl, TextField, InputLabel, Box, Button } from "@mui/material";
import Paper from "@mui/material/Paper";
import { CircularProgress } from '@mui/material';
import { Container } from "@mui/material";
import socket from '../../../components/socket.js';
import { handleUID } from "../../../data/index.js";
import Database from "../../../data/index.js";

const JoinDuelSection = ({ id }) => {
  const [handle, setHandle] = useState('');
  const [loading, setLoading] = useState(false);

  const loadingStyles = {
    opacity: "0.5",
    pointerEvents: "none"
  }

  const handleJoin = (e) => {
    e.preventDefault();
    setLoading(true);
    handleUID();
    let uid = localStorage.getItem('uid');
    socket.emit('join-duel', {roomId: id, handle: handle, uid: uid});
  }

  useEffect(() => {
    socket.on('error-message', () => {
      setLoading(false);
    });
  }, []);

  return (
    <Container sx={loading && loadingStyles}>
        <FormControl required fullWidth>
        <InputLabel id="handle-input-label" shrink>CF Handle</InputLabel>
        <TextField
            required
            id="outlined-required"
            labelID="handle-input-label"
            onChange={(e) => setHandle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleJoin(e);
            }}
        /> 
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        {
          loading ? <CircularProgress sx={{ marginTop: '0.5em' }} />
          : <Button
              variant="contained"
              onClick={handleJoin}
              sx={{ margin: "0 auto", mt: "1em" }}
            >
              Join
            </Button>
        }
      </Box>
    </Container>
  )
}

export default function TimeTable({id, duelStatus, duelOwnership}) {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [winner, setWinner] = useState("");
  const [startButtonLoading, setStartButtonLoading] = useState(false);

  const renderContent = () => {
    if (!duelStatus) {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <CircularProgress />
        </Box>
      );
    } else if (duelStatus === 'WAITING') {
      return duelOwnership ? "Wait for someone to join." : <JoinDuelSection id={id} />
    } else if (duelStatus === 'READY') {
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          {
            startButtonLoading ? <CircularProgress />
            : <Button 
                variant="contained"
                onClick={handleStartDuel}
                sx={{ margin: "0 auto", mt: "1em" }}
                >
                  Start Duel
              </Button>
          }
        </Box>
      )
    } else {
      return (duelStatus === 'FINISHED') ? `${winner} wins!`
      : `${`${hours}`.padStart(2, '0') + ':' + `${minutes}`.padStart(2, '0') + ':' + `${seconds}`.padStart(2, '0')}`
    }
  }

  const handleStartDuel = (e) => {
    e.preventDefault();
    setStartButtonLoading(true);
    socket.emit('start-duel', {roomId: id});
  };

  useEffect(() => {
    socket.on('status-change', () => {
      setStartButtonLoading(false);
    });
    socket.on('time-left', ({roomId, timeLeft}) => {
      if (roomId == id) {
        setHours(Math.floor(timeLeft/3600));
        setMinutes(Math.floor(timeLeft/60)%60);
        setSeconds(timeLeft%60);
      }
    });
    return () => {
      socket.off('status-change');
      socket.off('time-left');
    };
  }, []);

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
    <TableContainer variant="play__table" component={Paper}>
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
