import React from "react";
import Link from "next/link";
import { Terminal, Shield, Target, Compass, Award, CheckCircle2, ArrowRight } from "lucide-react";

export const metadata = {
  title: "About & Philosophy | Data Science Job-Ready Academy",
  description:
    "Learn about our practice-first mission: Don't just learn Data Science. Prove that you can do Data Science.",
};

export default function AboutPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            Our Mission &amp; Purpose
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Don&apos;t Just Learn Data Science. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
              Prove That You Can Do It.
            </span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Data Science Job-Ready Academy was created with a single objective: to replace passive lecture-watching with rigorous, feedback-driven practice for learners who already know the basics.
          </p>
        </div>

        {/* CORE VALUES */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">Execution Over Theory</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Real world Data Science isn&apos;t memorizing formulas; it is debugging pipelines, cleaning dirty datasets, defending model assumptions, and writing maintainable code.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-cyan-50 text-cyan-700 flex items-center justify-center">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">Objective Rubrics &amp; Human Review</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Every substantial deliverable is assessed against transparent criteria. Students receive actionable critique to elevate their work to industry standards.
            </p>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-4">
            <div className="w-12 h-12 rounded-xl bg-navy-50 text-navy-800 flex items-center justify-center">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-navy-950">Demonstrable Evidence</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Certificates of completion carry little weight with technical hiring managers. What matters is a verified trail of complex projects, clean repos, and analyzed datasets.
            </p>
          </div>
        </div>

        {/* TRADITIONAL VS ACADEMY COMPARISON TABLE */}
        <div className="mt-16 bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-6 bg-slate-50 border-b border-slate-200">
            <h2 className="text-2xl font-bold text-navy-950">
              Traditional Online Courses vs. Data Science Job-Ready Academy
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              A clear contrast in philosophy and design.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-4 px-6 font-semibold w-1/3">Aspect</th>
                  <th className="py-4 px-6 font-semibold w-1/3 text-slate-500">Traditional Course Platform</th>
                  <th className="py-4 px-6 font-semibold w-1/3 text-teal-800 bg-teal-50/50">Data Science Job-Ready Academy</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-4 px-6 font-medium text-navy-950">Starting Point</td>
                  <td className="py-4 px-6 text-slate-600">Teaches syntax from scratch</td>
                  <td className="py-4 px-6 text-teal-900 bg-teal-50/30 font-medium">Assumes you already know fundamentals</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-navy-950">Primary Activity</td>
                  <td className="py-4 px-6 text-slate-600">Watching video lessons &amp; slides</td>
                  <td className="py-4 px-6 text-teal-900 bg-teal-50/30 font-medium">Solving realistic challenges &amp; projects</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-navy-950">Progress Metric</td>
                  <td className="py-4 px-6 text-slate-600">Video watch percentage</td>
                  <td className="py-4 px-6 text-teal-900 bg-teal-50/30 font-medium">Submitted, scored, and passed deliverables</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-navy-950">Feedback Mechanism</td>
                  <td className="py-4 px-6 text-slate-600">None or automated true/false quizzes</td>
                  <td className="py-4 px-6 text-teal-900 bg-teal-50/30 font-medium">Instructor evaluations with rubric scores &amp; written feedback</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-navy-950">Primary Outcome</td>
                  <td className="py-4 px-6 text-slate-600">Paper certificate of completion</td>
                  <td className="py-4 px-6 text-teal-900 bg-teal-50/30 font-medium">Verified portfolio, capstone defense, and demonstrable skill proof</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ETHICAL COMMITMENT */}
        <div className="mt-16 bg-slate-100/70 rounded-2xl p-8 border border-slate-200 space-y-4">
          <h3 className="text-lg font-bold text-navy-950">Our Commitment to Honesty</h3>
          <p className="text-sm text-slate-600 leading-relaxed max-w-3xl">
            We do not sell false promises. We will never guarantee that enrolling in our platform automatically awards you a job, fixed salary tier, or corporate placement. Your career success depends on your dedication, consistent coding habits, and the tangible quality of work you produce.
          </p>
          <div className="pt-2">
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 hover:text-teal-700"
            >
              <span>Read frequently asked questions</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
