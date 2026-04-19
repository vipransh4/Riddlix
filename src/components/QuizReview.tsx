import React, { useState } from "react";
import { Question } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLocation } from "react-router-dom";

interface Props {
  questions: Question[];
  answers: { [key: number]: number };
  onExit: () => void;
}

export default function QuizReview(props: Props) {
  const location = useLocation();

  const questions = props.questions || location.state?.questions;
  const answers = props.answers || location.state?.answers;
  const onExit = props.onExit;

  const [index, setIndex] = useState(0);

  const q = questions[index];

  const selected = answers[q.id];

  const getStatus = () => {
    if (selected === undefined) return "unanswered";
    if (selected === q.correctAnswer) return "correct";
    return "wrong";
  };

  const status = getStatus();

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <h2 className="text-2xl font-bold mb-4">Review Answers</h2>

      <div className="glass-card p-6 rounded-xl">

        <p className="mb-4 font-semibold">
          Question {index + 1} / {questions.length}
        </p>

        <p className="mb-6">{q.question}</p>

        <div className="space-y-3">
          {q.options.map((opt, i) => {

            let style =
              "border border-border p-3 rounded-lg";

            if (i === q.correctAnswer)
              style = "border-2 border-green-500 bg-green-500/10";

            if (i === selected && i !== q.correctAnswer)
              style = "border-2 border-red-500 bg-red-500/10";

            return (
              <div key={i} className={style}>
                {opt}
              </div>
            );
          })}
        </div>

        <p className="mt-4 capitalize font-semibold">
          Status: {status}
        </p>

        <div className="flex gap-4 mt-6">

          <Button
            disabled={index === 0}
            onClick={() => setIndex(index - 1)}
          >
            <ChevronLeft className="mr-2" /> Previous
          </Button>

          <Button
            disabled={index === questions.length - 1}
            onClick={() => setIndex(index + 1)}
          >
            Next <ChevronRight className="ml-2" />
          </Button>

          <Button variant="outline" onClick={onExit}>
            Exit Review
          </Button>

        </div>

      </div>
    </div>
  );
}
