import { Context, createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useState } from 'react';
import { Team } from '../models/Team.ts';
import { Points, TotalPoints } from '../models/Points.ts';

type PointsContextValues = {
  playersSize: number;
  setPlayersSize: Dispatch<SetStateAction<number>>;
  teams: Team[];
  setTeams: (_teams: Team[]) => void;
  points: Points;
  updatePoints: (_p: Points) => void;
  totals: TotalPoints;
};

const initValues: PointsContextValues = {
  playersSize: 0,
  setPlayersSize: () => {},
  teams: [],
  setTeams: () => {},
  points: {},
  updatePoints: () => {},
  totals: {},
};
export const PointsContext: Context<PointsContextValues> = createContext<PointsContextValues>(initValues);

const PointsContextProvider: FunctionComponent<{ child: ReactNode }> = ({ child }) => {
  const [playersSize, setPlayersSize] = useState<number>(2);
  const [teams, setTeams] = useState<Team[]>([]);
  const [points, setPoints] = useState<Points>({});
  const [totals, setTotals] = useState<TotalPoints>({});

  const initTeams = (teams: Team[]) => {
    const newPoints: Points = {};
    const newTotals: TotalPoints = {};
    teams.forEach((t) => {
      newPoints[t.name] = {
        fullTrip: 0,
        traveled: 0,
        tk: 0,
        securities: 0,
        fullSecurities: 0,
        noOverSpeed: 0,
        blocked: 0,
        overTime: 0,
        extraMile: 0,
      };
      newTotals[t.name] = 0;
    });
    setPoints(newPoints);
    setTotals(newTotals);
    setTeams(teams);
  };
  const updatePoints = (pts: Points) => {
    const newPoints: Points = {};
    const newTotals: TotalPoints = {};
    teams.forEach((t) => {
      const oldPts = points[t.name];
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
      newPoints[t.name] = {
        fullTrip: oldPts.fullTrip + p.fullTrip,
        traveled: oldPts.traveled + p.traveled,
        tk: oldPts.tk + p.tk,
        securities: oldPts.securities + p.securities,
        fullSecurities: oldPts.fullSecurities + p.fullSecurities,
        noOverSpeed: oldPts.noOverSpeed + p.noOverSpeed,
        blocked: oldPts.blocked + p.blocked,
        overTime: oldPts.overTime + p.overTime,
        extraMile: oldPts.extraMile + p.extraMile,
      };
    });
    setPoints(newPoints);
    setTotals(newTotals);
  };

  const values: PointsContextValues = {
    playersSize,
    setPlayersSize,
    teams,
    setTeams: initTeams,
    points,
    updatePoints,
    totals,
  };
  return <PointsContext.Provider value={values}>{child}</PointsContext.Provider>;
};

export default PointsContextProvider;
