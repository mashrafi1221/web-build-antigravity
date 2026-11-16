import React from "react";
import Link from "next/link";
import {
  Code2,
  Database,
  FileCheck2,
  Users2,
  FolderGit2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-32 bg-gradient-to-b from-white via-slate-50 to-slate-100 border-b border-slate-200">
        {/* Ambient background glow dots */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[250px] bg-cyan-400/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto space-y-6">
            {/* Animated Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50/90 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-sm animate-fade-in hover:bg-teal-100 transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse-slow" />
              <span>Six-Month Practical Training &amp; Assessment Platform</span>
            </div>

            {/* Headline with Fade-In-Up */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-navy-950 tracking-tight leading-tight animate-fade-in-up">
              Turn Your Data Science Knowledge Into{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-cyan-600 to-navy-800 hover:from-teal-500 hover:to-cyan-500 transition-all duration-300">
                Practical Skills.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto animate-fade-in-up animation-delay-100">
              Six months of hands-on challenges, real-world assignments, practical examinations,
              and projects designed to help you build demonstrable Data Science skills.
            </p>

            {/* Core Value Tag */}
            <div className="p-3.5 bg-navy-950/5 border border-navy-900/10 rounded-xl inline-block text-sm text-navy-900 font-medium animate-fade-in-up animation-delay-200 backdrop-blur-sm">
              💡 <strong>Core Rule:</strong> Not an introductory video course. Designed specifically for learners who already understand fundamentals and need real execution experience.
            </div>

            {/* Action Buttons */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up animation-delay-300">
              <Link
                href="/program"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-800 font-semibold text-base shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2 group"
              >
                <span>Explore the Program</span>
                <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1.5 transition-transform" />
              </Link>
              <Link
                href="/roadmap"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-slate-300 text-slate-700 hover:text-navy-950 hover:bg-slate-50 hover:border-slate-400 font-semibold text-base shadow-sm transition-all transform hover:-translate-y-0.5 flex items-center justify-center"
              >
                View the 6-Month Roadmap
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-12 shadow-sm card-hover-lift">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 text-amber-700 bg-amber-50 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider border border-amber-200">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              The Industry Reality
            </div>
            <h2 className="text-3xl font-bold text-navy-950">
              Why Theoretical Courses Fail to Get You Hired
            </h2>
            <p className="text-slate-600 leading-relaxed">
              Watching 80 hours of video lectures creates a false feeling of competency. When confronted with ambiguous business requirements, dirty real-world data, and technical evaluations, the theory collapses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-xl bg-rose-50/50 border border-rose-200 space-y-3 transition-transform hover:-translate-y-1">
              <h3 className="font-semibold text-rose-900 text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
                The Passive Learning Trap
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  Passive video viewing without accountability.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  Toy datasets (like Titanic or Iris) with zero real business context.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  Copy-pasting teacher code without debugging independently.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  Completion certificates that hiring managers ignore.
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-xl bg-teal-50/50 border border-teal-200 space-y-3 transition-transform hover:-translate-y-1">
              <h3 className="font-semibold text-teal-950 text-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse" />
                The Practice-First Solution
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  Real tasks with business problem statements and data dictionaries.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  Messy, incomplete datasets requiring cleaning and exploratory analysis.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  Rigorous code submissions evaluated against standardized rubrics.
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  Concrete portfolio proof showing end-to-end data pipelines and models.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5 CORE PILLARS / PLATFORM FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-navy-950">
            Built for Practical Proof
          </h2>
          <p className="text-slate-600">
            Every component of Data Science Job-Ready Academy is structured to produce verified competency.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 card-hover-lift group">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
              <Code2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 group-hover:text-teal-700 transition-colors">
              Practical Challenges
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Targeted Python, Pandas, and SQL exercises that test real data manipulation, transformation, and edge-case handling on realistic files.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 card-hover-lift group">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all duration-300">
              <Database className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 group-hover:text-cyan-700 transition-colors">
              Real-World Projects
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              End-to-end data analysis and Machine Learning tasks based on messy real-world scenarios with defined business deliverables.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 card-hover-lift group">
            <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
              <FileCheck2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 group-hover:text-indigo-700 transition-colors">
              Practical Examinations
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Timed theoretical and practical evaluations with MCQ benchmarks and file submission assessments to test knowledge retention.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 card-hover-lift group md:col-span-1">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
              <Users2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 group-hover:text-emerald-700 transition-colors">
              Instructor Feedback
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Human review on project submissions with detailed rubric-based marks, code quality notes, and data interpretation critique.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 card-hover-lift group md:col-span-2">
            <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center group-hover:bg-navy-900 group-hover:text-teal-400 transition-all duration-300">
              <FolderGit2 className="w-6 h-6 group-hover:scale-110 transition-transform" />
            </div>
            <h3 className="text-xl font-bold text-navy-950 group-hover:text-navy-800 transition-colors">
              Portfolio Development &amp; Capstone
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Collect verified evidence of your work throughout the 6 months. Conclude with a comprehensive Capstone Project that documents your ability to execute end-to-end Data Science workflows.
            </p>
          </div>
        </div>
      </section>

      {/* ROADMAP PREVIEW */}
      <section className="bg-navy-950 text-white py-20 border-y border-navy-850 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-[500px] h-[300px] bg-teal-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="space-y-2">
              <span className="text-teal-400 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                <Zap className="w-4 h-4 text-teal-400" />
                Six-Month Curriculum Framework
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                24 Weeks of Disciplined Practice
              </h2>
            </div>
            <Link
              href="/roadmap"
              className="inline-flex items-center gap-2 text-teal-400 hover:text-teal-300 font-semibold text-sm group transition-colors"
            >
              <span>Explore Complete Roadmap</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                month: "Month 1",
                title: "Python & Data Manipulation",
                desc: "Data wrangling with Pandas, NumPy vectorization, data ingestion, and cleaning tasks.",
              },
              {
                month: "Month 2",
                title: "Data Cleaning & EDA",
                desc: "Handling missing values, outlier detection, distribution analysis, and business reports.",
              },
              {
                month: "Month 3",
                title: "SQL, Statistics & Visualization",
                desc: "Complex SQL queries, hypothesis testing, statistical modeling, and analytical dashboards.",
              },
              {
                month: "Month 4",
                title: "Machine Learning Foundations",
                desc: "Supervised algorithms, regression, classification, metric selection, and model tuning.",
              },
              {
                month: "Month 5",
                title: "Advanced ML & Evaluation",
                desc: "Feature engineering, ensemble models, validation strategies, and error analysis.",
              },
              {
                month: "Month 6",
                title: "Real-World Projects & Capstone",
                desc: "Comprehensive end-to-end industry project demonstrating complete delivery workflow.",
              },
            ].map((step, idx) => (
              <div
                key={idx}
                className="bg-navy-900 border border-navy-800 rounded-xl p-6 space-y-3 hover:border-teal-400/50 hover:bg-navy-850 transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-400 bg-teal-950/80 px-2.5 py-1 rounded-md border border-teal-800 group-hover:border-teal-600 transition-colors">
                    {step.month}
                  </span>
                  <Clock className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-teal-200 transition-colors">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-gradient-to-r from-navy-900 via-navy-850 to-navy-900 text-white rounded-3xl p-10 sm:p-14 border border-navy-800 shadow-xl space-y-6 relative overflow-hidden card-hover-lift">
          <div className="absolute inset-0 bg-radial-gradient opacity-30 pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Stop Watching Tutorials. Start Proving Your Capability.
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Join the 6-month hands-on assessment academy. Complete real tasks, receive strict instructor reviews, and graduate with verifiable project evidence.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-base shadow-md hover:shadow-teal-500/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2 group"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/program"
              className="px-8 py-3.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-white font-semibold text-base border border-navy-700 transition-all transform hover:-translate-y-0.5 inline-flex items-center justify-center"
            >
              Review Requirements
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
