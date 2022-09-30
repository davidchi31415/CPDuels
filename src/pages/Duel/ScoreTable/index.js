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
import Database from "../../../data";
import './index.css';

export default function ScoreTable({id}) {
  const [players, setPlayers] = useState([]);
  const [playerScores, setPlayerScores] = useState([]);
  const [problemScores, setProblemScores] = useState([]);

  useEffect(() => {
    const getPlayers = async () => {
      let duel = await Database.getDuelById(id);
      setPlayers(duel.players.map((player) => player.handle));
    }
    const updateScores = async () => {
      let duel = await Database.getDuelById(id);
      setPlayerScores([duel.playerOneScore, duel.playerTwoScore]);
      setProblemScores(duel.problems.map((problem) => [problem.playerOneScore, problem.playerTwoScore])); 
    }
    getPlayers();
    updateScores();

    socket.on('status-change', () => {
      getPlayers();
      updateScores();
    });

    socket.on('time-left', () => {
      getPlayers();
      updateScores();
    });

    return () => {
      socket.off('status-change');
      socket.off('time-left');
    }
  }, []);

  return (
    <TableContainer sx={{ width: 475 }} variant="play__table" component={Paper}>
      <Table aria-label="Score Table">
        <TableHead>
          <TableRow sx={{ height: 10, "& th": { backgroundColor: "#bebeff", fontWeight: 700, borderBottom: 'solid black 0.5px' } }}>
            <TableCell align="center">
              <Typography variant="h6" align="center">
                Scores
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {
          players.map((handle, index) => 
            <div className="score__player">
              <div className="score__player__info">
                <h4>{handle}</h4>
                <div>Score: {playerScores[index]}</div>
              </div>
              <table>
                <tbody>
                  <tr className="score__boxes">
                    {
                      problemScores.map((scores) => <td>{scores[index]}</td>)
                    }
                  </tr>
                  <tr className="score__box__numbers">
                    {
                      problemScores.map((scores, index) => <td>{index+1}</td>)
                    }
                  </tr>
                </tbody>
              </table>
            </div>)
        }
        {
          (players.length != 2) ?
            <div className="score__player">
              <div className="score__player__info">
                <h4>Waiting for next player...</h4>
              </div>
            </div> : ""
        } 
        </TableBody>
      </Table>
    </TableContainer>
  );
}
