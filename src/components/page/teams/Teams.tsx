import type { FunctionComponent } from 'react';
import { Box, Button, ButtonGroup, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import type { FormikProps } from 'formik';
import type { TeamType } from '../../../models/forms/TeamType.tsx';

interface Props {
  existsPrev: boolean;
  playersSize: number;
  formik: FormikProps<TeamType>;
  resetPlayersSize: (newSize: number) => void;
  generateNames: () => void;
  resume: () => void;
}

const Teams: FunctionComponent<Props> = ({
  existsPrev,
  playersSize,
  formik,
  resetPlayersSize,
  generateNames,
  resume,
}) => {
  return (
    <Container maxWidth="md" sx={{ mt: { xs: 9, sm: 12 }, mb: 2 }}>
      <Paper elevation={2} sx={{ px: 2 }}>
        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography variant="h5" align="center">
            Registrar equipos
          </Typography>
        </Box>
        <Box sx={{ pt: 1, pb: 2 }} component="form" onSubmit={formik.handleSubmit}>
          <Grid container spacing={2} alignContent="center">
            <Grid
              m="auto"
              size={{
                xs: 12,
                sm: 8,
              }}>
              <ButtonGroup variant="outlined" fullWidth sx={{ mb: 2 }}>
                <Button variant={playersSize === 2 ? 'contained' : 'outlined'} onClick={() => resetPlayersSize(2)}>
                  2 Equipos
                </Button>
                <Button variant={playersSize === 3 ? 'contained' : 'outlined'} onClick={() => resetPlayersSize(3)}>
                  3 Equipos
                </Button>
              </ButtonGroup>
            </Grid>

            <Grid
              m="auto"
              size={{
                xs: 12,
                sm: 8,
              }}>
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

            <Grid
              m="auto"
              size={{
                xs: 12,
                sm: 8,
              }}>
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
              <Grid
                m="auto"
                size={{
                  xs: 12,
                  sm: 8,
                }}>
                <TextField
                  name="team3"
                  value={formik.values.team3}
                  label="Equipo 3"
                  onChange={formik.handleChange}
                  error={formik.touched.team3 && Boolean(formik.errors.team3)}
                  helperText={formik.touched.team3 && Boolean(formik.errors.team3) ? formik.errors.team3 : null}
                  fullWidth
                />
              </Grid>
            )}

            <Grid
              m="auto"
              size={{
                xs: 12,
                sm: 8,
              }}>
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
            {existsPrev && (
              <Grid
                m="auto"
                size={{
                  xs: 12,
                  sm: 8,
                }}>
                <Button type="button" variant="contained" fullWidth color="success" size="large" onClick={resume}>
                  Retomar
                </Button>
              </Grid>
            )}
            <Grid
              m="auto"
              size={{
                xs: 12,
                sm: 8,
              }}>
              <Button type="submit" variant="contained" fullWidth size="large">
                Empezar
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Teams;
