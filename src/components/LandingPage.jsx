import React from "react";
import {
  BrainCircuit,
  ArrowRight,
  Target,
  Activity,
  GitCommit,
} from "lucide-react";

export default function LandingPage({ onStart }) {
  return (
    <div className="w-full flex flex-col items-center animate-fade-in font-sans">
      <div className="w-full max-w-4xl flex flex-col items-center text-center mt-12 mb-20 px-4">
        <div className="mb-6 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/50 inline-block">
          <BrainCircuit className="w-16 h-16 text-violet-600 dark:text-cyan-400" />
        </div>

        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-6 transition-colors drop-shadow-sm leading-tight">
          Concept Dependency <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-cyan-400 dark:to-violet-400">
            Debugger
          </span>
        </h1>

        <p className="font-stylish italic text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl transition-colors">
          "Uncover the hidden gaps in your knowledge, before they break your
          foundation."
        </p>

        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed text-lg">
          Traditional tests only tell you what you got wrong. Our intelligent
          propagation engine maps your exact understanding across complex
          subjects to pinpoint the root cause holding you back.
        </p>

        <button
          onClick={onStart}
          className="group flex items-center gap-3 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-700 dark:hover:from-violet-500 dark:hover:to-cyan-500 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          Start Your Free Assessment
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-20">
        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
          <div className="w-12 h-12 bg-violet-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6 border border-violet-200 dark:border-slate-700">
            <GitCommit className="w-6 h-6 text-violet-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            Dependency Mapping
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Concepts build on each other. We use a graph data structure to map
            prerequisites, ensuring we understand the entire chain of your
            knowledge.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6 border border-indigo-200 dark:border-slate-700">
            <Activity className="w-6 h-6 text-indigo-600 dark:text-violet-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            Live Propagation
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            As you answer, our engine cascades the results. If you fail a core
            concept, downstream topics are automatically flagged as weak.
          </p>
        </div>

        <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-lg p-8 rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/50 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-colors">
          <div className="w-12 h-12 bg-cyan-100 dark:bg-slate-800 rounded-lg flex items-center justify-center mb-6 border border-cyan-200 dark:border-slate-700">
            <Target className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">
            AI Root Cause Analysis
          </h3>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            Powered by Groq's blazing fast LLMs, we generate a personalized,
            actionable diagnosis explaining exactly why you are failing and how
            to fix it.
          </p>
        </div>
      </div>

      <div className="w-full max-w-5xl px-4 text-center mb-24">
        <h2 className="text-3xl font-extrabold text-slate-800 dark:text-slate-100 mb-10">
          How It Works
        </h2>
        <div className="bg-white/50 dark:bg-slate-900/50 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white/40 dark:border-slate-700/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              1
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              Take Quiz
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Answer a short set of strategic questions.
            </p>
          </div>

          <div className="hidden md:block w-16 h-0.5 bg-slate-300/50 dark:bg-slate-700/50"></div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              2
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              Engine Maps
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Our algorithm draws your knowledge graph.
            </p>
          </div>

          <div className="hidden md:block w-16 h-0.5 bg-slate-300/50 dark:bg-slate-700/50"></div>

          <div className="flex flex-col items-center text-center p-4">
            <div className="w-10 h-10 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white rounded-full flex items-center justify-center font-bold text-lg mb-4">
              3
            </div>
            <h4 className="font-bold text-slate-800 dark:text-slate-100 mb-2">
              AI Diagnosis
            </h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Get your tailored fix for the root weakness.
            </p>
          </div>
        </div>
      </div>

      <footer className="w-full bg-white/40 dark:bg-slate-900/40 backdrop-blur-xl border-t border-slate-200/50 dark:border-slate-800/50 pt-10 pb-6 mt-auto">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <BrainCircuit className="w-6 h-6 text-violet-600 dark:text-cyan-400" />
            <span className="text-xl font-extrabold text-slate-800 dark:text-slate-100 tracking-tight">
              CDD<span className="text-violet-600 dark:text-cyan-400">.</span>
            </span>
          </div>

          <div className="flex gap-6 text-sm font-semibold text-slate-500 dark:text-slate-400">
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Privacy Policy
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Terms of Service
            </span>
            <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition-colors">
              Contact
            </span>
          </div>

          <div className="flex gap-5">
            {/* Github Link */}
            <a
              href="https://github.com/manikkori"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </a>

            {/* Instagram Link */}
            <a
              href="https://instagram.com/_the.manik/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>

            {/* LinkedIn Link */}
            <a
              href="https://www.linkedin.com/in/manik-kori/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect width="4" height="12" x="2" y="9" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

        <div className="text-center mt-10 text-xs font-medium text-slate-400 dark:text-slate-500">
          &copy; {new Date().getFullYear()} Concept Dependency Debugger. All
          rights reserved.
        </div>
      </footer>
    </div>
  );
}
