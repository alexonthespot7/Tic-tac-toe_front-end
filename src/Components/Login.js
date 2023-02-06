import '../App.css';

import { useState, useContext, useEffect } from 'react';
import { Button, TextField, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import AuthContext from '../contexts/AuthContext';

function Registration() {
  const [loginError, setLoginError] = useState(false);
  const [loginHelper, setLoginHelper] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [passwordHelper, setPasswordHelper] = useState('');

  const [user, setUser] = useState({
    login: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { setAuthorized, setLogin, setHome } = useContext(AuthContext);

  useEffect(() => {
    setHome(false);
  }, []);

  const inputChanged = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  }

  const fetchLogin = () => {
    fetch(process.env.REACT_APP_API_URL + 'login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.login, password: user.password })
    })
      .then(response => {
        if (response.ok) {
          const jwtToken = response.headers.get('Authorization');
          if (jwtToken !== null) {
            setLoading(false);
            const role = response.headers.get('Allow');
            const localId = response.headers.get('Host');
            setAuthorized(true);
            setLogin(user.login);
            Cookies.set('jwt', jwtToken);
            Cookies.set('role', role);
            Cookies.set('authorizedId', localId);
            Cookies.set('authorized', true);
            Cookies.set('login', user.login);
            setUser({
              username: '',
              password: ''
            });
          } else {
            setLoading(false);
            setLoginError(true);
            setLoginHelper('Incorrect credentials');
            setPasswordError(true);
            setPasswordHelper('Incorrect credentials');
          }
        } else {
          setLoading(false);
          setLoginError(true);
          setLoginHelper('Incorrect credentials');
          setPasswordError(true);
          setPasswordHelper('Incorrect credentials');
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error: ' + err);
        setLoading(false);
      });
  }

  const handleSave = () => {
    let check = true;
    if (user.login === '') {
      check = false;
      setLoginError(true);
      setLoginHelper('Please type in username');
    }
    if (user.password === '') {
      check = false;
      setPasswordError(true);
      setPasswordHelper('Please type in password');
    }

    if (check) {
      setLoading(true);
      fetchLogin();
    }
  }

  return !Cookies.get('authorized') ? (
    <div className='App'>
      {!loading &&
        <Stack spacing={2} sx={{ my: 10 }}>
          <TextField
            error={loginError}
            helperText={loginHelper}
            name="login"
            label="Login"
            fullWidth
            value={user.login}
            onChange={inputChanged}
          />
          <TextField
            error={passwordError}
            helperText={passwordHelper}
            name="password"
            type="password"
            value={user.password}
            onChange={inputChanged}
            label="Password"
            fullWidth
          />
          <Button onClick={() => handleSave()}>Login</Button>
        </Stack>
      }
      {loading && <Typography variant='h5' align='center'>Loading...</Typography>}
    </div>
  ) : (
    <div className='App'></div>
  );
}

export default Registration;