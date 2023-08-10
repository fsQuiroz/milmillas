import { FunctionComponent, useContext, useEffect, useState } from 'react';
import Teams from './Teams.tsx';
import { Team } from '../../../models/Team.ts';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { adjectives, pokemons } from '../../../util/custom-dicc.ts';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { TeamType } from '../../../models/forms/TeamType.tsx';
import { PointsContext } from '../../../context/PointsContext.tsx';
import { useNavigate } from 'react-router-dom';

const TeamsContainer: FunctionComponent = () => {
  const { teams, initTeams } = useContext(PointsContext);
  const [existsPrev, setExistsPrev] = useState<boolean>(teams.length > 1);
  const [playersSize, setPlayersSize] = useState<number>(2);
  const [_teams, setTeams] = useState<Team[]>([]);
  const navigate = useNavigate();

  const validations = yup.object({
    team1: yup
      .string()
      .notOneOf([yup.ref('team2'), yup.ref('team3')], 'No se puede repetir el nombre')
      .required('Campo obligatorio'),
    team2: yup
      .string()
      .notOneOf([yup.ref('team1'), yup.ref('team3')], 'No se puede repetir el nombre')
      .required('Campo obligatorio'),
    team3: yup
      .string()
      .notOneOf([yup.ref('team1'), yup.ref('team2')], 'No se puede repetir el nombre')
      .required('Campo obligatorio'),
  });

  const formik: FormikProps<TeamType> = useFormik({
    initialValues: {
      team1: '',
      team2: '',
      team3: '',
    },
    validationSchema: validations,
    validateOnChange: true,
    onSubmit: (values) => {
      let newTeams: Team[] = [{ name: values.team1 }, { name: values.team2 }];
      if (playersSize > 2) {
        newTeams = [...newTeams, { name: values.team3 }];
      }
      initTeams(newTeams);
      navigate('/points');
    },
  });

  const resetPlayersSize = (newSize: number) => {
    if (playersSize !== newSize) {
      setTeams([]);
      setPlayersSize(newSize);
    }
  };

  const init = () => {
    if (teams.length > 1) {
      teams.forEach((t, idx) => {
        formik.setFieldValue(`team${idx + 1}`, t.name);
      });
      if (teams.length < 3) {
        formik.setFieldValue('team3', 'none');
      }
      setExistsPrev(true);
      setTeams(teams);
      setPlayersSize(teams.length);
    } else {
      generateNames();
    }
  };

  const generateNames = () => {
    let newTeams: Team[] = [];
    for (let i: number = 0; i < playersSize; i++) {
      const team: Team = {
        name: uniqueNamesGenerator({
          dictionaries: [adjectives, pokemons],
          length: 2,
          separator: ' ',
          style: 'capital',
        }),
      };
      newTeams = [...newTeams, team];
      formik.setFieldValue(`team${i + 1}`, team.name);
    }
    if (playersSize < 3) {
      formik.setFieldValue('team3', 'none');
    }
    setTeams(newTeams);
  };

  const resume = () => {
    navigate('/points');
  };

  useEffect(init, [playersSize, teams]);

  return (
    <Teams
      existsPrev={existsPrev}
      playersSize={playersSize}
      formik={formik}
      resetPlayersSize={resetPlayersSize}
      generateNames={generateNames}
      resume={resume}
    />
  );
};

export default TeamsContainer;
