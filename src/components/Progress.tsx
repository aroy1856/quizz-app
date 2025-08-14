import { useQuiz } from "../contexts/QuizContext";

export default function Progress() {
  const { questions, index, points, answer } = useQuiz();

  const currQuestion = index;
  const totalQuestions = questions.length;

  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  return (
    <div className="progress">
      <progress
        max={totalQuestions}
        value={currQuestion + Number(answer !== null)}
      />
      <p>
        Question{" "}
        <strong>
          {currQuestion + 1} / {totalQuestions}
        </strong>
      </p>
      <p>
        <strong>{points}</strong> / <strong>{totalPoints}</strong>
      </p>
    </div>
  );
}
