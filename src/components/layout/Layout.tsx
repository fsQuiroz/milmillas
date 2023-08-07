import NavBar from './navbar/NavBar.tsx';
import { Outlet } from 'react-router-dom';
import { FunctionComponent } from 'react';

const Layout: FunctionComponent = () => {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
};

export default Layout;
