import '../App.css';

import { useContext, useEffect, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import TicTacToe from './TicTacToe';
import Results from './Results';
import AuthContext from '../contexts/AuthContext';
import Axios from 'axios';

function TTTMain() {
  const [again, setAgain] = useState(true);
  const {
    authorized, login, winner, draw, play, setPlay, startAgain
  } = useContext(AuthContext);

  useEffect(() => {
    setAgain(winner !== '' || draw);

    if ((winner !== '' || draw) && authorized && login) {
      Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/addResult', {
        login: login,
        resultT: winner
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    }
  }, [winner, draw]);

  return (
    <div className='App'>
      <Stack spacing={2} sx={{my: 10}}>
        {!play && <Results />}
        {play && <Typography align='center' variant='h5'>Click play to start game...</Typography>}
        <TicTacToe />
        <Stack direction='row' spacing={10.5}>
          <Button disabled={!again} variant='outlined' onClick={() => startAgain()}>Start again</Button>
          <Button disabled={!play} variant='outlined' onClick={() => setPlay(false)} endIcon={<PlayArrowIcon />}>Play</Button>
        </Stack>
      </Stack>
    </div>
  );
}

export default TTTMain;
