import React from "react";
import Link from "next/link";
import { HelpCircle, ArrowRight, AlertTriangle, ShieldCheck, Sparkles } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | Data Science Job-Ready Academy",
  description:
    "Direct, transparent answers regarding prerequisites, program length, practical projects, grading, and job guarantees.",
};

const faqs = [
  {
    q: "Is this platform suitable for complete beginners?",
    a: "No. This is an advanced practical assessment and project platform, not an introductory teaching course. It is designed for learners who have already studied Data Science fundamentals and need real, rigorous hands-on practice.",
    highlight: false,
  },
  {
    q: "Do I need prior Python knowledge?",
    a: "Yes. You must already be comfortable writing Python scripts, working with data structures (lists, dicts), writing functions, and using core libraries like Pandas and NumPy. We do not teach basic syntax.",
    highlight: false,
  },
  {
    q: "How long is the program?",
    a: "The program spans 6 months (24 structured weeks). It follows a self-paced execution model with weekly milestones and deadlines to keep you accountable.",
    highlight: false,
  },
  {
    q: "Are there practical examinations?",
    a: "Yes. In addition to regular challenges and assignments, you will complete timed assessments combining MCQ knowledge checks with file-based practical tests.",
    highlight: false,
  },
  {
    q: "Will I work on real-world projects?",
    a: "Yes. You will work on substantial end-to-end projects featuring messy, incomplete datasets with business problem statements, requiring you to make informed cleaning, modeling, and analytical decisions.",
    highlight: false,
  },
  {
    q: "Can I work on group projects?",
    a: "You will start with individual projects to establish personal competency. Group and cohort/batch project workflows will be supported as the curriculum advances.",
    highlight: false,
  },
  {
    q: "Will instructors evaluate my submissions?",
    a: "Yes. Practical challenges, assignments, and projects are evaluated by instructors using a standardized grading rubric covering code quality, data correctness, handling techniques, interpretation, and documentation.",
    highlight: false,
  },
  {
    q: "Does completing the program guarantee a job?",
    a: "No. We strictly do not guarantee employment, salary tiers, or employer placements. What we guarantee is a rigorous assessment environment that builds demonstrable, job-relevant skills and an evaluated portfolio to show employers.",
    highlight: true,
  },
];

export default function FAQPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse-slow" />
            Clear Answers
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Everything you need to know about our prerequisites, training structure, expectations, and honest policies.
          </p>
        </div>

        {/* FAQ LIST */}
        <div className="mt-12 space-y-6">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className={`rounded-2xl border p-6 sm:p-8 card-hover-lift group backdrop-blur-md ${
                faq.highlight
                  ? "bg-amber-50/80 border-amber-300"
                  : "bg-white/85 border-slate-200/90 shadow-sm"
              }`}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 group-hover:scale-110 transition-transform ${
                    faq.highlight
                      ? "bg-amber-100 text-amber-800"
                      : "bg-teal-50 text-teal-700 group-hover:bg-teal-500 group-hover:text-white transition-colors"
                  }`}
                >
                  {faq.highlight ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <HelpCircle className="w-4 h-4" />
                  )}
                </div>
                <div className="space-y-2">
                  <h3
                    className={`text-lg sm:text-xl font-bold transition-colors ${
                      faq.highlight ? "text-amber-950" : "text-navy-950 group-hover:text-teal-700"
                    }`}
                  >
                    {faq.q}
                  </h3>
                  <p
                    className={`text-sm sm:text-base leading-relaxed ${
                      faq.highlight ? "text-amber-900" : "text-slate-600"
                    }`}
                  >
                    {faq.a}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-navy-950 text-white rounded-2xl p-8 sm:p-10 border border-navy-850 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl card-hover-lift">
          <div className="space-y-1">
            <h3 className="text-xl font-bold">Have additional questions?</h3>
            <p className="text-slate-300 text-sm">
              Review our 6-month roadmap or check the program blueprint.
            </p>
          </div>
          <Link
            href="/program"
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-sm shrink-0 inline-flex items-center gap-2 group transition-all transform hover:-translate-y-0.5 shadow-md"
          >
            <span>Program Details</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
