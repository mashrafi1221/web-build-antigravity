"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Award,
  CheckCircle2,
  ExternalLink,
  Github,
  Calendar,
  Share2,
  FileCode2,
  LayoutDashboard,
  ShieldCheck,
  Check,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronRight,
  Loader2,
} from "lucide-react";

interface PublicProfile {
  id: string;
  full_name: string;
  country: string;
  role: string;
  created_at: string;
}

interface GradedSubmission {
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

interface ExamBenchmark {
  id: string;
  title: string;
  score: number;
  total_marks: number;
  passing_marks: number;
  status: string;
  submitted_at: string;
}

interface PortfolioData {
  profile: PublicProfile;
  submissions: GradedSubmission[];
  exams: ExamBenchmark[];
}

export default function PublicPortfolioPage() {
  const params = useParams();
  const studentId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<PortfolioData | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (studentId) {
      loadPortfolio();
    }
  }, [studentId]);

  const loadPortfolio = async () => {
    try {
      setLoading(true);
      const { data: result, error } = await supabase.rpc("get_public_portfolio", {
        target_user_id: studentId,
      });

      if (error) {
        console.error("Portfolio RPC error:", error);
      } else if (result) {
        setData(result as PortfolioData);
      }
    } catch (err) {
      console.error("Error loading portfolio:", err);
    } finally {
      setLoading(false);
    }
  };

  const copyShareLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Verifying Candidate Portfolio...</p>
        </div>
      </div>
    );
  }

  if (!data || !data.profile) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-xl mx-auto card-glass p-8 text-center rounded-2xl border border-slate-200">
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

  const { profile, submissions, exams } = data;
  const avgScore =
    submissions.length > 0
      ? (
          submissions.reduce((acc, curr) => acc + (curr.score || 0), 0) /
          submissions.length
        ).toFixed(1)
      : "—";

  const passedExamsCount = exams.filter((e) => (e.score || 0) >= e.passing_marks).length;

  return (
    <div className="min-h-screen pt-28 pb-24 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <Link href="/" className="hover:text-teal-600">Home</Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>Candidate Portfolios</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 font-bold">{profile.full_name}</span>
          </div>

          <button
            onClick={copyShareLink}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-semibold transition-all shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-3.5 h-3.5 text-teal-600" />
                <span>Share Portfolio</span>
              </>
            )}
          </button>
        </div>

        {/* HERO PROFILE HEADER */}
        <div className="card-glass p-8 md:p-10 rounded-3xl border border-teal-500/20 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-br from-teal-400/10 via-cyan-400/5 to-transparent rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="flex items-start md:items-center gap-5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-navy-950 to-teal-900 border border-teal-400/40 flex items-center justify-center text-teal-300 font-black text-2xl shadow-lg shrink-0">
                {profile.full_name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2) || "DS"}
              </div>

              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <h1 className="text-2xl md:text-3xl font-black text-navy-950 tracking-tight">
                    {profile.full_name}
                  </h1>
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-300">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    Verified Candidate
                  </span>
                </div>

                <p className="text-sm font-semibold text-teal-800">
                  Data Science Job-Ready Candidate • 6-Month Practical Track
                </p>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                  <span>Location: <strong className="text-slate-800">{profile.country || "Global"}</strong></span>
                  <span>•</span>
                  <span>Enrolled: <strong className="text-slate-800">{new Date(profile.created_at).toLocaleDateString("en-US", { month: "short", year: "numeric" })}</strong></span>
                </div>
              </div>
            </div>

            {/* Recruiter Trust Notice */}
            <div className="bg-slate-50/80 border border-slate-200/90 rounded-2xl p-4 md:max-w-xs text-xs text-slate-600 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-navy-950">
                <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                <span>Tamper-Proof Verification</span>
              </div>
              <p className="text-[11px] leading-relaxed text-slate-500">
                All projects and exams on this portfolio are evaluated against strict 5-pillar rubrics and timed assessments.
              </p>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-200/80">
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Graded Submissions
              </span>
              <p className="text-2xl font-black text-navy-950">{submissions.length}</p>
              <p className="text-[11px] text-slate-400">Practical deliverables</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Average Rubric Score
              </span>
              <p className="text-2xl font-black text-teal-700">{avgScore}%</p>
              <p className="text-[11px] text-slate-400">Min. benchmark: 70%</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Benchmark Exams Passed
              </span>
              <p className="text-2xl font-black text-cyan-700">{passedExamsCount} / {exams.length || 1}</p>
              <p className="text-[11px] text-slate-400">Timed technical tests</p>
            </div>

            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Portfolio Status
              </span>
              <p className="text-base font-black text-emerald-700 flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-4 h-4" />
                Active Practitioner
              </p>
              <p className="text-[11px] text-slate-400">Evidence verified</p>
            </div>
          </div>
        </div>

        {/* SECTION 1: VERIFIED PRACTICAL DELIVERABLES */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-black text-navy-950 flex items-center gap-2">
                <FileCode2 className="w-6 h-6 text-teal-600" />
                <span>Audited Practical Submissions</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Real-world problem briefs solved in Python, Pandas, and SQL with public source repositories.
              </p>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {submissions.length} Verified
            </span>
          </div>

          {submissions.length === 0 ? (
            <div className="card-glass p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
              <FileCode2 className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No graded submissions published yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {submissions.map((sub, idx) => (
                <div
                  key={sub.id}
                  className="card-glass p-6 md:p-8 rounded-3xl border border-slate-200 shadow-md space-y-5 hover:border-teal-500/40 transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-mono font-bold text-teal-700 uppercase bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                          Project #{idx + 1}
                        </span>
                        <span className="text-xs text-slate-400">
                          Audited on {new Date(sub.graded_at).toLocaleDateString()}
                        </span>
                      </div>
                      <h3 className="text-lg md:text-xl font-bold text-navy-950">
                        {sub.title}
                      </h3>
                    </div>

                    {/* Score Badge */}
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="text-right">
                        <span className="text-2xl font-black text-teal-700">{sub.score}</span>
                        <span className="text-xs text-slate-400 font-bold"> / {sub.max_score}</span>
                      </div>
                      <span className="px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 text-xs font-bold">
                        {sub.score >= 80 ? "EXCELLENT" : "PASSED"}
                      </span>
                    </div>
                  </div>

                  {/* Submission Notes / Methodology */}
                  {sub.submission_notes && (
                    <div className="bg-slate-50/90 rounded-2xl p-4 border border-slate-200/80 space-y-1">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                        Candidate Execution Notes &amp; Methodology:
                      </span>
                      <p className="text-xs text-slate-700 leading-relaxed font-mono">
                        {sub.submission_notes}
                      </p>
                    </div>
                  )}

                  {/* Official Instructor Feedback */}
                  <div className="bg-gradient-to-r from-teal-50/60 to-cyan-50/60 rounded-2xl p-4 border border-teal-200 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-teal-900">
                      <ShieldCheck className="w-4 h-4 text-teal-700" />
                      <span>Official Instructor Evaluation &amp; Rubric Feedback:</span>
                    </div>
                    <p className="text-xs text-slate-800 leading-relaxed italic">
                      &ldquo;{sub.feedback}&rdquo;
                    </p>
                  </div>

                  {/* Code Repository Button */}
                  <div className="flex items-center justify-between pt-2">
                    <a
                      href={sub.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-navy-950 hover:bg-navy-900 text-white text-xs font-bold shadow-sm transition-all transform hover:-translate-y-0.5"
                    >
                      <Github className="w-3.5 h-3.5" />
                      <span>Inspect Candidate Source Code</span>
                      <ExternalLink className="w-3 h-3 text-teal-400" />
                    </a>

                    <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                      Evaluated under 5-pillar rubric criteria
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* SECTION 2: TECHNICAL BENCHMARK EXAMINATIONS */}
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-black text-navy-950 flex items-center gap-2">
              <Award className="w-6 h-6 text-teal-600" />
              <span>Technical Benchmark Examinations</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Timed, proctored-style technical multiple-choice assessments testing practical pandas mechanics, time-series, and memory constraints.
            </p>
          </div>

          {exams.length === 0 ? (
            <div className="card-glass p-8 rounded-2xl border border-slate-200 text-center text-slate-500">
              <Clock className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-semibold">No benchmark examinations completed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {exams.map((exam) => {
                const isPassed = (exam.score || 0) >= exam.passing_marks;
                return (
                  <div
                    key={exam.id}
                    className="card-glass p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                          Technical Benchmark
                        </span>
                        <h4 className="text-base font-bold text-navy-950">{exam.title}</h4>
                      </div>
                      <span
                        className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isPassed
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {isPassed ? "PASSED" : "NOT PASSED"}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between pt-2 border-t border-slate-100">
                      <div>
                        <span className="text-2xl font-black text-navy-950">{exam.score}</span>
                        <span className="text-xs text-slate-400 font-bold"> / {exam.total_marks}</span>
                        <span className="text-[11px] text-slate-500 block">
                          Passing threshold: {exam.passing_marks} marks
                        </span>
                      </div>
                      <span className="text-xs text-slate-400">
                        {new Date(exam.submitted_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* EMPLOYER CALL TO ACTION */}
        <div className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-navy-950 to-teal-950 text-white shadow-2xl border border-teal-500/30 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-400/30">
            For Employers &amp; Hiring Managers
          </span>
          <h3 className="text-2xl md:text-3xl font-black text-white">
            Looking to hire this candidate?
          </h3>
          <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            Candidates graduating through Data Science Job-Ready Academy carry verified portfolios backed by real code repositories, messy dataset wrangling, and benchmark exams.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/program"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-extrabold text-sm shadow-md transition-all"
            >
              Learn About Our Standards
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm transition-colors"
            >
              Visit Academy Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
