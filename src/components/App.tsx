import { useEffect, useReducer } from "react";

import Header from "./Header";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Footer from "./Footer";
import Timer from "./Timer";
import Main from "./Main";

import { QuestionType, QuizAppActionType, StatusType } from "../type";

const TIME_PER_QUESTION = 30; // secondS

type initialStateType = {
  questions: QuestionType[];
  status: StatusType;
  index: number;
  answer: number | null;
  points: number;
  highScore: number;
  secondsRemaining: number | null;
};

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

function App() {
  const [
    { questions, index, answer, points, highScore, secondsRemaining, status },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (total, question) => total + question.points,
    0
  );

  useEffect(() => {
    fetch("http://localhost:9000/questions")
      .then((res) => res.json())
      .then((data) => dispatch({ type: "dataReceived", payload: data }))
      .catch((err) => dispatch({ type: "dataFailed" }));
  }, []);

  return (
    <div className="App">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <ErrorMessage />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              currQuestion={index}
              totalQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Footer>
              <Timer secondsRemaining={secondsRemaining!} dispatch={dispatch} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                finish={index === numQuestions - 1}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            totalPoints={totalPoints}
            highScore={highScore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
