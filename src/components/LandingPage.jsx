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
    <div className="w-full flex flex-col items-center animate-fade-in pb-12 -mt-6 font-sans ">
      {/* Hero Section */}
      <div className="w-full max-w-4xl flex flex-col items-center text-center mt-12 mb-20 px-4">
        <div className="mb-6 p-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-lg border border-white/40 dark:border-slate-700/50 inline-block">
          <BrainCircuit className="w-16 h-16 text-violet-600 dark:text-cyan-400" />
        </div>

        {/* Main Heading: Scaled properly, not too huge, but bold and punchy */}
        <h1 className="text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mb-6 transition-colors drop-shadow-sm leading-tight">
          Concept Dependency <br className="hidden sm:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-600 to-indigo-600 dark:from-cyan-400 dark:to-violet-400">
            Debugger
          </span>
        </h1>

        {/* The Stylish Tagline: Brought back the curves and style (not straight), but kept size balanced */}
        <p className="font-stylish italic text-2xl md:text-3xl text-slate-600 dark:text-slate-300 mb-8 max-w-3xl transition-colors">
          "Uncover the hidden gaps in your knowledge, before they break your
          foundation."
        </p>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mb-10 leading-relaxed text-lg">
          Traditional tests only tell you what you got wrong. Our intelligent
          propagation engine maps your exact understanding across complex
          subjects to pinpoint the root cause holding you back.
        </p>

        {/* CTA Button */}
        <button
          onClick={onStart}
          className="group flex items-center gap-3 bg-slate-900 dark:bg-gradient-to-r dark:from-violet-600 dark:to-cyan-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-violet-700 dark:hover:from-violet-500 dark:hover:to-cyan-500 transition-all shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
        >
          Start Your Free Assessment
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Features / Value Proposition Section - RESTORED TO ORIGINAL BIG SIZES */}
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6 px-4 mb-20">
        {/* Feature Card 1 */}
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

        {/* Feature Card 2 */}
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

        {/* Feature Card 3 */}
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

      {/* How it Works Section - RESTORED TO ORIGINAL BIG SIZES */}
      <div className="w-full max-w-5xl px-4 text-center">
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
    </div>
  );
}
