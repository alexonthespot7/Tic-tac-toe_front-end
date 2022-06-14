import { useState, useEffect, useContext } from 'react';
import { XYPlot, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, VerticalBarSeries, VerticalBarSeriesCanvas, LabelSeries } from 'react-vis';
import Cookies from 'js-cookie';
import Axios from 'axios';

import AuthContext from '../contexts/AuthContext';
import { Typography, Stack } from '@mui/material';

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
            x: 'Crosses Wins',
            y: statData[0]
          },
          {
            x: 'Noughts Wins',
            y: statData[1]
          },
          {
            x: 'Draws',
            y: statData[2]
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
    return !isEmpt ? (
      <div className='Applogo'>
        <Stack spacing={2} sx={{my: 10}}>
          <Typography variant='h5'>Your statistics</Typography>
          <XYPlot xType="ordinal" width={400} height={400} xDistance={100}>
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
            <VerticalBarSeries data={statsOne} />
          </XYPlot>
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