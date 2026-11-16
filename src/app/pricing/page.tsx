import React from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Sparkles, ShieldCheck, ArrowRight, Bell } from "lucide-react";

export const metadata = {
  title: "Pricing & Enrollment | Data Science Job-Ready Academy",
  description:
    "Pricing structure and inclusions for the 6-month Data Science practical assessment program. Full transparency with no fabricated figures.",
};

const inclusions = [
  "Complete 6-Month / 24-Week structured roadmap access",
  "Realistic scenario briefs and raw datasets (not toy datasets)",
  "Graded Python, Pandas, NumPy, and SQL challenges",
  "End-to-end data analysis and Machine Learning assignments",
  "Timed practical and theoretical examinations",
  "Standardized 5-pillar rubric grading by human instructors",
  "Written feedback and code quality critique on submissions",
  "Integrated student portfolio compiling all validated work",
  "Comprehensive Capstone project defense",
];

export default function PricingPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse-slow" />
            Investment in Competency
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Transparent Academy Enrollment
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            All-inclusive access to the 24-week curriculum, practical challenges, instructor evaluations, and portfolio evidence.
          </p>
        </div>

        {/* PRICING CARD */}
        <div className="mt-12 max-w-2xl mx-auto">
          <div className="bg-white/85 backdrop-blur-md rounded-3xl border-2 border-slate-200/90 shadow-2xl overflow-hidden card-hover-lift">
            {/* Top Badge */}
            <div className="bg-navy-950 text-white px-8 py-4 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-2">
                <Sparkles className="w-4 h-4 animate-pulse-slow" />
                6-Month Practical Cohort
              </span>
              <span className="text-xs bg-navy-850 px-3 py-1 rounded-full text-slate-300 font-semibold border border-navy-700">
                Bangladesh &amp; International
              </span>
            </div>

            {/* Price Announcement Banner */}
            <div className="p-8 sm:p-10 border-b border-slate-100 bg-slate-50/70 space-y-4 text-center">
              <span className="inline-block px-3.5 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider animate-pulse-slow">
                Enrollment Opening Soon
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-navy-950">
                Pricing Announcement Coming Soon
              </h2>
              <p className="text-slate-600 text-sm max-w-md mx-auto leading-relaxed">
                We are finalizing affordable cohort pricing tiers for Bangladesh and international students. No fabricated figures or hidden fees.
              </p>
            </div>

            {/* Inclusions List */}
            <div className="p-8 sm:p-10 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                Everything Included In The Program:
              </h3>
              <ul className="space-y-3.5 text-sm text-slate-700">
                {inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 group">
                    <CheckCircle2 className="w-5 h-5 text-teal-600 shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-navy-950 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/register"
                  className="w-full py-3.5 px-6 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-center text-sm shadow transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                >
                  <Bell className="w-4 h-4 text-teal-400" />
                  <span>Register for Updates</span>
                </Link>
                <Link
                  href="/faq"
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-center text-sm transition-colors"
                >
                  Read FAQ
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* SECURITY & PAYMENT NOTE */}
        <div className="mt-12 text-center max-w-xl mx-auto space-y-2 text-xs text-slate-500">
          <p className="flex items-center justify-center gap-1.5 font-medium text-slate-600">
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            Verified Enrollment Verification
          </p>
          <p>
            Payment integration (local Bangladesh payment gateways &amp; international cards) will be enabled after curriculum onboarding.
          </p>
        </div>
      </div>
    </div>
  );
}
