import React from "react";
import {
  BrainCircuit,
  AlertTriangle,
  Target,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Activity,
} from "lucide-react";

export default function DiagnosisPanel({
  result,
  onReset,
  questions,
  userAnswers,
}) {
  // Prevent rendering if there is no diagnostic result available from the AI engine
  if (!result) return null;

  return (
    <div className="flex flex-col h-full bg-transparent transition-colors animate-fade-in relative">
      {/* Header section with brand accent colors */}
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
        <Activity className="w-6 h-6 text-violet-600 dark:text-cyan-400" />
        <h3 className="text-2xl font-extrabold text-slate-800 dark:text-slate-100">
          Assessment Report
        </h3>
      </div>

      {/* Scrollable content area with ample bottom padding to clear the fixed action button */}
      <div className="flex-1 overflow-y-auto pr-3 pb-24 space-y-5 custom-scrollbar">
        {/* Identified Root Cause Alert - Warning styling */}
        <div className="bg-red-50/80 dark:bg-red-900/30 backdrop-blur-sm border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm">
          <span className="flex items-center gap-2 text-xs text-red-600 dark:text-red-400 font-bold uppercase tracking-wider mb-1.5">
            <AlertTriangle className="w-4 h-4" /> Root Cause
          </span>
          <span className="text-xl text-red-700 dark:text-red-300 font-black tracking-tight">
            {result.rootWeakConceptId.replace("-", " ").toUpperCase()}
          </span>
        </div>

        {/* AI-Generated Diagnosis Insights wrapped in glassy styled containers */}
        <div className="space-y-5 bg-white/50 dark:bg-slate-800/40 backdrop-blur-md p-5 rounded-xl border border-white/60 dark:border-slate-700/50 shadow-sm">
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1.5 flex items-center gap-2 text-base">
              <BrainCircuit className="w-5 h-5 text-violet-600 dark:text-cyan-400" />{" "}
              Diagnosis
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {result.diagnosis}
            </p>
          </div>
          <div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-1.5 flex items-center gap-2 text-base">
              <AlertTriangle className="w-5 h-5 text-amber-500 dark:text-amber-400" />{" "}
              Why It Matters
            </h4>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
              {result.whyItMatters}
            </p>
          </div>
          <div className="bg-emerald-50/70 dark:bg-emerald-900/20 backdrop-blur-sm p-4 rounded-lg border border-emerald-100/50 dark:border-emerald-800/30 mt-2">
            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-1.5 flex items-center gap-2 text-base">
              <Target className="w-5 h-5 text-emerald-600 dark:text-emerald-500" />{" "}
              Next Step
            </h4>
            <p className="text-emerald-700 dark:text-emerald-300 leading-relaxed text-sm">
              {result.nextStep}
            </p>
          </div>
        </div>

        {/* Detailed Question Breakdown and Scorecard */}
        <div className="mt-6">
          <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-4 text-base border-b border-slate-200/50 dark:border-slate-700/50 pb-2">
            Question Breakdown
          </h4>
          <div className="space-y-3">
            {userAnswers &&
              questions &&
              userAnswers.map((answer, idx) => {
                const q = questions.find(
                  (item) => item.id === answer.questionId,
                );
                if (!q) return null;

                const isCorrect = q.correctAnswer === answer.selected;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border backdrop-blur-sm flex flex-col gap-2 transition-colors ${
                      isCorrect
                        ? "bg-green-50/60 border-green-200/60 dark:bg-green-900/20 dark:border-green-800/30"
                        : "bg-red-50/60 border-red-200/60 dark:bg-red-900/20 dark:border-red-800/30"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 leading-snug">
                        Q{idx + 1}. {q.text}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="text-xs mt-1 bg-white/40 dark:bg-slate-900/40 p-2 rounded-md">
                        <div className="text-red-600 dark:text-red-400 mb-1">
                          <span className="font-semibold">Your Answer:</span>{" "}
                          {answer.selected}
                        </div>
                        <div className="text-green-700 dark:text-green-400">
                          <span className="font-semibold">Correct Answer:</span>{" "}
                          {q.correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      {/* Fixed bottom action area with glassy background to prevent content clipping */}
      <div className="absolute bottom-0 left-0 w-full pt-4 pb-2 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-slate-200/50 dark:border-slate-700/50">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white py-3.5 rounded-xl font-bold text-base hover:bg-slate-800 dark:hover:from-violet-500 dark:hover:to-cyan-500 transition-all shadow-lg hover:shadow-xl"
        >
          <RotateCcw className="w-5 h-5" /> Retake Assessment
        </button>
      </div>
    </div>
  );
}
