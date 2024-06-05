import React, { useEffect, useState } from "react";
import { pattern } from "./Helpers/Pattern";
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function App() {
  const [board, setBoard] = useState(["", "", "", "", "", "", "", "", ""]);
  const [player, setPlayer] = useState(false);
  const [result, setResult] = useState({ winner: "none" });
  const { width, height } = useWindowSize()

  useEffect(() => {
    checkWin();
  }, [board]);

  const handleValue = (index) => {
    let newBoard = [...board];
    if (newBoard[index] !== "") {
      return;
    }
    if (result.winner === "none") {
      newBoard[index] = player ? "O" : "X";
      setBoard(newBoard);
      setPlayer(!player);
      checkWin();
    }
  };
  const checkWin = () => {
    pattern.forEach((currentPattern) => {
      if (
        board[currentPattern[0]] === "X" &&
        board[currentPattern[1]] === "X" &&
        board[currentPattern[2]] === "X"
      ) {
        setResult({ winner: "X" });
      }
      if (
        board[currentPattern[0]] === "O" &&
        board[currentPattern[1]] === "O" &&
        board[currentPattern[2]] === "O"
      ) {
        setResult({ winner: "O" });
      }
    });
    if (!board.includes("") && result.winner === "none") {
      setResult({ winner: "ties" });
    }
  };
  const handleRestart = () => {
    setBoard(["", "", "", "", "", "", "", "", ""]);
    setResult({ winner: "none" });
  };
  return (
    <div className="w-[100vw] h-[100vh] bg-blue-300 flex justify-center items-center flex-col">
      <div className="w-[400px] flex justify-center items-center mb-4">
        {result.winner === "none" && (
          <h2 className="font-bold text-xl">
            Player <span className="text-2xl">'{player ? "O" : "X"}'</span> Turn
          </h2>
        )}
        {(result.winner === "X" || result.winner === "O") && (<>
          <Confetti width={width} height={height} />
          <h2 className="font-bold text-xl">
            Player <span className="text-2xl">{result.winner}</span> is Winner
          </h2>
        </>
        )}
        {result.winner === 'ties' &&<h2 className="font-bold text-xl">
            Game <span className="text-2xl">{(result.winner).toUpperCase()}</span> !!!
          </h2> }
      </div>
      <div className="w-[400px] h-[400px] bg-blue-500 ">
        <div className="w-full h-full grid grid-cols-3 items-center pl-3 py-2">
          {board.map((value, index) => (
            <div
              className={`${
                board[index] === "O" && "bg-red-400" 
              } hover:bg-blue-300 w-[120px] h-[120px] bg-blue-400 cursor-pointer items-center flex justify-center text-4xl`}
              key={index}
              onClick={() => {
                handleValue(index);
              }}
            >
              {value}
            </div>
          ))}
        </div>
      </div>
      <button
        className=" w-[120px] bg-blue-600 p-2 text-white mt-4 rounded-lg hover:bg-blue-500"
        onClick={() => {
          handleRestart();
        }}
      >
        Restart
      </button>
    </div>
  );
}

export default App;
