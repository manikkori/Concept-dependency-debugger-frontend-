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
    "OOP Concepts",
    "Web Dev Basics",
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
    <div className="min-h-screen bg-[var(--bg-base)] text-[var(--text-primary)] transition-colors duration-500 font-body relative">

      {/* Navbar with Dropdown & OpenAI Badge */}
      <nav className="sticky top-0 z-50 w-full border-b border-[var(--border-hairline)] bg-[var(--bg-base)]/95 backdrop-blur-xl transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <button
              type="button"
              className="flex items-center gap-2 cursor-pointer group rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
              onClick={handleGoHome}
            >
              <div className="bg-[var(--bg-surface)] p-2 rounded-lg transition-colors group-hover:bg-[var(--border-hairline)]">
                <BrainCircuit className="w-5 h-5 text-[var(--accent-amber)]" />
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-[var(--text-primary)]">
                CDD
                <span className="text-[var(--accent-amber)]">.</span>
              </span>
            </button>

            {/* Right Side Controls */}
            <div className="flex items-center gap-3">
              {/* Powered by OpenAI Badge - Always Visible */}
              <div className="hidden sm:flex items-center gap-1.5 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-3 py-1.5 font-display text-xs font-bold text-[var(--accent-green)] transition-colors">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Powered by OpenAI</span>
              </div>

              {/* Subject Dropdown (Only visible inside the App) */}
              {currentPage === "app" && (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] px-4 py-2 font-display text-sm font-bold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-amber)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
                  >
                    <BookOpen className="w-4 h-4 text-[var(--accent-amber)]" />
                    <span className="hidden sm:inline">{currentSubject}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 overflow-hidden rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] shadow-xl animate-fade-in">
                      {subjects.map((sub) => (
                        <button
                          key={sub}
                          onClick={() => handleSubjectChange(sub)}
                          className={`w-full text-left px-4 py-3 font-display text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:bg-[var(--border-hairline)] ${
                            currentSubject === sub
                              ? "bg-[var(--border-hairline)] text-[var(--accent-amber)]"
                              : "text-[var(--text-muted)] hover:bg-[var(--border-hairline)] hover:text-[var(--text-primary)]"
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
                aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
                className="rounded-lg border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-2.5 text-[var(--text-muted)] transition-all hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
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
      <main className="relative z-10 w-full max-w-7xl mx-auto flex flex-col items-center p-4 sm:p-6 lg:p-8">
        {currentPage === "landing" ? (
          <LandingPage onStart={handleStartAssessment} />
        ) : (
          <div className="flex flex-col lg:flex-row w-full gap-6 h-auto lg:h-[600px] animate-fade-in">
            {/* Left Panel - Quiz / Diagnosis */}
            <div className="w-full lg:w-1/3 bg-[var(--bg-surface)] p-6 rounded-2xl shadow-xl shadow-black/10 border border-[var(--border-hairline)] flex flex-col relative overflow-hidden transition-colors">
              {isDiagnosing ? (
                <div className="flex flex-col items-center justify-center h-full text-[var(--text-muted)] space-y-4">
                  <div className="w-12 h-12 border-4 border-[var(--border-hairline)] border-t-[var(--accent-amber)] rounded-full animate-spin"></div>
                  <p className="font-display font-bold animate-pulse text-sm">
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
                  concepts={quizData?.graph?.concepts}
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
            <div className="w-full lg:w-2/3 bg-[var(--bg-surface)] p-6 rounded-2xl shadow-xl shadow-black/10 border border-[var(--border-hairline)] flex flex-col min-h-[500px] lg:min-h-0">
              <h2 className="font-display text-lg font-bold mb-4 border-b border-[var(--border-hairline)] pb-3 text-[var(--text-primary)] flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <BrainCircuit className="w-5 h-5 text-[var(--accent-amber)]" />
                  Knowledge Graph Tracker
                </span>
                <span className="font-display text-xs font-bold text-[var(--accent-amber)] bg-[var(--bg-base)] px-3 py-1 rounded-lg border border-[var(--border-hairline)]">
                  {currentSubject}
                </span>
              </h2>
              <div className="flex-1 border border-dashed border-[var(--border-hairline)] rounded-xl overflow-hidden bg-[var(--bg-base)] relative transition-colors">
                {quizData ? (
                  <ConceptGraphView
                    graphData={quizData.graph}
                    scores={diagnosisResult?.scores}
                    rootCauseId={diagnosisResult?.rootWeakConceptId}
                    allMastered={diagnosisResult?.allMastered}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full gap-3 text-[var(--text-muted)]">
                    <div className="w-8 h-8 border-4 border-[var(--border-hairline)] border-t-[var(--accent-amber)] rounded-full animate-spin"></div>
                    <span className="font-body font-medium">
                      Loading {currentSubject} map...
                    </span>
                  </div>
                )}
              </div>
              <div
                className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 font-display text-[10px] font-semibold text-[var(--text-muted)]"
                aria-label="Knowledge graph legend"
              >
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                  Strong
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-500" />
                  Borderline
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-500" />
                  Weak
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-6 border-t-4 border-red-500" />
                  Root Cause
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-6 border-t-2 border-dashed border-red-500" />
                  Affected
                </span>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
