import { Dispatch } from "react";
import { QuizAppActionType } from "../type";

type FinishScreenProps = {
  points: number;
  totalPoints: number;
  highScore: number;
  dispatch: Dispatch<QuizAppActionType>;
};

export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}: FinishScreenProps) {
  const percentage = Math.round((points / totalPoints) * 100);

  return (
    <>
      <p className="result">
        You have scored <strong>{points}</strong> out of{" "}
        <strong>{totalPoints}</strong> ({percentage}%)!
      </p>
      <p className="highscore">
        Your high score is <strong>{highScore}</strong> points.
      </p>

      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "reset" })}
      >
        Restart Quiz
      </button>
    </>
  );
}
