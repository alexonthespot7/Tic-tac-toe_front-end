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
  const { authorized, setAuthorized, setLogin } = useContext(AuthContext);

  const inputChanged = (event) => {
    setUser({...user, [event.target.name]: event.target.value});
  };

  const handleSave = () => {
    Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/login', {
      login: user.login
    })
    .then((response) => {
      const data = response.data[0];
      if (data === undefined) {
        alert('The login is wrong!');
      } else if (data.password !== user.password) {
        alert('The password is wrong');
      } else if (data.password === user.password) {
        alert('The login process went successfully');
        setAuthorized(true);
        setLogin(user.login);
        Cookies.set('authorized', true);
        Cookies.set('login', user.login);
      }
    })
    .catch((error) => {
      alert("Login isn't available at the moment")
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
          <Button onClick={() => handleSave()}>Login</Button>
        </Stack>
      </div>
  ) : (
    <div className='App'></div>
  );
}

export default Registration;