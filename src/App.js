import './App.css';

import { useContext } from 'react';
import { AppBar, Typography, Toolbar, Button, Box, Stack } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";

import CRoutes from './Components/CRoutes';
import AuthContext from './contexts/AuthContext';
import Cookies from 'js-cookie';

function App() {
  const { authorized, setAuthorized, login, setLogin } = useContext(AuthContext);

  const logOff = () => {
    setAuthorized(false);
    setLogin(null);
    Cookies.remove('authorized');
    Cookies.remove('login');
    window.location.reload();
  };

  return (
    <div className='App-link'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Tic-Tac-Toe
          </Typography>
          <Box sx={{flexGrow: 1}}></Box>
          <Button color='inherit' component={Link} variant="text" to="/">Home</Button>
          {!authorized && <>
            <Button color='inherit' component={Link} to="/registration">Registration</Button>
            <Button color ='inherit' component={Link} to="/login">Log in</Button>
          </>}
          {authorized &&
            <>
              <Button color='inherit' component={Link} variant='text' to='/statistics'>Statistics</Button>
              <Typography variant="button" noWrap component="div">
                {login}
              </Typography>
              <Button color='inherit' variant='text' onClick={() => logOff()}>Log off</Button> 
            </> 
          }
        </Toolbar>
      </AppBar>
      <CRoutes />
    </div>
  );
}

export default App;
