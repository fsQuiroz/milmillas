import { FormEvent, FunctionComponent, HTMLAttributes, MutableRefObject, SyntheticEvent } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Slider,
  Stack,
  Step,
  StepLabel,
  Stepper,
  SxProps,
  TextField,
  Theme,
  Tooltip,
  Typography,
} from '@mui/material';
import { Mark } from '@mui/base';
import HelpIcon from '@mui/icons-material/Help';
import { Team } from '../../../../models/Team.ts';
import { Points } from '../../../../models/Points.ts';
import { FormikProps } from 'formik';
import { PointsType } from '../../../../models/forms/PointsType.ts';

interface Props extends HTMLAttributes<unknown> {
  teams: Team[];
  points: Points;
  activeTeam: number;
  isConfirmOpen: boolean;
  formRef: MutableRefObject<HTMLFormElement | undefined>;
  formik: FormikProps<PointsType>;
  handleFullTrip: (event: SyntheticEvent, checked: boolean) => void;
  handleTk: (event: Event, value: number | number[]) => void;
  handleSecurities: (event: Event, value: number | number[]) => void;
  handleReset: (event: FormEvent<HTMLFormElement>) => void;
  handleSubmit: (event: FormEvent<HTMLFormElement> | undefined) => void;
  goBack: () => void;
  handleOpenConfirm: () => void;
  handleCloseConfirm: (shouldSubmit?: boolean) => void;
}

const sliderSx: SxProps<Theme> = {
  mb: 0.5,
  '& .MuiSlider-rail': { backgroundColor: (theme) => theme.palette.text.disabled },
  '& .MuiSlider-mark': { color: (theme) => theme.palette.text.secondary },
};

const sliderMarks: Mark[] = [
  { value: 0, label: '0' },
  { value: 1, label: '1' },
  { value: 2, label: '2' },
  { value: 3, label: '3' },
  { value: 4, label: '4' },
];

