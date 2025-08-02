import { FunctionComponent, useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import { PointsContext } from '../../../context';
import { useNavigate } from 'react-router-dom';
import RoundPointsContainer from './roundpoints/RoundPointsContainer.tsx';
import LeaderBoardContainer from './leaderboard/LeaderBoardContainer.tsx';
import ScoreBoardContainer from './scoreboard/ScoreBoardContainer.tsx';

const Points: FunctionComponent = () => {
  const navigate = useNavigate();
  const { teams, points, totals } = useContext(PointsContext);

  const endGame = teams.some((t) => totals[t.name] >= 5000);

  useEffect(() => {
    if (teams?.length < 1) {
      navigate('/');
      return;
    }
  }, [navigate, teams]);

  return (
    <Container maxWidth="md" sx={{ mt: { xs: 9, sm: 12 } }}>
      {teams.length > 1 && (
        <>
          {!endGame && <RoundPointsContainer teams={teams} />}
          <LeaderBoardContainer totals={totals} />
          {points.length > 0 && <ScoreBoardContainer teams={teams} points={points} />}
        </>
      )}
    </Container>
  );
};

export default Points;
