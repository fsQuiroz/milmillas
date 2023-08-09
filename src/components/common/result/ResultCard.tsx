import { FunctionComponent, HTMLAttributes } from 'react';
import { Box, Paper, Slider, SliderThumb, Stack, Theme, Typography } from '@mui/material';
import * as Formatter from '../../../util/formatters.ts';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { RankedPoints } from '../../../models/Points.ts';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import DangerousIcon from '@mui/icons-material/Dangerous';

interface Props extends HTMLAttributes<unknown> {
  points: RankedPoints;
  endGame: boolean;
  position: number;
}

const SliderInProgressThumb: FunctionComponent<HTMLAttributes<unknown>> = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <DirectionsCarIcon sx={{ color: (theme) => theme.palette.primary.dark }} />
    </SliderThumb>
  );
};

const SliderFirstThumb: FunctionComponent<HTMLAttributes<unknown>> = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <EmojiEventsIcon sx={{ color: (theme) => theme.palette.success.contrastText }} />
    </SliderThumb>
  );
};

const SliderSecondThumb: FunctionComponent<HTMLAttributes<unknown>> = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <MilitaryTechIcon sx={{ color: (theme) => theme.palette.warning.contrastText }} />
    </SliderThumb>
  );
};

const SliderLastThumb: FunctionComponent<HTMLAttributes<unknown>> = (props) => {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <DangerousIcon sx={{ color: (theme) => theme.palette.error.contrastText }} />
    </SliderThumb>
  );
};

const thumbDecider = (position: number) => {
  switch (position) {
    case 0:
      return SliderFirstThumb;
    case 1:
      return SliderSecondThumb;
    case 2:
      return SliderLastThumb;
    default:
      return SliderInProgressThumb;
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

const ResultCard: FunctionComponent<Props> = ({ points, endGame, position }) => {
  return (
    <Paper elevation={endGame ? 4 - position : 1} color="primary" sx={{ my: 2 }}>
      <Stack direction="row" alignItems="start" sx={{ px: 1.5, pt: 1.5 }}>
        <Typography variant="body1" align="left" sx={{ mt: 'auto', fontWeight: 'bold' }}>
          {points.teamName}
        </Typography>
        <Box m="auto" />
        <Typography variant="caption" align="right" sx={{ mb: 'auto', fontStyle: 'italic' }}>
          {Formatter.number(points.totalPoints)} Puntos
        </Typography>
      </Stack>
      <Stack direction="row" spacing={4} alignItems="center" sx={{ px: 2, pb: 2, pt: 1 }}>
        <FlagOutlinedIcon />
        <Slider
          value={points.totalPoints}
          min={0}
          max={5000}
          disabled
          slots={{
            thumb: thumbDecider(endGame ? position : -1),
          }}
          sx={{
            '& .MuiSlider-track': { color: (theme) => colorDecider(endGame ? position : -1, theme) },
            '& .MuiSlider-thumb': {
              height: 32,
              width: 32,
              color: (theme) => colorDecider(endGame ? position : -1, theme),
            },
          }}
        />
        <SportsScoreIcon />
      </Stack>
    </Paper>
  );
};

export default ResultCard;
