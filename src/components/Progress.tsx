type ProgressProps = {
  currQuestion: number;
  totalQuestions: number;
  points: number;
  totalPoints: number;
  answer: number | null;
};

export default function Progress({
  currQuestion,
  totalQuestions,
  points,
  totalPoints,
  answer,
}: ProgressProps) {
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
