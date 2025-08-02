import type { FunctionComponent, HTMLAttributes } from 'react';
import type { RankedPoints, TotalPoints } from '../../../../models/Points.ts';
import LeaderBoard from './LeaderBoard.tsx';

interface Props extends HTMLAttributes<unknown> {
  totals: TotalPoints;
}

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
