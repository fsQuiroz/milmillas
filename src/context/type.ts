import { Team } from '../models/Team.ts';
import { Points, TotalPoints } from '../models/Points.ts';

export type PointsContextValues = {
  teams: Team[];
  initTeams: (teams: Team[]) => void;
  points: Points[];
  updatePoints: (p: Points) => void;
  totals: TotalPoints;
};
