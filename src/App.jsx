import { useEffect, useState } from "react";
import ConceptGraphView from "./components/ConceptGraphView";
import QuizFlow from "./components/QuizFlow";
import DiagnosisPanel from "./components/DiagnosisPanel";
import LandingPage from "./components/LandingPage";
import { Moon, Sun, BrainCircuit, Activity } from "lucide-react";

export default function App() {
  // Application State
  const [currentPage, setCurrentPage] = useState("landing");

  // Theme State with LocalStorage Persistence
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Data and Process State
  const [quizData, setQuizData] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [userAnswers, setUserAnswers] = useState(null);

  // Apply the theme class to the root document element and save to LocalStorage
  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  // Fetch initial graph and question data from the backend API
  useEffect(() => {
    fetch("http://localhost:5000/api/quiz")
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Error fetching quiz data:", err));
  }, []);

  // Submit user answers and fetch the AI diagnosis result
  const handleQuizSubmit = async (answers) => {
    setUserAnswers(answers);
    setIsDiagnosing(true);
    try {
      const response = await fetch("http://localhost:5000/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const result = await response.json();
      setDiagnosisResult(result);
    } catch (error) {
      console.error("Diagnostic processing error:", error);
    } finally {
      setIsDiagnosing(false);
    }
  };

  // Reset the assessment data to start a new session
  const handleReset = () => {
    setDiagnosisResult(null);
    setUserAnswers(null);
  };

  // Toggle between light and dark themes
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500 font-sans relative">
      {/* Stable Ethereal Glass Background Blobs (Fixed to prevent double scrollbars) */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[45rem] h-[45rem] bg-violet-400/30 dark:bg-violet-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-300/40 dark:bg-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-[20%] left-[30%] w-[35rem] h-[35rem] bg-indigo-300/20 dark:bg-indigo-600/10 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] animate-blob"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Sticky Glassmorphism Navbar */}
      <nav className="sticky top-0 z-50 w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/40 dark:border-slate-700/50 shadow-sm transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Brand Logo & Name */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={() => {
                setCurrentPage("landing");
                handleReset();
              }}
            >
              <div className="p-2 bg-violet-100 dark:bg-slate-800 rounded-lg group-hover:bg-violet-200 dark:group-hover:bg-slate-700 transition-colors">
                <BrainCircuit className="w-5 h-5 text-violet-600 dark:text-cyan-400" />
              </div>
              <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                CDD<span className="text-violet-600 dark:text-cyan-400">.</span>
              </span>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              <div className="hidden sm:flex items-center gap-1 bg-white/50 dark:bg-slate-800/50 px-3 py-1.5 rounded-full text-xs font-bold text-slate-600 dark:text-slate-300 uppercase tracking-wide border border-white/60 dark:border-slate-700/50 backdrop-blur-sm shadow-sm">
                <Activity className="w-3 h-3 text-violet-600 dark:text-cyan-400" />{" "}
                Powered by Groq AI
              </div>
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-full bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 shadow-sm border border-white/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-all"
                aria-label="Toggle Theme"
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5" />
                ) : (
                  <Sun className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        {currentPage === "landing" ? (
          <LandingPage onStart={() => setCurrentPage("app")} />
        ) : (
          <div className="flex flex-col lg:flex-row w-full gap-6 h-auto lg:h-[600px]">
            {/* Left Column: Assessment Interface (Glassy Panel adhering to Dark Mode) */}
            <div className="w-full lg:w-1/3 bg-white/70 dark:bg-slate-900/70 backdrop-blur-2xl p-6 rounded-3xl shadow-xl border border-white/60 dark:border-slate-700/50 flex flex-col relative overflow-hidden transition-colors">
              {isDiagnosing ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-600 dark:text-slate-300 space-y-4">
                  <div className="w-12 h-12 border-4 border-violet-200 dark:border-slate-700 border-t-violet-600 dark:border-t-cyan-400 rounded-full animate-spin"></div>
                  <p className="font-bold animate-pulse text-base">
                    Running AI Engine...
                  </p>
                </div>
              ) : diagnosisResult ? (
                <DiagnosisPanel
                  result={diagnosisResult}
                  onReset={handleReset}
                  questions={
                    quizData?.questions?.questions || quizData?.questions
                  }
                  userAnswers={userAnswers}
                />
              ) : (
                <QuizFlow
                  questions={quizData?.questions?.questions}
                  onSubmit={handleQuizSubmit}
                />
              )}
            </div>

            {/* Right Column: Interactive Graph View (STRICTLY SOLID WHITE for highest contrast) */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-3xl shadow-xl border border-slate-200 flex flex-col">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-100 pb-3 text-slate-800 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-violet-500" />
                  Knowledge Graph Tracker
                </span>
                {diagnosisResult && (
                  <span className="text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-100 px-3 py-1 rounded-full shadow-sm">
                    Live Status
                  </span>
                )}
              </h2>
              <div className="flex-1 border-2 border-dashed border-slate-200 rounded-2xl overflow-hidden bg-[#F8FAFC]">
                {quizData ? (
                  <ConceptGraphView
                    graphData={quizData.graph}
                    scores={diagnosisResult?.scores}
                  />
                ) : (
                  <div className="flex items-center justify-center h-full text-slate-400 text-base font-medium">
                    Initializing Graph Structure...
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
