import { Dispatch } from "react";
import { QuizAppActionType } from "../type";

type NextButtonProps = {
  answer: null | number;
  dispatch: Dispatch<QuizAppActionType>;
  finish: boolean;
};

export default function NextButton({
  answer,
  finish,
  dispatch,
}: NextButtonProps) {
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
