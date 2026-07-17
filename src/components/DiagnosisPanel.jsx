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
  if (!result) return null;

  return (
    <div className="flex flex-col h-full bg-white animate-fade-in relative">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
        <Activity className="w-6 h-6 text-blue-600" />
        <h3 className="text-2xl font-extrabold text-slate-800">
          Assessment Report
        </h3>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 overflow-y-auto pr-2 pb-24 space-y-6 custom-scrollbar">
        {/* Root Cause Alert Box */}
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-xl shadow-sm">
          <span className="flex items-center gap-2 text-xs text-red-600 font-bold uppercase tracking-wider mb-2">
            <AlertTriangle className="w-4 h-4" />
            Identified Root Cause
          </span>
          <span className="text-xl text-red-700 font-black tracking-tight">
            {result.rootWeakConceptId.replace("-", " ").toUpperCase()}
          </span>
        </div>

        {/* AI Diagnosis Details */}
        <div className="space-y-6 bg-slate-50 p-5 rounded-xl border border-slate-100">
          <div>
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-indigo-600" />
              Diagnosis
            </h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              {result.diagnosis}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              Why It Matters
            </h4>
            <p className="text-slate-600 leading-relaxed text-sm">
              {result.whyItMatters}
            </p>
          </div>

          <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
            <h4 className="font-bold text-emerald-800 mb-2 flex items-center gap-2">
              <Target className="w-5 h-5 text-emerald-600" />
              Next Step
            </h4>
            <p className="text-emerald-700 leading-relaxed text-sm">
              {result.nextStep}
            </p>
          </div>
        </div>

        {/* Detailed Scorecard */}
        <div className="mt-8">
          <h4 className="font-bold text-slate-800 mb-4 text-lg border-b pb-2">
            Question Breakdown
          </h4>
          <div className="space-y-3">
            {userAnswers &&
              questions &&
              userAnswers.map((answer, idx) => {
                const q = questions.find((q) => q.id === answer.questionId);
                if (!q) return null;

                const isCorrect = q.correctAnswer === answer.selected;

                return (
                  <div
                    key={idx}
                    className={`p-3 rounded-lg border flex flex-col gap-2 ${isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <span className="text-sm font-semibold text-slate-700 line-clamp-2">
                        Q{idx + 1}. {q.text}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                      )}
                    </div>

                    {!isCorrect && (
                      <div className="text-xs mt-1">
                        <div className="text-red-600">
                          <span className="font-semibold">Your Answer:</span>{" "}
                          {answer.selected}
                        </div>
                        <div className="text-green-700 mt-1">
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

      {/* Fixed Bottom Button Area to prevent overlap */}
      <div className="absolute bottom-0 left-0 w-full pt-4 pb-2 bg-white border-t border-slate-100">
        <button
          onClick={onReset}
          className="w-full flex items-center justify-center gap-2 bg-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-900 transition-colors shadow-md"
        >
          <RotateCcw className="w-5 h-5" />
          Retake Assessment
        </button>
      </div>
    </div>
  );
}
