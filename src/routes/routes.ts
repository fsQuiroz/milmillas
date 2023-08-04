import { FunctionComponent } from 'react';
import Teams from '../components/page/teams/Teams.tsx';

type Route = {
  id: string;
  path: string;
  Element: FunctionComponent;
};

export const routes: Route[] = [
  {
    id: 'teams',
    path: '/',
    Element: Teams,
  },
];
