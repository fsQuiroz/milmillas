import { Context, createContext, FunctionComponent, ReactNode, useState } from 'react';
import { Team } from '../models/Team.ts';
import { Points, TotalPoints } from '../models/Points.ts';

type PointsContextValues = {
  teams: Team[];
  setTeams: (teams: Team[]) => void;
  points: Points[];
  updatePoints: (p: Points) => void;
  totals: TotalPoints;
};

const initValues: PointsContextValues = {
  teams: [],
  setTeams: () => {},
  points: [],
  updatePoints: () => {},
  totals: {},
};
export const PointsContext: Context<PointsContextValues> = createContext<PointsContextValues>(initValues);

export const PointsContextProvider: FunctionComponent<{ child: ReactNode }> = ({ child }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [points, setPoints] = useState<Points[]>([]);
  const [totals, setTotals] = useState<TotalPoints>({});

  const initTeams = (teams: Team[]) => {
    const newTotals: TotalPoints = {};
    teams.forEach((t) => {
      newTotals[t.name] = 0;
    });
    setPoints([]);
    setTotals(newTotals);
    setTeams(teams);
  };
  const updatePoints = (pts: Points) => {
    const newTotals: TotalPoints = {};
    teams.forEach((t) => {
      const p = pts[t.name];
      newTotals[t.name] =
        totals[t.name] +
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
    setPoints([...points, pts]);
    setTotals(newTotals);
  };

  const values: PointsContextValues = {
    teams,
    setTeams: initTeams,
    points,
    updatePoints,
    totals,
  };
  return <PointsContext.Provider value={values}>{child}</PointsContext.Provider>;
};
