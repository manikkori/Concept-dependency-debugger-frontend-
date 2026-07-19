import React from "react";
import {
  BrainCircuit,
  ArrowRight,
  Target,
  Activity,
  GitCommit,
} from "lucide-react";

function DependencyPreview() {
  return (
    <div className="w-full max-w-[320px] rounded-2xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-4 shadow-2xl shadow-black/20">
      <svg
        viewBox="0 0 320 300"
        className="h-auto w-full"
        role="img"
        aria-label="Animated concept dependency graph showing a root cause flowing to downstream concepts"
      >
        <defs>
          <filter id="amberGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[68, 118, 168, 218].map((startY, index) => (
          <g key={startY}>
            <line
              x1="160"
              y1={startY + 14}
              x2="160"
              y2={startY + 36}
              stroke="var(--border-hairline)"
              strokeWidth="2"
            />
            <line
              className={`dependency-flow flow-${index + 1}`}
              x1="160"
              y1={startY + 14}
              x2="160"
              y2={startY + 36}
              stroke="var(--accent-amber)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </g>
        ))}

        <g className="dependency-root" filter="url(#amberGlow)">
          <rect x="104" y="30" width="112" height="38" rx="9" fill="var(--bg-surface)" stroke="var(--accent-amber)" strokeWidth="2.5" />
          <text x="160" y="54" fill="var(--accent-amber)" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="10" fontWeight="700">
            ROOT GAP
          </text>
        </g>

        {[
          [100, "prerequisite"],
          [150, "concept"],
          [200, "application"],
          [250, "outcome"],
        ].map(([y, label]) => (
          <g key={label}>
            <rect x="112" y={y} width="96" height="32" rx="8" fill="var(--bg-base)" stroke="var(--border-hairline)" strokeWidth="1.5" />
            <text x="160" y={Number(y) + 20} fill="var(--text-muted)" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fontWeight="500">
              {label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

const features = [
  {
    title: "Dependency Mapping",
    description:
      "Concepts build on each other. We map prerequisites to understand the full chain behind your answer.",
    icon: GitCommit,
    accent: "text-[var(--accent-amber)]",
  },
  {
    title: "Live Propagation",
    description:
      "A weak foundation travels through the graph, separating its downstream effects from the original gap.",
    icon: Activity,
    accent: "text-[var(--accent-green)]",
  },
  {
    title: "AI Root Cause Analysis",
    description:
      "Receive a focused explanation of what to strengthen first and what to study next.",
    icon: Target,
    accent: "text-[var(--accent-amber)]",
  },
];

const steps = [
  ["$ take_quiz", "Answer a short set of strategic questions."],
  ["$ engine.map()", "The engine maps performance through the dependency graph."],
  ["$ diagnose() -> root_cause_found", "Get a clear, practical next step for the foundation that needs attention."],
];

export default function LandingPage({ onStart }) {
  return (
    <div className="w-full font-body text-[var(--text-primary)]">
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 pb-20 pt-16 lg:grid-cols-[1.15fr_0.85fr] lg:pb-28 lg:pt-24">
        <div className="max-w-3xl">
          <p className="mb-5 font-display text-xs font-bold tracking-wide text-[var(--accent-amber)]">
            &gt; Concept_Dependency_Debugger
          </p>
          <h1 className="font-display text-4xl font-bold leading-[1.08] tracking-[-0.06em] text-[var(--text-primary)] sm:text-5xl lg:text-6xl">
            Trace the gap.
            <br />
            Fix the <span className="text-[var(--accent-amber)]">foundation.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-8 text-[var(--text-muted)] sm:text-lg">
            Concept Dependency Debugger traces failures through a learning graph
            to identify the root gap - not just the questions you missed.
          </p>
          <button
            onClick={onStart}
            className="group mt-9 inline-flex items-center gap-3 rounded-lg bg-[var(--accent-green)] px-6 py-3.5 font-display text-sm font-bold text-[#07120d] transition-colors hover:bg-[#52dfa0] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-green)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg-base)]"
          >
            Start your assessment
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <div className="flex justify-center lg:justify-end">
          <DependencyPreview />
        </div>
      </section>

      <section className="mx-auto mb-20 grid w-full max-w-6xl grid-cols-1 gap-4 md:grid-cols-3 lg:mb-28">
        {features.map(({ title, description, icon: Icon, accent }) => (
          <article
            key={title}
            className="rounded-xl border border-[var(--border-hairline)] bg-[var(--bg-surface)] p-6"
          >
            <Icon className={`mb-6 h-5 w-5 ${accent}`} />
            <h2 className="font-display text-base font-bold tracking-[-0.03em] text-[var(--text-primary)]">
              {title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
              {description}
            </p>
          </article>
        ))}
      </section>

      <section className="mx-auto mb-24 w-full max-w-6xl lg:mb-28">
        <p className="mb-4 font-display text-xs font-bold tracking-wide text-[var(--accent-amber)]">
          // workflow
        </p>
        <h2 className="font-display text-2xl font-bold tracking-[-0.05em] text-[var(--text-primary)] sm:text-3xl">
          How it works
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
          {steps.map(([command, description]) => (
            <div
              key={command}
              className="border-l border-[var(--border-hairline)] py-2 pl-5"
            >
              <p className="font-display text-sm font-bold text-[var(--accent-green)]">
                {command}
              </p>
              <p className="mt-3 text-sm leading-6 text-[var(--text-muted)]">
                {description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[var(--border-hairline)] py-8">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 text-sm text-[var(--text-muted)] sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2 font-display text-sm font-bold text-[var(--text-primary)]">
            <BrainCircuit className="h-4 w-4 text-[var(--accent-amber)]" />
            CDD.
          </div>
          <span>Concept Dependency Debugger (developed by <a style={{color:'white'}} href="https://the-manik.vercel.app">Manik</a>) </span>
          <span>&copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
