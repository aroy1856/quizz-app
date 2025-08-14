import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from "react";
import { QuestionType, QuizAppActionType, StatusType } from "../type";

type QuizContextType = {
  questions: QuestionType[];
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
  status: StatusType;
  dispatch: Dispatch<QuizAppActionType>;
};

type initialStateType = {
  questions: QuestionType[];
  status: StatusType;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
};

const QuizContext = createContext<QuizContextType>({} as QuizContextType);
const TIME_PER_QUESTION = 30; // secondS

const initialState: initialStateType = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
};

function reducer(
  state: initialStateType,
  action: QuizAppActionType
): initialStateType {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * TIME_PER_QUESTION,
      };
    case "answer":
      const question = state.questions[state.index];
      const isCorrect = question.correctOption === action.payload;

      return {
        ...state,
        answer: action.payload,
        points: isCorrect ? state.points + question.points : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finish":
      return {
        ...state,
        status: "finished",
        highScore: Math.max(state.points, state.highScore),
      };
    case "reset":
      return {
        ...initialState,
        highScore: state.highScore,
        status: "ready",
        questions: state.questions,
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining! - 1,
        status: state.secondsRemaining === 1 ? "finished" : state.status,
        highScore: Math.max(state.points, state.highScore),
      };

    default:
      throw new Error(`Unknown action type`);
  }
}

function QuizProvider({ children }: { children: ReactNode }) {
  const [
    { questions, index, answer, points, highScore, secondsRemaining, status },
    dispatch,
  ] = useReducer(reducer, initialState);

  return (
    <QuizContext.Provider
      value={{
        questions,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        status,
        dispatch,
      }}
    >
      <h1>Quiz</h1>
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }

  return context;
}

export { QuizProvider, useQuiz };
