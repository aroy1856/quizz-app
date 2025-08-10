import { Dispatch } from "react";
import { QuizAppActionType } from "../type";

type StartScreenProps = {
  numQuestions: number;
  dispatch: Dispatch<QuizAppActionType>;
};

export default function StartScreen({
  numQuestions,
  dispatch,
}: StartScreenProps) {
  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Start Quiz
      </button>
    </div>
  );
}
