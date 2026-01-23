import { useState } from "react";
import Card from "./Card";
import ProgressBar from "./ProgressBar";
import { motion } from "framer-motion";

export default function Questionnaire({ questions = [], onSubmit }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});

  const q = questions[idx];
  const hasAnswered = answers[q?.id] !== undefined;

  const select = (opt) => {
    setAnswers(prev => ({ ...prev, [q.id]: opt }));
  };

  const next = () => {
    if (!hasAnswered) return;

    if (idx < questions.length - 1) {
      setIdx(i => i + 1);
    } else {
      onSubmit(answers);
    }
  };

  if (!q) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex justify-center"
    >
      <Card>
        <ProgressBar current={idx + 1} total={questions.length} />

        <div className="mb-6 text-sm text-indigo-300">
          Question {idx + 1} of {questions.length}
        </div>

        <h3 className="mb-8 text-xl font-semibold text-white">
          {q.text}
        </h3>

        <div className="space-y-4">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => select(i)}
              className={`w-full rounded-xl border px-6 py-4 text-left transition
                ${
                  answers[q.id] === i
                    ? "border-indigo-500 bg-indigo-500/20 text-white"
                    : "border-indigo-500/40 text-indigo-100 hover:bg-indigo-500/10"
                }`}
            >
              {typeof opt === "string" ? opt : opt.label}
            </button>
          ))}
        </div>

        <div className="mt-10 flex justify-between">
          <button
            disabled={idx === 0}
            onClick={() => setIdx(i => i - 1)}
            className="rounded-lg bg-gray-700 px-6 py-2 text-white disabled:opacity-40"
          >
            Previous
          </button>

          <button
            disabled={!hasAnswered}
            onClick={next}
            className={`rounded-lg px-6 py-2 font-semibold transition
              ${
                hasAnswered
                  ? "bg-white text-black"
                  : "bg-gray-400 text-gray-700 cursor-not-allowed"
              }`}
          >
            {idx === questions.length - 1 ? "Submit" : "Next →"}
          </button>
        </div>
      </Card>
    </motion.div>
  );
}
