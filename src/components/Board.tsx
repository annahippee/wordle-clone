import { useContext } from "react";
import Letter from "./Letter";
import { AppContext } from "../App";

function Board() {
  const { board } = useContext(AppContext);

  return (
    <div className="board">
      {board.map((row, i) => (
        <div key={i} className="row">
          {row.map((letter, j) => (
            <Letter key={j} attemptVal={i} letterPos={j} />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
