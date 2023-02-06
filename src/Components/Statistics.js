import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';

import AuthContext from '../contexts/AuthContext';
import { Typography, Stack, Button, Grid } from '@mui/material';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import useMediaQuery from '../Hooks/useMediaQuery';

function Statistics() {
  const [flagHere, setFlagHere] = useState(false);
  const [statsOne, setStatsOne] = useState(null);
  const [statsTwo, setStatsTwo] = useState(null);
  const [isEmpt, setEmpt] = useState(false);
  const [reset, setReset] = useState(false);

  const { startAgain, setHome } = useContext(AuthContext);

  const loadStatsOne = () => {
    const token = Cookies.get('jwt');
    const userId = Cookies.get('authorizedId');

    fetch(process.env.REACT_APP_API_URL + 'getResults/' + userId,
      {
        method: 'GET',
        headers: { 'Authorization': token }
      })
      .then(response => response.json())
      .then(data => {
        if (data !== null) {
          if ((data.nought_wins + data.cross_wins + data.draws + data.bot_wins + data.user_wins + data.bot_draws) === 0) {
            setEmpt(true);
          }
          setStatsOne([
            {
              'name': 'Crosses Wins',
              'value': data.cross_wins
            },
            {
              'name': 'Noughts Wins',
              'value': data.nought_wins
            },
            {
              'name': 'Draws',
              'value': data.draws
            }
          ]);
          setStatsTwo([
            {
              'name': 'Your Wins',
              'value': data.user_wins
            },
            {
              'name': "Bot's Wins",
              'value': data.bot_wins
            },
            {
              'name': 'Draws',
              'value': data.bot_draws
            }
          ]);
        } else {
          alert("Statistics page isn't available for you at the moment");
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    if (Cookies.get('authorized')) {
      loadStatsOne();
      startAgain();
      setFlagHere(true);
    };
    setHome(false);
  }, []);

  const resetStat = () => {
    const token = Cookies.get('jwt');
    const userId = Cookies.get('authorizedId');
    fetch(process.env.REACT_APP_API_URL + 'api/resetStat/' + userId,
      {
        method: 'GET',
        headers: { 'Authorization': token }
      })
      .then(response => {
        if (response.ok) {
          setReset(true);
          alert('Your stat was reset successfully');
        }
      })
      .catch(err => console.error(err));
  }

  if (reset) {
    window.location.reload();
  }

  const matchesL = useMediaQuery("(min-width: 1250px)");
  const matchesM = useMediaQuery("(min-width: 620px)");
  const matchesM2 = useMediaQuery("(min-width: 550px)");
  const matchesS = useMediaQuery("(min-width: 450px)");
  const matchesXS = useMediaQuery("(min-width: 350px)");

  const defineStatWidth = () => {
    if (matchesM) {
      return 600;
    } else if (matchesM2) {
      return 500;
    } else if (matchesS) {
      return 400;
    } else if (matchesXS) {
      return 300;
    } else {
      return 200;
    }
  }

  const defineStatHeight = () => {
    if (matchesM2) {
      return 400;
    } else if (matchesS) {
      return 300;
    } else if (matchesXS) {
      return 200;
    } else {
      return 150;
    }
  }

  const statHeight = defineStatHeight();
  const statWidth = defineStatWidth();

  const stackStyle = matchesM ? { my: 8 } : { mb: 8, mt: 2 };


  if (flagHere && Cookies.get('authorized')) {
    return (!isEmpt) ? (
      <div className='App'>
        {statsOne && statsTwo &&
          <Stack direction={matchesL ? 'row' : 'column'} sx={stackStyle} spaciing={3}>
            <Stack sx={{ marginBottom: matchesL ? 0 : matchesM2 ? 8 : 4 }} spacing={3}>
              <Typography variant={matchesXS ? 'h5' : 'h6'}>Your full statistics</Typography>
              <BarChart
                width={statWidth}
                height={statHeight}
                data={statsOne}
                margin={{
                  top: 5,
                  right: matchesM ? 30 : 0,
                  left: matchesM ? 20 : 0,
                  bottom: -5,
                }}
              >
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </Stack>
            <Stack spacing={3}>
              <Typography variant={matchesXS ? 'h5' : 'h6'}>Your statistics against bot!</Typography>
              <BarChart
                width={statWidth}
                height={statHeight}
                data={statsTwo}
                margin={{
                  top: 5,
                  right: matchesM ? 30 : 0,
                  left: matchesM ? 20 : 0,
                  bottom: -5,
                }}
              >
                <CartesianGrid strokeDasharray="0 0" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
              <Grid sx={{ pr: 3 }} container justifyContent="flex-end">
                <Button size='large' onClick={() => resetStat()}>Reset</Button>
              </Grid>
            </Stack>
          </Stack>
        }
        {!statsOne && !statsTwo &&
          <Stack spacing={2} sx={{ my: 10 }}>
            <Typography variant='h6'>Loading...</Typography>
          </Stack>
        }
      </div>
    ) : (
      <div className='Applogo'>
        <Stack spacing={2} sx={{ my: 10 }}>
          <Typography variant='h6'>You have nothing to be shown so far...</Typography>
          <Typography variant='h6'>Play to update your statistics</Typography>
        </Stack>
      </div>
    )
  } else {
    return (
      <div className='Applogo'>Statistics page isn't available for you</div>
    )
  }
};

export default Statistics;