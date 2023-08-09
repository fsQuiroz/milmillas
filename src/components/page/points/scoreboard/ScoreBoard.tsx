import { FunctionComponent, HTMLAttributes } from 'react';
import { Team } from '../../../../models/Team.ts';
import { Points, TotalPoints } from '../../../../models/Points.ts';
import {
  Box,
  Button,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import * as Formatter from '../../../../util/formatters.ts';

interface Props extends HTMLAttributes<unknown> {
  selectedPoints: number;
  teams: Team[];
  points: Points[];
  totals: TotalPoints;
  previous: () => void;
  next: () => void;
}

const ScoreBoard: FunctionComponent<Props> = ({ selectedPoints, teams, points, totals, previous, next }) => {
  return (
    <Paper elevation={2} sx={{ px: 1, mb: 2 }}>
      <Box sx={{ pt: 1, pb: 2 }}>
        <Typography variant="h5" align="center">
          Puntaje de Partidas
        </Typography>
      </Box>
      {points.length > 1 && (
        <>
          <Box sx={{ px: { sm: 2, md: 4 }, mt: 2 }}>
            <Stepper activeStep={selectedPoints}>
              {points.map((_, idx) => {
                let stepProps: object = { completed: false };
                if (idx === selectedPoints) {
                  stepProps = { ...stepProps, active: true };
                }
                return (
                  <Step key={idx} {...stepProps}>
                    <StepLabel>{`Partida ${idx + 1}`}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
          </Box>
          <Box sx={{ px: { sm: 2, md: 4 }, mt: 3, mb: 4 }}>
            <Grid container>
              <Grid item container m="auto" justifySelf="start">
                <Box sx={{ m: 'auto' }} />
                <Button
                  type="button"
                  variant="contained"
                  sx={{ mr: 1 }}
                  onClick={previous}
                  disabled={selectedPoints === 0}>
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  onClick={next}
                  disabled={selectedPoints + 1 === points.length}>
                  Siguiente
                </Button>
              </Grid>
            </Grid>
          </Box>
        </>
      )}
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`teamName${idx}`}>
                      {team.name}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Viaje completo</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`fullTrip${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].fullTrip)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Recorrido</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`traveled${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].traveled)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>TK</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`tk${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].tk)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Seguridades I</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`securities${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].securities)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Seguridades II</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`fullSecurities${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].fullSecurities)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Viaje Seguro</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`noOverSpeed${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].noOverSpeed)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Bloqueo</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`blocked${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].blocked)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Acción Demorada</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`extraTime${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].overTime)}
                    </TableCell>
                  );
                })}
              </TableRow>
              <TableRow>
                <TableCell>Alargue</TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`extraMile${idx}`}>
                      {Formatter.number(points[selectedPoints][team.name].extraMile)}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Typography component="strong" color="text.primary">
                    Total
                  </Typography>
                </TableCell>
                {teams.map((team, idx) => {
                  return (
                    <TableCell align="right" key={`total${idx}`}>
                      <Typography component="strong" color="text.primary">
                        {Formatter.number(totals[team.name])}
                      </Typography>
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ScoreBoard;
