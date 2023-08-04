import { FunctionComponent } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';

const NavBar: FunctionComponent = () => {
  return (
    <AppBar enableColorOnDark>
      <Toolbar>
        <TrafficTwoToneIcon sx={{ mr: 3 }} />
        <Typography variant="h6" noWrap sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem' }}>
          Mil Millas
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
