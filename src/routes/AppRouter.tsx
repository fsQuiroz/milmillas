import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout.tsx';
import { routes } from './routes.ts';
import type { FunctionComponent } from 'react';

const AppRouter: FunctionComponent = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        {routes.map(({ id, path, Element }) => {
          return <Route key={id} path={path} element={<Element />} />;
        })}
      </Route>
    </Routes>
  );
};

export default AppRouter;
