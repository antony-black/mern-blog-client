import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import styles from './Login.module.scss';
import { fetchAuthData, fetchUserData, selectAuthData } from '../../redux/slices/auth';

export const Login = () => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(selectAuthData);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({ defaultValues: { email: '', password: '' }, mode: 'onChange' });

  const onSubmit = async (values) => {
    console.log(values);
    const data = await dispatch(fetchAuthData(values));
    console.log(data);
    if (!data.payload) {
      alert("Can't get authorization.");
      return;
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
      dispatch(fetchUserData());
    }
  };

  if (isAuth) {
    navigate('/');
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          helperText={errors.email?.message}
          {...register('email', { required: 'Required field.' })}
          fullWidth
        />
        <TextField
          className={styles.field}
          label="Password"
          error={Boolean(errors.password?.message)}
          helperText={errors.password?.message}
          {...register('password', { required: 'Required field.' })}
          fullWidth
        />
        <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
          Login
        </Button>
      </form>
    </Paper>
  );
};
