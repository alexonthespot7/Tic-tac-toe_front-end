import '../App.css';

import { useContext, useEffect, useState } from 'react';
import { Stack, Button, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

import TicTacToe from './TicTacToe';
import Results from './Results';
import AuthContext from '../contexts/AuthContext';
import Cookies from 'js-cookie';
import useMediaQuery from '../Hooks/useMediaQuery';

function TTTMain() {
  const [again, setAgain] = useState(true);
  const {
    authorized, login, winner, draw, play, setPlay,
    startAgain, playWFriend, comp, setComp, setHome
  } = useContext(AuthContext);

  const postResult = () => {
    const token = Cookies.get('jwt');

    fetch(process.env.REACT_APP_API_URL + 'api/addResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(winner)
    })
      .then(response => {
        if (response.ok) {

        }
      })
      .catch(err => {
        console.error(err);
        alert('Error: ' + err);
      });
  }

  const postBotResult = () => {
    let botRes;
    if (comp === winner) {
      botRes = 'Bot';
    } else if (draw) {
      botRes = 'Draw';
    } else {
      botRes = "User";
    };

    const token = Cookies.get('jwt');

    fetch(process.env.REACT_APP_API_URL + 'api/addBotResult', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(botRes)
    })
      .then(response => {
        if (response.ok) {
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error: ' + err);
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

  const matchesXS = useMediaQuery("(min-width: 350px)");

  return (
    <div className='App'>
      <Stack spacing={2} sx={{ my: 10 }}>
        {!play && <Results />}
        {play && <Typography align='center' variant={matchesXS ? 'h5' : 'h6'}>Click play to start game...</Typography>}
        <Stack sx={{ pl: 0, justifyContent: 'center' }} direction='row' spacing={2}>
          <Button color={(comp == 'Crosses') ? 'primary' : 'secondary'} onClick={() => setComp('Crosses')} variant='contained' disabled={playWFriend || !play}>Crosses</Button>
          <Button color={(comp == 'Noughts') ? 'primary' : 'secondary'} onClick={() => setComp('Noughts')} variant='contained' disabled={playWFriend || !play}>Noughts</Button>
        </Stack>
        <TicTacToe />
        <Stack direction='row' spacing={matchesXS ? 10.5 : 4}>
          <Button disabled={!again} variant='outlined' onClick={() => startAgain()}>Start again</Button>
          <Button disabled={!play} variant='outlined' onClick={() => setPlay(false)} endIcon={<PlayArrowIcon />}>Play</Button>
        </Stack>
      </Stack>
    </div>
  );
};

export default TTTMain;
