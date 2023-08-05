import { FunctionComponent, useEffect, useState } from 'react';
import Teams from './Teams.tsx';
import { Team } from '../../../models/Team.ts';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { adjectives, pokemons } from '../../../util/custom-dicc.ts';
import * as yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { TeamType } from '../../../models/forms/TeamType.tsx';

const TeamsContainer: FunctionComponent = () => {
  const [playersSize, setPlayersSize] = useState<number>(2);

  const validations = yup.object({
    team1: yup.string().required('Campo obligatorio'),
    team2: yup.string().required('Campo obligatorio'),
    team3: yup.string().required('Campo obligatorio'),
  });

  const formik: FormikProps<TeamType> = useFormik({
    initialValues: {
      team1: '',
      team2: '',
      team3: '',
    },
    validationSchema: validations,
    onSubmit: (values) => {
      console.log(JSON.stringify(values));
    },
  });

  const [teams, setTeams] = useState<Team[]>([]);

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
