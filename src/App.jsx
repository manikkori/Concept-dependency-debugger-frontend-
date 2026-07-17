import { useEffect, useState } from "react";
import ConceptGraphView from "./components/ConceptGraphView";

export default function App() {
  const [quizData, setQuizData] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);

  // Fetch graph and questions on load
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Error fetching quiz:", err));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center p-8 font-sans text-slate-800">
      <h1 className="text-4xl font-extrabold mb-8 text-blue-600 tracking-tight">
        Concept Dependency Debugger
      </h1>

      <div className="flex flex-col lg:flex-row w-full max-w-7xl gap-8">
        {/* Left Column: Quiz Section (Coming Soon) */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            Skill Assessment
          </h2>
          <p className="text-slate-500 italic">Quiz UI will render here...</p>
        </div>

        {/* Right Column: Graph View */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border border-slate-200 h-[600px] flex flex-col">
          <h2 className="text-2xl font-bold mb-4 border-b pb-2">
            Knowledge Graph
          </h2>
          <div className="flex-1 border-2 border-dashed border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            {quizData ? (
              <ConceptGraphView
                graphData={quizData.graph}
                scores={diagnosisResult?.scores}
              />
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400">
                Loading graph structure...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
