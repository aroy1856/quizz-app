import { Dispatch } from "react";
import { QuizAppActionType } from "../type";
import { useQuiz } from "../contexts/QuizContext";

export default function NextButton() {
  const { answer, index, questions, dispatch } = useQuiz();
  const finish = index === questions.length - 1;

  if (answer === null) return null;

  if (finish)
    return (
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish Quiz
      </button>
    );

  return (
    <button
      className="btn btn-ui"
      onClick={() => dispatch({ type: "nextQuestion" })}
    >
      Next
    </button>
  );
}
