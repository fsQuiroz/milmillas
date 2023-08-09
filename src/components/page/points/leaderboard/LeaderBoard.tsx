import { FunctionComponent, HTMLAttributes } from 'react';
import { Box, Paper, Typography } from '@mui/material';
import { RankedPoints } from '../../../../models/Points.ts';
import ResultCard from '../../../common/result/ResultCard.tsx';

interface Props extends HTMLAttributes<unknown> {
  endGame: boolean;
  points: RankedPoints[];
}

const LeaderBoard: FunctionComponent<Props> = ({ endGame, points }) => {
  return (
    <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
      <Box sx={{ pt: 1 }}>
        <Typography variant="h5" align="center">
          Puntaje
        </Typography>
      </Box>
      <Box sx={{ px: { xs: 1, sm: 10, md: 12 } }}>
        {points.map((p, idx) => {
          return <ResultCard key={p.teamName} points={p} endGame={endGame} position={idx} />;
        })}
      </Box>
    </Paper>
  );
};

export default LeaderBoard;
