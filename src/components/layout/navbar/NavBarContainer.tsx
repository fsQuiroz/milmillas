import { FunctionComponent, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PointsContext } from '../../../context/PointsContext.tsx';
import NavBar from './NavBar.tsx';

const NavBarContainer: FunctionComponent = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { initTeams } = useContext(PointsContext);

  const reset = () => {
    initTeams([]);
    navigate('/');
  };

  return <NavBar currentPath={location.pathname} reset={reset} />;
};

export default NavBarContainer;
