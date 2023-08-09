import { FormEvent, FunctionComponent } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Step,
  StepLabel,
  Stepper,
  Switch,
  TextField,
  Typography,
} from '@mui/material';
import { Team } from '../../../../models/Team.ts';
import { Points } from '../../../../models/Points.ts';
import { FormikProps } from 'formik';
import { PointsType } from '../../../../models/forms/PointsType.ts';

type Props = {
  teams: Team[];
  points: Points;
  activeTeam: number;
  formik: FormikProps<PointsType>;
  handleReset: (event: FormEvent<HTMLFormElement>) => void;
  goBack: () => void;
};

const RoundPoints: FunctionComponent<Props> = ({ teams, points, activeTeam, formik, handleReset, goBack }) => {
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
            <FormControl error={formik.touched.fullTrip && Boolean(formik.errors.fullTrip)}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch name="fullTrip" checked={formik.values.fullTrip} />}
                  onChange={formik.handleChange}
                  label="Viaje completo"
                  labelPlacement="start"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <TextField
              name="traveled"
              value={formik.values.traveled}
              type="number"
              label="Recorrido"
              fullWidth
              onChange={formik.handleChange}
              error={formik.touched.traveled && Boolean(formik.errors.traveled)}
            />
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <FormControl error={formik.touched.tk && Boolean(formik.errors.tk)}>
              <FormLabel>TKs</FormLabel>
              <RadioGroup row name="tk" value={formik.values.tk} onChange={formik.handleChange}>
                <FormControlLabel value={0} control={<Radio />} label="Ninguno" />
                <FormControlLabel value={1} control={<Radio />} label="Uno" />
                <FormControlLabel value={2} control={<Radio />} label="Dos" />
                <FormControlLabel value={3} control={<Radio />} label="Tres" />
                <FormControlLabel value={4} control={<Radio />} label="Cuatro" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <FormControl error={formik.touched.securities && Boolean(formik.errors.securities)}>
              <FormLabel>Seguridades I</FormLabel>
              <RadioGroup row name="securities" value={formik.values.securities} onChange={formik.handleChange}>
                <FormControlLabel value={0} control={<Radio />} label="Ninguna" />
                <FormControlLabel value={1} control={<Radio />} label="Una" />
                <FormControlLabel value={2} control={<Radio />} label="Dos" />
                <FormControlLabel value={3} control={<Radio />} label="Tres" />
                <FormControlLabel value={4} control={<Radio />} label="Cuatro" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <FormControl error={formik.touched.noOverSpeed && Boolean(formik.errors.noOverSpeed)}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch name="noOverSpeed" checked={formik.values.noOverSpeed} />}
                  onChange={formik.handleChange}
                  label="Viaje Seguro"
                  labelPlacement="start"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <FormControl error={formik.touched.blocked && Boolean(formik.errors.blocked)}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch name="blocked" checked={formik.values.blocked} />}
                  onChange={formik.handleChange}
                  label="Bloqueo"
                  labelPlacement="start"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <FormControl error={formik.touched.overTime && Boolean(formik.errors.overTime)}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch name="overTime" checked={formik.values.overTime} />}
                  onChange={formik.handleChange}
                  label="Acción Demorada"
                  labelPlacement="start"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <FormControl error={formik.touched.extraMile && Boolean(formik.errors.extraMile)}>
              <FormGroup>
                <FormControlLabel
                  control={<Switch name="extraMile" checked={formik.values.extraMile} />}
                  onChange={formik.handleChange}
                  label="Alargue"
                  labelPlacement="start"
                  sx={{ m: 0 }}
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid item container xs={12} sm={8} m="auto" justifySelf="start">
            <Button type="reset" variant="contained">
              Reiniciar
            </Button>
            <Box sx={{ m: 'auto' }} />
            <Button type="button" variant="contained" disabled={activeTeam === 0} onClick={goBack} sx={{ mx: 1 }}>
              Atrás
            </Button>
            <Button type="submit" variant="contained">
              {Object.keys(points).length + 1 >= teams.length && activeTeam + 1 === teams.length
                ? 'Finalizar'
                : 'Siguiente'}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};

export default RoundPoints;
