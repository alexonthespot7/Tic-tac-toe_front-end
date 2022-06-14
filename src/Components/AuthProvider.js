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

  const startAgain = () => {
    setWinner('');
    setTurn('Crosses');
    setFlag(['', '', '', '', '', '', '', '', '']);
    setColor(['#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb', '#dae7eb']);
    setPlay(true);
    setDraw(false);
  };

  const loadData = useCallback(async () => {
    const auhtorizedF = Cookies.get("authorized");
    const loginF = Cookies.get("login");
    setAuthorized(auhtorizedF);
    setLogin(loginF);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <AuthContext.Provider value={{ authorized,
      setAuthorized, login, setLogin, winner,
      setWinner, draw, setDraw, turn, setTurn,
      flag, setFlag, cellColor, setColor, play,
      setPlay, startAgain }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;