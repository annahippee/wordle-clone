import { useState, createContext, SetStateAction, Dispatch } from "react";
import "./App.css";
import { Board, Keyboard } from "./components";
import { boardDefault } from "./Words";

export interface IAppContext {
  board: string[][];
  setBoard: Dispatch<SetStateAction<string[][]>>;
}

export const AppContext = createContext<IAppContext>({
  board: boardDefault,
  setBoard: () => {},
});

function App() {
  const [board, setBoard] = useState(boardDefault);
  return (
    <>
      <div className="App">
        <nav>
          <h1>Wordle</h1>
        </nav>
        <AppContext.Provider value={{ board, setBoard }}>
          <Board />
          <Keyboard />
        </AppContext.Provider>
      </div>
    </>
  );
}

export default App;
