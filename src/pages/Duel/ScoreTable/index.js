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
import './index.css';

export default function ScoreTable({id}) {
  const [playerHandles, setPlayerHandles] = useState([]);
  const [playerScores, setPlayerScores] = useState([]);
  const [problemScores, setProblemScores] = useState([]);

  useEffect(() => {
    socket.on('players-update', ({ players }) => {
      setPlayerHandles(players);
    });
    socket.on('scores-update', ({ scores }) => {
      setProblemScores(scores);
      
    });

    return () => {
      socket.off('players-update');
      socket.off('scores-update');
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
        <div className="score__player">
          <div className="score__player__info">
            <h4>davidchi (YOU)</h4>
            <div>Score: 500</div>
          </div>
          <table>
            <tbody>
              <tr className="score__boxes">
                <td>100</td>
                <td>100</td>
                <td>100</td>
                <td>100</td>
                <td>100</td>
              </tr>
              <tr className="score__box__numbers">
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="score__player">
          <div className="score__player__info">
            <h4>jeffrey</h4>
            <div>Score: 500</div>
          </div>
          <table>
            <tbody>
              <tr className="score__boxes">
                <td>100</td>
                <td>100</td>
                <td>100</td>
                <td>100</td>
                <td>100</td>
              </tr>
              <tr className="score__box__numbers">
                <td>1</td>
                <td>2</td>
                <td>3</td>
                <td>4</td>
                <td>5</td>
              </tr>
            </tbody>
          </table>
        </div>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
