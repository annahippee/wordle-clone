/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect } from "react";
import { AppContext } from "../App";

interface Props {
  letterPos: number;
  attemptVal: number;
}

function Letter({ letterPos, attemptVal }: Props) {
  const { board, correctWord, currentAttempt, setDisabledLetters } = useContext(
    AppContext
  );
  const letter = board[attemptVal][letterPos];

  const correct = correctWord[letterPos] === letter;
  const almost = !correct && letter !== "" && correctWord.includes(letter);
  const letterState =
    currentAttempt.attempt > attemptVal
      ? correct
        ? "correct"
        : almost
        ? "almost"
        : "error"
      : "error";

  useEffect(() => {
    if (letter !== "" && !correct && !almost) {
      setDisabledLetters((prev) => [...prev, letter]);
    }
  }, [currentAttempt.attempt]);
  return (
    <div className="letter" id={letterState}>
      {letter}
    </div>
  );
}

export default Letter;
