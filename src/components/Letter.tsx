import { useContext } from "react";
import { AppContext } from "../App";

interface Props {
  letterPos: number;
  attemptVal: number;
}

function Letter({ letterPos, attemptVal }: Props) {
  const { board } = useContext(AppContext);
  const letter = board[attemptVal][letterPos];
  return <div className="letter">{letter}</div>;
}

export default Letter;
