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
  const [playersSize, setPlayersSize] = useState<number>(2);
  const { teams, setTeams } = useContext(PointsContext);
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
      setTeams(newTeams);
      navigate('/points');
    },
  });

  const resetPlayersSize = (newSize: number) => {
    if (playersSize !== newSize) {
      setTeams([]);
      setPlayersSize(newSize);
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

  useEffect(generateNames, [playersSize]);

  return (
    <Teams
      playersSize={playersSize}
      teams={teams}
      formik={formik}
      resetPlayersSize={resetPlayersSize}
      generateNames={generateNames}
    />
  );
};

export default TeamsContainer;
