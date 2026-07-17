import { useState } from "react";

export default function QuizFlow({ questions, onSubmit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  if (!questions || questions.length === 0)
    return <div className="text-slate-500">Loading questions...</div>;

  const currentQ = questions[currentIndex];

  const handleNext = () => {
    const newAnswers = [...answers, { questionId: currentQ.id, selected }];

    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
    } else {
      // Last question reached, send answers to backend
      onSubmit(newAnswers);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4 text-sm text-slate-500 font-semibold uppercase tracking-wider">
        Question {currentIndex + 1} of {questions.length}
      </div>

      <h3 className="text-xl font-extrabold text-slate-800 mb-6 min-h-[60px]">
        {currentQ.text}
      </h3>

      <div className="space-y-3 flex-1">
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setSelected(opt)}
            className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-200 font-medium
              ${
                selected === opt
                  ? "border-blue-500 bg-blue-50 text-blue-700 shadow-sm"
                  : "border-slate-200 hover:border-blue-300 hover:bg-slate-50 text-slate-700"
              }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <button
        disabled={!selected}
        onClick={handleNext}
        className="mt-6 w-full bg-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
      >
        {currentIndex === questions.length - 1
          ? "Submit & Diagnose"
          : "Next Question"}
      </button>
    </div>
  );
}
