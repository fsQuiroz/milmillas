import { FunctionComponent, useContext, useState } from 'react';
import { PointsContext } from '../../../context';
import NavBar from './NavBar.tsx';

const NavBarContainer: FunctionComponent = () => {
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const { initTeams } = useContext(PointsContext);

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseConfirm = (confirm: boolean) => {
    setConfirmOpen(false);
    if (confirm) {
      initTeams([]);
      window.location.href = '/';
    }
  };

  return (
    <NavBar confirmOpen={confirmOpen} handleOpenConfirm={handleOpenConfirm} handleCloseConfirm={handleCloseConfirm} />
  );
};

export default NavBarContainer;
