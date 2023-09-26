import { FormEvent, FunctionComponent, HTMLAttributes, SyntheticEvent, useContext, useRef, useState } from 'react';
import { Point, Points } from '../../../../models/Points.ts';
import RoundPoints from './RoundPoints.tsx';
import { Team } from '../../../../models/Team.ts';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { PointsType } from '../../../../models/forms/PointsType.ts';
import { PointsContext } from '../../../../context/PointsContext.tsx';

interface Props extends HTMLAttributes<unknown> {
  teams: Team[];
}

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
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const { updatePoints } = useContext(PointsContext);
  const formRef = useRef<HTMLFormElement>();

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

  const handleOpenConfirm = () => {
    setConfirmOpen(true);
  };

  const handleCloseConfirm = (shouldSubmit?: boolean) => {
    setConfirmOpen(false);
    if (shouldSubmit) {
      formRef.current?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
    }
  };

  const goToTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement> | undefined) => {
    formik.handleSubmit(event);
    goToTop();
  };

  const handleReset = (event: FormEvent<HTMLFormElement>) => {
    formik.handleReset(event);
    setPoints({});
    setActiveTeam(0);
    goToTop();
  };

  const handleFullTrip = (event: SyntheticEvent, checked: boolean) => {
    formik.handleChange(event);
    formik.setFieldValue('traveled', checked ? 1000 : 0);
    if (!checked) {
      formik.setFieldValue('noOverSpeed', 0);
      formik.setFieldValue('blocked', 0);
      formik.setFieldValue('overTime', 0);
      formik.setFieldValue('extraMile', 0);
    }
  };

  const handleTk = (event: Event, value: number | number[]) => {
    formik.handleChange(event);
    const newValue = value as number;
    const securities = formik.values.securities;

    if (newValue > securities) {
      formik.setFieldValue('securities', newValue);
    }
  };

  const handleSecurities = (event: Event, value: number | number[]) => {
    formik.handleChange(event);
    const newValue = value as number;
    const tk = formik.values.tk;

    if (newValue < tk) {
      formik.setFieldValue('tk', newValue);
    }
  };

  const goBack = () => {
    moveStep(false);
    goToTop();
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
      isConfirmOpen={confirmOpen}
      formRef={formRef}
      formik={formik}
      handleFullTrip={handleFullTrip}
      handleTk={handleTk}
      handleSecurities={handleSecurities}
      handleReset={handleReset}
      handleSubmit={handleSubmit}
      goBack={goBack}
      handleOpenConfirm={handleOpenConfirm}
      handleCloseConfirm={handleCloseConfirm}
    />
  );
};

export default RoundPointsContainer;
