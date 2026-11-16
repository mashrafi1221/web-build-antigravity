"use client";

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import {
  Clock,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  Send,
  LayoutDashboard,
  ShieldAlert,
  Award,
  ChevronRight,
  Loader2,
  RefreshCw,
} from "lucide-react";

interface Option {
  id: string;
  text: string;
}

interface Question {
  id: string;
  question_type: string;
  content: string;
  options: Option[];
  correct_answer: string;
  marks: number;
  order_index: number;
}

interface Assessment {
  id: string;
  activity_id: string;
  title: string;
  total_marks: number;
  passing_marks: number;
  duration_minutes: number;
}

interface Attempt {
  id: string;
  assessment_id: string;
  user_id: string;
  score: number | null;
  status: string;
  started_at: string;
  submitted_at: string | null;
  answers: Record<string, string>;
}

export default function ExamPage() {
  const params = useParams();
  const router = useRouter();
  const examParamId = params?.id as string;

  const [loading, setLoading] = useState(true);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  const [previousAttempts, setPreviousAttempts] = useState<Attempt[]>([]);

  // Exam Workflow State: "lobby" | "in_progress" | "completed"
  const [examState, setExamState] = useState<"lobby" | "in_progress" | "completed">("lobby");
  const [activeAttemptId, setActiveAttemptId] = useState<string | null>(null);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, string>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(60 * 60);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalResult, setFinalResult] = useState<{
    score: number;
    passed: boolean;
    total: number;
    attempt: Attempt | null;
  } | null>(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Load Exam Data & User Auth
  useEffect(() => {
    loadExamData();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examParamId]);

  const loadExamData = async () => {
    try {
      setLoading(true);

      // 1. Check Session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/login?redirect=/dashboard");
        return;
      }
      setUser({ id: session.user.id, email: session.user.email || "" });

      // 2. Fetch Assessment by ID or Activity ID
      const { data: assessData, error: assessErr } = await supabase
        .from("assessments")
        .select("*")
        .or(`id.eq.${examParamId},activity_id.eq.${examParamId}`)
        .maybeSingle();

      if (assessErr || !assessData) {
        console.error("Assessment not found:", assessErr);
        setLoading(false);
        return;
      }

      setAssessment(assessData);

      // 3. Fetch Questions for this Assessment
      const { data: questionsData, error: qErr } = await supabase
        .from("questions")
        .select("*")
        .eq("assessment_id", assessData.id)
        .order("order_index", { ascending: true });

      if (qErr) {
        console.error("Questions fetch error:", qErr);
      } else if (questionsData) {
        setQuestions(questionsData as Question[]);
      }

      // 4. Fetch Previous Attempts
      const { data: attemptsData, error: attErr } = await supabase
        .from("attempts")
        .select("*")
        .eq("assessment_id", assessData.id)
        .eq("user_id", session.user.id)
        .order("started_at", { ascending: false });

      if (attErr) {
        console.error("Attempts fetch error:", attErr);
      } else if (attemptsData && attemptsData.length > 0) {
        setPreviousAttempts(attemptsData as Attempt[]);
      }
    } catch (err) {
      console.error("Error loading exam:", err);
    } finally {
      setLoading(false);
    }
  };

  // Start Exam
  const startExam = async () => {
    if (!assessment || !user) return;

    try {
      setIsSubmitting(true);
      // Create new in_progress attempt
      const { data: attempt, error } = await supabase
        .from("attempts")
        .insert({
          assessment_id: assessment.id,
          user_id: user.id,
          status: "in_progress",
          started_at: new Date().toISOString(),
          answers: {},
        })
        .select()
        .single();

      if (error) {
        alert("Failed to start exam: " + error.message);
        return;
      }

      setActiveAttemptId(attempt.id);
      setSelectedAnswers({});
      setCurrentQuestionIdx(0);
      const totalSeconds = (assessment.duration_minutes || 60) * 60;
      setTimeRemainingSeconds(totalSeconds);
      setExamState("in_progress");

      // Start Countdown Timer
      if (timerRef.current) clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleAutoSubmit(attempt.id);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      console.error("Error starting exam:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Answer Selection
  const selectOption = (questionId: string, optionId: string) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  // Auto-submit on Timer Expiry
  const handleAutoSubmit = async (attemptId: string) => {
    alert("Time has expired! Submitting your answers automatically.");
    await finalizeSubmission(attemptId, true);
  };

  // Submit Exam
  const handleSubmitExam = async () => {
    if (!activeAttemptId) return;
    setShowConfirmSubmit(false);
    await finalizeSubmission(activeAttemptId, false);
  };

  const finalizeSubmission = async (attemptId: string, isTimeout: boolean) => {
    if (!assessment || !questions.length) return;

    try {
      setIsSubmitting(true);
      if (timerRef.current) clearInterval(timerRef.current);

      // Grade calculation based on questions' correct answers
      let calculatedScore = 0;
      questions.forEach((q) => {
        const studentAns = selectedAnswers[q.id];
        if (studentAns && studentAns.toUpperCase() === q.correct_answer.toUpperCase()) {
          calculatedScore += q.marks;
        }
      });

      const passed = calculatedScore >= assessment.passing_marks;

      // Update attempt in Supabase
      const { data: updatedAttempt, error: updateErr } = await supabase
        .from("attempts")
        .update({
          score: calculatedScore,
          status: isTimeout ? "timed_out" : "completed",
          submitted_at: new Date().toISOString(),
          answers: selectedAnswers,
        })
        .eq("id", attemptId)
        .select()
        .single();

      if (updateErr) {
        console.error("Error updating attempt:", updateErr);
      }

      setFinalResult({
        score: calculatedScore,
        passed,
        total: assessment.total_marks,
        attempt: updatedAttempt || null,
      });

      setExamState("completed");
    } catch (err) {
      console.error("Error finalizing exam:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format Seconds to MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loading Technical Benchmark Exam...</p>
        </div>
      </div>
    );
  }

  if (!assessment) {
    return (
      <div className="min-h-screen pt-28 pb-16 px-4">
        <div className="max-w-2xl mx-auto card-glass p-8 text-center rounded-2xl border border-red-200">
          <ShieldAlert className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-navy-950 mb-2">Assessment Not Found</h2>
          <p className="text-slate-600 mb-6">
            The requested technical benchmark examination could not be loaded. Please return to your student dashboard.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-navy-900 text-white font-semibold hover:bg-navy-800 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentQuestionIdx];
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = questions.length > 0 ? (answeredCount / questions.length) * 100 : 0;
  const isTimeCritical = timeRemainingSeconds < 300; // < 5 mins

  // 1. LOBBY VIEW
  if (examState === "lobby") {
    const latestAttempt = previousAttempts.length > 0 ? previousAttempts[0] : null;

    return (
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-6">
            <Link href="/dashboard" className="hover:text-teal-600 flex items-center gap-1">
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-semibold">{assessment.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Info Card */}
            <div className="lg:col-span-2 card-glass p-8 rounded-2xl border border-teal-500/20 shadow-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-4 border border-teal-200">
                Official Benchmark Assessment
              </div>
              <h1 className="text-3xl font-extrabold text-navy-950 mb-4 tracking-tight">
                {assessment.title}
              </h1>
              <p className="text-slate-600 mb-8 leading-relaxed">
                This timed technical benchmark verifies your practical comprehension of core data manipulation patterns, multi-index operations, vectorization performance, memory optimization, and time-series pitfalls.
              </p>

              {/* Assessment Rules */}
              <div className="space-y-4 mb-8 bg-slate-50 p-5 rounded-xl border border-slate-200/80">
                <h3 className="text-sm font-bold text-navy-900 uppercase tracking-wide">
                  Examination Protocols & Parameters:
                </h3>
                <ul className="space-y-2.5 text-sm text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span><strong>Duration:</strong> Exactly {assessment.duration_minutes || 60} minutes. The clock begins immediately upon launching.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span><strong>Questions:</strong> {questions.length} comprehensive technical questions (10 marks each = {assessment.total_marks} total marks).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal-600 mt-0.5 shrink-0" />
                    <span><strong>Benchmark Threshold:</strong> {assessment.passing_marks}% ({assessment.passing_marks} / {assessment.total_marks} marks) required to achieve benchmark verification.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                    <span><strong>Auto-Submission:</strong> When the countdown timer reaches 00:00, all answered questions are automatically locked and graded.</span>
                  </li>
                </ul>
              </div>

              {/* Action Button */}
              <div className="flex items-center gap-4">
                <button
                  onClick={startExam}
                  disabled={isSubmitting || questions.length === 0}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-base shadow-lg shadow-teal-600/25 hover:shadow-teal-600/40 transition-all hover:-translate-y-0.5 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Initiating Session...</span>
                    </>
                  ) : (
                    <>
                      <Clock className="w-5 h-5" />
                      <span>Start Benchmark Examination</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
                <Link
                  href="/dashboard"
                  className="px-5 py-3 rounded-xl text-slate-600 hover:text-slate-900 font-medium transition-colors"
                >
                  Cancel
                </Link>
              </div>
            </div>

            {/* Sidebar: Attempt History */}
            <div className="space-y-6">
              <div className="card-glass p-6 rounded-2xl border border-slate-200">
                <h3 className="text-base font-bold text-navy-950 mb-3 flex items-center gap-2">
                  <Award className="w-5 h-5 text-teal-600" />
                  Your Attempt History
                </h3>

                {previousAttempts.length === 0 ? (
                  <div className="text-center py-6 text-slate-500 text-sm">
                    <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                    <p>No attempts recorded yet.</p>
                    <p className="text-xs text-slate-400 mt-1">Take your first attempt when ready.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {previousAttempts.map((att, idx) => {
                      const isPass = (att.score || 0) >= assessment.passing_marks;
                      return (
                        <div
                          key={att.id}
                          className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between"
                        >
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xs font-bold text-navy-900">
                                Attempt #{previousAttempts.length - idx}
                              </span>
                              <span
                                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                                  isPass
                                    ? "bg-emerald-100 text-emerald-800"
                                    : "bg-amber-100 text-amber-800"
                                }`}
                              >
                                {isPass ? "PASSED" : "NOT PASSED"}
                              </span>
                            </div>
                            <span className="text-xs text-slate-500">
                              {new Date(att.started_at).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-lg font-black text-navy-950">
                              {att.score ?? "—"}
                            </span>
                            <span className="text-xs text-slate-400">/{assessment.total_marks}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Rubric Alignment Note */}
              <div className="p-5 rounded-2xl bg-teal-900 text-teal-50 border border-teal-800 shadow-md">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-300 mb-1">
                  Why Timed Examinations?
                </h4>
                <p className="text-xs text-teal-100 leading-relaxed">
                  Real technical job screens require immediate precision. This examination assesses whether your data manipulation concepts are second nature or require endless trial and error.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. COMPLETED RESULT VIEW
  if (examState === "completed" && finalResult) {
    return (
      <div className="min-h-screen pt-28 pb-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="card-glass p-8 md:p-10 rounded-3xl border border-teal-500/20 shadow-2xl text-center mb-8">
            <div
              className={`w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-5 ${
                finalResult.passed
                  ? "bg-emerald-100 text-emerald-600 ring-8 ring-emerald-50"
                  : "bg-amber-100 text-amber-600 ring-8 ring-amber-50"
              }`}
            >
              {finalResult.passed ? (
                <CheckCircle2 className="w-10 h-10" />
              ) : (
                <AlertTriangle className="w-10 h-10" />
              )}
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-slate-100 text-slate-700">
              Examination Complete
            </div>

            <h1 className="text-3xl md:text-4xl font-extrabold text-navy-950 mb-2">
              {finalResult.passed ? "Benchmark Verified!" : "Score Below Benchmark"}
            </h1>

            <p className="text-slate-600 max-w-lg mx-auto mb-6">
              {finalResult.passed
                ? "Congratulations! You demonstrated the analytical rigor and pandas fluency expected of an industry-ready Data Scientist."
                : `You scored ${finalResult.score} out of ${finalResult.total}. The required benchmark passing threshold is ${assessment.passing_marks} marks. Review the solution breakdown below and re-test.`}
            </p>

            {/* Score Showcase */}
            <div className="inline-flex items-baseline justify-center gap-2 px-8 py-4 rounded-2xl bg-navy-950 text-white mb-8 shadow-inner">
              <span className="text-5xl font-black tracking-tight text-teal-400">
                {finalResult.score}
              </span>
              <span className="text-slate-400 text-lg font-bold">/ {finalResult.total}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-md"
              >
                <LayoutDashboard className="w-4 h-4" />
                Return to Student Dashboard
              </Link>
              <button
                onClick={() => {
                  setExamState("lobby");
                  loadExamData();
                }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-navy-950 font-bold transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Retake Examination
              </button>
            </div>
          </div>

          {/* Question Breakdown */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-navy-950 mb-4 flex items-center gap-2">
              <span>Detailed Question Analysis & Solution Review</span>
              <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700">
                {questions.length} Items
              </span>
            </h2>

            {questions.map((q, idx) => {
              const studentAnswer = selectedAnswers[q.id];
              const isCorrect = studentAnswer && studentAnswer.toUpperCase() === q.correct_answer.toUpperCase();

              return (
                <div
                  key={q.id}
                  className={`p-6 rounded-2xl border transition-all ${
                    isCorrect
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-red-50/40 border-red-200"
                  }`}
                >
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-500 uppercase">
                        Question {idx + 1}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-bold px-2.5 py-0.5 rounded-full ${
                          isCorrect
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Correct (+{q.marks} pts)
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" />
                            Incorrect (0 pts)
                          </>
                        )}
                      </span>
                    </div>
                  </div>

                  <p className="text-navy-950 font-semibold text-sm mb-4 whitespace-pre-line leading-relaxed">
                    {q.content}
                  </p>

                  {/* Options */}
                  <div className="grid grid-cols-1 gap-2 mb-3">
                    {q.options.map((opt) => {
                      const isSelected = studentAnswer === opt.id;
                      const isAnswerKey = q.correct_answer.toUpperCase() === opt.id.toUpperCase();

                      let badgeClass = "bg-white border-slate-200 text-slate-700";
                      if (isAnswerKey) {
                        badgeClass = "bg-emerald-100/90 border-emerald-400 text-emerald-950 font-bold";
                      } else if (isSelected && !isCorrect) {
                        badgeClass = "bg-red-100/90 border-red-400 text-red-950 font-bold";
                      }

                      return (
                        <div
                          key={opt.id}
                          className={`p-3 rounded-xl border text-xs flex items-center justify-between ${badgeClass}`}
                        >
                          <div className="flex items-center gap-2.5">
                            <span className="w-6 h-6 rounded-lg bg-white/80 border flex items-center justify-center font-bold text-[11px]">
                              {opt.id}
                            </span>
                            <span>{opt.text}</span>
                          </div>
                          {isAnswerKey && (
                            <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wide bg-emerald-200/60 px-2 py-0.5 rounded">
                              Correct Answer
                            </span>
                          )}
                          {isSelected && !isCorrect && (
                            <span className="text-[10px] font-bold text-red-800 uppercase tracking-wide bg-red-200/60 px-2 py-0.5 rounded">
                              Your Selection
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // 3. ACTIVE IN-PROGRESS EXAM VIEW
  return (
    <div className="min-h-screen bg-slate-100/60 text-slate-900 pb-24">
      {/* Sticky Active Exam Header */}
      <header className="sticky top-0 z-40 bg-navy-950/95 backdrop-blur-md text-white border-b border-navy-800 shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-400 font-black text-sm">
              DS
            </div>
            <div>
              <h1 className="text-sm font-bold text-white line-clamp-1">{assessment.title}</h1>
              <p className="text-[11px] text-teal-300/80">
                Question {currentQuestionIdx + 1} of {questions.length} • {answeredCount} Answered
              </p>
            </div>
          </div>

          {/* Countdown Clock */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
                isTimeCritical
                  ? "bg-red-500/20 border-red-500 text-red-300 animate-pulse"
                  : "bg-navy-900 border-teal-500/30 text-teal-300"
              }`}
            >
              <Clock className="w-4 h-4" />
              <span>{formatTime(timeRemainingSeconds)}</span>
            </div>

            <button
              onClick={() => setShowConfirmSubmit(true)}
              disabled={isSubmitting}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-bold transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Finish Exam</span>
            </button>
          </div>
        </div>

        {/* Linear Progress Bar */}
        <div className="w-full bg-navy-900 h-1">
          <div
            className="bg-teal-400 h-1 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Examination Layout */}
      <main className="max-w-5xl mx-auto px-4 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Question Viewport (Left 3 cols) */}
          <div className="lg:col-span-3">
            {currentQ ? (
              <div className="card-glass p-6 md:p-8 rounded-3xl border border-slate-200/90 shadow-lg mb-6">
                {/* Question Header */}
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
                    Question {currentQuestionIdx + 1} of {questions.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    Value: <strong className="text-navy-950 font-bold">{currentQ.marks} Marks</strong>
                  </span>
                </div>

                {/* Question Prompt */}
                <h2 className="text-base md:text-lg font-bold text-navy-950 leading-relaxed whitespace-pre-line mb-6 font-sans">
                  {currentQ.content}
                </h2>

                {/* Multiple Choice Options */}
                <div className="space-y-3 mb-8">
                  {currentQ.options.map((opt) => {
                    const isSelected = selectedAnswers[currentQ.id] === opt.id;
                    return (
                      <button
                        key={opt.id}
                        type="button"
                        onClick={() => selectOption(currentQ.id, opt.id)}
                        className={`w-full text-left p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                          isSelected
                            ? "bg-teal-50/80 border-teal-600 text-navy-950 ring-2 ring-teal-500/20 shadow-sm"
                            : "bg-white border-slate-200 hover:border-slate-300 text-slate-700 hover:bg-slate-50/60"
                        }`}
                      >
                        <span
                          className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                            isSelected
                              ? "bg-teal-600 text-white"
                              : "bg-slate-100 text-slate-600 border border-slate-300"
                          }`}
                        >
                          {opt.id}
                        </span>
                        <span className="text-sm pt-0.5 leading-snug">{opt.text}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-slate-200">
                  <button
                    onClick={() => setCurrentQuestionIdx((p) => Math.max(0, p - 1))}
                    disabled={currentQuestionIdx === 0}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-navy-950 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Previous
                  </button>

                  {currentQuestionIdx < questions.length - 1 ? (
                    <button
                      onClick={() => setCurrentQuestionIdx((p) => Math.min(questions.length - 1, p + 1))}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-navy-900 hover:bg-navy-800 text-white shadow-sm transition-all"
                    >
                      <span>Next Question</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowConfirmSubmit(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-700 text-white shadow-md shadow-teal-600/25 transition-all"
                    >
                      <Send className="w-4 h-4" />
                      <span>Review & Submit</span>
                    </button>
                  )}
                </div>
              </div>
            ) : null}
          </div>

          {/* Right Question Palette */}
          <div className="space-y-6">
            <div className="card-glass p-5 rounded-2xl border border-slate-200/90 shadow-sm">
              <h3 className="text-xs font-bold text-navy-900 uppercase tracking-wider mb-3">
                Question Navigator
              </h3>

              <div className="grid grid-cols-5 gap-2 mb-4">
                {questions.map((q, idx) => {
                  const isCurrent = idx === currentQuestionIdx;
                  const isAnswered = !!selectedAnswers[q.id];

                  let btnStyle = "bg-white border-slate-200 text-slate-700 hover:border-slate-300";
                  if (isCurrent) {
                    btnStyle = "bg-navy-950 text-white border-navy-950 ring-2 ring-teal-500";
                  } else if (isAnswered) {
                    btnStyle = "bg-teal-50 text-teal-800 border-teal-300 font-bold";
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentQuestionIdx(idx)}
                      className={`h-9 rounded-xl border text-xs font-bold transition-all flex items-center justify-center ${btnStyle}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Navigator Legend */}
              <div className="space-y-1.5 pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-teal-50 border border-teal-300" />
                  <span>Answered ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-white border border-slate-200" />
                  <span>Unanswered ({questions.length - answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-navy-950 text-white" />
                  <span>Current Question</span>
                </div>
              </div>
            </div>

            {/* Mobile Submit Button */}
            <div className="block sm:hidden">
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="w-full py-3 rounded-xl bg-teal-600 text-white font-bold text-sm shadow-md"
              >
                Submit Examination
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 bg-navy-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-slate-200 text-center animate-fade-in-up">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-navy-950 mb-2">Submit Benchmark Exam?</h3>
            <p className="text-slate-600 text-sm mb-6">
              You have answered <strong>{answeredCount} of {questions.length}</strong> questions. Once submitted, your answers will be permanently evaluated and graded against the official benchmark.
            </p>

            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 text-sm transition-colors"
              >
                Continue Answering
              </button>
              <button
                onClick={handleSubmitExam}
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md transition-all"
              >
                {isSubmitting ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>Yes, Submit Now</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
