import {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  useEffect,
} from "react";
import "./App.css";
import { Board, Keyboard } from "./components";
import { boardDefault, generateWordSet } from "./Words";
import GameOver from "./components/GameOver";

export interface IAppContext {
  board: string[][];
  setBoard: Dispatch<SetStateAction<string[][]>>;
  currentAttempt: { attempt: number; letterPos: number };
  setCurrentAttempt: Dispatch<
    SetStateAction<{
      attempt: number;
      letterPos: number;
    }>
  >;
  onSelectLetter: (keyVal: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  correctWord: string;
  setDisabledLetters: Dispatch<SetStateAction<string[]>>;
  disabledLetters: string[];
  setGameResults: Dispatch<
    SetStateAction<{
      gameOver: boolean;
      guessedWord: boolean;
    }>
  >;
  gameResults: {
    gameOver: boolean;
    guessedWord: boolean;
  };
}

export const AppContext = createContext<IAppContext>({
  board: boardDefault,
  setBoard: () => {},
  currentAttempt: { attempt: 0, letterPos: 0 },
  setCurrentAttempt: () => {},
  onSelectLetter: () => {},
  onDelete: () => {},
  onEnter: () => {},
  correctWord: "",
  setDisabledLetters: () => {},
  disabledLetters: [],
  gameResults: { gameOver: false, guessedWord: false },
  setGameResults: () => {},
});

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });
  const [wordSet, setWordSet] = useState(new Set());
  const [disabledLetters, setDisabledLetters] = useState<Array<string>>([]);
  const [gameResults, setGameResults] = useState({
    gameOver: false,
    guessedWord: false,
  });
  const [correctWord, setCorrectWord] = useState("");

  useEffect(() => {
    generateWordSet().then((words) => {
      if (!words.wordSet || !words.todaysWord) return;
      setWordSet(words.wordSet);
      setCorrectWord(words.todaysWord.toUpperCase());
    });
  }, []);

  const onSelectLetter = (keyVal: string) => {
    if (currentAttempt.letterPos > 4) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos] = keyVal;
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos + 1,
    });
  };
  const onDelete = () => {
    if (currentAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currentAttempt.attempt][currentAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrentAttempt({
      ...currentAttempt,
      letterPos: currentAttempt.letterPos - 1,
    });
  };
  const onEnter = () => {
    if (currentAttempt.letterPos !== 5) return;
    let currWord = "";
    for (let i = 0; i < 5; i++) {
      currWord += board[currentAttempt.attempt][i];
    }
    if (wordSet.has(currWord.toLowerCase())) {
      setCurrentAttempt({
        attempt: currentAttempt.attempt + 1,
        letterPos: 0,
      });
    } else {
      alert("Not Found!");
    }
    if (currWord === correctWord) {
      setGameResults({ guessedWord: true, gameOver: true });
      return;
    }
    if (currentAttempt.attempt === 5 && wordSet.has(currWord.toLowerCase())) {
      setGameResults({ gameOver: true, guessedWord: false });
    }
  };
  return (
    <>
      <div className="App">
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider
          value={{
            board,
            setBoard,
            currentAttempt,
            setCurrentAttempt,
            onDelete,
            onEnter,
            onSelectLetter,
            correctWord,
            disabledLetters,
            setDisabledLetters,
            gameResults,
            setGameResults,
          }}
        >
          <div className="game">
            <Board />
            {!gameResults.gameOver ? <Keyboard /> : <GameOver />}
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
