import { Stack, Button, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import AuthContext from '../contexts/AuthContext';

export default function TicTacToe() {
    const {
      winner, setWinner, turn, setTurn, flag,
      setFlag, cellColor, setColor, play
    } = React.useContext(AuthContext);

    const checkWinner = () => {
      let a;
      let b;
      let c;

      if (flag[0] === flag[1] && flag[1] === flag[2] && flag[1] !== '') {
        flag[1] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 0;
        b = 1;
        c = 2;
      } else if (flag[0] === flag[3] && flag[3] === flag[6] && flag[3] !== '') {
        flag[3] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 0;
        b = 3;
        c = 6;
      } else if (flag[0] === flag[4] && flag[4] === flag[8] && flag[4] !== '') {
        flag[4] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 0;
        b = 4;
        c = 8;
      } else if (flag[1] === flag[4] && flag[4] === flag[7] && flag[4] !== '') {
        flag[4] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 1;
        b = 4;
        c = 7;
      } else if (flag[2] === flag[5] && flag[5] === flag[8] && flag[5] !== '') {
        flag[5] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 2;
        b = 5;
        c = 8;
      } else if (flag[2] === flag[4] && flag[4] === flag[6] && flag[4] !== '') {
        flag[4] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 2;
        b = 4;
        c = 6;
      } else if (flag[3] === flag[4] && flag[4] === flag[5] && flag[4] !== '') {
        flag[4] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 3;
        b = 4;
        c = 5;
      } else if (flag[6] === flag[7] && flag[7] === flag[8] && flag[7] !== '') {
        flag[7] === 'X' ? setWinner('Crosses') : setWinner('Noughts');
        a = 6;
        b = 7;
        c = 8;
      }
      setColor({...cellColor, [a]: '#46beff', [b]: '#46beff', [c]: '#46beff'});
    }
    
    React.useEffect(() => {
      checkWinner();
    }, [flag]);

    const handleClick = (num) => {
      if (turn === 'Crosses') {
        setFlag({...flag, [num]: 'X'});
        setTurn('Noughts');
      } else {
        setFlag({...flag, [num]: 'O'});
        setTurn('Crosses');
      }
    }

    function SpaceHandler(props) {
      if (flag[props.n] === '') {
        return (
          <Button disabled={(winner !== '') || play} onClick={() => handleClick(props.n)} sx={{height: 100.2, width: 100, borderRadius: 0, bgcolor: '#fff'}} variant='contained'></Button>
        )
      } else {
        return (
          <Paper square sx={{height: 100.2, width: 100, bgcolor: cellColor[props.n]}} variant='contained'>
            <Typography sx={{py: 4.01}} variant='h4'>
              {flag[props.n]}
            </Typography>
          </Paper>
        )
      }
    }

    return (
      <>
        <Stack
          sx={{
            bgcolor: '#fff',
            opacity: '85%',
            border: 1,
            height: 303.3,
            width: 301.5,
            margin: 'auto',
            boxShadow: 3,
            my: 10
          }}
          divider={<Divider sx={{bgcolor: '#000'}} flexItem />}         
        >
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{bgcolor: '#000'}} flexItem />}>
            <SpaceHandler n={0} />
            <SpaceHandler n={1} />
            <SpaceHandler n={2} />
          </Stack>
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{bgcolor: '#000'}} flexItem />}>
            <SpaceHandler n={3} />
            <SpaceHandler n={4} />
            <SpaceHandler n={5} />
          </Stack>
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{bgcolor: '#000'}} flexItem />}>
            <SpaceHandler n={6} />
            <SpaceHandler n={7} />
            <SpaceHandler n={8} />
          </Stack>
        </Stack>        
      </>
    );
}