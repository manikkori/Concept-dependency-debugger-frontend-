import { useState } from "react";
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
  concepts,
  userAnswers,
}) {
  const [isMathVisible, setIsMathVisible] = useState(false);

  if (!result) return null;

  const conceptsById = Object.fromEntries(
    (concepts || []).map((concept) => [concept.id, concept]),
  );

  const getAdjustmentReason = (concept) => {
    const score = result.scores?.[concept.id];
    if (!score || Math.abs(score.raw - score.adjusted) < 0.0001) return "";

    const limitingPrerequisite = (concept.prerequisites || [])
      .map((prerequisiteId) => ({
        id: prerequisiteId,
        score: result.scores?.[prerequisiteId]?.adjusted,
      }))
      .filter((prerequisite) => prerequisite.score !== undefined)
      .sort((a, b) => a.score - b.score)[0];

    const prerequisiteName = limitingPrerequisite
      ? conceptsById[limitingPrerequisite.id]?.name || limitingPrerequisite.id
      : "a prerequisite";

    return `Adjusted down because prerequisite '${prerequisiteName}' is weak.`;
  };

  return (
    <div className="relative flex h-full flex-col animate-fade-in">
      <div className="mb-5 flex items-center gap-3 border-b border-[var(--border-hairline)] pb-4">
        <Activity className="h-5 w-5 text-[var(--accent-amber)]" />
        <h3 className="font-display text-xl font-bold tracking-[-0.04em] text-[var(--text-primary)]">
          Assessment Report
        </h3>
      </div>

      <div className="custom-scrollbar flex-1 space-y-5 overflow-y-auto pb-24 pr-3">
        {result.allMastered ? (
          <div className="rounded-r-xl border-l-4 border-[var(--accent-green)] bg-[var(--bg-base)] p-4">
            <span className="flex items-center gap-2 font-display text-base font-bold text-[var(--accent-green)]">
              <CheckCircle2 className="h-5 w-5" /> All Concepts Mastered!
            </span>
            <p className="mt-1.5 text-sm font-medium text-[var(--text-muted)]">
              Your foundation is strong across the full learning chain.
            </p>
          </div>
        ) : (
          <div className="rounded-r-xl border-l-4 border-[var(--accent-amber)] bg-[var(--bg-base)] p-4">
            <span className="mb-1.5 flex items-center gap-2 font-display text-[10px] font-bold uppercase tracking-wider text-[var(--accent-amber)]">
              <AlertTriangle className="h-4 w-4" /> Root Cause
            </span>
            <span className="font-display text-lg font-bold tracking-[-0.04em] text-[var(--text-primary)]">
              {result.rootWeakConceptId?.replaceAll("-", " ").toUpperCase() ||
                "No root cause identified"}
            </span>
          </div>
        )}

        <div className="space-y-5 rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)] p-5">
          <div>
            <h4 className="mb-1.5 flex items-center gap-2 font-display text-sm font-bold text-[var(--text-primary)]">
              <BrainCircuit className="h-4 w-4 text-[var(--accent-amber)]" />
              Diagnosis
            </h4>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {result.diagnosis}
            </p>
          </div>
          <div>
            <h4 className="mb-1.5 flex items-center gap-2 font-display text-sm font-bold text-[var(--text-primary)]">
              <AlertTriangle className="h-4 w-4 text-[var(--accent-amber)]" />
              Why It Matters
            </h4>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {result.whyItMatters}
            </p>
          </div>
          <div className="mt-2 rounded-lg border border-[var(--accent-green)]/40 bg-[var(--bg-surface)] p-4">
            <h4 className="mb-1.5 flex items-center gap-2 font-display text-sm font-bold text-[var(--accent-green)]">
              <Target className="h-4 w-4" /> Next Step
            </h4>
            <p className="text-sm leading-relaxed text-[var(--text-muted)]">
              {result.nextStep}
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-base)]">
          <button
            type="button"
            onClick={() => setIsMathVisible((visible) => !visible)}
            aria-expanded={isMathVisible}
            className="flex w-full items-center justify-between px-4 py-3 text-left font-display text-xs font-bold text-[var(--text-primary)] transition-colors hover:bg-[var(--border-hairline)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)]"
          >
            <span>Show the math {isMathVisible ? "\u25B4" : "\u25BE"}</span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Raw vs adjusted
            </span>
          </button>

          {isMathVisible && (
            <div className="border-t border-[var(--border-hairline)] px-4 py-3">
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-xs">
                  <thead className="font-display text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                    <tr>
                      <th className="pb-2 pr-3 font-bold">Concept</th>
                      <th className="pb-2 pr-3 font-bold">Raw</th>
                      <th className="pb-2 pr-3 font-bold">Adjusted</th>
                      <th className="pb-2 font-bold">Reason</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-hairline)]">
                    {(concepts || []).map((concept) => {
                      const score = result.scores?.[concept.id];
                      if (!score) return null;

                      const wasAdjusted =
                        Math.abs(score.raw - score.adjusted) >= 0.0001;

                      return (
                        <tr key={concept.id} className="align-top">
                          <td className="py-2 pr-3 font-display text-[11px] font-bold text-[var(--text-primary)]">
                            {concept.name}
                          </td>
                          <td className="py-2 pr-3 font-display text-[11px] text-[var(--text-primary)]">
                            {Math.round(score.raw * 100)}%
                          </td>
                          <td className="py-2 pr-3 font-display text-[11px] text-[var(--text-primary)]">
                            {Math.round(score.adjusted * 100)}%
                          </td>
                          <td className="py-2 leading-relaxed text-[var(--text-muted)]">
                            {wasAdjusted ? getAdjustmentReason(concept) : "-"}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <h4 className="mb-4 border-b border-[var(--border-hairline)] pb-2 font-display text-sm font-bold text-[var(--text-primary)]">
            Question Breakdown
          </h4>
          <div className="space-y-3">
            {userAnswers &&
              questions &&
              userAnswers.map((answer, index) => {
                const question = questions.find(
                  (item) => item.id === answer.questionId,
                );
                if (!question) return null;

                const isCorrect = question.correctAnswer === answer.selected;

                return (
                  <div
                    key={answer.questionId}
                    className={`flex flex-col gap-2 rounded-lg border p-3 ${
                      isCorrect
                        ? "border-green-500/40 bg-green-500/10"
                        : "border-red-500/40 bg-red-500/10"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                        <span className="font-display text-xs text-[var(--text-muted)]">
                          Q{index + 1}. 
                        </span>
                        {question.text}
                      </span>
                      {isCorrect ? (
                        <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-500" />
                      ) : (
                        <XCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-500" />
                      )}
                    </div>
                    {!isCorrect && (
                      <div className="mt-1 rounded-md bg-[var(--bg-surface)] p-2 text-xs">
                        <div className="mb-1 text-red-500">
                          <span className="font-display font-semibold">Your Answer:</span>{" "}
                          {answer.selected}
                        </div>
                        <div className="text-green-600 dark:text-green-400">
                          <span className="font-display font-semibold">Correct Answer:</span>{" "}
                          {question.correctAnswer}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full border-t border-[var(--border-hairline)] bg-[var(--bg-surface)] pb-2 pt-4">
        <button
          type="button"
          onClick={onReset}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-[var(--accent-green)] py-3.5 font-display text-sm font-bold text-[#07120d] transition-colors hover:bg-[#52dfa0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-surface)]"
        >
          <RotateCcw className="h-4 w-4" /> Retake Assessment
        </button>
      </div>
    </div>
  );
}
