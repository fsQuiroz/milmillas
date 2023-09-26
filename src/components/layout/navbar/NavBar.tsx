import { FunctionComponent, HTMLAttributes } from 'react';
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Toolbar,
  Typography,
} from '@mui/material';
import TrafficTwoToneIcon from '@mui/icons-material/TrafficTwoTone';
import CachedIcon from '@mui/icons-material/Cached';

interface Props extends HTMLAttributes<unknown> {
  confirmOpen: boolean;
  handleOpenConfirm: () => void;
  handleCloseConfirm: (confirm: boolean) => void;
}

const NavBar: FunctionComponent<Props> = ({ confirmOpen, handleOpenConfirm, handleCloseConfirm }) => {
  return (
    <AppBar enableColorOnDark>
      <Toolbar>
        <TrafficTwoToneIcon sx={{ mr: 3 }} />
        <Typography variant="h6" noWrap sx={{ fontFamily: 'monospace', fontWeight: 700, letterSpacing: '.2rem' }}>
          Mil Millas
        </Typography>
        <Box sx={{ m: 'auto' }} />
        <IconButton onClick={handleOpenConfirm}>
          <CachedIcon />
        </IconButton>
      </Toolbar>
      <Dialog open={confirmOpen} onClose={() => handleCloseConfirm(false)}>
        <DialogTitle>¿Reiniciar Partida?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Desea reiniciar la partida actual e iniciar de cero? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleCloseConfirm(false)}
            autoFocus
            sx={{ mb: 1 }}>
            Cancelar
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="secondary"
            size="small"
            onClick={() => handleCloseConfirm(true)}
            sx={{ mb: 1, mr: 1 }}>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
    </AppBar>
  );
};

export default NavBar;
