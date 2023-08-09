import { ChangeEvent, FormEvent, FunctionComponent, HTMLAttributes, SyntheticEvent } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import { Team } from '../../../../models/Team.ts';
import { Points } from '../../../../models/Points.ts';
import { FormikProps } from 'formik';
import { PointsType } from '../../../../models/forms/PointsType.ts';

interface Props extends HTMLAttributes<unknown> {
  teams: Team[];
  points: Points;
  activeTeam: number;
  formik: FormikProps<PointsType>;
  handleFullTrip: (event: SyntheticEvent, checked: boolean) => void;
  handleTk: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  handleSecurities: (event: ChangeEvent<HTMLInputElement>, value: string) => void;
  handleReset: (event: FormEvent<HTMLFormElement>) => void;
  goBack: () => void;
}

const RoundPoints: FunctionComponent<Props> = ({
  teams,
  points,
  activeTeam,
  formik,
  handleFullTrip,
  handleTk,
  handleSecurities,
  handleReset,
  goBack,
}) => {
  return (
    <Paper elevation={2} sx={{ p: 1, mb: 2 }}>
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
      <Box component="form" onSubmit={formik.handleSubmit} onReset={handleReset} sx={{ pt: 2, pb: 1 }}>
        <Grid container spacing={2}>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si se llegó a la distancia final de la jugada (1.000 o 700 millas)"
              disableFocusListener
              arrow
              placement="right">
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
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip title="Cantidad de millas recorridas en jugada" disableFocusListener arrow placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <TextField
              name="traveled"
              value={formik.values.traveled}
              type="number"
              label="Recorrido"
              onChange={formik.handleChange}
              error={formik.touched.traveled && Boolean(formik.errors.traveled)}
            />
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Cantidad de TKs en la jugada (Si se usó la Carta de Seguridad correspondiente inmediatamente después de su Carta de Problema)"
              disableFocusListener
              arrow
              placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.tk && Boolean(formik.errors.tk)}>
              <FormLabel>TKs</FormLabel>
              <RadioGroup row name="tk" value={formik.values.tk} onChange={handleTk}>
                <FormControlLabel value={0} control={<Radio />} label="Ninguno" />
                <FormControlLabel value={1} control={<Radio />} label="Uno" />
                <FormControlLabel value={2} control={<Radio />} label="Dos" />
                <FormControlLabel value={3} control={<Radio />} label="Tres" />
                <FormControlLabel value={4} control={<Radio />} label="Cuatro" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Cantidad de Cartas de Seguridades de la partida"
              disableFocusListener
              arrow
              placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.securities && Boolean(formik.errors.securities)}>
              <FormLabel>Seguridades I</FormLabel>
              <RadioGroup row name="securities" value={formik.values.securities} onChange={handleSecurities}>
                <FormControlLabel value={0} control={<Radio />} label="Ninguna" />
                <FormControlLabel value={1} control={<Radio />} label="Una" />
                <FormControlLabel value={2} control={<Radio />} label="Dos" />
                <FormControlLabel value={3} control={<Radio />} label="Tres" />
                <FormControlLabel value={4} control={<Radio />} label="Cuatro" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si en la partida no se usaron Carta de Velocidad de 200"
              disableFocusListener
              arrow
              placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.noOverSpeed && Boolean(formik.errors.noOverSpeed)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="noOverSpeed" checked={formik.values.noOverSpeed} sx={{ pl: 0 }} />}
                  onChange={formik.handleChange}
                  label="Viaje Seguro"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si este jugador o equipo realizó un Viaje completo y otro jugador o equipo no pudo utilizar Carta de Velocidad"
              disableFocusListener
              arrow
              placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.blocked && Boolean(formik.errors.blocked)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="blocked" checked={formik.values.blocked} sx={{ pl: 0 }} />}
                  onChange={formik.handleChange}
                  label="Bloqueo"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si este jugador o equipo realizó un Viaje completo y jugó sin Cartas disponibles en el mazo"
              disableFocusListener
              arrow
              placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.overTime && Boolean(formik.errors.overTime)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="overTime" checked={formik.values.overTime} sx={{ pl: 0 }} />}
                  onChange={formik.handleChange}
                  label="Acción Demorada"
                  labelPlacement="end"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Tooltip
              title="Marcar si esta partida era a 700 millas pero este jugador o equipo propuso alargar a 1.000 millas y realizó un Viaje completo"
              disableFocusListener
              arrow
              placement="right">
              <IconButton sx={{ mr: 1 }}>
                <HelpIcon />
              </IconButton>
            </Tooltip>
            <FormControl error={formik.touched.extraMile && Boolean(formik.errors.extraMile)}>
              <FormGroup>
                <FormControlLabel
                  control={<Checkbox name="extraMile" checked={formik.values.extraMile} sx={{ pl: 0 }} />}
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
            <Button type="submit" variant="contained" disabled={!formik.isValid || activeTeam + 1 < teams.length}>
              Finalizar
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RoundPoints;
