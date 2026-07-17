import { useState } from "react";

export default function QuizFlow({ questions, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  // Display loading state if questions are not yet available from the backend
  if (!questions || questions.length === 0) {
    return (
      <div className="text-slate-500 dark:text-slate-400 text-lg">
        Loading assessment...
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  // Handle the progression to the next question or final submission
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
    <div className="flex flex-col h-full animate-fade-in">
      {/* Progress indicator */}
      <div className="mb-3 text-sm text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
        Question {currentIndex + 1} of {questions.length}
      </div>

      {/* Question text with scaled-up typography for better readability */}
      <h3 className="text-xl font-extrabold text-slate-800 dark:text-slate-100 mb-6 min-h-[60px] transition-colors leading-relaxed">
        {currentQ.text}
      </h3>

      {/* Options list featuring glassy hover states and translucent backgrounds */}
      <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-2">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(opt)}
            className={`w-full text-left p-4 text-base rounded-xl border-2 transition-all duration-300 font-medium backdrop-blur-sm
              ${
                selected === opt
                  ? "border-violet-500 bg-violet-50/80 text-violet-700 dark:border-cyan-400 dark:bg-cyan-900/30 dark:text-cyan-100 shadow-md transform scale-[1.01]"
                  : "border-slate-200/50 dark:border-slate-700/50 bg-white/40 dark:bg-slate-800/40 hover:border-violet-300 dark:hover:border-cyan-500/50 text-slate-700 dark:text-slate-300 hover:bg-white/60 dark:hover:bg-slate-700/60"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Primary action button matching the application theme */}
      <button
        disabled={!selected}
        onClick={handleNext}
        className="mt-6 w-full bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-violet-700 dark:hover:from-violet-500 dark:hover:to-cyan-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
      >
        {currentIndex === questions.length - 1
          ? "Submit & Diagnose"
          : "Next Question"}
      </button>
    </div>
  );
}
