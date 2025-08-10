import { Dispatch } from "react";
import { QuestionType, QuizAppActionType } from "../type";

type OptionsProps = {
  questions: QuestionType;
  dispatch: Dispatch<QuizAppActionType>;
  answer?: number | null;
};

export default function Options({ questions, answer, dispatch }: OptionsProps) {
  return (
    <div className="options">
      {questions.options.map((option, index) => (
        <button
          className={`btn btn-option ${answer === index ? "answer" : ""} ${
            answer !== null
              ? questions.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          }`}
          disabled={answer !== null}
          onClick={() => dispatch({ type: "answer", payload: index })}
          key={option}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
