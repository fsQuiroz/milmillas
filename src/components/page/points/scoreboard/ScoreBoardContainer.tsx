import { FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Team } from '../../../../models/Team.ts';
import { Points, TotalPoints } from '../../../../models/Points.ts';
import ScoreBoard from './ScoreBoard.tsx';

interface Props extends HTMLAttributes<unknown> {
  teams: Team[];
  points: Points[];
}

const ScoreBoardContainer: FunctionComponent<Props> = ({ teams, points }) => {
  const [selectedPoints, setSelectedPoints] = useState(0);
  const roundPoints = points[selectedPoints];

  const totals: TotalPoints = {};
  teams.forEach((t) => {
    totals[t.name] =
      roundPoints[t.name].fullTrip +
      roundPoints[t.name].traveled +
      roundPoints[t.name].tk +
      roundPoints[t.name].securities +
      roundPoints[t.name].fullSecurities +
      roundPoints[t.name].noOverSpeed +
      roundPoints[t.name].blocked +
      roundPoints[t.name].overTime +
      roundPoints[t.name].extraMile;
  });

  useEffect(() => {
    setSelectedPoints(points.length - 1);
  }, [points]);

  const previous = () => {
    if (selectedPoints > 0) {
      setSelectedPoints(selectedPoints - 1);
    }
  };

  const next = () => {
    if (selectedPoints + 1 < points.length) {
      setSelectedPoints(selectedPoints + 1);
    }
  };

  return (
    <ScoreBoard
      selectedPoints={selectedPoints}
      teams={teams}
      points={points}
      totals={totals}
      previous={previous}
      next={next}
    />
  );
};

export default ScoreBoardContainer;
