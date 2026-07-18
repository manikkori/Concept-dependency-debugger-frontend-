import { useEffect, useState, useRef } from "react";
import ConceptGraphView from "./components/ConceptGraphView";
import QuizFlow from "./components/QuizFlow";
import DiagnosisPanel from "./components/DiagnosisPanel";
import LandingPage from "./components/LandingPage";
import {
  Moon,
  Sun,
  BrainCircuit,
  ChevronDown,
  BookOpen,
  Sparkles,
} from "lucide-react";

export default function App() {
  const [currentPage, setCurrentPage] = useState("landing");
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "light",
  );

  const [quizData, setQuizData] = useState(null);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [isDiagnosing, setIsDiagnosing] = useState(false);
  const [userAnswers, setUserAnswers] = useState(null);

  // Navbar Dropdown State
  const [currentSubject, setCurrentSubject] = useState("Discrete Math");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const subjects = [
    "Discrete Math",
    "Computer Networks",
    "DBMS",
    "Data Structures",
  ];
  const API_BASE_URL =
    import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch data function
  const fetchQuizData = (subject) => {
    setQuizData(null);
    fetch(`${API_BASE_URL}/api/quiz?subject=${encodeURIComponent(subject)}`)
      .then((res) => res.json())
      .then((data) => setQuizData(data))
      .catch((err) => console.error("Error fetching quiz data:", err));
  };

  const handleStartAssessment = () => {
    setCurrentPage("app");
    fetchQuizData(currentSubject);
  };

  const handleSubjectChange = (newSubject) => {
    setCurrentSubject(newSubject);
    setIsDropdownOpen(false);
    setUserAnswers(null);
    setDiagnosisResult(null);
    fetchQuizData(newSubject);
  };

  const handleQuizSubmit = async (answers) => {
    setUserAnswers(answers);
    setIsDiagnosing(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/diagnose`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, subject: currentSubject }),
      });
      const result = await response.json();
      setDiagnosisResult(result);
    } catch (error) {
      console.error("Diagnostic processing error:", error);
    } finally {
      setIsDiagnosing(false);
    }
  };

  const handleRetake = () => {
    setDiagnosisResult(null);
    setUserAnswers(null);
    fetchQuizData(currentSubject);
  };

  const handleGoHome = () => {
    setDiagnosisResult(null);
    setUserAnswers(null);
    setCurrentPage("landing");
  };

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1120] transition-colors duration-500 font-sans relative">
      {/* Background Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-15%] left-[-10%] w-[45rem] h-[45rem] bg-violet-400/30 dark:bg-violet-600/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"></div>
        <div
          className="absolute bottom-[-15%] right-[-10%] w-[40rem] h-[40rem] bg-cyan-300/40 dark:bg-cyan-500/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[120px] animate-blob"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Navbar with Dropdown & OpenAI Badge */}
      <nav className="sticky top-0 z-50 w-full bg-white/60 dark:bg-slate-900/60 backdrop-blur-xl border-b border-white/40 dark:border-slate-700/50 shadow-sm transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer group"
              onClick={handleGoHome}
            >
              <div className="p-2 bg-violet-100 dark:bg-slate-800 rounded-lg group-hover:bg-violet-200 dark:group-hover:bg-slate-700 transition-colors">
                <BrainCircuit className="w-5 h-5 text-violet-600 dark:text-cyan-400" />
              </div>
              <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
                CDD<span className="text-violet-600 dark:text-cyan-400">.</span>
              </span>
            </div>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Powered by OpenAI Badge - Always Visible */}
              <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 dark:bg-emerald-900/20 px-3 py-1.5 rounded-full text-xs font-bold text-emerald-700 dark:text-emerald-400 border border-emerald-200/50 dark:border-emerald-800/50 backdrop-blur-sm shadow-sm transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by OpenAI</span>
              </div>

              {/* Subject Dropdown (Only visible inside the App) */}
              {currentPage === "app" && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 bg-white/50 dark:bg-slate-800/50 px-4 py-2 rounded-xl text-sm font-bold text-slate-700 dark:text-slate-200 border border-white/60 dark:border-slate-700/50 backdrop-blur-sm shadow-sm hover:bg-white dark:hover:bg-slate-700 transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-violet-600 dark:text-cyan-400" />
                    <span className="hidden sm:inline">{currentSubject}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-500 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 overflow-hidden animate-fade-in">
                      {subjects.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSubjectChange(sub)}
                          className={`w-full text-left px-4 py-3 text-sm font-semibold transition-colors ${
                            currentSubject === sub
                              ? "bg-violet-50 dark:bg-slate-700/50 text-violet-700 dark:text-cyan-400"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700"
                          }`}
                        >
                          {sub}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2.5 rounded-xl bg-white/60 dark:bg-slate-800/60 text-slate-700 dark:text-slate-200 shadow-sm border border-white/60 dark:border-slate-700/50 hover:bg-white dark:hover:bg-slate-700 backdrop-blur-sm transition-all"
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

      {/* Main Content */}
      <main className="relative z-10 w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col items-center">
        {currentPage === "landing" ? (
          <LandingPage onStart={handleStartAssessment} />
        ) : (
          <div className="flex flex-col lg:flex-row w-full gap-6 h-auto lg:h-[600px] animate-fade-in">
            {/* Left Panel - Quiz / Diagnosis */}
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
                  onReset={handleRetake}
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

            {/* Right Panel - Graph */}
            <div className="w-full lg:w-2/3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-slate-200 dark:border-slate-700/50 flex flex-col min-h-[500px] lg:min-h-0">
              <h2 className="text-xl font-bold mb-4 border-b border-slate-100 dark:border-slate-800 pb-3 text-slate-800 dark:text-slate-100 flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-violet-500 dark:text-cyan-400" />
                  Knowledge Graph Tracker
                </span>
                <span className="text-sm font-bold text-violet-700 dark:text-cyan-300 bg-violet-50 dark:bg-slate-800 px-3 py-1 rounded-lg border border-violet-100 dark:border-slate-700">
                  {currentSubject}
                </span>
              </h2>
              <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-[#F8FAFC] dark:bg-slate-800/50 relative transition-colors">
                {quizData ? (
                  <ConceptGraphView
                    graphData={quizData.graph}
                    scores={diagnosisResult?.scores}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-slate-400">
                    <div className="w-8 h-8 border-4 border-slate-200 dark:border-slate-700 border-t-violet-500 rounded-full animate-spin"></div>
                    <span className="font-medium">
                      Loading {currentSubject} map...
                    </span>
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
