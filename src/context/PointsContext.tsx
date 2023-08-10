import { Context, createContext, FunctionComponent, HTMLAttributes, useEffect, useState } from 'react';
import { Team } from '../models/Team.ts';
import { Points, TotalPoints } from '../models/Points.ts';

const LS_TEAMS = 'teams';
const LS_POINTS = 'ponts';
const LS_TOTALS = 'totals';

type PointsContextValues = {
  teams: Team[];
  initTeams: (teams: Team[]) => void;
  points: Points[];
  updatePoints: (p: Points) => void;
  totals: TotalPoints;
};

const initValues: PointsContextValues = {
  teams: [],
  initTeams: () => {},
  points: [],
  updatePoints: () => {},
  totals: {},
};
export const PointsContext: Context<PointsContextValues> = createContext<PointsContextValues>(initValues);

export const PointsContextProvider: FunctionComponent<HTMLAttributes<unknown>> = ({ children }) => {
  const [teams, setTeams] = useState<Team[]>(JSON.parse(localStorage.getItem(LS_TEAMS) || '[]'));
  const [points, setPoints] = useState<Points[]>(JSON.parse(localStorage.getItem(LS_POINTS) || '[]'));
  const [totals, setTotals] = useState<TotalPoints>(JSON.parse(localStorage.getItem(LS_TOTALS) || '{}'));

  useEffect(() => {
    localStorage.setItem(LS_TEAMS, JSON.stringify(teams));
  }, [teams]);

  useEffect(() => {
    localStorage.setItem(LS_POINTS, JSON.stringify(points));
  }, [points]);

  useEffect(() => {
    localStorage.setItem(LS_TOTALS, JSON.stringify(totals));
  }, [totals]);

  const initTeams = (teams: Team[]) => {
    const newTotals: TotalPoints = {};
    teams.forEach((t) => {
      newTotals[t.name] = 0;
    });
    setTeams(teams);
    setPoints([]);
    setTotals(newTotals);
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
    initTeams,
    points,
    updatePoints,
    totals,
  };
  return <PointsContext.Provider value={values}>{children}</PointsContext.Provider>;
};
