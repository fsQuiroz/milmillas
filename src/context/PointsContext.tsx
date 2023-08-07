import { createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useState } from 'react';
import { Team } from '../models/Team.ts';
import { Points, TotalPoints } from '../models/Points.ts';

export type PointsContextValues = {
  playersSize: number;
  setPlayersSize: Dispatch<SetStateAction<number>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
  points: Points;
  setPoints: (p: Points) => void;
  totals: TotalPoints;
};

const initValues: PointsContextValues = {
  playersSize: 0,
  setPlayersSize: () => {},
  teams: [],
  setTeams: () => {},
  points: {},
  setPoints: () => {},
  totals: {},
};
export const PointsContext = createContext<PointsContextValues>(initValues);

const PointsContextProvider: FunctionComponent<{ child: ReactNode }> = ({ child }) => {
  const [playersSize, setPlayersSize] = useState<number>(2);
  const [teams, setTeams] = useState<Team[]>([]);
  const [points, setPoints] = useState<Points>({});
  const [totals, setTotals] = useState<TotalPoints>({});

  const updatePoints = (pts: Points) => {
    const newTotals: TotalPoints = {};
    teams.forEach((t) => {
      const p = pts[t.name];
      newTotals[t.name] =
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
    setPoints(pts);
    setTotals(newTotals);
  };

  const values: PointsContextValues = {
    playersSize,
    setPlayersSize,
    teams,
    setTeams,
    points,
    setPoints: updatePoints,
    totals,
  };
  return <PointsContext.Provider value={values}>{child}</PointsContext.Provider>;
};

export default PointsContextProvider;
