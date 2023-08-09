import { FunctionComponent, HTMLAttributes } from 'react';
import { AppBar, Box, IconButton, Toolbar, Typography } from '@mui/material';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CachedIcon from '@mui/icons-material/Cached';

interface Props extends HTMLAttributes<unknown> {
  currentPath: string;
  reset: () => void;
}

const NavBar: FunctionComponent<Props> = ({ currentPath, reset }) => {
  return (
    <AppBar enableColorOnDark>
      <Toolbar>
        <TrafficTwoToneIcon sx={{ mr: 3 }} />
        <Typography variant="h6" noWrap sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem' }}>
          Mil Millas
        </Typography>
        {currentPath !== '/' && (
          <>
            <Box sx={{ m: 'auto' }} />
            <IconButton onClick={reset}>
              <CachedIcon />
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
