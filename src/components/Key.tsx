import { useContext } from "react";
import { AppContext } from "../App";

interface Props {
  keyVal: string;
  bigKey?: boolean;
}

function Key({ keyVal, bigKey }: Props) {
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
    <div id={bigKey ? "big" : ""} className="key" onClick={selectLetter}>
      {keyVal}
    </div>
  );
}

export default Key;
