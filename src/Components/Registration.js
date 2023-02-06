import '../App.css';

import { useState, useContext, useEffect } from 'react';
import { Button, TextField, Stack, Typography } from '@mui/material';
import Cookies from 'js-cookie';

import AuthContext from '../contexts/AuthContext';

function Registration() {
  const [user, setUser] = useState({
    login: '',
    password: ''
  });
  const [logError, setLogError] = useState(false);
  const [logHelperText, setLogHelper] = useState('');
  const [passError, setPassError] = useState(false);
  const [passHelperText, setPassHelper] = useState('');
  const [space, setSpace] = useState(2);
  const [loading, setLoading] = useState(false);
  const [pwdCheck, setPwdCheck] = useState('');

  const { setAuthorized, setLogin, setHome } = useContext(AuthContext);

  const inputChanged = (event) => {
    if (event.target.name === 'passwordCheck') {
      setPwdCheck(event.target.value);
    } else {
      setUser({ ...user, [event.target.name]: event.target.value });
    }
    if (event.target.name === 'login') {
      setLogError(false);
      setSpace(2);
      setLogHelper("");
    } else {
      setPassError(false);
      setSpace(2);
      setPassHelper('');
    }
  }

  useEffect(() => {
    setHome(false);
  }, []);

  const signup = () => {
    fetch(process.env.REACT_APP_API_URL + 'signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user.login, password: user.password })
    })
      .then(response => {
        if (response.ok) {
          const jwtToken = response.headers.get('Authorization');
          if (jwtToken !== null) {
            const role = response.headers.get('Allow');
            const localId = response.headers.get('Host');
            setAuthorized(true);
            setLogin(user.login);
            Cookies.set('jwt', jwtToken);
            Cookies.set('role', role);
            Cookies.set('authorizedId', localId);
            Cookies.set('authorized', true);
            Cookies.set('login', user.login);
            setLoading(false);
            setUser({
              username: '',
              password: ''
            });
          } else {
            setLoading(false);
            setLogError(true);
            setLogHelper('Something went wrong');
            setSpace(1);
            setPassError(true);
            setPassHelper('Something went wrong');
          }
        } else {
          setLoading(false);
          setLogError(true);
          setLogHelper('Login is already in use');
          setSpace(1);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error: ' + err);
        setLoading(false);
      });
  }


  const handleSave = () => {
    if (user.login === '' && user.password.length >= 4) {
      setLogError(true);
      setSpace(1);
      setLogHelper("Login field cannot be empty");
    } else if (user.login !== '' && user.password.length < 4) {
      setPassError(true);
      setSpace(1);
      setPassHelper('Password must contain at least 4 symbols');
    } else if (user.login === '' && user.password.length < 4) {
      setLogError(true);
      setSpace(1);
      setLogHelper("Login field cannot be empty");
      setPassError(true);
      setPassHelper('Password must contain at least 4 symbols');
    } else if (pwdCheck !== user.password) {
      setPassError(true);
      setSpace(1);
      setPassHelper('Password doesn\'t match');
    } else {
      setLoading(true);
      signup();
    }
  }

  return !Cookies.get('authorized') ? (
    <div className='App'>
      {!loading && <Stack spacing={space} sx={{ my: 10 }}>
        <TextField
          error={logError}
          helperText={logHelperText}
          name="login"
          label="Login"
          fullWidth
          value={user.login}
          onChange={inputChanged}
        />
        <TextField
          error={passError}
          helperText={passHelperText}
          name="password"
          type="password"
          value={user.password}
          onChange={inputChanged}
          label="Password"
          fullWidth
        />
        <TextField
          error={passError}
          helperText={passHelperText}
          name="passwordCheck"
          type="password"
          value={pwdCheck}
          onChange={inputChanged}
          label="Password check"
          fullWidth
        />
        <Button onClick={() => handleSave()}>Register</Button>
      </Stack>}
      {loading && <Typography variant='h5' align='center'>Loading...</Typography>}
    </div>
  ) : (
    <div className='App'></div>
  );
}

export default Registration;