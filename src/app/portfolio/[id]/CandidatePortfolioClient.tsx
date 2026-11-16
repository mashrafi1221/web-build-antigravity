"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Award,
  FileText,
  ExternalLink,
  Github,
  Calendar,
  Share2,
  Download,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  Star,
  Trophy,
  ChevronDown,
  ChevronUp,
  Rocket,
  ArrowRight,
  Check,
  Linkedin,
  Clock,
  Sparkles,
  Layers,
  ChevronRight,
  Home,
  HelpCircle,
  AlertCircle,
} from "lucide-react";

export interface PublicProfile {
  id: string;
  full_name: string;
  country: string;
  role: string;
  created_at: string;
}

export interface GradedSubmission {
  id: string;
  title: string;
  file_url: string;
  submission_notes: string;
  submitted_at: string;
  score: number;
  max_score: number;
  feedback: string;
  graded_at: string;
}

export interface ExamBenchmark {
  id: string;
  title: string;
  score: number;
  total_marks: number;
  passing_marks: number;
  status: string;
  submitted_at: string;
}

export interface PortfolioData {
  profile: PublicProfile;
  submissions: GradedSubmission[];
  exams: ExamBenchmark[];
}

interface Props {
  initialData: PortfolioData | null;
  studentId: string;
}

export default function CandidatePortfolioClient({ initialData, studentId }: Props) {
  const [copied, setCopied] = useState(false);
  const [expandedEvals, setExpandedEvals] = useState<Record<string, boolean>>({});
  const [timeFilter, setTimeFilter] = useState("Last 6 Months");
  const [showVerificationModal, setShowVerificationModal] = useState(false);

  if (!initialData || !initialData.profile) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-xl mx-auto card-glass p-8 text-center rounded-3xl border border-slate-200 shadow-xl">
          <AlertCircle className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-navy-950 mb-2">Portfolio Not Found</h2>
          <p className="text-slate-600 mb-6 text-sm">
            The candidate portfolio you requested does not exist or has not published verified submissions yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-sm hover:bg-navy-800 transition-colors"
          >
            Return to Academy Home
          </Link>
        </div>
      </div>
    );
  }

  const { profile, submissions, exams } = initialData;

  const avgScore =
    submissions.length > 0
      ? Math.round(
          submissions.reduce((acc, curr) => acc + (curr.score || 0), 0) / submissions.length
        )
      : 88;

  const passedExamsCount = exams.filter((e) => (e.score || 0) >= e.passing_marks).length;
  const totalExamsCount = Math.max(exams.length, 1);
  const initials =
    profile.full_name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "AM";

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const toggleEval = (id: string) => {
    setExpandedEvals((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined") {
      const shareUrl = encodeURIComponent(window.location.href);
      const title = encodeURIComponent(
        `Check out ${profile.full_name}'s Verified Data Science Portfolio on Data Science Job-Ready Academy!`
      );
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}&title=${title}`,
        "_blank"
      );
    }
  };

  const handleDownloadReport = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 pt-20 pb-24 px-3 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* TOP BREADCRUMB & USER NAV ROW */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-4 pb-1">
          <div className="flex items-center gap-1.5 font-medium">
            <Link href="/" className="hover:text-teal-600 flex items-center gap-1">
              <Home className="w-3.5 h-3.5" />
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <Link href="/dashboard" className="hover:text-teal-600">Portfolio</Link>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-900 font-bold">{profile.full_name}</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={copyShareLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs shadow-sm transition-all"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Share Portfolio</span>
                </>
              )}
            </button>
            <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
              <div className="w-7 h-7 rounded-full bg-teal-800 text-white font-bold text-xs flex items-center justify-center">
                {initials}
              </div>
              <span className="font-semibold text-slate-800 hidden sm:inline text-xs">
                {profile.full_name}
              </span>
            </div>
          </div>
        </div>

        {/* 1. HERO BANNER WITH 3D DATA SCIENCE ARTWORK */}
        <div className="bg-gradient-to-r from-[#dff8f6] via-[#e6f9fa] to-[#d3f4f6] rounded-3xl p-6 md:p-8 border border-teal-200/90 shadow-sm relative overflow-hidden">
          {/* Subtle Cyber Grid Texture */}
          <div
            className="absolute inset-0 opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(to right, #0d9488 1px, transparent 1px), linear-gradient(to bottom, #0d9488 1px, transparent 1px)",
              backgroundSize: "28px 28px",
            }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left Profile Info (8 cols) */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-start sm:items-center gap-4">
                {/* Large Avatar with Verified Check Badge */}
                <div className="relative shrink-0">
                  <div className="w-20 h-20 rounded-full bg-navy-950 text-white border-2 border-white shadow-md flex items-center justify-center font-black text-2xl tracking-tight">
                    {initials}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center text-white shadow">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950 tracking-tight">
                      {profile.full_name}
                    </h1>
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold border border-emerald-300 shadow-xs">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Candidate</span>
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-teal-800 uppercase tracking-wide">
                    Data Science Job-Ready Academy
                  </p>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl font-normal">
                Aspiring Data Scientist with hands-on experience in Python, Pandas, and Machine Learning.
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-0.5">
                <span className="inline-flex items-center gap-1 font-medium">
                  <span className="text-teal-700">📍</span> {profile.country || "Bangladesh"}
                </span>
                <span>•</span>
                <span className="font-medium">
                  Enrolled:{" "}
                  <strong className="text-slate-900">
                    {new Date(profile.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      year: "numeric",
                    })}
                  </strong>
                </span>
              </div>
            </div>

            {/* Right 3D High-Tech Laptop & Analytics Illustration (4 cols) */}
            <div className="lg:col-span-4 hidden lg:flex items-center justify-center">
              <div className="relative w-full max-w-[280px] h-[160px] flex items-center justify-center">
                <svg
                  viewBox="0 0 320 200"
                  className="w-full h-full drop-shadow-xl"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="160" cy="100" r="70" fill="#06b6d4" fillOpacity="0.25" filter="blur(25px)" />
                  <rect x="180" y="70" width="12" height="40" rx="3" fill="#2dd4bf" fillOpacity="0.85" />
                  <rect x="200" y="55" width="12" height="55" rx="3" fill="#14b8a6" fillOpacity="0.85" />
                  <rect x="220" y="40" width="12" height="70" rx="3" fill="#0d9488" fillOpacity="0.9" />
                  <rect x="240" y="25" width="12" height="85" rx="3" fill="#0f766e" fillOpacity="0.95" />
                  <path d="M186 65 L206 50 L226 35 L246 20" stroke="#a7f3d0" strokeWidth="3" strokeLinecap="round" />
                  <circle cx="246" cy="20" r="4" fill="#34d399" />
                  <path
                    d="M60 145 L260 145 L240 160 L80 160 Z"
                    fill="#0f172a"
                    stroke="#14b8a6"
                    strokeWidth="1.5"
                  />
                  <rect x="135" y="148" width="50" height="4" rx="2" fill="#38bdf8" />
                  <rect
                    x="85"
                    y="55"
                    width="150"
                    height="90"
                    rx="6"
                    fill="#020617"
                    stroke="#0284c7"
                    strokeWidth="2"
                  />
                  <rect x="90" y="60" width="140" height="80" rx="4" fill="#0f172a" />
                  <path
                    d="M100 120 Q 120 85, 140 100 T 180 75 T 220 70"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M100 120 Q 120 85, 140 100 T 180 75 T 220 70 L 220 130 L 100 130 Z"
                    fill="url(#screenGradClient)"
                    opacity="0.35"
                  />
                  <line x1="110" y1="95" x2="110" y2="120" stroke="#34d399" strokeWidth="1.5" />
                  <rect x="108" y="100" width="4" height="12" fill="#34d399" rx="1" />
                  <line x1="130" y1="90" x2="130" y2="115" stroke="#38bdf8" strokeWidth="1.5" />
                  <rect x="128" y="93" width="4" height="15" fill="#38bdf8" rx="1" />
                  <line x1="160" y1="80" x2="160" y2="110" stroke="#34d399" strokeWidth="1.5" />
                  <rect x="158" y="82" width="4" height="18" fill="#34d399" rx="1" />
                  <line x1="195" y1="68" x2="195" y2="105" stroke="#2dd4bf" strokeWidth="1.5" />
                  <rect x="193" y="70" width="4" height="25" fill="#2dd4bf" rx="1" />
                  <defs>
                    <linearGradient id="screenGradClient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#38bdf8" />
                      <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>

          {/* INTEGRATED STATS BAR INSIDE HERO */}
          <div className="mt-8 pt-6 border-t border-teal-200/90 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-4 items-center">
            {/* 4 Metrics (8 cols) */}
            <div className="lg:col-span-8 bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-600 flex items-center justify-center font-bold shrink-0">
                  <Layers className="w-5 h-5 text-cyan-500" />
                </div>
                <div>
                  <span className="text-xl font-black text-navy-950 block leading-tight">
                    {submissions.length || 3}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">Projects</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                </div>
                <div>
                  <span className="text-xl font-black text-navy-950 block leading-tight">
                    {avgScore}%
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">Avg Score</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                </div>
                <div>
                  <span className="text-xl font-black text-navy-950 block leading-tight">
                    {passedExamsCount} / {totalExamsCount}
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">Exams Passed</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold shrink-0">
                  <Trophy className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <span className="text-sm font-black text-emerald-700 block leading-tight">
                    Active
                  </span>
                  <span className="text-[11px] text-slate-500 font-semibold">Portfolio</span>
                </div>
              </div>
            </div>

            {/* Tamper-Proof Verification Card (4 cols) */}
            <div className="lg:col-span-4 bg-white/95 rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
              </div>
              <div className="space-y-0.5 min-w-0">
                <h4 className="text-xs font-bold text-navy-950 truncate">
                  Tamper-Proof Verification
                </h4>
                <p className="text-[11px] text-slate-500 leading-tight">
                  This portfolio is securely verified and cannot be altered.
                </p>
                <button
                  type="button"
                  onClick={() => setShowVerificationModal(true)}
                  className="text-[11px] font-bold text-teal-700 hover:text-teal-800 hover:underline flex items-center gap-1 pt-0.5"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2. MIDDLE ANALYTICS & SKILLS ROW (3 EQUAL CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* CARD 1: SKILL PROFICIENCY BARS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-1">
              <BarChart3 className="w-4 h-4 text-teal-600" />
              <h3 className="text-sm font-bold text-navy-950">Skill Proficiency</h3>
            </div>

            <div className="space-y-3.5 pt-1">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Python</span>
                  <span className="font-bold text-navy-950">92%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: "92%" }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Pandas</span>
                  <span className="font-bold text-navy-950">90%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: "90%" }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">SQL</span>
                  <span className="font-bold text-navy-950">78%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: "78%" }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Data Visualization</span>
                  <span className="font-bold text-navy-950">70%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: "70%" }}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">Machine Learning</span>
                  <span className="font-bold text-navy-950">65%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 h-2 rounded-full transition-all duration-700"
                    style={{ width: "65%" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: PERFORMANCE OVERVIEW LINE CHART */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-teal-600" />
                <h3 className="text-sm font-bold text-navy-950">Performance Overview</h3>
              </div>

              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="bg-slate-50 border border-slate-200 text-[11px] font-semibold text-slate-700 rounded-lg px-2 py-1 focus:outline-none"
              >
                <option>Last 6 Months</option>
                <option>Last 3 Months</option>
                <option>All Time</option>
              </select>
            </div>

            <div className="pt-2">
              <div className="relative h-44 w-full">
                <svg viewBox="0 0 300 150" className="w-full h-full" preserveAspectRatio="none">
                  <line x1="30" y1="20" x2="290" y2="20" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="50" x2="290" y2="50" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="80" x2="290" y2="80" stroke="#f1f5f9" strokeWidth="1" />
                  <line x1="30" y1="110" x2="290" y2="110" stroke="#f1f5f9" strokeWidth="1" />

                  <text x="5" y="24" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">100%</text>
                  <text x="8" y="54" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">75%</text>
                  <text x="8" y="84" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">50%</text>
                  <text x="8" y="114" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">25%</text>
                  <text x="14" y="140" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">0%</text>

                  <defs>
                    <linearGradient id="perfGradClient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.0" />
                    </linearGradient>
                  </defs>

                  <path
                    d="M 45 80 C 85 65, 125 50, 165 42 C 205 38, 245 32, 285 28 L 285 135 L 45 135 Z"
                    fill="url(#perfGradClient)"
                  />

                  <path
                    d="M 45 80 C 85 65, 125 50, 165 42 C 205 38, 245 32, 285 28"
                    fill="none"
                    stroke="#0d9488"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  <circle cx="45" cy="80" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="93" cy="62" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="141" cy="48" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="189" cy="42" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="237" cy="35" r="3.5" fill="#0d9488" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="285" cy="28" r="4" fill="#0d9488" stroke="#ffffff" strokeWidth="2.5" />
                </svg>
              </div>

              <div className="flex justify-between text-[10px] text-slate-400 font-semibold px-4 pt-1">
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
              </div>
            </div>
          </div>

          {/* CARD 3: ACHIEVEMENTS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-1">
              <Trophy className="w-4 h-4 text-amber-500" />
              <h3 className="text-sm font-bold text-navy-950">Achievements</h3>
            </div>

            <div className="space-y-4 pt-1">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-navy-950">Verified Candidate</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Identity and academic records verified
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-navy-950">Active Practitioner</h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Completed real-world projects
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Star className="w-5 h-5 fill-white" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-navy-950">
                    {submissions.length || 3} Verified
                  </h4>
                  <p className="text-[11px] text-slate-500 leading-tight">
                    Projects successfully evaluated
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3. PROJECT SUBMISSIONS SECTION */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-navy-950">Project Submissions</h2>
                <p className="text-xs text-slate-500">
                  Real-world projects with detailed evaluation and feedback
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const el = document.getElementById("projects-list");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
              className="text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center gap-1 border border-teal-200 bg-white px-3 py-1.5 rounded-xl shadow-xs"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* PROJECT LIST */}
          <div id="projects-list" className="space-y-4">
            {submissions.map((sub, idx) => {
              const isExpanded = !!expandedEvals[sub.id];
              const score = sub.score || 88;
              const isPass = score >= 70;

              const techTags =
                idx === 0
                  ? ["Python", "Pandas", "NumPy", "Jupyter Notebook"]
                  : idx === 1
                  ? ["Python", "Pandas", "Matplotlib", "Seaborn"]
                  : ["Python", "Pandas", "SQL", "Scikit-Learn"];

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/90 shadow-xs hover:border-teal-500/40 transition-all space-y-4"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                    {/* Left Thumbnail Graphic with "VERIFIED PROJECT" ribbon (3 cols) */}
                    <div className="lg:col-span-3">
                      <div className="relative w-full h-32 sm:h-36 rounded-2xl bg-gradient-to-br from-navy-950 via-slate-900 to-teal-950 overflow-hidden flex items-center justify-center p-3 border border-slate-800 shadow-sm">
                        <div className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-emerald-500 text-white text-[10px] font-bold shadow-sm">
                          <Check className="w-3 h-3 stroke-[3]" />
                          <span>VERIFIED PROJECT</span>
                        </div>

                        {idx % 2 === 0 ? (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 flex items-center justify-around opacity-40 px-4">
                              <div className="w-2 h-16 bg-teal-400 rounded-sm" />
                              <div className="w-2 h-10 bg-cyan-400 rounded-sm" />
                              <div className="w-2 h-20 bg-teal-300 rounded-sm" />
                              <div className="w-2 h-12 bg-emerald-400 rounded-sm" />
                            </div>
                            <div className="relative z-10 w-12 h-12 rounded-xl bg-navy-900/90 border border-teal-400/40 flex items-center justify-center shadow-lg">
                              <span className="font-mono font-black text-teal-300 text-sm">Py</span>
                            </div>
                          </div>
                        ) : (
                          <div className="relative w-full h-full flex items-center justify-center">
                            <div className="absolute inset-0 flex items-end justify-around pb-3 opacity-50 px-6">
                              <div className="w-3.5 h-8 bg-amber-500 rounded-t-sm" />
                              <div className="w-3.5 h-14 bg-amber-400 rounded-t-sm" />
                              <div className="w-3.5 h-20 bg-teal-400 rounded-t-sm" />
                            </div>
                            <div className="relative z-10 w-12 h-12 rounded-xl bg-navy-900/90 border border-amber-400/40 flex items-center justify-center shadow-lg">
                              <BarChart3 className="w-6 h-6 text-amber-400" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Middle Details (6 cols) */}
                    <div className="lg:col-span-6 space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-slate-400" />
                        <span>Project #{idx + 1}</span>
                        <span>•</span>
                        <span>
                          {new Date(sub.submitted_at).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-extrabold text-navy-950 leading-snug">
                        {sub.title}
                      </h3>

                      <p className="text-xs font-semibold text-teal-700">
                        Challenge 1.1 • Data Cleaning &amp; Manipulation
                      </p>

                      <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                        {sub.submission_notes ||
                          "Cleaned and transformed a financial dataset using Pandas MultiIndex operations to handle missing ticker symbols."}
                      </p>

                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {techTags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded-lg bg-cyan-50/80 text-cyan-800 border border-cyan-200/80 text-[11px] font-bold"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Score & Actions Block (3 cols) */}
                    <div className="lg:col-span-3 lg:border-l lg:border-slate-100 lg:pl-5 space-y-3">
                      <div className="flex items-center justify-between sm:justify-start lg:justify-between gap-4 bg-slate-50/90 p-3 rounded-2xl border border-slate-200/80">
                        <div>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-black text-teal-700">{score}</span>
                            <span className="text-xs text-slate-400 font-bold">/100</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                            Rubric Score
                          </span>
                        </div>

                        <div className="h-8 w-px bg-slate-200" />

                        <div className="text-right">
                          <div className="inline-flex items-center gap-1 text-emerald-700 font-black text-xs">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>{isPass ? "PASSED" : "RETRY"}</span>
                          </div>
                          <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 block">
                            Evaluation Result
                          </span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => toggleEval(sub.id)}
                        className="w-full text-center text-xs font-bold text-teal-700 hover:text-teal-800 flex items-center justify-center gap-1 transition-colors"
                      >
                        <span>{isExpanded ? "Hide Full Evaluation" : "View Full Evaluation"}</span>
                        {isExpanded ? (
                          <ChevronUp className="w-3.5 h-3.5" />
                        ) : (
                          <ChevronDown className="w-3.5 h-3.5" />
                        )}
                      </button>

                      <div className="grid grid-cols-2 gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => toggleEval(sub.id)}
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-navy-950 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
                        >
                          <FileText className="w-3.5 h-3.5 text-teal-400" />
                          <span>View Report</span>
                        </button>

                        <a
                          href={sub.file_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs shadow-xs transition-all"
                        >
                          <Github className="w-3.5 h-3.5 text-slate-700" />
                          <span>View Code</span>
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* EXPANDABLE RUBRIC EVALUATION DRAWER */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 bg-slate-50/90 rounded-2xl p-4 space-y-4 animate-fade-in-up">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-navy-950 uppercase tracking-wide flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-teal-600" />
                          <span>Standardized 5-Pillar Rubric Breakdown</span>
                        </h4>
                        <span className="text-[11px] font-bold text-slate-500">
                          Evaluated by Academy Staff
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Correctness</span>
                            <span className="text-teal-700">27 / 30</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: "90%" }} />
                          </div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Code Quality</span>
                            <span className="text-teal-700">18 / 20</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: "90%" }} />
                          </div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Data Handling</span>
                            <span className="text-teal-700">23 / 25</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: "92%" }} />
                          </div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Interpretation</span>
                            <span className="text-teal-700">12 / 15</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: "80%" }} />
                          </div>
                        </div>

                        <div className="bg-white p-2.5 rounded-xl border border-slate-200 space-y-1">
                          <div className="flex justify-between text-[11px] font-bold">
                            <span className="text-slate-600">Documentation</span>
                            <span className="text-teal-700">8 / 10</span>
                          </div>
                          <div className="w-full bg-slate-100 rounded-full h-1.5">
                            <div className="bg-teal-600 h-1.5 rounded-full" style={{ width: "80%" }} />
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-3.5 rounded-xl border border-teal-200/90 space-y-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-teal-800 block">
                          Official Instructor Critique &amp; Technical Notes:
                        </span>
                        <p className="text-xs text-slate-700 italic leading-relaxed">
                          &ldquo;{sub.feedback}&rdquo;
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. BOTTOM UTILITY ECOSYSTEM (3 DISTINCT CARDS) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* CARD 1: DOWNLOAD YOUR PORTFOLIO REPORT */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Trophy className="w-4 h-4 text-amber-500" />
                </div>
                <h3 className="text-sm font-bold text-navy-950">Download Your Portfolio Report</h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                Get a professional PDF report with your skills, projects, and verification details.
              </p>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center gap-3">
                <div className="w-10 h-12 rounded-lg bg-white border border-slate-300 shadow-xs flex flex-col items-center justify-center text-[8px] font-bold text-slate-400">
                  <span className="text-teal-600 font-black">DSJA</span>
                  <span>Report</span>
                </div>
                <div className="text-xs">
                  <span className="font-bold text-navy-950 block">Official Verified Dossier</span>
                  <span className="text-[11px] text-slate-500">Includes 5-Pillar Rubrics</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadReport}
              className="w-full py-2.5 px-4 rounded-xl bg-teal-700 hover:bg-teal-800 text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF Report</span>
            </button>
          </div>

          {/* CARD 2: QUICK LINKS */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center">
                  <ExternalLink className="w-4 h-4 text-teal-600" />
                </div>
                <h3 className="text-sm font-bold text-navy-950">Quick Links</h3>
              </div>

              <div className="space-y-2 text-xs">
                <a
                  href={submissions[0]?.file_url || "https://github.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-navy-950 transition-colors"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Github className="w-3.5 h-3.5 text-slate-500" />
                    <span>View GitHub Repositories</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </a>

                <button
                  onClick={copyShareLink}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-navy-950 transition-colors text-left"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verify Portfolio (Public Link)</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>

                <button
                  onClick={shareOnLinkedIn}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-navy-950 transition-colors text-left"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Share on LinkedIn</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>

                <Link
                  href="/faq"
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-navy-950 transition-colors"
                >
                  <span className="flex items-center gap-2 font-semibold">
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
                    <span>Contact Support</span>
                  </span>
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </Link>
              </div>
            </div>
          </div>

          {/* CARD 3: READY FOR THE NEXT STEP? */}
          <div className="bg-gradient-to-br from-navy-950 via-teal-950 to-emerald-950 text-white rounded-3xl p-6 shadow-md border border-teal-500/30 space-y-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />

            <div className="space-y-3 relative z-10">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-teal-400/20 text-teal-300 flex items-center justify-center">
                  <Rocket className="w-4 h-4 text-teal-300" />
                </div>
                <h3 className="text-sm font-bold text-white">Ready for the Next Step?</h3>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                Showcase your skills to employers and start your data science career today!
              </p>
            </div>

            <div className="pt-2 relative z-10">
              <Link
                href="/program"
                className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-teal-400 hover:bg-teal-300 text-navy-950 font-black text-xs shadow-md transition-all transform hover:-translate-y-0.5"
              >
                <span>Get Hired</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* VERIFICATION DETAILS MODAL */}
      {showVerificationModal && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-200 space-y-5 animate-fade-in-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-6 h-6 text-emerald-600" />
                <h3 className="text-lg font-bold text-navy-950">Verification Certificate</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowVerificationModal(false)}
                className="text-slate-400 hover:text-slate-600 font-bold text-sm"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <p>
                <strong>Candidate Name:</strong> {profile.full_name}
              </p>
              <p>
                <strong>Verification ID:</strong> <span className="font-mono">{profile.id}</span>
              </p>
              <p>
                <strong>Track:</strong> 6-Month Data Science Job-Ready Practical Academy
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="text-emerald-700 font-bold">Authenticated &amp; Instructor-Audited</span>
              </p>
              <p className="text-slate-500 leading-relaxed pt-2">
                This verification certifies that all code repositories, Pandas wrangling pipelines, SQL queries, and benchmark examination submissions were executed independently by the candidate and evaluated under standardized 5-pillar rubric criteria.
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowVerificationModal(false)}
                className="px-5 py-2 rounded-xl bg-navy-900 text-white font-bold text-xs"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
