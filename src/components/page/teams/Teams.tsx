import { FormEvent, FunctionComponent, useEffect, useState } from 'react';
import { Box, Button, ButtonGroup, Container, Grid, Paper, TextField, Typography } from '@mui/material';
import { Team } from '../../../models/Team.ts';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { adjectives, pokemons } from '../../../util/custom-dicc.ts';

const Teams: FunctionComponent = () => {
  const [playersSize, setPlayersSize] = useState<number>(2);

  const [teams, setTeams] = useState<Team[]>([]);

  const resetPlayersSize = (newSize: number) => {
    if (playersSize !== newSize) {
      setTeams([]);
      setPlayersSize(newSize);
    }
  };

  const generateNames = () => {
    let newTeams: Team[] = [];
    for (let i: number = 0; i < playersSize; i++) {
      newTeams = [
        ...newTeams,
        {
          name: uniqueNamesGenerator({
            dictionaries: [adjectives, pokemons],
            length: 2,
            separator: ' ',
            style: 'capital',
          }),
        },
      ];
    }
    setTeams(newTeams);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(event);
    event.preventDefault();
  };

  useEffect(generateNames, [playersSize]);

  return (
    <Container maxWidth="md" sx={{ mt: 7 }}>
      <Paper elevation={2} sx={{ p: 1 }}>
        <Box sx={{ pt: 1, pb: 2 }}>
          <Typography variant="h5">Registrar equipos</Typography>
        </Box>
        {teams.length > 0 && (
          <Box sx={{ pt: 1, pb: 2 }} component="form" onSubmit={handleSubmit}>
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

              {teams.map((team, idx) => {
                return (
                  <Grid item xs={12} sm={8} key={`team-${idx + 1}`} m="auto">
                    <TextField name={`team-${idx + 1}`} value={team.name} label={`Equipo ${idx + 1}`} fullWidth />
                  </Grid>
                );
              })}

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
