import type { FunctionComponent } from 'react';
import { Outlet } from 'react-router-dom';
import NavBarContainer from './navbar/NavBarContainer.tsx';

const Layout: FunctionComponent = () => {
  return (
    <>
      <NavBarContainer />
      <Outlet />
    </>
  );
};

export default Layout;
