import '../App.css';

import { useState, useContext } from 'react';
import { Button, TextField, Stack } from '@mui/material';
import Axios from 'axios';
import Cookies from 'js-cookie';

import AuthContext from '../contexts/AuthContext';

function Registration() {
  const [user, setUser] = useState({
    login: '',
    password: ''
  });
  const { authorized, setAuthorized, login, setLogin, statsOne, setStatsOne } = useContext(AuthContext);

  const inputChanged = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  };

  const handleSave = () => {
    Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/register', {
      login: user.login,
      password: user.password      
    })
    .then((response) => {
      if (response.data === "") {
          alert("Everything went succesfully");
          setAuthorized(true);
          setLogin(user.login)
          Cookies.set('authorized', authorized);
          Cookies.set('login', login);
      } else {
          alert("The login is already in use");
      };
    })
    .catch((error) => {
      alert("Registration isn't available at the moment")
      console.log(error);
    });

    setUser({
      login: '',
      password: ''
    });
  };

  return !authorized ? (
    <div className='App'>
        <Stack spacing={2} sx={{my: 10}}>
          <TextField
            name="login"
            label="Login"
            fullWidth
            value={user.login}
            onChange={inputChanged}
          />
          <TextField
            name="password"
            type="password"
            value={user.password}
            onChange={inputChanged}
            label="Password"
            fullWidth
          />
          <Button onClick={() => handleSave()}>Register</Button>
        </Stack>
    </div>
  ) : (
    <div className='App'></div>
  );
}

export default Registration;