import { Dispatch } from "react";
import Options from "./Options";
import { QuestionType, QuizAppActionType } from "../type";
import { useQuiz } from "../contexts/QuizContext";

export default function Question() {
  const { questions, index, answer, dispatch } = useQuiz();
  const question = questions[index];

  return (
    <div>
      <h4>{question.question}</h4>
      <Options questions={question} dispatch={dispatch} answer={answer} />
    </div>
  );
}
