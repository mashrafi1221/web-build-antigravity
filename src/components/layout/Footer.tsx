import React from "react";
import Link from "next/link";
import { Terminal, ShieldCheck, Database, Award } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-navy-950 text-slate-300 border-t border-navy-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Col 1: Brand & Philosophy */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-navy-800 text-teal-400 flex items-center justify-center font-bold">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">
                Data Science Job-Ready Academy
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Don&apos;t just learn Data Science. Prove that you can do Data Science.
              A rigorous 6-month hands-on assessment, challenge, and project platform designed for learners ready to build demonstrable skills.
            </p>
            <div className="flex items-center gap-4 pt-2 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-teal-400" />
                Human Instructor Review
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Database className="w-4 h-4 text-cyan-400" />
                Real-World Datasets
              </span>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Academy
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/program" className="hover:text-white transition-colors">
                  Program Overview
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-white transition-colors">
                  6-Month Roadmap
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Information */}
          <div>
            <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Platform & Legal
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About & Philosophy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Student Sign In
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-white transition-colors">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Guardrail Disclaimer & Copyright */}
        <div className="mt-12 pt-8 border-t border-navy-850 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="max-w-2xl leading-relaxed">
            <span className="font-semibold text-slate-300">Important Disclaimer:</span> Data Science Job-Ready Academy is a practical assessment and training platform. We do not promise guaranteed jobs, fixed salary placements, or employer partnerships. Advancement depends on your personal effort, code quality, and demonstrated competency.
          </p>
          <p className="shrink-0">
            &copy; {new Date().getFullYear()} Data Science Job-Ready Academy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
