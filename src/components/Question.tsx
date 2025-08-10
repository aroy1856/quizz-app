import { Dispatch } from "react";
import Options from "./Options";
import { QuestionType, QuizAppActionType } from "../type";

type QuestionProps = {
  question: QuestionType;
  dispatch: Dispatch<QuizAppActionType>;
  answer?: number | null;
};

export default function Question({
  question,
  dispatch,
  answer,
}: QuestionProps) {
  return (
    <div>
      <h4>{question.question}</h4>
      <Options questions={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
