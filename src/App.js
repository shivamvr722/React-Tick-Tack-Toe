import './App.css'
import { useState } from "react";

function Square({value, onSquareClick}){
  return(
    <button className="square" onClick={onSquareClick}>{value}</button>
  );
}

function Board({xIsNext, square, onPlay}){
  function clicks(i){
    if (square[i] || winner(square)){
      return;
    }
    const nextSquares = square.slice();
    if (xIsNext){
      nextSquares[i] = "X"
    } else {
      nextSquares[i] = "O"
    }
    onPlay(nextSquares);
  }

  const wins = winner(square);
  let status;
  if (wins) {
    status = "Winner: " + wins;
  } else {
    status = "Next Player: " + (xIsNext ? "X" : "O");
  }

  return(
    <center>
      <div className='status'><h3>{status}</h3></div>
        <div className='container'>
          <div className="boardRow">
            <Square value={square[0]} onSquareClick={() => clicks(0)} />
            <Square value={square[1]} onSquareClick={() => clicks(1)} />
            <Square value={square[2]} onSquareClick={() => clicks(2)} />
          </div>
          <div className="boardRow">
            <Square value={square[3]} onSquareClick={() => clicks(3)} />
            <Square value={square[4]} onSquareClick={() => clicks(4)} />
            <Square value={square[5]} onSquareClick={() => clicks(5)} />
          </div>
          <div className="boardRow">
            <Square value={square[6]} onSquareClick={() => clicks(6)} />
            <Square value={square[7]} onSquareClick={() => clicks(7)} />
            <Square value={square[8]} onSquareClick={() => clicks(8)} />
          </div>
      </div>
    </center>
  );
}


export default function Game(){
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquare = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((square, move) => {
    let description;
    if (move > 0) {
      description = "Go to move " + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={()=>jumpTo(move)} > {description}</button>
      </li>
    );
  });

  return(
    <div className='game'>
      <div className='game-board'>
        <Board xIsNext={xIsNext} square={currentSquare} onPlay={handlePlay} />
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}



function winner(square){
  const winnerTrack = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [6,4,2]
  ];

  for (let i=0; i<winnerTrack.length; i++){
    const [a, b, c] = winnerTrack[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null;
}
