"use client";

import { useEffect, useReducer } from "react";
import { AnimatePresence } from "framer-motion";
import { Intro } from "./Intro";
import { Intake } from "./Intake";
import { QuestionView } from "./QuestionView";
import { CategoryComplete } from "./CategoryComplete";
import { ResultView } from "./ResultView";
import { ProgressBar } from "./ProgressBar";
import { QUESTIONS, QUESTIONS_PER_CATEGORY, TOTAL_QUESTIONS, getQuestion } from "@/lib/questions";
import { categoryScore, totalScore } from "@/lib/scoring";
import type { Intake as IntakeData, ScanPhase, Scores } from "@/lib/types";

type State = {
  phase: ScanPhase;
  intake: IntakeData | null;
  currentCategory: 0 | 1 | 2 | 3;
  currentQuestion: 0 | 1 | 2 | 3 | 4 | 5;
  answers: (number | null)[];
  scores: Scores | null;
};

type Action =
  | { type: "START" }
  | { type: "INTAKE_DONE"; intake: IntakeData }
  | { type: "SELECT"; score: number }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "AFTER_COMPLETE" }
  | { type: "COMPUTE_SCORES" };

const initial: State = {
  phase: "intro",
  intake: null,
  currentCategory: 0,
  currentQuestion: 0,
  answers: Array(TOTAL_QUESTIONS).fill(null),
  scores: null,
};

function indexOf(cat: number, q: number): number {
  return cat * QUESTIONS_PER_CATEGORY + q;
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "START":
      return { ...state, phase: "intake" };
    case "INTAKE_DONE":
      return { ...state, intake: action.intake, phase: "question" };
    case "SELECT": {
      const idx = indexOf(state.currentCategory, state.currentQuestion);
      const next = [...state.answers];
      next[idx] = action.score;
      return { ...state, answers: next };
    }
    case "BACK": {
      if (state.currentQuestion > 0) {
        return {
          ...state,
          currentQuestion: (state.currentQuestion - 1) as State["currentQuestion"],
        };
      }
      if (state.currentCategory > 0) {
        return {
          ...state,
          currentCategory: (state.currentCategory - 1) as State["currentCategory"],
          currentQuestion: 5,
        };
      }
      return state;
    }
    case "NEXT": {
      const lastQuestionInCat = state.currentQuestion === 5;
      const lastCategory = state.currentCategory === 3;
      if (lastQuestionInCat && lastCategory) {
        return { ...state, phase: "submitting" };
      }
      if (lastQuestionInCat) {
        return { ...state, phase: "category-complete" };
      }
      return {
        ...state,
        currentQuestion: (state.currentQuestion + 1) as State["currentQuestion"],
      };
    }
    case "AFTER_COMPLETE": {
      return {
        ...state,
        currentCategory: (state.currentCategory + 1) as State["currentCategory"],
        currentQuestion: 0,
        phase: "question",
      };
    }
    case "COMPUTE_SCORES": {
      const perCategory: number[] = [];
      for (let c = 0; c < 4; c++) {
        const slice = state.answers.slice(
          c * QUESTIONS_PER_CATEGORY,
          (c + 1) * QUESTIONS_PER_CATEGORY,
        );
        perCategory.push(categoryScore(slice.map((a) => a ?? 0)));
      }
      const scores: Scores = {
        total: totalScore(perCategory),
        perCategory: perCategory as Scores["perCategory"],
      };
      return { ...state, scores, phase: "result" };
    }
    default:
      return state;
  }
}

export function ScanApp() {
  const [state, dispatch] = useReducer(reducer, initial);

  useEffect(() => {
    if (state.phase === "category-complete") {
      const t = setTimeout(() => dispatch({ type: "AFTER_COMPLETE" }), 1200);
      return () => clearTimeout(t);
    }
    if (state.phase === "submitting") {
      const t = setTimeout(() => dispatch({ type: "COMPUTE_SCORES" }), 200);
      return () => clearTimeout(t);
    }
  }, [state.phase]);

  const currentIdx = indexOf(state.currentCategory, state.currentQuestion);
  const selected = state.answers[currentIdx];
  const canGoBack = state.currentCategory > 0 || state.currentQuestion > 0;
  const showProgress =
    state.phase === "question" ||
    state.phase === "category-complete" ||
    state.phase === "submitting" ||
    state.phase === "result";

  return (
    <section className="bg-white py-14 md:py-24">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div
          id="scanApp"
          className="rounded-3xl border border-slate-200 bg-white p-7 md:p-12 shadow-[0_24px_60px_rgba(15,23,42,0.08)] scroll-mt-24"
        >
          {showProgress && (
            <div className="mb-10">
              <ProgressBar
                currentCategory={state.currentCategory}
                currentQuestion={state.currentQuestion}
                finished={state.phase === "result"}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {state.phase === "intro" && (
              <Intro key="intro" onStart={() => dispatch({ type: "START" })} />
            )}
            {state.phase === "intake" && (
              <Intake
                key="intake"
                onSubmit={(intake) => dispatch({ type: "INTAKE_DONE", intake })}
              />
            )}
            {state.phase === "question" && (
              <QuestionView
                key={getQuestion(state.currentCategory, state.currentQuestion).id}
                category={state.currentCategory}
                question={state.currentQuestion}
                selected={selected}
                onSelect={(score) => dispatch({ type: "SELECT", score })}
                onNext={() => dispatch({ type: "NEXT" })}
                onBack={() => dispatch({ type: "BACK" })}
                canGoBack={canGoBack}
              />
            )}
            {state.phase === "category-complete" && (
              <CategoryComplete key="cc" category={state.currentCategory} />
            )}
            {state.phase === "submitting" && (
              <div key="sub" className="py-12 text-center text-slate-500">
                Resultaat berekenen…
              </div>
            )}
            {state.phase === "result" && state.scores && state.intake && (
              <ResultView
                key="result"
                intake={state.intake}
                answers={state.answers.map((a) => a ?? 0)}
                scores={state.scores}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
