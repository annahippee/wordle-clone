import { useState, createContext, SetStateAction, Dispatch } from "react";
import "./App.css";
import { Board, Keyboard } from "./components";
import { boardDefault } from "./Words";

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
}

export const AppContext = createContext<IAppContext>({
  board: boardDefault,
  setBoard: () => {},
  currentAttempt: { attempt: 0, letterPos: 0 },
  setCurrentAttempt: () => {},
  onSelectLetter: () => {},
  onDelete: () => {},
  onEnter: () => {},
});

function App() {
  const [board, setBoard] = useState(boardDefault);
  const [currentAttempt, setCurrentAttempt] = useState({
    attempt: 0,
    letterPos: 0,
  });

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
    setCurrentAttempt({
      attempt: currentAttempt.attempt + 1,
      letterPos: 0,
    });
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
          }}
        >
          <div className="game">
            <Board />
            <Keyboard />
          </div>
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
