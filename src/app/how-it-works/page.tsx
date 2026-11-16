import React from "react";
import Link from "next/link";
import {
  UserPlus,
  LayoutDashboard,
  FileSpreadsheet,
  Laptop,
  UploadCloud,
  Timer,
  CheckCircle2,
  FolderKanban,
  Trophy,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export const metadata = {
  title: "How It Works | Data Science Job-Ready Academy",
  description:
    "The 9-step student journey: from enrollment and realistic dataset challenges to submission, instructor feedback, and capstone portfolio evidence.",
};

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Register & Enroll",
    desc: "Create your student account and access the 6-month Data Science practical track.",
  },
  {
    step: "02",
    icon: LayoutDashboard,
    title: "Access Student Dashboard",
    desc: "Review your current active stage, weekly deadlines, pending tasks, and evaluation history.",
  },
  {
    step: "03",
    icon: FileSpreadsheet,
    title: "Receive Practical Challenges & Datasets",
    desc: "Download scenario briefs and raw datasets with clear business questions and data dictionaries.",
  },
  {
    step: "04",
    icon: Laptop,
    title: "Execute in Your Own Environment",
    desc: "Work on your local machine using professional tools (VS Code, Jupyter, Python, PostgreSQL).",
  },
  {
    step: "05",
    icon: UploadCloud,
    title: "Submit Code, Notebooks & Reports",
    desc: "Upload your completed solution files (.py, .ipynb, .sql, .pdf) before the deadline.",
  },
  {
    step: "06",
    icon: Timer,
    title: "Complete Timed Examinations",
    desc: "Take structured knowledge assessments and timed challenge tests to benchmark your technical memory.",
  },
  {
    step: "07",
    icon: CheckCircle2,
    title: "Receive Detailed Instructor Evaluations",
    desc: "Get rubric-based scoring across correctness, code quality, methodology, and comprehensive written feedback.",
  },
  {
    step: "08",
    icon: FolderKanban,
    title: "Build Your Verified Portfolio",
    desc: "Graduated assignments and validated projects automatically accumulate into your verified skill portfolio.",
  },
  {
    step: "09",
    icon: Trophy,
    title: "Complete Your Capstone Defense",
    desc: "Deliver a full end-to-end industry project that demonstrates your complete job-readiness.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse-slow" />
            Step-by-Step Experience
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            How The Academy Works
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A transparent 9-step progression built entirely around hands-on execution.
            You do the actual work, submit verifiable deliverables, and get graded by real evaluators.
          </p>
        </div>

        {/* 9-STEP GRID */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200/90 p-8 shadow-sm card-hover-lift group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-teal-600 transition-colors">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-110 group-hover:bg-teal-500 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-navy-950 group-hover:text-teal-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* RUBRIC SPOTLIGHT */}
        <div className="mt-16 bg-navy-950 text-white rounded-2xl p-8 lg:p-12 border border-navy-850 shadow-xl card-hover-lift relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-3 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-teal-400">
              Evaluation Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Sample Grading Rubric: Practical Data Assignments
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Every assignment is evaluated transparently across 5 objective pillars to ensure real code quality and data integrity.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-navy-900/90 backdrop-blur-sm border border-navy-800 rounded-xl p-5 space-y-2 hover:border-teal-500/50 hover:bg-navy-850 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-2xl font-extrabold text-teal-400">30%</span>
              <h4 className="text-sm font-bold text-white">Data Correctness</h4>
              <p className="text-xs text-slate-400">Accurate calculations, no logic bugs, proper handling of edge cases.</p>
            </div>
            <div className="bg-navy-900/90 backdrop-blur-sm border border-navy-800 rounded-xl p-5 space-y-2 hover:border-teal-500/50 hover:bg-navy-850 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-2xl font-extrabold text-teal-400">20%</span>
              <h4 className="text-sm font-bold text-white">Code Quality</h4>
              <p className="text-xs text-slate-400">Clean modular functions, PEP 8 styling, vectorization, no spaghetti code.</p>
            </div>
            <div className="bg-navy-900/90 backdrop-blur-sm border border-navy-800 rounded-xl p-5 space-y-2 hover:border-teal-500/50 hover:bg-navy-850 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-2xl font-extrabold text-teal-400">25%</span>
              <h4 className="text-sm font-bold text-white">Data Handling</h4>
              <p className="text-xs text-slate-400">Justified missing value strategy, outlier management, schema discipline.</p>
            </div>
            <div className="bg-navy-900/90 backdrop-blur-sm border border-navy-800 rounded-xl p-5 space-y-2 hover:border-teal-500/50 hover:bg-navy-850 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-2xl font-extrabold text-teal-400">15%</span>
              <h4 className="text-sm font-bold text-white">Interpretation</h4>
              <p className="text-xs text-slate-400">Meaningful conclusions that tie data back to actionable business questions.</p>
            </div>
            <div className="bg-navy-900/90 backdrop-blur-sm border border-navy-800 rounded-xl p-5 space-y-2 hover:border-teal-500/50 hover:bg-navy-850 transition-all duration-300 transform hover:-translate-y-1">
              <span className="text-2xl font-extrabold text-teal-400">10%</span>
              <h4 className="text-sm font-bold text-white">Documentation</h4>
              <p className="text-xs text-slate-400">Clear markdown explanations, schema definitions, and run instructions.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center space-y-4">
          <Link
            href="/register"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-800 font-semibold text-base shadow-md transition-all transform hover:-translate-y-0.5 group"
          >
            <span>Create Your Student Account</span>
            <ArrowRight className="w-4 h-4 text-teal-400 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
