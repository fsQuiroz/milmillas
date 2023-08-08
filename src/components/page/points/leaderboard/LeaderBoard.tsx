import { FunctionComponent } from 'react';
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Paper, Theme, Typography } from '@mui/material';
import { TotalPoints } from '../../../../models/Points.ts';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DangerousIcon from '@mui/icons-material/Dangerous';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import * as Formatter from '../../../../util/formatters.ts';

type Props = {
  totals: TotalPoints;
};

type RankedIconProps = {
  position: number;
};

type RankedPoints = {
  teamName: string;
  totalPoints: number;
};

const RankedIcon: FunctionComponent<RankedIconProps> = ({ position }) => {
  switch (position) {
    case 0:
      return <EmojiEventsIcon />;
    case 1:
      return <MilitaryTechIcon />;
    case 2:
      return <DangerousIcon />;
    default:
      return <DirectionsCarIcon />;
  }
};

const colorDecider = (position: number, theme: Theme): string => {
  switch (position) {
    case 0:
      return theme.palette.success.main;
    case 1:
      return theme.palette.warning.main;
    case 2:
      return theme.palette.error.light;
    default:
      return theme.palette.secondary.main;
  }
};

const LeaderBoard: FunctionComponent<Props> = ({ totals }) => {
  const points: RankedPoints[] = Object.keys(totals)
    .map((team) => {
      return { teamName: team, totalPoints: totals[team] };
    })
    .sort((a, b) => {
      return a.totalPoints === b.totalPoints ? a.teamName.localeCompare(b.teamName) : b.totalPoints - a.totalPoints;
    });
  const endGame = points.some((p) => {
    return p.totalPoints >= 5000;
  });
  return (
    <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
      <Box sx={{ pt: 1, pb: 2 }}>
        <Typography variant="h5">Puntaje</Typography>
      </Box>
      <Box sx={{ px: { xs: 6, sm: 10, md: 16 } }}>
        <List>
          {points.map((p, idx) => {
            return (
              <ListItem key={idx}>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: (theme) => colorDecider(endGame ? idx : -1, theme) }}>
                    <RankedIcon position={endGame ? idx : -1} />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={p.teamName} secondary={`${Formatter.number(p.totalPoints)} Puntos`} />
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Paper>
  );
};

export default LeaderBoard;