import { FunctionComponent, useContext, useEffect } from 'react';
import { Container } from '@mui/material';
import { PointsContext } from '../../../context/PointsContext.tsx';
import { useNavigate } from 'react-router-dom';
import ScoreBoard from './scoreboard/ScoreBoard.tsx';
import RoundPointsContainer from './roundpoints/RoundPointsContainer.tsx';
import LeaderBoard from './leaderboard/LeaderBoard.tsx';

const Points: FunctionComponent = () => {
  const navigate = useNavigate();
  const { playersSize, teams, points, totals } = useContext(PointsContext);

  const endGame = teams.some((t) => totals[t.name] >= 5000);

  useEffect(() => {
    if (teams?.length < 1) {
      navigate('/');
      return;
    }
  }, [navigate, teams]);

  useEffect(() => {}, []);

  return (
    <Container maxWidth="md" sx={{ mt: 7 }}>
      {teams?.length > 1 && Object.keys(points).length > 1 && (
        <>
          {!endGame && <RoundPointsContainer teams={teams} />}
          <LeaderBoard totals={totals} />
          <ScoreBoard playersSize={playersSize} teams={teams} points={points} totals={totals} />
        </>
      )}
    </Container>
  );
};

export default Points;
