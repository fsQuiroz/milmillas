import { FunctionComponent } from 'react';
import { Team } from '../../../../models/Team.ts';
import { Points } from '../../../../models/Points.ts';
import {
  Box,
  Paper,
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

type Props = {
  playersSize: number;
  teams: Team[];
  points: Points;
};

type TotalPoints = { [key: string]: number };

const ScoreBoard: FunctionComponent<Props> = ({ playersSize, teams, points }) => {
  const totals: TotalPoints = {};
  teams.forEach((t) => {
    const p = points[t.name];
    totals[t.name] =
      p.fullTrip +
      p.traveled +
      p.tk +
      p.securities +
      p.fullSecurities +
      p.noOverSpeed +
      p.blocked +
      p.overTime +
      p.extraMile;
  });
  return (
    <Paper elevation={2} sx={{ p: 1 }}>
      <Box sx={{ pt: 1, pb: 2 }}>
        <Typography variant="h5">Puntaje</Typography>
      </Box>
      <Box>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell></TableCell>
                <TableCell align="right">{teams[0].name}</TableCell>
                <TableCell align="right">{teams[1].name}</TableCell>
                {playersSize > 2 && <TableCell align="right">{teams[2].name}</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Viaje completo</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].fullTrip)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].fullTrip)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].fullTrip)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>Recorrido</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].traveled)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].traveled)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].traveled)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>TK</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].tk)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].tk)}</TableCell>
                {playersSize > 2 && <TableCell align="right">{Formatter.number(points[teams[2].name].tk)}</TableCell>}
              </TableRow>
              <TableRow>
                <TableCell>Seguridades I</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].securities)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].securities)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].securities)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>Seguridades II</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].fullSecurities)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].fullSecurities)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].fullSecurities)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>Viaje Seguro</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].noOverSpeed)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].noOverSpeed)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].noOverSpeed)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>Bloqueo</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].blocked)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].blocked)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].blocked)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>Acción Demorada</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].overTime)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].overTime)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].overTime)}</TableCell>
                )}
              </TableRow>
              <TableRow>
                <TableCell>Alargue</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[0].name].extraMile)}</TableCell>
                <TableCell align="right">{Formatter.number(points[teams[1].name].extraMile)}</TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">{Formatter.number(points[teams[2].name].extraMile)}</TableCell>
                )}
              </TableRow>
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell>
                  <Typography component="strong" color="text.primary">
                    Total
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="strong" color="text.primary">
                    {Formatter.number(totals[teams[0].name])}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography component="strong" color="text.primary">
                    {Formatter.number(totals[teams[1].name])}
                  </Typography>
                </TableCell>
                {playersSize > 2 && (
                  <TableCell align="right">
                    <Typography component="strong" color="text.primary">
                      {Formatter.number(totals[teams[2].name])}
                    </Typography>
                  </TableCell>
                )}
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
};

export default ScoreBoard;
