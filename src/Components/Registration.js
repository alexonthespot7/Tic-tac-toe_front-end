import '../App.css';

import { useState, useContext, useEffect } from 'react';
import { Button, TextField, Stack, Typography } from '@mui/material';
import Axios from 'axios';
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

  const { setAuthorized, setLogin, setHome } = useContext(AuthContext);

  const inputChanged = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
    if (event.target.name === 'login') {
      setLogError(false);
      setSpace(2);
      setLogHelper("");
    } else {
      setPassError(false);
      setSpace(2);
      setPassHelper('');
    }
  };

  useEffect(() => {
    setHome(false);
  }, []);

  const makeQuery = () => {
    Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/register', {
      login: user.login,
      password: user.password      
    })
    .then((response) => {
      if (response.data === "") {
        alert("Everything went succesfully");
        setAuthorized(true);
        setLogin(user.login)
        Cookies.set('authorized', true);
        Cookies.set('login', user.login);
        setUser({
          login: '',
          password: ''
        });
      } else {
        setLogError(true);
        setSpace(1);
        setLogHelper("The login is already in use");
        setUser({...user, password: ''});
        setLoading(false);
      };
    })
    .catch((error) => {
      alert("Registration isn't available at the moment")
      console.log(error);
      setLoading(false);
      setUser({
        login: '',
        password: ''
      });
    });
  };

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
    } else {
      setLoading(true);
      makeQuery();
    };
  };

  return !Cookies.get('authorized') ? (
    <div className='App'>
        {!loading && <Stack spacing={space} sx={{my: 10}}>
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
          <Button onClick={() => handleSave()}>Register</Button>
        </Stack>}
        {loading && <Typography variant='h5' align='center'>Loading...</Typography>}
    </div>
  ) : (
    <div className='App'></div>
  );
}

export default Registration;