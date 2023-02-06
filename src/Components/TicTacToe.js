import { Stack, Button, Paper, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import React from 'react';
import AuthContext from '../contexts/AuthContext';
import useMediaQuery from '../Hooks/useMediaQuery';

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function countEmpts(flag) {
  let empts = 0;
  for (let i = 0; i < 9; i++) {
    if (flag[i] == '') {
      empts++;
    };
  };
  return empts;
};

export default function TicTacToe() {
  const {
    winner, setWinner, turn, setTurn, flag,
    setFlag, cellColor, setColor, play, difficulty,
    bot, setBot, playWFriend, comp
  } = React.useContext(AuthContext);

  const checkWinnerMain = () => {
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
    setColor({ ...cellColor, [a]: '#46beff', [b]: '#46beff', [c]: '#46beff' });
  };

  const checkWinner = (flag) => {
    let check = false;

    if (flag[0] === flag[1] && flag[1] === flag[2] && flag[1] !== '') {
      check = true;
    } else if (flag[0] === flag[3] && flag[3] === flag[6] && flag[3] !== '') {
      check = true;

    } else if (flag[0] === flag[4] && flag[4] === flag[8] && flag[4] !== '') {
      check = true;

    } else if (flag[1] === flag[4] && flag[4] === flag[7] && flag[4] !== '') {
      check = true;

    } else if (flag[2] === flag[5] && flag[5] === flag[8] && flag[5] !== '') {
      check = true;

    } else if (flag[2] === flag[4] && flag[4] === flag[6] && flag[4] !== '') {
      check = true;

    } else if (flag[3] === flag[4] && flag[4] === flag[5] && flag[4] !== '') {
      check = true;

    } else if (flag[6] === flag[7] && flag[7] === flag[8] && flag[7] !== '') {
      check = true;

    };
    return check;
  };

  const doSecond = (init) => {
    let res = [];
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'X';
        let second = [];
        for (let b = 0; b < 9; b++) {
          if (init[b] == '') {
            init[b] = 'O';
            let third = [];
            for (let c = 0; c < 9; c++) {
              if (init[c] == '') {
                init[c] = 'X';
                if (checkWinner(init)) {
                  third.push(1);
                  init[c] = '';
                  if (c == 8) {
                    init[b] = '';
                    if (b == 8) {
                      init[a] = '';
                    };
                  };
                } else {
                  let fourth = [];
                  for (let d = 0; d < 9; d++) {
                    if (init[d] == '') {
                      init[d] = 'O';
                      if (checkWinner(init)) {
                        fourth.push(-1);
                        init[d] = '';
                        if (d == 8) {
                          init[c] = '';
                          if (c == 8) {
                            init[b] = '';
                            if (b == 8) {
                              init[a] = '';
                            };
                          };
                        };
                      } else {
                        let fifth = [];
                        for (let e = 0; e < 9; e++) {
                          if (init[e] == '') {
                            init[e] = 'X';
                            if (checkWinner(init)) {
                              fifth.push(1);
                              init[e] = '';
                              if (e == 8) {
                                init[d] = '';
                                if (d == 8) {
                                  init[c] = '';
                                  if (c == 8) {
                                    init[b] = '';
                                    if (b == 8) {
                                      init[a] = '';
                                    };
                                  };
                                };
                              };
                            } else {
                              let sixth = [];
                              for (let f = 0; f < 9; f++) {
                                if (init[f] == '') {
                                  init[f] = 'O';
                                  if (checkWinner(init)) {
                                    sixth.push(-1);
                                    init[f] = '';
                                    if (f == 8) {
                                      init[e] = '';
                                      if (e == 8) {
                                        init[d] = '';
                                        if (d == 8) {
                                          init[c] = '';
                                          if (c == 8) {
                                            init[b] = '';
                                            if (b == 8) {
                                              init[a] = '';
                                            };
                                          };
                                        };
                                      };
                                    };
                                  } else {
                                    for (let g = 0; g < 9; g++) {
                                      if (init[g] == '') {
                                        init[g] = 'X';
                                        if (checkWinner(init)) {
                                          sixth.push(1);
                                        } else {
                                          sixth.push(0);
                                        };
                                        init[g] = '';
                                        if (g == 8) {
                                          init[f] = '';
                                          if (f == 8) {
                                            init[e] = '';
                                            if (e == 8) {
                                              init[d] = '';
                                              if (d == 8) {
                                                init[c] = '';
                                                if (c == 8) {
                                                  init[b] = '';
                                                  if (b == 8) {
                                                    init[a] = '';
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        };
                                      } else {
                                        if (g == 8) {
                                          init[f] = '';
                                          if (f == 8) {
                                            init[e] = '';
                                            if (e == 8) {
                                              init[d] = '';
                                              if (d == 8) {
                                                init[c] = '';
                                                if (c == 8) {
                                                  init[b] = '';
                                                  if (b == 8) {
                                                    init[a] = '';
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        };
                                      };
                                    };
                                  };
                                } else {
                                  if (f == 8) {
                                    init[e] = '';
                                    if (e == 8) {
                                      init[d] = '';
                                      if (d == 8) {
                                        init[c] = '';
                                        if (c == 8) {
                                          init[b] = '';
                                          if (b == 8) {
                                            init[a] = '';
                                          };
                                        };
                                      };
                                    };
                                  };
                                };
                              };
                              fifth.push(Math.min(...sixth));
                            };
                          } else {
                            if (e == 8) {
                              init[d] = '';
                              if (d == 8) {
                                init[c] = '';
                                if (c == 8) {
                                  init[b] = '';
                                  if (b == 8) {
                                    init[a] = '';
                                  };
                                };
                              };
                            };
                          };
                        };
                        fourth.push(Math.max(...fifth));
                      }
                    } else {
                      if (d == 8) {
                        init[c] = '';
                        if (c == 8) {
                          init[b] = '';
                          if (b == 8) {
                            init[a] = '';
                          };
                        };
                      };
                    };
                  };
                  third.push(Math.min(...fourth));
                };
              } else {
                if (c == 8) {
                  init[b] = '';
                  if (b == 8) {
                    init[a] = '';
                  };
                };
              };
            };
            second.push(Math.max(...third));
          } else {
            if (b == 8) {
              init[a] = '';
            };
          };
        };
        res.push(Math.min(...second));
      };
    };

    return res;
  };

  const doThird = (init) => {
    let res = [];
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'X';
        if (checkWinner(init)) {
          res.push(1);
          init[a] = '';
        } else {
          let second = [];
          for (let b = 0; b < 9; b++) {
            if (init[b] == '') {
              init[b] = 'O';
              if (checkWinner(init)) {
                second.push(-1);
                init[b] = '';
                if (b == 8) {
                  init[a] = '';
                };
              } else {
                let third = [];
                for (let c = 0; c < 9; c++) {
                  if (init[c] == '') {
                    init[c] = 'X';
                    if (checkWinner(init)) {
                      third.push(1);
                      init[c] = '';
                      if (c == 8) {
                        init[b] = '';
                        if (b == 8) {
                          init[a] = '';
                        };
                      };
                    } else {
                      let fourth = [];
                      for (let d = 0; d < 9; d++) {
                        if (init[d] == '') {
                          init[d] = 'O';
                          if (checkWinner(init)) {
                            fourth.push(-1);
                            init[d] = '';
                            if (d == 8) {
                              init[c] = '';
                              if (c == 8) {
                                init[b] = '';
                                if (b == 8) {
                                  init[a] = '';
                                };
                              };
                            };
                          } else {
                            for (let e = 0; e < 9; e++) {
                              if (init[e] == '') {
                                init[e] = 'X';
                                if (checkWinner(init)) {
                                  fourth.push(1);
                                } else {
                                  fourth.push(0);
                                };
                                init[e] = '';
                                if (e == 8) {
                                  init[d] = '';
                                  if (d == 8) {
                                    init[c] = '';
                                    if (c == 8) {
                                      init[b] = '';
                                      if (b == 8) {
                                        init[a] = '';
                                      };
                                    };
                                  };
                                };
                              } else {
                                if (e == 8) {
                                  init[d] = '';
                                  if (d == 8) {
                                    init[c] = '';
                                    if (c == 8) {
                                      init[b] = '';
                                      if (b == 8) {
                                        init[a] = '';
                                      };
                                    };
                                  };
                                };
                              };
                            };
                          };
                        } else {
                          if (d == 8) {
                            init[c] = '';
                            if (c == 8) {
                              init[b] = '';
                              if (b == 8) {
                                init[a] = '';
                              };
                            };
                          };
                        };
                      };
                      third.push(Math.min(...fourth));
                    };
                  } else {
                    if (c == 8) {
                      init[b] = '';
                      if (b == 8) {
                        init[a] = '';
                      };
                    };
                  };
                };
                second.push(Math.max(...third));
              };
            } else {
              if (b == 8) {
                init[a] = '';
              };
            };
          };
          res.push(Math.min(...second));
        };
      };
    };
    return res;
  };

  const doFourth = (init) => {
    let res = []
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'X';
        if (checkWinner(init)) {
          res.push(1);
          init[a] = '';
        } else {
          let second = [];
          for (let b = 0; b < 9; b++) {
            if (init[b] == '') {
              init[b] = 'O';
              if (checkWinner(init)) {
                second.push(-1);
                init[b] = '';
                if (b == 8) {
                  init[a] = '';
                };
              } else {
                for (let c = 0; c < 9; c++) {
                  if (init[c] == '') {
                    init[c] = 'X';
                    if (checkWinner(init)) {
                      second.push(1);
                    } else {
                      second.push(0);
                    };
                    init[c] = '';
                    if (c == 8) {
                      init[b] = '';
                      if (b == 8) {
                        init[a] = '';
                      };
                    };
                  } else {
                    if (c == 8) {
                      init[b] = '';
                      if (b == 8) {
                        init[a] = '';
                      };
                    };
                  };
                };
              };
            } else {
              if (b == 8) {
                init[a] = '';
              };
            };
          };
          res.push(Math.min(...second));
        };
      };
    };
    return res;
  };

  const doFirstN = (init) => {
    let res = [];
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'O';
        let second = [];
        for (let b = 0; b < 9; b++) {
          if (init[b] == '') {
            init[b] = "X";
            let third = [];
            for (let c = 0; c < 9; c++) {
              if (init[c] == '') {
                init[c] = 'O';
                let fourth = [];
                for (let d = 0; d < 9; d++) {
                  if (init[d] == '') {
                    init[d] = 'X';
                    if (checkWinner(init)) {
                      fourth.push(-1);
                      init[d] = '';
                      if (d == 8) {
                        init[c] = '';
                        if (c == 8) {
                          init[b] = '';
                          if (b == 8) {
                            init[a] = '';
                          };
                        };
                      };
                    } else {
                      let fifth = [];
                      for (let e = 0; e < 9; e++) {
                        if (init[e] == '') {
                          init[e] = 'O';
                          if (checkWinner(init)) {
                            fifth.push(1);
                            init[e] = '';
                            if (e == 8) {
                              init[d] = '';
                              if (d == 8) {
                                init[c] = '';
                                if (c == 8) {
                                  init[b] = '';
                                  if (b == 8) {
                                    init[a] = '';
                                  };
                                };
                              };
                            };
                          } else {
                            let sixth = [];
                            for (let f = 0; f < 9; f++) {
                              if (init[f] == '') {
                                init[f] = 'X';
                                if (checkWinner(init)) {
                                  sixth.push(-1);
                                  init[f] = '';
                                  if (f == 8) {
                                    init[e] = '';
                                    if (e == 8) {
                                      init[d] = '';
                                      if (d == 8) {
                                        init[c] = '';
                                        if (c == 8) {
                                          init[b] = '';
                                          if (b == 8) {
                                            init[a] = '';
                                          };
                                        };
                                      };
                                    };
                                  };
                                } else {
                                  let seventh = [];
                                  for (let g = 0; g < 9; g++) {
                                    if (init[g] == '') {
                                      init[g] = 'O';
                                      if (checkWinner(init)) {
                                        seventh.push(1);
                                        init[g] = '';
                                        if (g == 8) {
                                          init[f] = '';
                                          if (f == 8) {
                                            init[e] = '';
                                            if (e == 8) {
                                              init[d] = '';
                                              if (d == 8) {
                                                init[c] = '';
                                                if (c == 8) {
                                                  init[b] = '';
                                                  if (b == 8) {
                                                    init[a] = '';
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        };
                                      } else {
                                        for (let h = 0; h < 9; h++) {
                                          if (init[h] == '') {
                                            init[h] = 'X';
                                            if (checkWinner(init)) {
                                              seventh.push(-1);
                                            } else {
                                              seventh.push(0);
                                            };
                                            init[h] = '';
                                            if (h == 8) {
                                              init[g] = '';
                                              if (g == 8) {
                                                init[f] = '';
                                                if (f == 8) {
                                                  init[e] = '';
                                                  if (e == 8) {
                                                    init[d] = '';
                                                    if (d == 8) {
                                                      init[c] = '';
                                                      if (c == 8) {
                                                        init[b] = '';
                                                        if (b == 8) {
                                                          init[a] = '';
                                                        };
                                                      };
                                                    };
                                                  };
                                                };
                                              };
                                            };
                                          } else {
                                            if (h == 8) {
                                              init[g] = '';
                                              if (g == 8) {
                                                init[f] = '';
                                                if (f == 8) {
                                                  init[e] = '';
                                                  if (e == 8) {
                                                    init[d] = '';
                                                    if (d == 8) {
                                                      init[c] = '';
                                                      if (c == 8) {
                                                        init[b] = '';
                                                        if (b == 8) {
                                                          init[a] = '';
                                                        };
                                                      };
                                                    };
                                                  };
                                                };
                                              };
                                            };
                                          };
                                        };
                                      };
                                    } else {
                                      if (g == 8) {
                                        init[f] = '';
                                        if (f == 8) {
                                          init[e] = '';
                                          if (e == 8) {
                                            init[d] = '';
                                            if (d == 8) {
                                              init[c] = '';
                                              if (c == 8) {
                                                init[b] = '';
                                                if (b == 8) {
                                                  init[a] = '';
                                                };
                                              };
                                            };
                                          };
                                        };
                                      };
                                    };
                                  };
                                  sixth.push(Math.max(...seventh));
                                };
                              } else {
                                if (f == 8) {
                                  init[e] = '';
                                  if (e == 8) {
                                    init[d] = '';
                                    if (d == 8) {
                                      init[c] = '';
                                      if (c == 8) {
                                        init[b] = '';
                                        if (b == 8) {
                                          init[a] = '';
                                        };
                                      };
                                    };
                                  };
                                };
                              };
                            };
                            fifth.push(Math.min(...sixth));
                          };
                        } else {
                          if (e == 8) {
                            init[d] = '';
                            if (d == 8) {
                              init[c] = '';
                              if (c == 8) {
                                init[b] = '';
                                if (b == 8) {
                                  init[a] = '';
                                };
                              };
                            };
                          };
                        };
                      };
                      fourth.push(Math.max(...fifth));
                    };
                  } else {
                    if (d == 8) {
                      init[c] = '';
                      if (c == 8) {
                        init[b] = '';
                        if (b == 8) {
                          init[a] = '';
                        };
                      };
                    };
                  };
                };
                third.push(Math.min(...fourth));
              } else {
                if (c == 8) {
                  init[b] = '';
                  if (b == 8) {
                    init[a] = '';
                  };
                };
              };
            };
            second.push(Math.max(...third));
          } else {
            if (b == 8) {
              init[a] = '';
            };
          };
        };
        res.push(Math.min(...second));
      };
    };
    return res;
  };

  const doSecondN = (init) => {
    let res = [];
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'O';
        let second = [];
        for (let b = 0; b < 9; b++) {
          if (init[b] == '') {
            init[b] = "X";
            if (checkWinner(init)) {
              second.push(-1);
              init[b] = '';
              if (b == 8) {
                init[a] = '';
              };
            } else {
              let third = [];
              for (let c = 0; c < 9; c++) {
                if (init[c] == '') {
                  init[c] = 'O';
                  if (checkWinner(init)) {
                    third.push(1);
                    init[c] = '';
                    if (c == 8) {
                      init[b] = '';
                      if (b == 8) {
                        init[a] = '';
                      };
                    };
                  } else {
                    let fourth = [];
                    for (let d = 0; d < 9; d++) {
                      if (init[d] == '') {
                        init[d] = 'X';
                        if (checkWinner(init)) {
                          fourth.push(-1);
                          init[d] = '';
                          if (d == 8) {
                            init[c] = '';
                            if (c == 8) {
                              init[b] = '';
                              if (b == 8) {
                                init[a] = '';
                              };
                            };
                          };
                        } else {
                          let fifth = [];
                          for (let e = 0; e < 9; e++) {
                            if (init[e] == '') {
                              init[e] = 'O';
                              if (checkWinner(init)) {
                                fifth.push(1);
                                init[e] = '';
                                if (e == 8) {
                                  init[d] = '';
                                  if (d == 8) {
                                    init[c] = '';
                                    if (c == 8) {
                                      init[b] = '';
                                      if (b == 8) {
                                        init[a] = '';
                                      };
                                    };
                                  };
                                };
                              } else {
                                for (let f = 0; f < 9; f++) {
                                  if (init[f] == '') {
                                    init[f] = 'X';
                                    if (checkWinner(init)) {
                                      fifth.push(-1);
                                    } else {
                                      fifth.push(0);
                                    };
                                    init[f] = '';
                                    if (f == 8) {
                                      init[e] = '';
                                      if (e == 8) {
                                        init[d] = '';
                                        if (d == 8) {
                                          init[c] = '';
                                          if (c == 8) {
                                            init[b] = '';
                                            if (b == 8) {
                                              init[a] = '';
                                            };
                                          };
                                        };
                                      };
                                    };
                                  } else {
                                    if (f == 8) {
                                      init[e] = '';
                                      if (e == 8) {
                                        init[d] = '';
                                        if (d == 8) {
                                          init[c] = '';
                                          if (c == 8) {
                                            init[b] = '';
                                            if (b == 8) {
                                              init[a] = '';
                                            };
                                          };
                                        };
                                      };
                                    };
                                  };
                                };
                              };
                            } else {
                              if (e == 8) {
                                init[d] = '';
                                if (d == 8) {
                                  init[c] = '';
                                  if (c == 8) {
                                    init[b] = '';
                                    if (b == 8) {
                                      init[a] = '';
                                    };
                                  };
                                };
                              };
                            };
                          };
                          fourth.push(Math.max(...fifth));
                        };
                      } else {
                        if (d == 8) {
                          init[c] = '';
                          if (c == 8) {
                            init[b] = '';
                            if (b == 8) {
                              init[a] = '';
                            };
                          };
                        };
                      };
                    };
                    third.push(Math.min(...fourth));
                  };
                } else {
                  if (c == 8) {
                    init[b] = '';
                    if (b == 8) {
                      init[a] = '';
                    };
                  };
                };
              };
              second.push(Math.max(...third));
            };
          } else {
            if (b == 8) {
              init[a] = '';
            };
          };
        };
        res.push(Math.min(...second));
      };
    };
    return res;
  };

  const doThirdN = (init) => {
    let res = [];
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'O';
        if (checkWinner(init)) {
          res.push(1);
          init[a] = '';
        } else {
          let second = [];
          for (let b = 0; b < 9; b++) {
            if (init[b] == '') {
              init[b] = 'X';
              if (checkWinner(init)) {
                second.push(-1);
                init[b] = '';
                if (b == 8) {
                  init[a] = '';
                };
              } else {
                let third = [];
                for (let c = 0; c < 9; c++) {
                  if (init[c] == '') {
                    init[c] = 'O';
                    if (checkWinner(init)) {
                      third.push(1);
                      init[c] = '';
                      if (c == 8) {
                        init[b] = '';
                        if (b == 8) {
                          init[a] = '';
                        };
                      };
                    } else {
                      for (let d = 0; d < 9; d++) {
                        if (init[d] == '') {
                          init[d] = 'X';
                          if (checkWinner(init)) {
                            third.push(-1);
                          } else {
                            third.push(0);
                          };
                          init[d] = '';
                          if (d == 8) {
                            init[c] = '';
                            if (c == 8) {
                              init[b] = '';
                              if (b == 8) {
                                init[a] = '';
                              };
                            };
                          };
                        } else {
                          if (d == 8) {
                            init[c] = '';
                            if (c == 8) {
                              init[b] = '';
                              if (b == 8) {
                                init[a] = '';
                              };
                            };
                          };
                        };
                      };
                    };
                  } else {
                    if (c == 8) {
                      init[b] = '';
                      if (b == 8) {
                        init[a] = '';
                      };
                    };
                  };
                };
                second.push(Math.max(...third));
              };
            } else {
              if (b == 8) {
                init[a] = '';
              };
            };
          };
          res.push(Math.min(...second));
        };
      };
    };
    return res;
  };

  const doFourthN = (init) => {
    let res = [];
    for (let a = 0; a < 9; a++) {
      if (init[a] == '') {
        init[a] = 'O';
        if (checkWinner(init)) {
          res.push(1);
          init[a] = '';
        } else {
          for (let b = 0; b < 9; b++) {
            if (init[b] == '') {
              init[b] = 'X';
              if (checkWinner(init)) {
                res.push(-1);
              } else {
                res.push(0);
              };
              init[b] = '';
              if (b == 8) {
                init[a] = '';
              };
            } else {
              if (b == 8) {
                init[a] = '';
              };
            };
          };
        };
      };
    };
    return res;
  };

  React.useEffect(() => {
    checkWinnerMain();
  }, [flag]);

  const handleClick = (num) => {
    if (turn === 'Crosses') {
      setFlag({ ...flag, [num]: 'X' });
      setTurn('Noughts');
      if (comp == 'Noughts' && !playWFriend) {
        setBot(true);
      };
    } else {
      setFlag({ ...flag, [num]: 'O' });
      setTurn('Crosses');
      if (comp == 'Crosses' && !playWFriend) {
        setBot(true);
      };
    };
  };

  if (countEmpts(flag) == 9 && !play && bot && comp == "Crosses" && !playWFriend) {
    let turn;
    if (difficulty == 'Easy') {
      turn = getRandomInRange(0, 8);
    } else if (difficulty == 'Medium') {
      let prob = getRandomInRange(1, 3);
      if (prob == 1) {
        turn = 4;
      } else {
        let adds = prob % 2;
        let vars = [0 + adds, 2 + adds, 6 - adds, 8 - adds];
        let choose = getRandomInRange(0, vars.length - 1);
        turn = vars[choose];
      };
    } else {
      let prob = getRandomInRange(1, 3);
      if (prob == 1) {
        let vars = [0, 2, 6, 8];
        let choose = getRandomInRange(0, vars.length - 1);
        turn = vars[choose];
      } else {
        turn = 4;
      };
    };

    handleClick(turn);
    setBot(false);
  };

  if (([8, 6, 4, 2].indexOf(countEmpts(flag)) != -1) && bot && !checkWinner(flag) && comp == "Noughts" && !playWFriend) {
    let bro = [];

    for (let i = 0; i < 9; i++) {
      if (flag[i] == '') {
        bro.push(i);
      };
    };

    let turn;

    if (difficulty == 'Easy') {
      turn = getRandomInRange(0, bro.length - 1);
      turn = bro[turn];
    } else if (difficulty == 'Medium') {
      let init = [];
      for (let i = 0; i < 9; i++) {
        init.push(flag[i]);
      };

      let res;

      if (countEmpts(flag) == 8) {
        res = doFirstN(init);
      } else if (countEmpts(flag) == 6) {
        res = doSecondN(init);
      } else if (countEmpts(flag) == 4) {
        res = doThirdN(init);
      } else {
        res = doFourthN(init);
      };

      let max = -2;
      let wins = [];
      let draws = [];
      let looses = [];

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] > max) {
          max = res[i];
        };
      };

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] == max) {
          wins.push(i);
        } else if (res[i] == 0) {
          draws.push(i);
        } else {
          looses.push(i);
        };
      };

      let prob = getRandomInRange(1, 3);

      let last;
      if (prob == 1) {
        if (draws.length != 0 && looses.length != 0) {
          let choose = getRandomInRange(1, 3);
          if (choose != 1) {
            last = getRandomInRange(0, draws.length - 1);
            turn = bro[draws[last]];
          } else {
            last = getRandomInRange(0, looses.length - 1);
            turn = bro[looses[last]];
          };
        } else if (draws.length != 0) {
          last = getRandomInRange(0, draws.length - 1);
          turn = bro[draws[last]];
        } else if (looses.length != 0) {
          last = getRandomInRange(0, looses.length - 1);
          turn = bro[looses[last]];
        } else {
          last = getRandomInRange(0, wins.length - 1);
          turn = bro[wins[last]];
        }
      } else {
        last = getRandomInRange(0, wins.length - 1);
        turn = bro[wins[last]];
      }
    } else {
      let init = [];
      for (let i = 0; i < 9; i++) {
        init.push(flag[i]);
      };

      let res;

      if (countEmpts(flag) == 8) {
        res = doFirstN(init);
      } else if (countEmpts(flag) == 6) {
        res = doSecondN(init);
      } else if (countEmpts(flag) == 4) {
        res = doThirdN(init);
      } else {
        res = doFourthN(init);
      };

      let max = -2;
      let wins = [];
      let draws = [];
      let looses = [];

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] > max) {
          max = res[i];
        };
      };

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] == max) {
          wins.push(i);
        } else if (res[i] == 0) {
          draws.push(i);
        } else {
          looses.push(i);
        };
      };

      let last = getRandomInRange(0, wins.length - 1);
      turn = bro[wins[last]];
    };

    handleClick(turn);
    setBot(false);
  };


  if (([3, 5, 7].indexOf(countEmpts(flag)) != -1) && bot && !checkWinner(flag) && comp == "Crosses" && !playWFriend) {

    let bro = [];

    for (let i = 0; i < 9; i++) {
      if (flag[i] == '') {
        bro.push(i);
      };
    };

    let turn;

    if (difficulty == 'Easy') {
      turn = getRandomInRange(0, bro.length - 1);
      turn = bro[turn];
    } else if (difficulty == 'Medium') {
      let init = [];
      for (let i = 0; i < 9; i++) {
        init.push(flag[i]);
      };

      let res;

      if (countEmpts(flag) == 7) {
        res = doSecond(init);
      } else if (countEmpts(flag) == 5) {
        res = doThird(init);
      } else {
        res = doFourth(init);
      };

      let max = -2;
      let wins = [];
      let draws = [];
      let looses = [];

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] > max) {
          max = res[i];
        };
      };

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] == max) {
          wins.push(i);
        } else if (res[i] == 0) {
          draws.push(i);
        } else {
          looses.push(i);
        };
      };

      let prob = getRandomInRange(1, 3);

      let last;
      if (prob == 1) {
        if (draws.length != 0 && looses.length != 0) {
          let choose = getRandomInRange(1, 3);
          if (choose != 1) {
            last = getRandomInRange(0, draws.length - 1);
            turn = bro[draws[last]];
          } else {
            last = getRandomInRange(0, looses.length - 1);
            turn = bro[looses[last]];
          };
        } else if (draws.length != 0) {
          last = getRandomInRange(0, draws.length - 1);
          turn = bro[draws[last]];
        } else if (looses.length != 0) {
          last = getRandomInRange(0, looses.length - 1);
          turn = bro[looses[last]];
        } else {
          last = getRandomInRange(0, wins.length - 1);
          turn = bro[wins[last]];
        }
      } else {
        last = getRandomInRange(0, wins.length - 1);
        turn = bro[wins[last]];
      }
    } else {
      let init = [];
      for (let i = 0; i < 9; i++) {
        init.push(flag[i]);
      };

      let res;

      if (countEmpts(flag) == 7) {
        res = doSecond(init);
      } else if (countEmpts(flag) == 5) {
        res = doThird(init);
      } else {
        res = doFourth(init);
      };

      let max = -2;
      let wins = [];
      let draws = [];
      let looses = [];

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] > max) {
          max = res[i];
        };
      };

      for (let i = 0; i < countEmpts(flag); i++) {
        if (res[i] == max) {
          wins.push(i);
        } else if (res[i] == 0) {
          draws.push(i);
        } else {
          looses.push(i);
        };
      };

      let last = getRandomInRange(0, wins.length - 1);
      turn = bro[wins[last]];
    };

    handleClick(turn);
    setBot(false);
  };

  if (countEmpts(flag) == 1 && bot && !checkWinner(flag) && comp == "Crosses" && !playWFriend) {
    let turn;
    for (let i = 0; i < 9; i++) {
      if (flag[i] == '') {
        turn = i;
      };
    };
    handleClick(turn);
    setBot(false);
  };

  function SpaceHandler(props) {
    if (flag[props.n] === '') {
      return (
        <Button disabled={(winner !== '') || play} onClick={() => handleClick(props.n)} sx={{ height: matchesXS ? 100.2 : 82.2, width: matchesXS ? 99.9499 : 82.2, borderRadius: 0, bgcolor: '#fff' }} variant='contained'></Button>
      )
    } else {
      return (
        <Paper square sx={{ height: matchesXS ? 100.2 : 82.2, width: matchesXS ? 100 : 82.2, bgcolor: cellColor[props.n] }} variant='contained'>
          <Typography sx={{ py: matchesXS ? 4.01 : 3.33 }} variant='h4'>
            {flag[props.n]}
          </Typography>
        </Paper>
      );
    };
  };

  const matchesXS = useMediaQuery("(min-width: 350px)");

  if (matchesXS) {
    return (
      <>
        <Stack
          sx={{
            bgcolor: '#fff',
            opacity: '85%',
            border: 1,
            height: 303.1,
            width: 301.42,
            margin: 'auto',
            boxShadow: 3,
            my: 10
          }}
          divider={<Divider sx={{ bgcolor: '#000' }} flexItem />}
        >
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{ bgcolor: '#000' }} flexItem />}>
            <SpaceHandler n={0} />
            <SpaceHandler n={1} />
            <SpaceHandler n={2} />
          </Stack>
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{ bgcolor: '#000' }} flexItem />}>
            <SpaceHandler n={3} />
            <SpaceHandler n={4} />
            <SpaceHandler n={5} />
          </Stack>
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{ bgcolor: '#000' }} flexItem />}>
            <SpaceHandler n={6} />
            <SpaceHandler n={7} />
            <SpaceHandler n={8} />
          </Stack>
        </Stack>
      </>
    );
  } else {
    return (
      <div>
        <Stack
          sx={{
            mt: 1,
            bgcolor: '#fff',
            opacity: '85%',
            border: 1,
            height: 249,
            width: 249,
            margin: 'auto',
            boxShadow: 3,
            mb: 2
          }}
          divider={<Divider sx={{ bgcolor: '#000' }} flexItem />}
        >
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{ bgcolor: '#000' }} flexItem />}>
            <SpaceHandler n={0} />
            <SpaceHandler n={1} />
            <SpaceHandler n={2} />
          </Stack>
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{ bgcolor: '#000' }} flexItem />}>
            <SpaceHandler n={3} />
            <SpaceHandler n={4} />
            <SpaceHandler n={5} />
          </Stack>
          <Stack direction='row' divider={<Divider orientation='vertical' sx={{ bgcolor: '#000' }} flexItem />}>
            <SpaceHandler n={6} />
            <SpaceHandler n={7} />
            <SpaceHandler n={8} />
          </Stack>
        </Stack>
      </div>
    );
  }
}