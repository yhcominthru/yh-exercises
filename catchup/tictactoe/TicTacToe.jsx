import { useReducer } from "react";

const initialState = {
  board: [null, null, null, null, null, null, null, null, null],
  turn: "X",
  winner: null,
  score: { X: 0, O: 0 },
};

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6],             // diagonals
];

function checkWinner(board) {
  for (const [a, b, c] of winningCombinations) {
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return board.every((cell) => cell !== null) ? "draw" : null;
}

function reducer(state, action) {
  switch (action?.type?.toLowerCase()) {
    case "place_mark": {
      if (state.winner || state.board[action.index]) return state;
      const newBoard = state.board.map((item, i) =>
        i === action.index ? state.turn : item
      );
      const winner = checkWinner(newBoard);
      return {
        ...state,
        board: newBoard,
        turn: state.turn === "X" ? "O" : "X",
        winner: winner,
        score:
          winner && winner !== "draw"
            ? {
                ...state.score,
                [winner]: state.score[winner] + 1,
              }
            : state.score,
      };
    }
    case "reset_game":
      return { ...initialState, score: state.score };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

function TicTacToe() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-6">
      <h1 className="text-3xl font-bold">Tic Tac Toe</h1>

      <div className="flex gap-8 text-lg">
        <span>X: {state.score.X}</span>
        <span>O: {state.score.O}</span>
      </div>

      {state.winner ? (
        <p className="text-xl font-semibold">
          {state.winner === "draw" ? "It's a draw!" : `${state.winner} wins!`}
        </p>
      ) : (
        <p className="text-lg">Turn: {state.turn}</p>
      )}

      <div className="grid grid-cols-3 gap-2">
        {state.board.map((cell, index) => (
          <button
            key={index}
            className="btn w-24 h-24 text-2xl"
            onClick={() => dispatch({ type: "PLACE_MARK", index })}
            disabled={!!cell || !!state.winner}
          >
            {cell}
          </button>
        ))}
      </div>

      <button
        className="btn btn-neutral"
        onClick={() => dispatch({ type: "RESET_GAME" })}
      >
        Reset
      </button>
    </div>
  );
}

export default TicTacToe;
