import { createContext, Dispatch, FunctionComponent, ReactNode, SetStateAction, useState } from 'react';
import { Team } from '../models/Team.ts';

export type PointsContextValues = {
  playersSize: number;
  setPlayersSize: Dispatch<SetStateAction<number>>;
  teams: Team[];
  setTeams: Dispatch<SetStateAction<Team[]>>;
};

const initValues: PointsContextValues = {
  playersSize: 0,
  setPlayersSize: () => {},
  teams: [],
  setTeams: () => {},
};
export const PointsContext = createContext<PointsContextValues>(initValues);

const PointsContextProvider: FunctionComponent<{ child: ReactNode }> = ({ child }) => {
  const [playersSize, setPlayersSize] = useState<number>(2);
  const [teams, setTeams] = useState<Team[]>([]);

  const values: PointsContextValues = {
    playersSize,
    setPlayersSize,
    teams,
    setTeams,
  };
  return <PointsContext.Provider value={values}>{child}</PointsContext.Provider>;
};

export default PointsContextProvider;
