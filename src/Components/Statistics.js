import { useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import Axios from 'axios';

import AuthContext from '../contexts/AuthContext';
import { Typography, Stack } from '@mui/material';

import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';


function Statistics() {
  const [flagHere, setFlagHere] = useState(false);
  const [statsOne, setStatsOne] = useState(null);
  const [isEmpt, setEmpt] = useState(false);
  const { startAgain } = useContext(AuthContext);
  
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
        console.log("Statistics page2 isn't available at the moment");
      }
    })
    .catch((err) => {
      console.log("Statistics page isn't available at the moment");
      console.error(err)
    });
  };

  useEffect(() => {
    console.log('sdsds');
    if (Cookies.get('authorized')) {
      loadStatsOne();
      startAgain();
      setFlagHere(true);
      console.log('aaaa');
    };    
  }, []);

  if (flagHere && Cookies.get('authorized')) {
    return (!isEmpt && statsOne) ? (
      <div className='App'>
        <Stack spacing={4} sx={{my: 8}}>
          <Typography variant='h5'>Your statistics</Typography>
          <BarChart
            width={600}
            height={400}
            data={statsOne}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </Stack>
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
      <div className='Applogo'>Loading...</div>
    )
  }
};

export default Statistics;