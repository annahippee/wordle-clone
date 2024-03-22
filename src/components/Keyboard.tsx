import Key from "./Key";
import { useContext } from "react";
import { AppContext } from "../App";

const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

function Keyboard() {
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);

  const handleKeyboard = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      onEnter();
    } else if (event.key === "Backspace") {
      onDelete();
    } else {
      const eventKey = event.key.toUpperCase();
      keys1.forEach((key) => {
        if (eventKey === key) {
          onSelectLetter(key);
        }
      });
      keys2.forEach((key) => {
        if (eventKey === key) {
          onSelectLetter(key);
        }
      });
      keys3.forEach((key) => {
        if (eventKey === key) {
          onSelectLetter(key);
        }
      });
    }
  };

  return (
    <div className="keyboard" onKeyDown={handleKeyboard} tabIndex={0}>
      <div className="line1">
        {keys1.map((key, i) => (
          <Key key={i} keyVal={key} />
        ))}
      </div>
      <div className="line2">
        {keys2.map((key, i) => (
          <Key key={i} keyVal={key} />
        ))}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey={true} />
        {keys3.map((key, i) => (
          <Key key={i} keyVal={key} />
        ))}
        <Key keyVal={"DELETE"} bigKey={true} />
      </div>
    </div>
  );
}

export default Keyboard;
