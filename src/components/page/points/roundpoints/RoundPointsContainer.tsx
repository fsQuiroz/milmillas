import { ChangeEvent, FormEvent, FunctionComponent, SyntheticEvent, useContext, useState } from 'react';
import { Point, Points } from '../../../../models/Points.ts';
import RoundPoints from './RoundPoints.tsx';
import { Team } from '../../../../models/Team.ts';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { PointsType } from '../../../../models/forms/PointsType.ts';
import { PointsContext } from '../../../../context/PointsContext.tsx';

type Props = {
  teams: Team[];
};

const initValues: PointsType = {
  fullTrip: false,
  traveled: 0,
  tk: 0,
  securities: 0,
  noOverSpeed: false,
  blocked: false,
  overTime: false,
  extraMile: false,
};

const RoundPointsContainer: FunctionComponent<Props> = ({ teams }) => {
  const [points, setPoints] = useState<Points>({});
  const [activeTeam, setActiveTeam] = useState<number>(0);
  const { updatePoints } = useContext(PointsContext);

  const validation = yup.object({
    fullTrip: yup.boolean().required(),
    traveled: yup.number().min(0).max(1000).required(),
    tk: yup.number().required(),
    securities: yup.number().required(),
    noOverSpeed: yup.boolean().required(),
    blocked: yup.boolean().required(),
    overTime: yup.boolean().required(),
    extraMile: yup.boolean().required(),
  });

  const formik: FormikProps<PointsType> = useFormik({
    initialValues: initValues,
    validationSchema: validation,
    onSubmit: (values: PointsType) => {
      points[teams[activeTeam].name] = {
        fullTrip: values.fullTrip ? 400 : 0,
        traveled: values.traveled,
        tk: values.tk * 300,
        securities: values.securities * 100,
        fullSecurities: values.securities == 4 ? 300 : 0,
        noOverSpeed: values.noOverSpeed ? 300 : 0,
        blocked: values.blocked ? 500 : 0,
        overTime: values.overTime ? 300 : 0,
        extraMile: values.extraMile ? 200 : 0,
      };
      setPoints(points);
      if (activeTeam + 1 === teams.length) {
        finalize();
      } else {
        moveStep(true);
      }
    },
  });

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    formik.handleReset(event);
    setPoints({});
    setActiveTeam(0);
  };

  const handleFullTrip = (event: SyntheticEvent, checked: boolean) => {
    formik.handleChange(event);
    formik.setFieldValue('traveled', checked ? 1000 : 0);
  };

  const handleTk = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    formik.handleChange(event);
    const newValue = parseInt(value);
    const securities = formik.values.securities;

    if (newValue > securities) {
      formik.setFieldValue('securities', newValue);
    }
  };

  const handleSecurities = (event: ChangeEvent<HTMLInputElement>, value: string) => {
    formik.handleChange(event);
    const newValue = parseInt(value);
    const tk = formik.values.tk;

    if (newValue < tk) {
      formik.setFieldValue('tk', newValue);
    }
  };

  const goBack = () => {
    moveStep(false);
  };

  const moveStep = (foward: boolean) => {
    const nextStep = foward ? activeTeam + 1 : activeTeam - 1;
    if (nextStep < 0 || nextStep >= teams.length) {
      return;
    }
    formik.resetForm();
    if (points[teams[nextStep].name]) {
      const point: Point = points[teams[nextStep].name];
      formik.setFieldValue('fullTrip', point.fullTrip === 400);
      formik.setFieldValue('traveled', point.traveled);
      formik.setFieldValue('tk', point.tk / 300);
      formik.setFieldValue('securities', point.securities / 100);
      formik.setFieldValue('noOverSpeed', point.noOverSpeed === 300);
      formik.setFieldValue('blocked', point.blocked === 500);
      formik.setFieldValue('overTime', point.overTime === 300);
      formik.setFieldValue('extraMile', point.extraMile === 200);
    }
    setActiveTeam(nextStep);
  };

  const finalize = () => {
    updatePoints(points);
    formik.resetForm();
    setPoints({});
    setActiveTeam(0);
  };

  return (
    <RoundPoints
      teams={teams}
      points={points}
      activeTeam={activeTeam}
      formik={formik}
      handleFullTrip={handleFullTrip}
      handleTk={handleTk}
      handleSecurities={handleSecurities}
      handleReset={handleReset}
      goBack={goBack}
    />
  );
};

export default RoundPointsContainer;
