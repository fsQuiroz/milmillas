import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { FunctionComponent } from 'react';
import Teams from './Teams.tsx';
import type { Team } from '../../../models/Team.ts';
import { uniqueNamesGenerator } from 'unique-names-generator';
import { adjectives, pokemons } from '../../../util/custom-dicc.ts';
import * as yup from 'yup';
import { useFormik } from 'formik';
import type { FormikProps } from 'formik';
import type { TeamType } from '../../../models/forms/TeamType.tsx';
import { PointsContext } from '../../../context';
import { useNavigate } from 'react-router-dom';

const TeamsContainer: FunctionComponent = () => {
  const { teams, initTeams } = useContext(PointsContext);
  const [existsPrev, setExistsPrev] = useState<boolean>(teams.length > 1);
  const [playersSize, setPlayersSize] = useState<number>(teams.length > 1 ? teams.length : 2);
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

  const formikRef = useRef(formik);
  formikRef.current = formik;

  const setTeamValue = useCallback((teamKey: string, value: string) => {
    formikRef.current.setFieldValue(teamKey, value);
  }, []);

  const populateExistingTeams = useCallback(() => {
    teams.forEach((t, idx) => {
      setTeamValue(`team${idx + 1}`, t.name);
    });
    if (teams.length < 3) {
      setTeamValue('team3', 'none');
    }
    setExistsPrev(true);
    setPlayersSize(teams.length);
  }, [teams, setTeamValue]);

  const generateTeamNames = useCallback(() => {
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
      setTeamValue(`team${i + 1}`, team.name);
    }
    if (playersSize < 3) {
      setTeamValue('team3', 'none');
    }
  }, [playersSize, setTeamValue]);

  const resetPlayersSize = (newSize: number) => {
    if (playersSize !== newSize) {
      setPlayersSize(newSize);
    }
  };

  const resume = () => {
    navigate('/points');
  };

  useEffect(() => {
    if (teams.length > 1) {
      populateExistingTeams();
    } else {
      generateTeamNames();
    }
  }, [playersSize, teams, populateExistingTeams, generateTeamNames]);

  return (
    <Teams
      existsPrev={existsPrev}
      playersSize={playersSize}
      formik={formik}
      resetPlayersSize={resetPlayersSize}
      generateNames={generateTeamNames}
      resume={resume}
    />
  );
};

export default TeamsContainer;
