import React from "react";
import TableBody from "@mui/material/TableBody";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
import Grid from '@mui/material/Grid';
import './index.css';

export default function TimeTable() {

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
        <div className="time__display">
          1:45:00
        </div>
        </TableBody>
      </Table>
    </TableContainer>
  );
}
