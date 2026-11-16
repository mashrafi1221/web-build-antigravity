import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  AlertCircle,
  Clock,
  Layers,
  FileSpreadsheet,
  Award,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

export const metadata = {
  title: "Program Overview | Data Science Job-Ready Academy",
  description:
    "Detailed breakdown of the 6-month Data Science practical assessment program. Prerequisites, activities, assessment methods, and expected outcomes.",
};

export default function ProgramPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Curriculum Architecture
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Six-Month Practical Training &amp; Assessment Program
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            A structured, deadline-driven execution environment designed to transform theoretical
            understanding into proven, end-to-end data science capabilities.
          </p>
        </div>

        {/* PREREQUISITES & AUDIENCE NOTICE */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-navy-950">Who This Program Is For</h2>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              This program is built specifically for aspiring Data Scientists who already have foundational knowledge and now need realistic execution experience:
            </p>
            <ul className="space-y-2.5 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                Learners who have taken introductory Python and Data Science courses.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                Graduates or career switchers seeking demonstrable, portfolio-grade project evidence.
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                Professionals wanting structured deadlines, rigorous grading, and expert critique.
              </li>
            </ul>
          </div>

          <div className="bg-amber-50/50 rounded-2xl border border-amber-200 p-8 shadow-sm space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-bold text-amber-950">Required Prior Knowledge</h2>
            </div>
            <p className="text-sm text-amber-900 leading-relaxed font-medium">
              We do NOT teach basic programming from scratch. You must already be comfortable with:
            </p>
            <ul className="space-y-2 text-sm text-amber-900/90">
              <li>• Python syntax, loops, functions, and data structures.</li>
              <li>• Basic Pandas dataframe operations and NumPy vectorization.</li>
              <li>• Basic SQL querying (SELECT, WHERE, JOIN, GROUP BY).</li>
              <li>• Introductory statistics (mean, median, standard deviation, distributions).</li>
              <li>• High-level understanding of Machine Learning concepts (supervised vs. unsupervised).</li>
            </ul>
          </div>
        </div>

        {/* CORE SPECIFICATIONS TABLE */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="px-6 py-5 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <h3 className="font-bold text-navy-950 text-lg">Program Blueprint At A Glance</h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-navy-900 text-white rounded-md">
              24-Week Schedule
            </span>
          </div>
          <div className="divide-y divide-slate-100 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-2">
              <span className="font-semibold text-navy-950">Duration</span>
              <span className="sm:col-span-2 text-slate-700">6 Months (24 structured weeks)</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-2">
              <span className="font-semibold text-navy-950">Delivery Model</span>
              <span className="sm:col-span-2 text-slate-700">Self-paced execution with fixed weekly milestones and assignment submission deadlines.</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-2">
              <span className="font-semibold text-navy-950">Target Geography</span>
              <span className="sm:col-span-2 text-slate-700">Bangladesh and international remote participants.</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-2">
              <span className="font-semibold text-navy-950">Practical Deliverables</span>
              <span className="sm:col-span-2 text-slate-700">Python scripts, Jupyter Notebooks (.ipynb), SQL queries, data cleaning reports, model evaluation summaries, and final Capstone.</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-2">
              <span className="font-semibold text-navy-950">Assessment Framework</span>
              <span className="sm:col-span-2 text-slate-700">Automated grading for benchmark quizzes/MCQs + instructor rubric scoring (data correctness, code quality, methodology, interpretation, and documentation).</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 p-5 gap-2">
              <span className="font-semibold text-navy-950">Project Working Mode</span>
              <span className="sm:col-span-2 text-slate-700">Individual projects initially; group and batch project workflows supported as the curriculum advances.</span>
            </div>
          </div>
        </div>

        {/* EXPECTED OUTCOMES */}
        <div className="mt-16 space-y-8">
          <div className="max-w-3xl space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-navy-950">
              Measurable Outcomes Upon Completion
            </h2>
            <p className="text-slate-600">
              We focus on tangible proof of competence. When you finish this program, your achievements are substantiated by verified work:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
              <Layers className="w-6 h-6 text-teal-600" />
              <h3 className="font-bold text-navy-950">End-to-End Project Portfolio</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                A repository of completed, evaluated projects proving you can take ambiguous raw data and deliver structured analytical conclusions.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
              <FileSpreadsheet className="w-6 h-6 text-cyan-600" />
              <h3 className="font-bold text-navy-950">Real Data Handling Reflexes</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Experience diagnosing encoding errors, missing data patterns, schema mismatches, and data leakage without hand-holding.
              </p>
            </div>

            <div className="p-6 bg-white rounded-xl border border-slate-200 shadow-sm space-y-3">
              <ShieldCheck className="w-6 h-6 text-navy-800" />
              <h3 className="font-bold text-navy-950">Evaluated Capstone Evidence</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                An exhaustive, instructor-audited capstone model and business presentation ready to showcase during technical interviews.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-navy-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Ready to review the full 24-week schedule?</h3>
            <p className="text-slate-300 text-sm">
              Explore the week-by-week progression and practical focus areas.
            </p>
          </div>
          <Link
            href="/roadmap"
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm shrink-0 inline-flex items-center gap-2"
          >
            <span>View Full Roadmap</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
