import wordBank from "../wordle-bank.txt";
export const boardDefault = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

interface IWordSetType {
  wordSet: Set<string>;
  todaysWord: string;
}

export const generateWordSet = async (): Promise<IWordSetType> => {
  let wordSet;
  let todaysWord;
  await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
      const wordArr: string[] = result.split("\n");
      todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)];
      wordSet = new Set(wordArr);
    });
  return ({ wordSet, todaysWord } as unknown) as Promise<IWordSetType>;
};
