import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';
import Database from '../../../data';

export default function CreateDuelForm() {
  const [duelData, setDuelData] = useState({
    handle: null,
    ratingMin: null,
    ratingMax: null,
    problemCount: null,
    timeLimit: null,
    style: null,
    private: false
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let duelID;
    console.log(duelData);
    await Database.addDuel(
        {...duelData, 
            players: [{ handle: duelData.handle }], 
            problems: [
              {
                contestId: 1712,
                index: "C",
                name: "Sort Zero",  
                points: 500
              }
            ]
        }
    ).then(
        res => {
            duelID = res._id;
            navigate(`/play/${duelID}`);
        }
    );
  }

  return (
    <Container variant="play__form" component="main" sx={{ width: 450, height: 450, padding: "1em" }}>
        <Typography sx={{letterSpacing: "-0.025em", marginBottom: "0.5em"}} component="h1" variant="h3" align="center">
            Create Duel
        </Typography>
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                    <InputLabel id="problem-count-select-label"># Problems</InputLabel>
                    <Select
                        required
                        labelId="problem-count-select-label"
                        id="problem-count-select"
                        label="Age"
                        onChange={(e) => setDuelData({...duelData, problemCount: e.target.value})}
                    >
                        {[...Array(10).keys()].map((index) => <MenuItem value={index+1}>{index+1}</MenuItem>)}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                    <InputLabel id="time-limit-select-label">Time Limit (min)</InputLabel>
                    <Select
                        required
                        labelId="time-limit-select-label"
                        id="time-limit-select"
                        onChange={(e) => setDuelData({...duelData, timeLimit: e.target.value})}
                    >
                        {[...Array(18).keys()].map((index) => <MenuItem value={(index+1)*10}>{(index+1)*10}</MenuItem>)}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                    <InputLabel id="rating-min-select-label">Rating Min</InputLabel>
                    <Select
                        required
                        labelId="rating-min-select-label"
                        id="rating-min-select"
                        onChange={(e) => setDuelData({...duelData, ratingMin: e.target.value})}
                    >
                        {[...Array(23).keys()].map((index) => <MenuItem value={(index+8)*100}>{(index+8)*100}</MenuItem>)}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                <FormControl required fullWidth>
                    <InputLabel id="rating-max-select-label">Rating Max</InputLabel>
                    <Select
                        required
                        labelId="rating-max-select-label"
                        id="rating-max-select"
                        onChange={(e) => setDuelData({...duelData, ratingMax: e.target.value})}
                    >
                        {[...Array(23).keys()].map((index) => <MenuItem value={(index+8)*100}>{(index+8)*100}</MenuItem>)}
                    </Select>
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControl required fullWidth>
                    <InputLabel id="handle-input-label" shrink>CF Handle</InputLabel>
                    <TextField
                        required
                        id="outlined-required"
                        labelID="handle-input-label"
                        onChange={(e) => setDuelData({...duelData, handle: e.target.value})}
                    /> 
                </FormControl>
                </Grid>
                <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox color="secondary" name="privateMatch" value="yes" />}
                    label="Private Match?"
                    onChange={(e) => setDuelData({...duelData, private: (e.target.value==="yes")})}
                />
                </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{ margin: "0 auto", mt: "1em" }}
            >
                Submit
            </Button>
            </Box>
        </React.Fragment>
    </Container>
  );
}