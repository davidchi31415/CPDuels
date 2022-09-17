import * as React from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

export default function CreateDuelForm() {
  const [submitted, setSubmitted] = React.useState(false);

  return (
    <Container variant="play__form" component="main" sx={{ width: 450, padding: "1em" }}>
        <Typography sx={{letterSpacing: "-0.025em"}} component="h1" variant="h3" align="center">
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
                    <FormControl fullWidth>
                        <InputLabel id="problem-count-select-label"># Problems</InputLabel>
                        <Select
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
                    <FormControl fullWidth>
                        <InputLabel id="match-style-select-label">Match Style</InputLabel>
                        <Select
                            labelId="match-style-select-label"
                            id="match-style-select"
                            onChange={() => {}}
                        >
                            <MenuItem value={"normal"}>normal</MenuItem>
                            <MenuItem value={"lockout"}>lockout</MenuItem>
                        </Select>
                    </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        required
                        id="timeLimit"
                        name="timeLimit"
                        label="Time Limit (min)"
                        fullWidth
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <TextField
                        id="address2"
                        name="address2"
                        label="Address line 2"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="city"
                        name="city"
                        label="City"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        id="state"
                        name="state"
                        label="State/Province/Region"
                        fullWidth
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="zip"
                        name="zip"
                        label="Zip / Postal code"
                        fullWidth
                        autoComplete="shipping postal-code"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="country"
                        name="country"
                        label="Country"
                        fullWidth
                        autoComplete="shipping country"
                        variant="standard"
                    />
                    </Grid>
                    <Grid item xs={12}>
                    <FormControlLabel
                        control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
                        label="Use this address for payment details"
                    />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="contained"
                    onClick={() => setSubmitted(true)}
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