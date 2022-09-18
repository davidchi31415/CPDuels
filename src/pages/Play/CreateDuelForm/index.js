import * as React from 'react';
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
import MenuItem from '@mui/material/MenuItem';
import { useNavigate } from 'react-router-dom';

export default function CreateDuelForm() {
  const [submitted, setSubmitted] = React.useState(false);
  const navigate = useNavigate();

  return (
    <Container variant="play__form" component="main" sx={{ width: 450, height: 400, padding: "1em" }}>
        <Typography sx={{letterSpacing: "-0.025em", marginBottom: "0.5em"}} component="h1" variant="h3" align="center">
            Create Duel
        </Typography>
        <React.Fragment>
            {submitted ? (
            <React.Fragment>
                <Typography variant="h5" gutterBottom>
                    Duel challenge created.
                </Typography>
                <Typography variant="subtitle1">
                    Loading
                </Typography>
            </React.Fragment>
            ) : (
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
                            onChange={() => {}}
                        >
                            {[...Array(10).keys()].map((index) => <MenuItem value={index+1}>{index+1}</MenuItem>)}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <FormControl required fullWidth>
                        <InputLabel id="match-style-select-label">Match Style</InputLabel>
                        <Select
                            required
                            labelId="match-style-select-label"
                            id="match-style-select"
                            onChange={() => {}}
                        >
                            <MenuItem value={"normal"}>normal</MenuItem>
                            <MenuItem value={"lockout"}>lockout</MenuItem>
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
                            onChange={() => {}}
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
                            onChange={() => {}}
                        >
                            {[...Array(23).keys()].map((index) => <MenuItem value={(index+8)*100}>{(index+8)*100}</MenuItem>)}
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="privateMatch" value="yes" />}
                        label="Private Match?"
                    />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => {
                        // setSubmitted(true);
                        navigate('/play/283921498');
                    }}
                    sx={{ margin: "0 auto", mt: "1em" }}
                >
                    Submit
                </Button>
                </Box>
            </React.Fragment>
            )}
        </React.Fragment>
    </Container>
  );
}