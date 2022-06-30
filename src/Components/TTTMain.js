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
    authorized, login, winner, draw, play, setPlay,
    startAgain, playWFriend, comp, setComp, setHome
  } = useContext(AuthContext);

  const postResult = () => {
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
  };

  const postBotResult = () => {
    let botRes;
    if (draw) {
      botRes = 'Draw';
    } else if (comp === winner) {
      botRes = 'Bot';
      alert(botRes);
    } else {
      botRes = "User";
    };

    Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/addBotResult', {
      login: login,
      result: botRes
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    setAgain(winner !== '' || draw);
    setHome(true);

    if ((winner !== '' || draw) && authorized && login) {
      postResult();

      if (!playWFriend) {
        postBotResult();
      };
    };
  }, [winner, draw]);

  return (
    <div className='App'>
      <Stack spacing={2} sx={{my: 10}}>
        {!play && <Results />}
        {play && <Typography align='center' variant='h5'>Click play to start game...</Typography>}
        <Stack sx={{pl: 5}} direction='row' spacing={2}>
          <Button color={(comp == 'Crosses') ? 'primary' : 'secondary'} onClick={() => setComp('Crosses')} variant='contained' disabled = {playWFriend || !play}>Crosses</Button>
          <Button color={(comp == 'Noughts') ? 'primary' : 'secondary'} onClick={() => setComp('Noughts')} variant='contained' disabled = {playWFriend || !play}>Noughts</Button>
        </Stack>
        <TicTacToe />
        <Stack direction='row' spacing={10.5}>
          <Button disabled={!again} variant='outlined' onClick={() => startAgain()}>Start again</Button>
          <Button disabled={!play} variant='outlined' onClick={() => setPlay(false)} endIcon={<PlayArrowIcon />}>Play</Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default TTTMain;
