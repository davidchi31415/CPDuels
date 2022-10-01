import React, { useState, useEffect } from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Database, { handleUID } from '../../../data';
import socket from '../../../components/socket.js';

// na = not attempted, wa = wrong answer, ac = accepted

export default function ProblemsTable({ id }) {
  const [problems, setProblems] = useState([]);
  const [playerNum, setPlayerNum] = useState(null);

  useEffect(() => {
    const getPlayerNum = async () => {
      handleUID();
      let uid = localStorage.getItem('uid');
      let duel = await Database.getDuelById(id);
      if (uid === duel.players[0].uid) {
        setPlayerNum(1);
      } else if (uid === duel.players[1].uid) {
        setPlayerNum(2);
      }
    }
    const getProblems = async () => {
      let duel = await Database.getDuelById(id);
      setProblems(duel.problems);
    }
    getPlayerNum();
    getProblems();

    socket.on('time-left', async () => {
      await getPlayerNum();
      await getProblems();
    })
    
    socket.on('problem-change', async ({ roomId }) => {
      if (roomId === id) {
        await getProblems();
      }
    });

    return () => {
      socket.off('time-left');
      socket.off('problem-change');
    }
  }, []);

  const wrongStyle = {
    backgroundColor: "#ff6666"
  };
  const rightStyle = {
    backgroundColor: "#66ff66"
  };

  const renderContent = () => {
    if (problems?.length) {
      return (
        problems.map((problem, index) => {
          let color = null;
          if (playerNum) {
            if (playerNum === 1 && problem.playerOneAttempts) {
              color = (problem.playerOneScore) ? rightStyle : wrongStyle;
            } else if (playerNum === 2 && problem.playerTwoAttempts) {
              color = (problem.playerTwoScore) ? rightStyle : wrongStyle;
            }
          }
          return (
            <TableRow key={index+1} sx={[
              { "& td": { cursor: 'pointer', borderBottom: `${(index<problems.length-1)?'solid black 0.5px':''}` }, ":hover": { backgroundColor: "#ffe176"} },
              (color ? color : {})
            ]}
            onClick={() => { 
              window.open(`https://www.codeforces.com/problemset/problem/${problem.contestId}/${problem.index}`);
            }}>
              <TableCell align="center">{index+1}</TableCell>
              <TableCell align="center">{problem.name}</TableCell>
              <TableCell align="center">{problem.rating}</TableCell>
              <TableCell align="center">{problem.points}</TableCell>
            </TableRow>
          );
        })
      );
    } else {
      return (
        <TableRow>
          <TableCell colSpan={2} align="center" sx={{ fontSize: '2em' }}>
            {
              "No problems generated yet."
            }
          </TableCell>
        </TableRow>
      );
    }
  }

  return (
    <TableContainer sx={{ flex: 2 }} variant="play__table" component={Paper}>
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
            <TableCell align="center">
              <Typography variant="h6" align="center">
                CF Rating
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography variant="h6" align="center">
                Duel Points
              </Typography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            renderContent()
          } 
        </TableBody>
      </Table>
    </TableContainer>
  );
}
