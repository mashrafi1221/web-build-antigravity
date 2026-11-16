"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Users,
  FileCheck2,
  Clock,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  ArrowLeft,
  Loader2,
  Sparkles,
  Send,
  Sliders,
  Award,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface StudentProfile {
  id: string;
  full_name: string;
  email: string;
  country: string;
  role: string;
  created_at: string;
}

interface SubmissionItem {
  id: string;
  activity_id: string;
  user_id: string;
  file_url: string;
  file_name: string;
  submission_notes: string;
  status: string;
  submitted_at: string;
  profiles?: {
    full_name: string;
    email: string;
  };
  activities?: {
    title: string;
  };
  grades?: {
    score: number;
    max_score: number;
    feedback: string;
    rubric_scores: {
      data_correctness?: number;
      code_quality?: number;
      data_handling?: number;
      interpretation?: number;
      documentation?: number;
    };
    graded_at: string;
  };
}

export default function AdminPortalPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string>("STUDENT");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"queue" | "students">("queue");

  // Data state
  const [submissions, setSubmissions] = useState<SubmissionItem[]>([]);
  const [students, setStudents] = useState<StudentProfile[]>([]);

  // Selected Submission for Grading Modal/Card
  const [selectedSub, setSelectedSub] = useState<SubmissionItem | null>(null);
  const [correctness, setCorrectness] = useState<number>(28);
  const [codeQuality, setCodeQuality] = useState<number>(18);
  const [dataHandling, setDataHandling] = useState<number>(22);
  const [interpretation, setInterpretation] = useState<number>(12);
  const [documentation, setDocumentation] = useState<number>(8);
  const [feedback, setFeedback] = useState<string>("");
  const [submittingGrade, setSubmittingGrade] = useState(false);
  const [gradeStatusMessage, setGradeStatusMessage] = useState<string | null>(null);

  const totalScore = correctness + codeQuality + dataHandling + interpretation + documentation;

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      // 1. Check Session & Role
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      setCurrentUserId(session.user.id);

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", session.user.id)
        .single();

      const role = profile?.role || "STUDENT";
      setUserRole(role);

      if (role !== "ADMIN" && role !== "INSTRUCTOR") {
        setLoading(false);
        return;
      }

      // 2. Fetch All Submissions with Profile & Activity Details
      const { data: subData, error: subError } = await supabase
        .from("submissions")
        .select(`
          id, activity_id, user_id, file_url, file_name, submission_notes, status, submitted_at,
          profiles (full_name, email),
          activities (title),
          grades (score, max_score, feedback, rubric_scores, graded_at)
        `)
        .order("submitted_at", { ascending: false });

      if (subError) console.error("Submissions load error:", subError);
      else if (subData) setSubmissions(subData as unknown as SubmissionItem[]);

      // 3. Fetch All Student Profiles
      const { data: studentData, error: studError } = await supabase
        .from("profiles")
        .select("id, full_name, email, country, role, created_at")
        .order("created_at", { ascending: false });

      if (studError) console.error("Students load error:", studError);
      else if (studentData) setStudents(studentData as StudentProfile[]);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const openGradingPanel = (sub: SubmissionItem) => {
    setSelectedSub(sub);
    if (sub.grades) {
      const rub = sub.grades.rubric_scores || {};
      setCorrectness(rub.data_correctness ?? 28);
      setCodeQuality(rub.code_quality ?? 18);
      setDataHandling(rub.data_handling ?? 22);
      setInterpretation(rub.interpretation ?? 12);
      setDocumentation(rub.documentation ?? 8);
      setFeedback(sub.grades.feedback || "");
    } else {
      setCorrectness(28);
      setCodeQuality(18);
      setDataHandling(22);
      setInterpretation(12);
      setDocumentation(8);
      setFeedback(
        "Strong implementation! Vectorized data pipeline meets all performance constraints. Clean error handling."
      );
    }
    setGradeStatusMessage(null);
  };

  const handleSaveGrade = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSub) return;
    setSubmittingGrade(true);
    setGradeStatusMessage(null);

    try {
      // 1. Upsert into public.grades
      const { error: gradeErr } = await supabase.from("grades").upsert({
        submission_id: selectedSub.id,
        instructor_id: currentUserId,
        score: totalScore,
        max_score: 100,
        rubric_scores: {
          data_correctness: correctness,
          code_quality: codeQuality,
          data_handling: dataHandling,
          interpretation: interpretation,
          documentation: documentation,
        },
        feedback: feedback.trim(),
      });

      if (gradeErr) throw gradeErr;

      // 2. Update submission status to 'graded'
      const { error: subErr } = await supabase
        .from("submissions")
        .update({ status: "graded" })
        .eq("id", selectedSub.id);

      if (subErr) throw subErr;

      setGradeStatusMessage("Grade and official feedback recorded successfully!");
      await fetchAdminData();
      setTimeout(() => {
        setSelectedSub(null);
      }, 1200);
    } catch (err: unknown) {
      const error = err as Error;
      setGradeStatusMessage(`Grading failed: ${error.message}`);
    } finally {
      setSubmittingGrade(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading Instructor &amp; Admin Portal...</p>
      </div>
    );
  }

  // Access check
  if (userRole !== "ADMIN" && userRole !== "INSTRUCTOR") {
    return (
      <div className="max-w-xl mx-auto my-20 p-8 bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200 text-center space-y-4">
        <AlertCircle className="w-12 h-12 text-amber-600 mx-auto" />
        <h2 className="text-2xl font-bold text-navy-950">Staff &amp; Admin Access Only</h2>
        <p className="text-sm text-slate-600">
          This portal is reserved for instructors and academy administrators.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-navy-900 text-white font-semibold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Student Dashboard</span>
        </Link>
      </div>
    );
  }

  const pendingCount = submissions.filter((s) => s.status === "submitted").length;
  const gradedCount = submissions.filter((s) => s.status === "graded").length;

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* ADMIN HEADER */}
      <div className="bg-navy-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden card-hover-lift">
        <div className="absolute top-0 right-1/4 w-[400px] h-[250px] bg-teal-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative z-10 flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-teal-500/20 border border-teal-400/30 text-teal-300 flex items-center justify-center font-bold">
            <ShieldCheck className="w-8 h-8 text-teal-400" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Instructor &amp; Admin Portal
              </h1>
              <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-teal-500 text-navy-950">
                {userRole}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400">
              Review code submissions, apply 5-pillar rubrics, and manage student rosters.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 hover:bg-navy-850 text-slate-200 border border-navy-700 text-xs font-semibold transition-all transform hover:-translate-y-0.5 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-teal-400" />
            <span>Switch to Student View</span>
          </Link>
        </div>
      </div>

      {/* METRICS ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-1 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Review</span>
          <h3 className="text-2xl font-black text-amber-600">{pendingCount} Submissions</h3>
          <p className="text-xs text-slate-500">Awaiting instructor evaluation</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-1 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Graded Deliverables</span>
          <h3 className="text-2xl font-black text-teal-700">{gradedCount} Completed</h3>
          <p className="text-xs text-slate-500">Rubric scores delivered to students</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-1 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Registered Students</span>
          <h3 className="text-2xl font-black text-navy-950">{students.length} Accounts</h3>
          <p className="text-xs text-slate-500">Enrolled in 6-month academy</p>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-1 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Target Standard</span>
          <h3 className="text-2xl font-black text-indigo-700">70 / 100</h3>
          <p className="text-xs text-slate-500">Minimum passing grade threshold</p>
        </div>
      </div>

      {/* NAVIGATION TABS */}
      <div className="flex items-center gap-3 border-b border-slate-200 pb-3">
        <button
          onClick={() => setActiveTab("queue")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "queue"
              ? "bg-navy-900 text-white shadow-sm"
              : "text-slate-600 hover:text-navy-950 hover:bg-slate-100"
          }`}
        >
          <FileCheck2 className="w-4 h-4 text-teal-400" />
          <span>Submissions Evaluation Queue ({submissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("students")}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
            activeTab === "students"
              ? "bg-navy-900 text-white shadow-sm"
              : "text-slate-600 hover:text-navy-950 hover:bg-slate-100"
          }`}
        >
          <Users className="w-4 h-4 text-cyan-400" />
          <span>Student Directory ({students.length})</span>
        </button>
      </div>

      {/* TAB 1: SUBMISSIONS QUEUE & GRADING */}
      {activeTab === "queue" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Submissions List (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-lg font-bold text-navy-950">
              Student Submissions Queue
            </h3>

            {submissions.length === 0 ? (
              <div className="p-8 bg-white/85 backdrop-blur-md rounded-2xl border border-slate-200 text-center space-y-2">
                <p className="text-sm font-semibold text-slate-700">No submissions in queue</p>
                <p className="text-xs text-slate-500">Student submissions will appear here automatically.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => {
                  const isSelected = selectedSub?.id === sub.id;
                  return (
                    <div
                      key={sub.id}
                      className={`p-6 rounded-2xl border transition-all card-hover-lift ${
                        isSelected
                          ? "bg-white border-teal-500 ring-2 ring-teal-500/20 shadow-md"
                          : "bg-white/90 backdrop-blur-md border-slate-200/90 shadow-sm"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-navy-950 text-base">
                              {sub.profiles?.full_name || "Student"}
                            </span>
                            <span className="text-xs text-slate-400">({sub.profiles?.email})</span>
                          </div>
                          <p className="text-xs font-semibold text-teal-700">
                            {sub.activities?.title || "Practical Challenge"}
                          </p>
                          <a
                            href={sub.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs text-slate-600 hover:text-teal-700 underline pt-1 font-mono"
                          >
                            <span>{sub.file_url}</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </div>

                        <div className="flex flex-col items-end gap-2 shrink-0">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                              sub.status === "graded"
                                ? "bg-teal-100 text-teal-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {sub.status}
                          </span>

                          <button
                            onClick={() => openGradingPanel(sub)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-navy-900 text-white hover:bg-navy-800 text-xs font-bold shadow-sm transition-all transform hover:-translate-y-0.5"
                          >
                            <Sliders className="w-3.5 h-3.5 text-teal-400" />
                            <span>{sub.status === "graded" ? "Edit Evaluation" : "Grade Submission"}</span>
                          </button>
                        </div>
                      </div>

                      {/* Notes & Grade Summary */}
                      <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-600 space-y-1">
                        <span className="font-semibold text-slate-700">Student Execution Notes:</span>
                        <p className="bg-slate-50 p-2.5 rounded-lg border border-slate-200/70 italic">
                          &ldquo;{sub.submission_notes}&rdquo;
                        </p>
                      </div>

                      {sub.grades && (
                        <div className="mt-3 p-3 bg-teal-50/70 border border-teal-200/80 rounded-xl flex items-center justify-between text-xs text-teal-900">
                          <div>
                            <span className="font-bold">Recorded Score: </span>
                            <span className="font-black text-sm text-teal-700">{sub.grades.score} / 100</span>
                          </div>
                          <span className="italic truncate max-w-[320px] text-slate-600">
                            &ldquo;{sub.grades.feedback}&rdquo;
                          </span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right Col: Interactive 5-Pillar Grading Rubric Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-navy-950">
              Instructor Rubric Evaluation
            </h3>

            {selectedSub ? (
              <div className="bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 shadow-xl space-y-5 sticky top-24 card-hover-lift">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-xs text-slate-500 uppercase font-semibold">Grading Student:</span>
                    <h4 className="font-bold text-navy-950 text-base">
                      {selectedSub.profiles?.full_name}
                    </h4>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-500 uppercase font-semibold">Total Score:</span>
                    <p
                      className={`text-xl font-black ${
                        totalScore >= 70 ? "text-teal-700" : "text-amber-600"
                      }`}
                    >
                      {totalScore} / 100
                    </p>
                  </div>
                </div>

                {gradeStatusMessage && (
                  <div
                    className={`p-3 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                      gradeStatusMessage.includes("success")
                        ? "bg-teal-50 border border-teal-200 text-teal-800"
                        : "bg-rose-50 border border-rose-200 text-rose-800"
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>{gradeStatusMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSaveGrade} className="space-y-4">
                  {/* 1. Data Correctness (max 30) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">1. Data Correctness (30%)</span>
                      <span className="font-bold text-teal-700">{correctness} / 30</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={30}
                      value={correctness}
                      onChange={(e) => setCorrectness(Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  {/* 2. Code Quality (max 20) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">2. Code Quality &amp; Vectorization (20%)</span>
                      <span className="font-bold text-teal-700">{codeQuality} / 20</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={20}
                      value={codeQuality}
                      onChange={(e) => setCodeQuality(Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  {/* 3. Data Handling (max 25) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">3. Data Handling &amp; Imputation (25%)</span>
                      <span className="font-bold text-teal-700">{dataHandling} / 25</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={25}
                      value={dataHandling}
                      onChange={(e) => setDataHandling(Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  {/* 4. Interpretation (max 15) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">4. Business Interpretation (15%)</span>
                      <span className="font-bold text-teal-700">{interpretation} / 15</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={15}
                      value={interpretation}
                      onChange={(e) => setInterpretation(Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  {/* 5. Documentation (max 10) */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-700">5. Documentation &amp; Schemas (10%)</span>
                      <span className="font-bold text-teal-700">{documentation} / 10</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={10}
                      value={documentation}
                      onChange={(e) => setDocumentation(Number(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  {/* Written Feedback Textarea */}
                  <div className="space-y-1 pt-1">
                    <label className="text-xs font-bold text-slate-700">
                      Written Instructor Critique &amp; Recommendations:
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Write actionable technical feedback for the student..."
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submittingGrade}
                    className="w-full py-2.5 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    {submittingGrade ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-400" />
                        <span>Saving Evaluation...</span>
                      </>
                    ) : (
                      <>
                        <Award className="w-3.5 h-3.5 text-teal-400" />
                        <span>Submit Official Grade ({totalScore}/100)</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="p-8 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200 text-center space-y-2">
                <Sliders className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">Select a submission to evaluate</p>
                <p className="text-xs text-slate-500">
                  Click &ldquo;Grade Submission&rdquo; on any item in the left queue to open the interactive 5-pillar rubric.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT DIRECTORY */}
      {activeTab === "students" && (
        <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden card-hover-lift">
          <div className="p-6 bg-slate-50/80 border-b border-slate-200/80 flex items-center justify-between">
            <h3 className="font-bold text-navy-950 text-base">Enrolled Student Directory</h3>
            <span className="text-xs font-semibold px-2.5 py-1 bg-navy-900 text-white rounded-md">
              {students.length} Accounts Active
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/90 text-slate-700 border-b border-slate-200">
                <tr>
                  <th className="py-3 px-6 font-semibold">Student Name</th>
                  <th className="py-3 px-6 font-semibold">Email</th>
                  <th className="py-3 px-6 font-semibold">Country</th>
                  <th className="py-3 px-6 font-semibold">Assigned Role</th>
                  <th className="py-3 px-6 font-semibold">Joined Date</th>
                  <th className="py-3 px-6 font-semibold text-right">Portfolio</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.map((st) => (
                  <tr key={st.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-bold text-navy-950 flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-navy-900 text-teal-400 flex items-center justify-center font-bold text-xs">
                        {st.full_name.charAt(0).toUpperCase()}
                      </div>
                      <span>{st.full_name}</span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 font-mono">{st.email}</td>
                    <td className="py-3.5 px-6 text-slate-600">{st.country}</td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          st.role === "ADMIN"
                            ? "bg-purple-100 text-purple-800"
                            : st.role === "INSTRUCTOR"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {st.role}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-500">
                      {new Date(st.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3.5 px-6 text-right">
                      <Link
                        href={`/portfolio/${st.id}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] transition-colors border border-teal-200"
                      >
                        <span>View Portfolio</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
