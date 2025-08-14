import { Dispatch } from "react";
import { QuizAppActionType } from "../type";
import { useQuiz } from "../contexts/QuizContext";

export default function FinishScreen() {
  const { points, questions, highScore, dispatch } = useQuiz();

  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );
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
