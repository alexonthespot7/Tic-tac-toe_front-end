import './App.css';

import { useContext, useState, useEffect } from 'react';
import { AppBar, Typography, Toolbar, Button, Box, Stack, Menu, MenuItem, IconButton } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link, useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import CRoutes from './Components/CRoutes';
import AuthContext from './contexts/AuthContext';
import Cookies from 'js-cookie';
import useMediaQuery from './Hooks/useMediaQuery';

function MyMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const { play, difficulty, setDifficulty, playWFriend, setFriend } = useContext(AuthContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const easyMake = () => {
    setDifficulty("Easy");
    setAnchorEl(null);
    setFriend(false);
  }

  const mediumMake = () => {
    setDifficulty("Medium");
    setAnchorEl(null);
    setFriend(false);
  }

  const hardMake = () => {
    setDifficulty("Hard");
    setAnchorEl(null);
    setFriend(false);
  }

  const friend = () => {
    setAnchorEl(null);
    setFriend(true);
  }


  let diff;


  if (difficulty === "Hard") {
    diff = "Hard";
  } else if (difficulty === "Medium") {
    diff = "Medium";
  } else {
    diff = "Easy";
  }

  return (
    <div>
      <Button
        sx={{ ml: 1, mt: 0.5 }}
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
        {!playWFriend && diff}
        {playWFriend && <Typography variant='h7'>PvP</Typography>}
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
}

function LoggedOutMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const matchesXS = useMediaQuery("(min-width: 350px)");

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <div>
      {matchesXS && <Button
        sx={{ ml: 1, mt: 0.5 }}
        id="basic-button"
        color='secondary'
        variant='outlined'
        size='small'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
        endIcon={<KeyboardArrowDownIcon />}
      >
        Sign In
      </Button>}
      {!matchesXS && <IconButton
        sx={{ ml: 1, mt: 0.5 }}
        id="basic-button"
        color='secondary'
        variant='outlined'
        size='small'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
      >
        <ExitToAppIcon />
      </IconButton>}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to="/login">
          Login
        </MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/registration">
          Sign Up
        </MenuItem>
      </Menu>
    </div>
  );
}

function UserMenu() {
  const [anchorEl, setAnchorEl] = useState(null);

  const matchesS = useMediaQuery("(min-width: 450px)");

  const { setAuthorized, login, setLogin } = useContext(AuthContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  const logOff = () => {
    setAuthorized(false);
    setLogin(null);
    Cookies.remove('authorized');
    Cookies.remove('login');
    Cookies.remove('jwt');
    Cookies.remove('role');
    Cookies.remove('authorizedId');
    handleClose();
  }

  return (
    <div>
      {matchesS && <Button
        sx={{ ml: 1, mt: 0.5 }}
        id="basic-button"
        color='secondary'
        variant='outlined'
        size='small'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
        endIcon={<KeyboardArrowDownIcon />}
      >
        {login}
      </Button>}
      {!matchesS && <IconButton
        sx={{ ml: 1, mt: 0.5 }}
        id="basic-button"
        color='secondary'
        variant='outlined'
        size='small'
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        color='inherit'
      >
        <AccountCircleIcon />
      </IconButton>}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose} component={Link} to='/statistics'>
          Statistics
        </MenuItem>
        <MenuItem onClick={() => logOff()}>
          Log Out
        </MenuItem>
      </Menu>
    </div>
  );
}

function App() {
  const { authorized, setAuthorized, login, setLogin, home } = useContext(AuthContext);

  const matchesS = useMediaQuery("(min-width: 550px)");
  const matchesXS = useMediaQuery("(min-width: 350px)");
  const matchesXXS = useMediaQuery("(min-width: 330px)");

  const logOff = () => {
    setAuthorized(false);
    setLogin(null);
    Cookies.remove('authorized');
    Cookies.remove('login');
    Cookies.remove('jwt');
    Cookies.remove('role');
    Cookies.remove('authorizedId');
  }

  return (
    <div className='App-link'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant={matchesXXS ? 'h6' : 'h7'} noWrap component="div">
            Tic-Tac-Toe
          </Typography>
          <Box sx={{ flexGrow: 1 }}></Box>
          {home && <MyMenu />}
          {!home && matchesXS && <Button color='inherit' component={Link} variant="text" to="/">Home</Button>}
          {!home && !matchesXS && <IconButton color='inherit' component={Link} to="/"><HomeIcon /></IconButton>}
          {!authorized && matchesS && <>
            <Button color='inherit' component={Link} to="/registration">Sign Up</Button>
            <Button color='inherit' component={Link} to="/login">Login</Button>
          </>}
          {!authorized && !matchesS && <>
            <LoggedOutMenu />
          </>}
          {authorized &&
            matchesS && <>
              <Button color='inherit' component={Link} variant='text' to='/statistics'>Statistics</Button>
              <Typography color='#e2e1ec' variant="button" noWrap component="div">
                {login}
              </Typography>
              <Button color='inherit' variant='text' onClick={() => logOff()}>Log Out</Button>
            </>}
          {authorized && !matchesS && <>
            <UserMenu />
          </>}
        </Toolbar>
      </AppBar>
      <CRoutes />
    </div>
  );
}

export default App;
