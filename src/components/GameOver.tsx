import { useContext } from "react";
import { AppContext } from "../App";
function GameOver() {
  const { gameResults, correctWord, currentAttempt } = useContext(AppContext);

  return (
    <div className="gameOver">
      <h3>
        {gameResults.guessedWord
          ? "You guessed the word!"
          : "You lost! Better luck next time!"}
      </h3>
      <h1>Correct: {correctWord}</h1>
      {gameResults.guessedWord && (
        <h3>You guessed in {currentAttempt.attempt} attempts</h3>
      )}
    </div>
  );
}

export default GameOver;
