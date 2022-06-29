import { Typography } from "@mui/material";
import { useContext } from "react";
import AuthContext from "../contexts/AuthContext";

export default function Results() {
    const { winner, draw, setDraw, turn, flag, playWFriend } = useContext(AuthContext);
    
    if (winner !== '') {
      return (
        <Typography align='center' variant='h5'>Game Over! {winner} won!</Typography>
      );
    } else {
      let check = true;
      for (let i in flag) {
        if (flag[i] === '') {
          check = false;
          break;
        }
      }
      if (check) {
        setDraw(check);
      }
      if (draw) {
        return (
          <Typography align='center' variant='h5'>Game Over! Draw!</Typography>
        );
      } else {
        return (
          <div>
            {!playWFriend && <Typography color="#000" align='left' variant='h6'>You are playing for {turn}!</Typography>}
            {playWFriend && <Typography color="#000" align='left' variant='h6'>{turn}, please make your turn...</Typography>}
          </div>
        );
      }
    }
}