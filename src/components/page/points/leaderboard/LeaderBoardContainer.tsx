import { FunctionComponent } from 'react';
import { RankedPoints, TotalPoints } from '../../../../models/Points.ts';
import LeaderBoard from './LeaderBoard.tsx';

type Props = {
  totals: TotalPoints;
};

const LeaderBoardContainer: FunctionComponent<Props> = ({ totals }) => {
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

  return <LeaderBoard endGame={endGame} points={points} />;
};

export default LeaderBoardContainer;
