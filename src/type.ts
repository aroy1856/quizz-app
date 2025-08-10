export type QuestionType = {
  id: string;
  question: string;
  options: string[];
  correctOption: number;
  points: number;
};

export type StatusType = "loading" | "error" | "ready" | "active" | "finished";

export type QuizAppActionType =
  | { type: "dataReceived"; payload: QuestionType[] }
  | { type: "dataFailed" }
  | { type: "start" }
  | { type: "answer"; payload: number }
  | { type: "nextQuestion" }
  | { type: "finish" }
  | { type: "reset" }
  | { type: "tick" };