const RoundPoints: FunctionComponent<Props> = ({
  teams,
  points,
  activeTeam,
  isConfirmOpen,
  formRef,
  formik,
  handleFullTrip,
  handleTk,
  handleSecurities,
  handleReset,
  handleSubmit,
  goBack,
  handleOpenConfirm,
  handleCloseConfirm,
}) => {
  return (
    <Paper elevation={2} sx={{ px: 2, pb: 1, mb: 2 }}>
      <Box sx={{ pt: 1, pb: 2 }}>
        <Typography variant="h5" align="center">
          Registro de Puntajes
        </Typography>
        <Typography variant={'subtitle1'} align="center">
          {teams[activeTeam].name}
        </Typography>
      </Box>
      <Box sx={{ px: { sm: 2, md: 4 } }}>
        <Stepper activeStep={activeTeam}>
          {teams.map((t, idx) => {
            let stepProps = {};
            if (points[t.name] && idx !== activeTeam) {
              stepProps = { ...stepProps, completed: !!points[t.name] };
            } else if (idx === activeTeam) {
              stepProps = { ...stepProps, active: true };
            }
            return (
              <Step key={`team${idx + 1}`} {...stepProps}>
                <StepLabel>{t.name}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Box>
      <Box component="form" onSubmit={handleSubmit} onReset={handleReset} sx={{ pt: 2, pb: 1 }} ref={formRef}>
        <Grid container spacing={2}>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si se llegó a la distancia final de la jugada (1.000 o 700 millas)"
              placement="right"
              arrow
              disableFocusListener
              enterTouchDelay={0}
              leaveTouchDelay={10000}>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.fullTrip && Boolean(formik.errors.fullTrip)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="fullTrip" checked={formik.values.fullTrip} sx={{ pl: 0 }} />}
                  onChange={handleFullTrip}
                  label="Viaje completo"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Stack direction="row" alignItems="center" sx={{ mr: 2 }}>
              <Tooltip
                title="Cantidad de millas recorridas en jugada"
                placement="right"
                arrow
                disableFocusListener
                enterTouchDelay={0}
                leaveTouchDelay={10000}>
                <IconButton sx={{ mr: 1 }}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <TextField
                fullWidth
                name="traveled"
                value={formik.values.traveled}
                type="number"
                label="Recorrido"
                onChange={formik.handleChange}
                error={formik.touched.traveled && Boolean(formik.errors.traveled)}
              />
            </Stack>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Stack direction="row" alignItems="center">
              <Tooltip
                title="Cantidad de TKs en la jugada (Si se usó la Carta de Seguridad correspondiente inmediatamente después de su Carta de Problema)"
                placement="right"
                arrow
                disableFocusListener
                enterTouchDelay={0}
                leaveTouchDelay={10000}>
                <IconButton sx={{ mr: 1 }}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body1">TKs</Typography>
            </Stack>
            <Box sx={{ ml: 7, mr: 2 }}>
              <Slider
                sx={sliderSx}
                defaultValue={0}
                name="tk"
                value={formik.values.tk}
                min={0}
                max={4}
                step={1}
                marks={sliderMarks}
                onChange={handleTk}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Stack direction="row" alignItems="center">
              <Tooltip
                title="Cantidad de Cartas de Seguridades de la partida"
                placement="right"
                arrow
                disableFocusListener
                enterTouchDelay={0}
                leaveTouchDelay={10000}>
                <IconButton sx={{ mr: 1 }}>
                  <HelpIcon />
                </IconButton>
              </Tooltip>
              <Typography variant="body1">Seguridades</Typography>
            </Stack>
            <Box sx={{ ml: 7, mr: 2 }}>
              <Slider
                sx={sliderSx}
                defaultValue={0}
                name="securities"
                value={formik.values.securities}
                min={0}
                max={4}
                step={1}
                marks={sliderMarks}
                onChange={handleSecurities}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si este jugador o equipo realizó un Viaje completo sin usar Carta de Velocidad de 200"
              placement="right"
              arrow
              disableFocusListener
              enterTouchDelay={0}
              leaveTouchDelay={10000}>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.noOverSpeed && Boolean(formik.errors.noOverSpeed)}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="noOverSpeed"
                      checked={formik.values.noOverSpeed}
                      disabled={!formik.values.fullTrip}
                      sx={{ pl: 0 }}
                    />
                  }
                  onChange={formik.handleChange}
                  label="Viaje Seguro"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si este jugador o equipo realizó un Viaje completo y otro jugador o equipo no pudo utilizar Carta de Velocidad"
              placement="right"
              arrow
              disableFocusListener
              enterTouchDelay={0}
              leaveTouchDelay={10000}>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.blocked && Boolean(formik.errors.blocked)}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="blocked"
                      checked={formik.values.blocked}
                      disabled={!formik.values.fullTrip}
                      sx={{ pl: 0 }}
                    />
                  }
                  onChange={formik.handleChange}
                  label="Bloqueo"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si este jugador o equipo realizó un Viaje completo y jugó sin Cartas disponibles en el mazo"
              placement="right"
              arrow
              disableFocusListener
              enterTouchDelay={0}
              leaveTouchDelay={10000}>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.overTime && Boolean(formik.errors.overTime)}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="overTime"
                      checked={formik.values.overTime}
                      disabled={!formik.values.fullTrip}
                      sx={{ pl: 0 }}
                    />
                  }
                  onChange={formik.handleChange}
                  label="Acción Demorada"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si esta partida era a 700 millas pero este jugador o equipo propuso alargar a 1.000 millas y realizó un Viaje completo"
              placement="right"
              arrow
              disableFocusListener
              enterTouchDelay={0}
              leaveTouchDelay={10000}>
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.extraMile && Boolean(formik.errors.extraMile)}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="extraMile"
                      checked={formik.values.extraMile}
                      disabled={!formik.values.fullTrip}
                      sx={{ pl: 0 }}
                    />
                  }
                  onChange={formik.handleChange}
                  label="Alargue"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Box sx={{ m: 'auto' }} />
            <Button type="button" variant="contained" disabled={activeTeam === 0} onClick={goBack} sx={{ mx: 1 }}>
              Atrás
            </Button>
            <Button type="submit" variant="contained" disabled={!formik.isValid || activeTeam + 1 === teams.length}>
              Siguiente
            </Button>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Button type="reset" variant="contained">
              Reiniciar
            </Button>
            <Box sx={{ m: 'auto' }} />
            <Button
              type="button"
              variant="contained"
              disabled={!formik.isValid || activeTeam + 1 < teams.length}
              onClick={handleOpenConfirm}>
              Finalizar
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={isConfirmOpen} onClose={() => handleCloseConfirm(false)}>
        <DialogTitle>¿Finalizar Registro de Puntajes?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Desea finalizar el Registro de Puntajes para esta partida? Esta acción no se puede deshacer.
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
    </Paper>
  );
};

export default RoundPoints;
