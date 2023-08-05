import { FunctionComponent } from 'react';
import { Box, Button, ButtonGroup, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { Team } from '../../../models/Team.ts';
import { FormikProps } from 'formik';
import { TeamType } from '../../../models/forms/TeamType.tsx';

interface Props {
  playersSize: number;
  teams: Team[];
  formik: FormikProps<TeamType>;
  resetPlayersSize: (newSize: number) => void;
  generateNames: () => void;
}

const Teams: FunctionComponent<Props> = ({ playersSize, teams, formik, resetPlayersSize, generateNames }) => {
  return (
    <Container maxWidth="md" sx={{ mt: 7 }}>
      <Paper elevation={2} sx={{ p: 1 }}>
        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography variant="h5">Registrar equipos</Typography>
        </Box>
        {teams.length > 0 && (
          <Box sx={{ pt: 1, pb: 2 }} component="form" onSubmit={formik.handleSubmit}>
            <Grid container spacing={2} alignContent="center">
              <Grid item xs={12} sm={8} m="auto">
                <ButtonGroup variant="outlined" fullWidth sx={{ mb: 2 }}>
                  <Button variant={playersSize === 2 ? 'contained' : 'outlined'} onClick={() => resetPlayersSize(2)}>
                    2 Equipos
                  </Button>
                  <Button variant={playersSize === 3 ? 'contained' : 'outlined'} onClick={() => resetPlayersSize(3)}>
                    3 Equipos
                  </Button>
                </ButtonGroup>
              </Grid>

              <Grid item xs={12} sm={8} m="auto">
                <TextField
                  name="team1"
                  value={formik.values.team1}
                  label="Equipo 1"
                  onChange={formik.handleChange}
                  error={formik.touched.team1 && Boolean(formik.errors.team1)}
                  helperText={formik.touched.team1 && Boolean(formik.errors.team1) ? formik.errors.team1 : null}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={8} m="auto">
                <TextField
                  name="team2"
                  value={formik.values.team2}
                  label="Equipo 2"
                  onChange={formik.handleChange}
                  error={formik.touched.team2 && Boolean(formik.errors.team2)}
                  helperText={formik.touched.team2 && Boolean(formik.errors.team2) ? formik.errors.team2 : null}
                  fullWidth
                />
              </Grid>

              {playersSize === 3 && (
                <Grid item xs={12} sm={8} m="auto">
                  <TextField
                    name="team1"
                    value={formik.values.team1}
                    label="Equipo 1"
                    onChange={formik.handleChange}
                    error={formik.touched.team3 && Boolean(formik.errors.team3)}
                    helperText={formik.touched.team3 && Boolean(formik.errors.team3) ? formik.errors.team3 : null}
                    fullWidth
                  />
                </Grid>
              )}

              <Grid item xs={12} sm={8} ml="auto" m="auto">
                <Button
                  type="button"
                  variant="contained"
                  fullWidth
                  onClick={generateNames}
                  color="secondary"
                  size="small">
                  Regenerar nombres
                </Button>
              </Grid>
              <Grid item xs={12} sm={8} ml="auto" m="auto">
                <Button type="submit" variant="contained" fullWidth size="large">
                  Empezar
                </Button>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Teams;
