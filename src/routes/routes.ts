import { FunctionComponent } from 'react';
import TeamsContainer from '../components/page/teams/TeamsContainer.tsx';

type Route = {
  id: string;
  path: string;
  Element: FunctionComponent<any>;
};

export const routes: Route[] = [
  {
    id: 'teams',
    path: '/',
    Element: TeamsContainer,
  },
];
