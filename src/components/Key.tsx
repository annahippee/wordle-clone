import { useContext } from "react";
import { AppContext } from "../App";

interface Props {
  keyVal: string;
  bigKey?: boolean;
  disabled: boolean;
}

function Key({ keyVal, bigKey, disabled }: Props) {
  const { onEnter, onDelete, onSelectLetter } = useContext(AppContext);

  function selectLetter() {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  }
  return (
    <div
      id={bigKey ? "big" : disabled ? "disabled" : ""}
      className="key"
      onClick={selectLetter}
    >
      {keyVal}
    </div>
  );
}

export default Key;
