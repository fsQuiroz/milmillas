import { Context, createContext } from 'react';
import type { PointsContextValues } from '.';

const initValues: PointsContextValues = {
  teams: [],
  initTeams: () => {},
  points: [],
  updatePoints: () => {},
  totals: {},
};

export const PointsContext: Context<PointsContextValues> = createContext<PointsContextValues>(initValues);
