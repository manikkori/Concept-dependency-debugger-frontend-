export default function DiagnosisPanel({ result, onReset }) {
  if (!result) return null;

  return (
    <div className="flex flex-col h-full bg-white animate-fade-in">
      <h3 className="text-2xl font-extrabold text-slate-800 mb-6">
        AI Diagnosis Result
      </h3>

      {/* Root Cause Alert Box */}
      <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-r-xl shadow-sm">
        <span className="block text-xs text-red-500 font-bold uppercase tracking-wider mb-1">
          Identified Root Cause
        </span>
        <span className="text-xl text-red-700 font-black tracking-tight">
          {result.rootWeakConceptId.replace("-", " ").toUpperCase()}
        </span>
      </div>

      {/* Groq AI Explanation */}
      <div className="space-y-5 flex-1">
        <div>
          <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
            🧠 Diagnosis
          </h4>
          <p className="text-slate-600 leading-relaxed">{result.diagnosis}</p>
        </div>

        <div>
          <h4 className="font-bold text-slate-800 mb-1 flex items-center gap-2">
            ⚠️ Why It Matters
          </h4>
          <p className="text-slate-600 leading-relaxed">
            {result.whyItMatters}
          </p>
        </div>

        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
          <h4 className="font-bold text-emerald-800 mb-1 flex items-center gap-2">
            🎯 Next Step
          </h4>
          <p className="text-emerald-700 leading-relaxed">{result.nextStep}</p>
        </div>
      </div>

      <button
        onClick={onReset}
        className="mt-6 w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg hover:bg-slate-900 transition-colors shadow-md"
      >
        Retake Assessment
      </button>
    </div>
  );
}
