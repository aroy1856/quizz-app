import { Dispatch, useEffect } from "react";
import { QuizAppActionType } from "../type";

type TimerProps = {
  secondsRemaining: number;
  dispatch: Dispatch<QuizAppActionType>;
};

export default function Timer({ secondsRemaining, dispatch }: TimerProps) {
  const minutes = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(
    function () {
      const timer = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(timer);
    },
    [dispatch]
  );

  return (
    <div className="timer">
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </div>
  );
}
