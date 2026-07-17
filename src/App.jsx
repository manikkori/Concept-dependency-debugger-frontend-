import { useEffect, useState } from "react";
import ConceptGraphView from "./components/ConceptGraphView";
import QuizFlow from "./components/QuizFlow";
import DiagnosisPanel from "./components/DiagnosisPanel";

export default function App() {
  const [quizData, setQuizData] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);

  // Load Initial Quiz & Graph Data
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Error fetching quiz:", err));
  }, []);

  // Handle Quiz Submission
  const handleQuizSubmit = async (answers) => {
    setIsDiagnosing(true);
    try {
      const response = await fetch("http://localhost:5000/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const result = await response.json();
      setDiagnosisResult(result); // This will update the graph colors & show the AI panel!
    } catch (error) {
      console.error("Diagnosis error:", error);
    } finally {
      setIsDiagnosing(false);
    }
  };

  // Reset Quiz
  const handleReset = () => {
    setDiagnosisResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-4 lg:p-8 font-sans text-slate-800">
      <div className="w-full max-w-7xl mb-8 flex justify-between items-center">
        <h1 className="text-3xl lg:text-4xl font-extrabold text-blue-600 tracking-tight">
          Concept Dependency Debugger
        </h1>
        <div className="bg-slate-200 px-3 py-1 rounded-full text-xs font-bold text-slate-500 uppercase tracking-wide">
          Powered by Groq
        </div>
      </div>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8 h-auto lg:h-[650px]">
        {/* Left Column: Quiz or Diagnosis Result */}
        <div className="w-full lg:w-1/3 bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col">
          {isDiagnosing ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-4">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="font-bold animate-pulse">
                Running Propagation Engine & AI...
              </p>
            </div>
          ) : diagnosisResult ? (
            <DiagnosisPanel result={diagnosisResult} onReset={handleReset} />
          ) : (
            <QuizFlow
              questions={quizData?.questions?.questions}
              onSubmit={handleQuizSubmit}
            />
          )}
        </div>

        {/* Right Column: Interactive Graph View */}
        <div className="w-full lg:w-2/3 bg-white p-6 lg:p-8 rounded-2xl shadow-lg border border-slate-200 flex flex-col">
          <h2 className="text-xl font-bold mb-4 border-b pb-4 text-slate-700 flex items-center justify-between">
            <span>Knowledge Graph Tracker</span>
            {diagnosisResult && (
              <span className="text-sm font-normal text-slate-500">
                Live Status Updated
              </span>
            )}
          </h2>
          <div className="flex-1 border-2 border-dashed border-slate-200 rounded-xl overflow-hidden bg-slate-50">
            {quizData ? (
              <ConceptGraphView
                graphData={quizData.graph}
                scores={diagnosisResult?.scores}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 font-medium">
                Initializing Graph Structure...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
