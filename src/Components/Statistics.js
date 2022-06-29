import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';

import AuthContext from '../contexts/AuthContext';
import { Typography, Stack, Button, Grid } from '@mui/material';

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { SettingsInputHdmiOutlined } from '@mui/icons-material';

function Statistics() {
  const [flagHere, setFlagHere] = useState(false);
  const [statsOne, setStatsOne] = useState(null);
  const [isEmpt, setEmpt] = useState(false);
  const [reset, setReset] = useState(false);

  const { startAgain, setHome } = useContext(AuthContext);
  
  const loadStatsOne = () => {
    Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/getResultsByLogin', {
      login: Cookies.get('login')
    })
    .then((response) => {
      let dataStat = response.data[0];
      if (dataStat !== undefined) {
        const statData = [dataStat.cross_wins, dataStat.nought_wins, dataStat.draws];
        if (statData[0] === statData[1] && statData[1] === statData[2] && statData[1] === 0) {
          setEmpt(true);
        };
        setStatsOne([
          {
            'name': 'Crosses Wins',
            'value': statData[0]
          },
          {
            'name': 'Noughts Wins',
            'value': statData[1]
          },
          {
            'name': 'Draws',
            'value': statData[2]
          }
        ]);
      } else {
        alert("Statistics page2 isn't available at the moment");
      }
    })
    .catch((err) => {
      alert("Statistics page isn't available at the moment");
      console.error(err);
    });
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
    Axios.post('https://tic-tac-toe-bckend.herokuapp.com/api/resetStat', {
      login: Cookies.get('login')
    })
    .then((response) => {
      console.log(response);
      setReset(true);
    })
    .catch((err) => {
      alert('something went wrong!');
      console.error(err);
    });
  };

  if (reset) {
    window.location.reload();
  };

  if (flagHere && Cookies.get('authorized')) {
    return (!isEmpt) ? (
      <div className='App'>
        {statsOne &&
          <Stack spacing={3} sx={{my: 8}}>
            <Typography variant='h5'>Your statistics</Typography>
            <BarChart
              width={600}
              height={400}
              data={statsOne}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: -5,
              }}
            >
              <CartesianGrid strokeDasharray="0 0" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            <Grid sx={{pr: 3}} container justifyContent="flex-end">
              <Button size='large' onClick={() => resetStat()}>Reset</Button>
            </Grid>
          </Stack>
        }
        {!statsOne &&
          <Stack spacing={2} sx={{my: 10}}>
            <Typography variant='h6'>Loading...</Typography>
          </Stack>
        }
      </div>
    ) : (
      <div className='Applogo'>
        <Stack spacing={2} sx={{my: 10}}>
          <Typography variant='h6'>You have nothing to be shown so far...</Typography>
          <Typography variant='h6'>Play to update your statistics</Typography>
        </Stack>
      </div>
    )
  } else {
    return(
      <div className='Applogo'>Statistics page isn't available for you</div>
    )
  }
};

export default Statistics;