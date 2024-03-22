import Key from "./Key";

function Keyboard() {
  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];
  return (
    <div className="keyboard">
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
