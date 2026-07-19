import { useState } from "react";

export default function QuizFlow({ questions, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  if (!questions || questions.length === 0) {
    return (
      <div className="font-body text-lg text-[var(--text-muted)]">
        Loading assessment...
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  const handleNext = () => {
    const newAnswers = [...answers, { questionId: currentQ.id, selected }];

    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      onSubmit(newAnswers);
    }
  };

  return (
    <div className="flex h-full flex-col animate-fade-in">
      <div className="mb-3 font-display text-xs font-bold uppercase tracking-wider text-[var(--accent-amber)]">
        Question {currentIndex + 1} / {questions.length}
      </div>

      <h3 className="mb-6 min-h-[60px] font-display text-xl font-bold leading-relaxed tracking-[-0.03em] text-[var(--text-primary)]">
        {currentQ.text}
      </h3>

      <div className="custom-scrollbar flex-1 space-y-3 overflow-y-auto pr-2">
        {currentQ.options.map((option) => {
          const isSelected = selected === option;

          return (
            <button
              key={option}
              type="button"
              onClick={() => setSelected(option)}
              className={`w-full rounded-lg border p-4 text-left text-base font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)] ${
                isSelected
                  ? "border-[var(--accent-amber)] bg-[var(--bg-base)] text-[var(--text-primary)]"
                  : "border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-muted)] hover:border-[var(--accent-amber)] hover:text-[var(--text-primary)]"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        disabled={!selected}
        onClick={handleNext}
        className="mt-6 w-full rounded-lg bg-[var(--accent-green)] py-4 font-display text-sm font-bold text-[#07120d] transition-colors hover:bg-[#52dfa0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {currentIndex === questions.length - 1
          ? "Submit & Diagnose"
          : "Next Question"}
      </button>
    </div>
  );
}
