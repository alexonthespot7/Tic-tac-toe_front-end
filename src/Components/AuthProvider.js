import { useState, useEffect, useCallback } from "react";
import Cookies from 'js-cookie';

import AuthContext from "../contexts/AuthContext";

function AuthProvider(props) {
  const [winner, setWinner] = useState('');
  const [draw, setDraw] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [login, setLogin] = useState(null);
  const [turn, setTurn] = useState('Crosses');
  const [flag, setFlag] = useState(['', '', '', '', '', '', '', '', '']);
  const [cellColor, setColor] = useState(['#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb']);
  const [play, setPlay] = useState(true);
  const [difficulty, setDifficulty] = useState('Medium');
  const [bot, setBot] = useState(true);
  const [comp, setComp] = useState('Crosses');
  const [playWFriend, setFriend] = useState(false);
  const [home, setHome] = useState(false);

  const startAgain = () => {
    setWinner('');
    setTurn('Crosses');
    setFlag(['', '', '', '', '', '', '', '', '']);
    setColor(['#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb']);
    setPlay(true);
    setDraw(false);
    setBot(true);
  };

  const loadData = useCallback(async () => {
    const auhtorizedF = Cookies.get("authorized");
    const loginF = Cookies.get("login");
    setAuthorized(auhtorizedF);
    setLogin(loginF);
    setHome(window.location.pathname == '/');
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <AuthContext.Provider value={{ authorized,
      setAuthorized, login, setLogin, winner,
      setWinner, draw, setDraw, turn, setTurn,
      flag, setFlag, cellColor, setColor, play,
      setPlay, startAgain, difficulty, setDifficulty,
      bot, setBot, playWFriend, setFriend,
      comp, setComp, home, setHome }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;