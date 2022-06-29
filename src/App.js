import './App.css';

import { useContext, useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Box, Stack, Menu, MenuItem } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from "react-router-dom";

import CRoutes from './Components/CRoutes';
import AuthContext from './contexts/AuthContext';
import Cookies from 'js-cookie';

function MyMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { play, difficulty, setDifficulty, playWFriend, setFriend } = useContext(AuthContext);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const easyMake = () => {
    setDifficulty("Easy");
    setAnchorEl(null);
    setFriend(false);
  };

  const mediumMake = () => {
    setDifficulty("Medium");
    setAnchorEl(null);
    setFriend(false);
  };

  const hardMake = () => {
    setDifficulty("Hard");
    setAnchorEl(null);
    setFriend(false);
  };

  const friend = () => {
    setAnchorEl(null);
    setFriend(true);
  };

  return (
    <div>
      <Button
        sx={{ml: 1, mt: 0.5}}
        id="basic-button"
        color='secondary'
        variant='outlined'
        size='small'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
        disabled={!play}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {!playWFriend && difficulty}
        {playWFriend && <Typography variant='h6'>PvP</Typography>}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
            'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => easyMake()}>
          Easy
        </MenuItem>
        <MenuItem onClick={() => mediumMake()}>
          Medium
        </MenuItem>
        <MenuItem onClick={() => hardMake()}>
          Hard
        </MenuItem>
        <MenuItem onClick={() => friend()}>
          PvP
        </MenuItem>
      </Menu>
    </div>
  );
};

function App() {
  const { authorized, setAuthorized, login, setLogin, home } = useContext(AuthContext);

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
          {home && <MyMenu />}
          <Box sx={{flexGrow: 1}}></Box>
          {!home && <Button color='inherit' component={Link} variant="text" to="/">Home</Button>}
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
