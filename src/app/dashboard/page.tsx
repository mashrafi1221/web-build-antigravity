"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Terminal,
  User,
  LogOut,
  Download,
  UploadCloud,
  CheckCircle2,
  Clock,
  AlertCircle,
  FileCode,
  Trophy,
  Award,
  ChevronRight,
  Loader2,
  Send,
  ExternalLink,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface Profile {
  id: string;
  full_name: string;
  email: string;
  country: string;
  role: string;
}

interface Activity {
  id: string;
  title: string;
  activity_type: string;
  content: string;
  exercises?: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    dataset_url: string;
    data_dictionary: Record<string, string>;
    deliverables_format: string;
  }[];
}

interface Submission {
  id: string;
  activity_id: string;
  file_url: string;
  file_name: string;
  submission_notes: string;
  status: string;
  submitted_at: string;
  activities?: {
    title: string;
  };
  grades?: {
    score: number;
    max_score: number;
    feedback: string;
    graded_at: string;
  };
}

interface ExamAttempt {
  id: string;
  assessment_id: string;
  score: number | null;
  status: string;
  started_at: string;
  submitted_at: string | null;
  assessments?: {
    title: string;
    total_marks: number;
    passing_marks: number;
  };
}

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [examAttempts, setExamAttempts] = useState<ExamAttempt[]>([]);
  
  // Submission Form State
  const [selectedActivityId, setSelectedActivityId] = useState<string>("");
  const [submissionNotes, setSubmissionNotes] = useState("");
  const [fileUrl, setFileUrl] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [gradingSubId, setGradingSubId] = useState<string | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Check Session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        router.push("/login");
        return;
      }

      // 2. Fetch Profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", session.user.id)
        .single();

      if (profileData) {
        setProfile(profileData);
      } else {
        setProfile({
          id: session.user.id,
          full_name: session.user.user_metadata?.full_name || "Student User",
          email: session.user.email || "",
          country: session.user.user_metadata?.country || "Bangladesh",
          role: session.user.user_metadata?.role || "STUDENT",
        });
      }

      // 3. Fetch Activities & Exercises for Month 1
      const { data: activitiesData, error: actError } = await supabase
        .from("activities")
        .select("id, title, activity_type, content, exercises(id, title, description, difficulty, dataset_url, data_dictionary, deliverables_format)")
        .order("order_index", { ascending: true });

      if (actError) {
        console.error("Activities fetch error:", actError);
      } else if (activitiesData && activitiesData.length > 0) {
        setActivities(activitiesData as Activity[]);
        setSelectedActivityId((prev) => (prev ? prev : activitiesData[0].id));
      }

      // 4. Fetch User's Submissions & Grades
      const { data: submissionsData, error: subError } = await supabase
        .from("submissions")
        .select("id, activity_id, file_url, file_name, submission_notes, status, submitted_at, activities(title), grades(score, max_score, feedback, graded_at)")
        .eq("user_id", session.user.id)
        .order("submitted_at", { ascending: false });

      if (subError) {
        console.error("Submissions fetch error:", subError);
      } else if (submissionsData) {
        setSubmissions(submissionsData as unknown as Submission[]);
      }

      // 5. Fetch User's Assessment Attempts
      const { data: attemptsData, error: attError } = await supabase
        .from("attempts")
        .select("id, assessment_id, score, status, started_at, submitted_at, assessments(title, total_marks, passing_marks)")
        .eq("user_id", session.user.id)
        .order("started_at", { ascending: false });

      if (attError) {
        console.error("Attempts fetch error:", attError);
      } else if (attemptsData) {
        setExamAttempts(attemptsData as unknown as ExamAttempt[]);
      }
    } catch (err) {
      console.error("Dashboard data fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const handleSubmitSolution = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    const targetActivityId = selectedActivityId || (activities[0]?.id ?? "");
    if (!targetActivityId) {
      setSubmitMessage("Error: Please select a valid challenge or assignment.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage(null);

    try {
      const { data, error } = await supabase.from("submissions").insert({
        activity_id: targetActivityId,
        user_id: profile.id,
        file_url: fileUrl.trim() || "https://github.com/student/solution-repo",
        file_name: "student_solution.py",
        submission_notes: submissionNotes.trim() || "Solution submitted for evaluation.",
        status: "submitted",
      }).select();

      if (error) {
        setSubmitMessage(`Submission failed: ${error.message}`);
      } else {
        setSubmitMessage("Solution submitted successfully for instructor evaluation!");
        setSubmissionNotes("");
        setFileUrl("");
        // Refresh submissions
        await fetchDashboardData();
      }
    } catch (err: unknown) {
      const error = err as Error;
      setSubmitMessage(`Error: ${error.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  // Instructor Evaluation Simulation for Testing Milestone 1
  const handleSimulateGrade = async (submissionId: string) => {
    if (!profile) return;
    setGradingSubId(submissionId);

    try {
      // 1. Insert grade
      const { error: gradeError } = await supabase.from("grades").upsert({
        submission_id: submissionId,
        instructor_id: profile.id,
        score: 88,
        max_score: 100,
        rubric_scores: {
          data_correctness: 28,
          code_quality: 18,
          data_handling: 22,
          interpretation: 12,
          documentation: 8,
        },
        feedback: "Excellent vectorized Pandas pipeline! Handled forward-fill edge cases cleanly. Consider adding type annotations to helper methods.",
      });

      // 2. Update submission status to 'graded'
      await supabase.from("submissions").update({ status: "graded" }).eq("id", submissionId);

      await fetchDashboardData();
    } catch (err) {
      console.error("Grading simulation error:", err);
    } finally {
      setGradingSubId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading your student dashboard...</p>
      </div>
    );
  }

  const activeActivity = activities.find((a) => a.id === selectedActivityId) || activities[0];
  const activeExercise = activeActivity?.exercises?.[0];

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
      {/* HEADER BAR */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 card-hover-lift">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-navy-900 text-teal-400 flex items-center justify-center font-bold text-xl shadow-md">
            <Terminal className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-navy-950">
                Welcome back, {profile?.full_name || "Student"}
              </h1>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                {profile?.role || "STUDENT"}
              </span>
              {(profile?.role === "ADMIN" || profile?.role === "INSTRUCTOR") && (
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-navy-900 text-teal-300 hover:bg-navy-800 text-xs font-bold shadow-sm transition-all"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                  <span>Open Admin Portal</span>
                </Link>
              )}
            </div>
            <p className="text-sm text-slate-500">
              {profile?.email} • Enrolled: Data Science Job-Ready Academy (Month 1 Active)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            title="Refresh Dashboard"
            className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* METRICS & STAGE SUMMARY */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Stage</span>
          <h3 className="text-xl font-bold text-navy-950">Month 1: Python</h3>
          <p className="text-xs text-slate-500">Week 2 of 24 • Data Manipulation</p>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tasks Completed</span>
          <h3 className="text-xl font-bold text-teal-700">{submissions.length} / 4 Submitted</h3>
          <p className="text-xs text-slate-500">Next milestone due Sunday</p>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Evaluated Submissions</span>
          <h3 className="text-xl font-bold text-navy-950">
            {submissions.filter((s) => s.grades).length} Graded
          </h3>
          <p className="text-xs text-slate-500">Detailed rubric reviews received</p>
        </div>

        <div className="bg-white/85 backdrop-blur-md rounded-2xl p-6 border border-slate-200/90 shadow-sm space-y-2 card-hover-lift">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Average Score</span>
          <h3 className="text-xl font-bold text-cyan-700">
            {submissions.filter((s) => s.grades).length > 0
              ? `${(
                  submissions
                    .filter((s) => s.grades)
                    .reduce((acc, curr) => acc + (curr.grades?.score || 0), 0) /
                  submissions.filter((s) => s.grades).length
                ).toFixed(1)} / 100`
              : "Pending review"}
          </h3>
          <p className="text-xs text-slate-500">Min. passing benchmark: 70</p>
        </div>
      </div>

      {/* ACTIVE PRACTICAL WORKFLOW */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Active Practical Challenge & Submission */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-8 shadow-sm space-y-6 card-hover-lift">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-md border border-teal-200">
                  Current Assigned Challenge
                </span>
                <h2 className="text-xl font-extrabold text-navy-950">
                  {activeActivity?.title || "Month 1 Challenge: Python & Pandas"}
                </h2>
              </div>

              {/* Task Selector */}
              {activities.length > 0 && (
                <select
                  value={selectedActivityId}
                  onChange={(e) => setSelectedActivityId(e.target.value)}
                  className="bg-slate-50 border border-slate-200 text-xs font-semibold rounded-lg px-3 py-2 text-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
                >
                  {activities.map((act) => (
                    <option key={act.id} value={act.id}>
                      {act.title}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Scenario Brief */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Scenario &amp; Task Brief</h4>
              <p className="text-sm text-slate-700 leading-relaxed bg-slate-50/80 p-4 rounded-xl border border-slate-200/70">
                {activeActivity?.content || "You are provided with raw tick-by-tick stock trading records with irregular timestamps, multi-level column hierarchies, and missing exchange symbols. Transform and aggregate the records without Python loops."}
              </p>
            </div>

            {/* Activity Type: Examination vs Practical Exercise */}
            {activeActivity?.activity_type === "examination" ? (
              <div className="border-t border-slate-100 pt-6 space-y-6">
                <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-teal-950 text-white rounded-2xl p-6 md:p-8 shadow-xl border border-teal-500/30">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase tracking-wider border border-teal-400/30 mb-2">
                        Timed Technical Benchmark
                      </span>
                      <h3 className="text-2xl font-black text-white">
                        {activeActivity.title}
                      </h3>
                      <p className="text-slate-300 text-xs mt-1">
                        Standardized 10-question evaluation • 100 total marks • Passing benchmark: 70%
                      </p>
                    </div>
                    <div className="flex items-center gap-2 bg-navy-800/80 px-4 py-2 rounded-xl border border-teal-500/20 shrink-0">
                      <Clock className="w-5 h-5 text-teal-400" />
                      <div className="text-right">
                        <span className="text-xs text-slate-400 block font-semibold">Duration</span>
                        <span className="text-sm font-bold text-white">60 Minutes</span>
                      </div>
                    </div>
                  </div>

                  {/* Previous Attempt Status */}
                  {examAttempts.length > 0 && (
                    <div className="p-4 rounded-xl bg-white/10 border border-white/10 mb-6 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Award className="w-5 h-5 text-teal-400 shrink-0" />
                        <div>
                          <span className="text-xs font-bold text-white block">
                            Latest Benchmark Score: {examAttempts[0].score ?? 0} / 100
                          </span>
                          <span className="text-[11px] text-teal-200">
                            {(examAttempts[0].score ?? 0) >= 70
                              ? "✓ Benchmark verified (Passing criteria met)"
                              : "Score below 70 threshold — retake recommended"}
                          </span>
                        </div>
                      </div>
                      <span
                        className={`text-xs font-bold px-3 py-1 rounded-full ${
                          (examAttempts[0].score ?? 0) >= 70
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-amber-500/20 text-amber-300 border border-amber-500/40"
                        }`}
                      >
                        {(examAttempts[0].score ?? 0) >= 70 ? "PASSED" : "RETRY REQUIRED"}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/exam/${activeActivity.id}`}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-extrabold text-sm shadow-lg shadow-teal-500/25 transition-all transform hover:-translate-y-0.5"
                    >
                      <Clock className="w-4 h-4" />
                      <span>{examAttempts.length > 0 ? "Retake Benchmark Exam" : "Start Benchmark Exam"}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Exercise Details & Dataset Download */}
                {activeExercise && (
                  <div className="space-y-4">
                    <div className="bg-teal-50/50 rounded-xl p-5 border border-teal-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-xs font-bold text-teal-800 uppercase tracking-wider">
                          Provided Raw Dataset ({activeExercise.difficulty})
                        </span>
                        <p className="text-sm font-semibold text-navy-950">{activeExercise.title}</p>
                        <p className="text-xs text-slate-500">Deliverable: {activeExercise.deliverables_format}</p>
                      </div>
                      <a
                        href={activeExercise.dataset_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-navy-900 text-white hover:bg-navy-800 text-xs font-bold shrink-0 shadow-sm transition-all transform hover:-translate-y-0.5"
                      >
                        <Download className="w-4 h-4 text-teal-400" />
                        <span>Download Dataset</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* SUBMISSION FORM */}
                <div className="border-t border-slate-100 pt-6 space-y-4">
                  <h4 className="text-sm font-bold text-navy-950 flex items-center gap-2">
                    <UploadCloud className="w-4 h-4 text-teal-600" />
                    Upload Your Practical Solution
                  </h4>

                  {submitMessage && (
                    <div
                      className={`p-3.5 rounded-xl text-xs font-medium flex items-start gap-2 ${
                        submitMessage.includes("successfully")
                          ? "bg-teal-50 border border-teal-200 text-teal-800"
                          : "bg-rose-50 border border-rose-200 text-rose-800"
                      }`}
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                      <span>{submitMessage}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmitSolution} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Solution Code URL / GitHub Repository Link
                      </label>
                      <input
                        type="url"
                        required
                        value={fileUrl}
                        onChange={(e) => setFileUrl(e.target.value)}
                        placeholder="https://github.com/your-username/challenge-1-solution"
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-slate-700">
                        Execution Notes &amp; Methodology Explanation
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={submissionNotes}
                        onChange={(e) => setSubmissionNotes(e.target.value)}
                        placeholder="Explain your data cleaning logic, vectorization approach, and handling of edge-cases..."
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-6 py-3 rounded-xl bg-navy-900 hover:bg-navy-800 disabled:opacity-50 text-white font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      {submitting ? (
                        <>
                          <Loader2 className="w-4 h-4 text-teal-400 animate-spin" />
                          <span>Submitting...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-teal-400" />
                          <span>Submit Solution for Evaluation</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Col: Submissions & Graded Feedback */}
        <div className="space-y-6">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4 card-hover-lift">
            <h3 className="font-bold text-navy-950 text-lg flex items-center gap-2">
              <Trophy className="w-5 h-5 text-teal-600" />
              Submission History &amp; Feedback
            </h3>

            {submissions.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/70 text-center space-y-2">
                <FileCode className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No submissions yet</p>
                <p className="text-xs text-slate-500">
                  Download the dataset on the left, complete your code, and submit your solution to receive instructor grading.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((sub) => (
                  <div
                    key={sub.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-navy-950 truncate max-w-[180px]">
                        {sub.activities?.title || "Practical Task"}
                      </span>
                      <span
                        className={`text-xs px-2.5 py-0.5 rounded-full font-bold uppercase ${
                          sub.status === "graded"
                            ? "bg-teal-100 text-teal-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </div>

                    <a
                      href={sub.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-teal-700 hover:underline flex items-center gap-1 font-medium"
                    >
                      <span className="truncate max-w-[200px]">{sub.file_url}</span>
                      <ExternalLink className="w-3 h-3 shrink-0" />
                    </a>

                    {sub.grades ? (
                      <div className="bg-white p-3 rounded-lg border border-teal-200 space-y-2 shadow-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-600">Instructor Grade:</span>
                          <span className="text-sm font-black text-teal-700">
                            {sub.grades.score} / {sub.grades.max_score}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 bg-slate-50 p-2 rounded leading-relaxed">
                          &ldquo;{sub.grades.feedback}&rdquo;
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1 border-t border-slate-200/70">
                        <p className="text-xs text-slate-500 italic">
                          Under review by instructor. Rubric feedback will appear here.
                        </p>
                        {/* Instructor Evaluation Action for Milestone 1 Testing */}
                        <button
                          type="button"
                          disabled={gradingSubId === sub.id}
                          onClick={() => handleSimulateGrade(sub.id)}
                          className="w-full text-center py-1.5 px-3 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 border border-teal-200 text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                        >
                          {gradingSubId === sub.id ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin text-teal-600" />
                          ) : (
                            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
                          )}
                          <span>Evaluate As Instructor (Simulate 88/100)</span>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Exam Benchmarks Card */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-slate-200/90 p-6 shadow-sm space-y-4 card-hover-lift">
            <h3 className="font-bold text-navy-950 text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              Examination Benchmarks
            </h3>

            {examAttempts.length === 0 ? (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200/70 text-center space-y-2">
                <Clock className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-sm font-semibold text-slate-700">No benchmark exams taken yet</p>
                <p className="text-xs text-slate-500">
                  Select &ldquo;Examination 1.3&rdquo; from the challenge dropdown to take your timed benchmark assessment.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {examAttempts.map((att) => {
                  const isPass = (att.score || 0) >= 70;
                  return (
                    <div
                      key={att.id}
                      className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 flex items-center justify-between"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-navy-950">
                            {att.assessments?.title || "Month 1 Benchmark"}
                          </span>
                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                              isPass
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {isPass ? "PASSED" : "RETRY REQUIRED"}
                          </span>
                        </div>
                        <span className="text-xs text-slate-500">
                          {new Date(att.started_at).toLocaleDateString()} • Status: {att.status}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-lg font-black text-navy-950">
                          {att.score ?? "—"}
                        </span>
                        <span className="text-xs text-slate-400">/ 100</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
