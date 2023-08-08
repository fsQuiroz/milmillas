import { FunctionComponent } from 'react';
import TeamsContainer from '../components/page/teams/TeamsContainer.tsx';
import Points from '../components/page/points/Points.tsx';

type Route<P = object> = {
  id: string;
  path: string;
  Element: FunctionComponent<P>;
};

export const routes: Route[] = [
  {
    id: 'teams',
    path: '/',
    Element: TeamsContainer,
  },
  {
    id: 'points',
    path: '/points',
    Element: Points,
  },
];
