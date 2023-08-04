import Players from '../components/page/players/Players.tsx';
import { FunctionComponent } from 'react';

type Route = {
  id: string;
  path: string;
  Element: FunctionComponent;
};

export const routes: Route[] = [
  {
    id: 'home',
    path: '/',
    Element: Players,
  },
];
