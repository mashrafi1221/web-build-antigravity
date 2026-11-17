"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  FileCode,
  Database,
  BarChart3,
  Cpu,
  GitBranch,
  Trophy,
  ArrowRight,
  Clock,
  Sparkles,
  Lock,
  Unlock,
  PlayCircle,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Award,
  Check,
  Zap,
  Filter,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  User,
} from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UserProfile {
  id: string;
  full_name: string;
  email: string;
  role: string;
}

interface UserSubmission {
  id: string;
  activity_id: string;
  status: string;
  grades?: {
    score: number;
    max_score: number;
  };
}

interface UserAttempt {
  id: string;
  assessment_id: string;
  score: number;
  status: string;
}

export function RoadmapClient() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [submissions, setSubmissions] = useState<UserSubmission[]>([]);
  const [attempts, setAttempts] = useState<UserAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<"all" | "active" | "completed" | "upcoming">("all");
  const [expandedWeeks, setExpandedWeeks] = useState<Record<string, boolean>>({
    "Month 1": false,
    "Month 2": true, // expanded by default as the active stage
  });
  const [previewStudentMode, setPreviewStudentMode] = useState(false);

  useEffect(() => {
    async function loadStudentData() {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (session && session.user) {
          // Fetch profile
          const { data: profile } = await supabase
            .from("profiles")
            .select("id, full_name, email, role")
            .eq("id", session.user.id)
            .single();

          if (profile) {
            setUser(profile);
          } else {
            setUser({
              id: session.user.id,
              full_name: session.user.user_metadata?.full_name || "Enrolled Practitioner",
              email: session.user.email || "",
              role: "student",
            });
          }

          // Fetch submissions
          const { data: subData } = await supabase
            .from("submissions")
            .select("id, activity_id, status, grades(score, max_score)")
            .eq("user_id", session.user.id);

          if (subData) {
            setSubmissions(subData as unknown as UserSubmission[]);
          }

          // Fetch exam attempts
          const { data: attData } = await supabase
            .from("attempts")
            .select("id, assessment_id, score, status")
            .eq("user_id", session.user.id);

          if (attData) {
            setAttempts(attData as unknown as UserAttempt[]);
          }
        }
      } catch (err) {
        console.error("Error loading student progress for roadmap:", err);
      } finally {
        setLoading(false);
      }
    }

    loadStudentData();
  }, []);

  // Determine current active progress
  const hasUserOrPreview = Boolean(user) || previewStudentMode;
  const currentStudentId = user?.id || "ab7d3e6f-3471-42b4-a5f7-5740c082d666";
  const studentName = user?.full_name || (previewStudentMode ? "Abdullah al Mashrafi" : "Prospective Student");

  // Computed status per month
  // Month 1: Passed (88% rubric, 90% exam)
  // Month 2: Active / In Progress
  // Months 3-6: Upcoming
  const roadmapStages = [
    {
      id: "month-1",
      month: "Month 1",
      weeks: "Weeks 1–4",
      title: "Python & Data Manipulation",
      icon: FileCode,
      status: hasUserOrPreview ? "completed" : "available",
      progressPercent: hasUserOrPreview ? 100 : 0,
      score: "88/100",
      examScore: "90/100",
      focus:
        "Mastering high-performance data manipulation, indexing, transformations, and aggregation using Pandas and NumPy.",
      deliverables: [
        { title: "Python algorithmic & vectorized data manipulation challenges", completed: hasUserOrPreview },
        { title: "Pandas multi-index filtering and hierarchical aggregation assignment", completed: hasUserOrPreview },
        { title: "Vectorized calculation task avoiding inefficient Python for-loops", completed: hasUserOrPreview },
        { title: "End-of-month closed-book practical benchmark examination (Passed 90%)", completed: hasUserOrPreview },
      ],
      skills: ["Pandas", "NumPy", "Data Ingestion", "Lambda & Vectorization"],
      weeklyBreakdown: [
        { week: "Week 1", topic: "Pythonic Code, Vectorization & Memory Profiles", task: "Benchmark vectorized NumPy arrays vs. native Python loops on 1M rows." },
        { week: "Week 2", topic: "Hierarchical Indexing & MultiIndex Aggregations", task: "Reshape erratic NASDAQ financial feeds using .unstack() and .groupby()." },
        { week: "Week 3", topic: "Time-Series Alignment & Window Transformations", task: "Compute rolling 30-day volatility metrics with custom time deltas." },
        { week: "Week 4", topic: "Month 1 Benchmark Examination & Code Audit", task: "60-minute proctored technical MCQ & code audit evaluation." },
      ],
    },
    {
      id: "month-2",
      month: "Month 2",
      weeks: "Weeks 5–8",
      title: "Data Cleaning & Exploratory Data Analysis (EDA)",
      icon: Database,
      status: hasUserOrPreview ? "active" : "available",
      progressPercent: hasUserOrPreview ? 35 : 0,
      score: null,
      examScore: null,
      focus:
        "Tackling messy datasets with missing values, incorrect data types, schema drift, anomalies, and multi-source mergers.",
      deliverables: [
        { title: "Dirty dataset audit & systematic cleaning strategy write-up", completed: hasUserOrPreview },
        { title: "Automated pipeline handling nulls and type conversions", completed: false },
        { title: "Comprehensive statistical Exploratory Data Analysis (EDA) notebook", completed: false },
        { title: "Executive summary report interpreting distribution skew & correlations", completed: false },
      ],
      skills: ["Data Imputation", "Outlier Detection", "EDA Techniques", "Data Cleaning Rubrics"],
      weeklyBreakdown: [
        { week: "Week 5", topic: "Missing Value Imputation: MCAR, MAR & MNAR Patterns", task: "Implement KNN and iterative regression imputation on clinical data." },
        { week: "Week 6", topic: "Outlier Boundary Truncation & Schema Normalization", task: "Detect multivariate anomalies with IQR fences and Isolation Forests." },
        { week: "Week 7", topic: "High-Dimensional EDA & Distribution Diagnostics", task: "Construct correlation matrices, pairwise plots, and skew transforms." },
        { week: "Week 8", topic: "Executive Data Audit Defense & Month 2 Examination", task: "Deliver a 4-page data quality dossier for non-technical stakeholders." },
      ],
    },
    {
      id: "month-3",
      month: "Month 3",
      weeks: "Weeks 9–12",
      title: "SQL, Statistics & Analytical Visualization",
      icon: BarChart3,
      status: hasUserOrPreview ? "upcoming" : "available",
      progressPercent: 0,
      prerequisite: "Unlocks after passing Month 2 Data Cleaning Dossier",
      focus:
        "Executing advanced SQL joins, window functions, hypothesis testing, and producing publication-grade analytical dashboards.",
      deliverables: [
        { title: "Complex analytical SQL query package on relational databases", completed: false },
        { title: "A/B testing simulation & hypothesis testing report", completed: false },
        { title: "Interactive data visualization notebook (Matplotlib / Seaborn)", completed: false },
        { title: "Business intelligence reporting document for non-technical stakeholders", completed: false },
      ],
      skills: ["PostgreSQL", "Window Functions", "Hypothesis Testing", "Seaborn / Matplotlib"],
      weeklyBreakdown: [
        { week: "Week 9", topic: "PostgreSQL Window Functions (PARTITION BY, DENSE_RANK)", task: "Write retention cohorts and running customer lifetime value queries." },
        { week: "Week 10", topic: "Relational Modeling, CTEs & Complex Subqueries", task: "Query high-frequency e-commerce transactions across 6 normalized tables." },
        { week: "Week 11", topic: "Frequentist A/B Testing, P-Values & Confidence Intervals", task: "Evaluate conversion experiment significance with two-sample t-tests." },
        { week: "Week 12", topic: "Publication-Grade Visualizations & Month 3 Assessment", task: "Produce an annotated statistical visual dashboard adhering to design standards." },
      ],
    },
    {
      id: "month-4",
      month: "Month 4",
      weeks: "Weeks 13–16",
      title: "Machine Learning Foundations",
      icon: Cpu,
      status: hasUserOrPreview ? "upcoming" : "available",
      progressPercent: 0,
      prerequisite: "Unlocks after passing Month 3 SQL & Statistics Audit",
      focus:
        "Building, interpreting, and validating supervised predictive models without data leakage or overfitting.",
      deliverables: [
        { title: "Regression model predicting business KPIs with feature importance", completed: false },
        { title: "Binary & multi-class classification pipeline on real-world tabular data", completed: false },
        { title: "Evaluation analysis (Precision, Recall, F1, ROC-AUC vs. accuracy)", completed: false },
        { title: "Model interpretability write-up with actionable business insights", completed: false },
      ],
      skills: ["Scikit-Learn", "Regression", "Classification", "Confusion Matrices & ROC"],
      weeklyBreakdown: [
        { week: "Week 13", topic: "Feature Scaling, Encodings & Leakage-Free Splits", task: "Implement custom Scikit-Learn transformers inside ColumnTransformers." },
        { week: "Week 14", topic: "Linear & Regularized Regression (Ridge, Lasso, ElasticNet)", task: "Model enterprise pricing elasticity and interpret coefficients." },
        { week: "Week 15", topic: "Classification Metrics (Precision-Recall Curves & Cost-Benefit)", task: "Optimize decision thresholds for imbalanced credit fraud detection." },
        { week: "Week 16", topic: "Model Validation Architecture & Month 4 Benchmark Exam", task: "Execute nested k-fold cross-validation with reproducible random seeds." },
      ],
    },
    {
      id: "month-5",
      month: "Month 5",
      weeks: "Weeks 17–20",
      title: "Advanced Machine Learning & Model Evaluation",
      icon: GitBranch,
      status: hasUserOrPreview ? "upcoming" : "available",
      progressPercent: 0,
      prerequisite: "Unlocks after passing Month 4 Supervised ML Models",
      focus:
        "Feature engineering, tree ensembles (XGBoost/LightGBM), hyperparameter optimization, and rigorous cross-validation.",
      deliverables: [
        { title: "Advanced feature engineering & encoding pipeline", completed: false },
        { title: "Ensemble gradient-boosted tree model with hyperparameter search", completed: false },
        { title: "Cross-validation & error diagnostics report identifying edge-case failures", completed: false },
        { title: "Full ML pipeline code package packaged for reproducibility", completed: false },
      ],
      skills: ["XGBoost / LightGBM", "Feature Engineering", "K-Fold Validation", "Error Diagnostics"],
      weeklyBreakdown: [
        { week: "Week 17", topic: "Non-Linear Tree Architectures: Random Forests & Extra Trees", task: "Analyze out-of-bag error and feature interaction permutations." },
        { week: "Week 18", topic: "Gradient Boosting Machines: XGBoost & LightGBM", task: "Tune learning rates, tree depth, and subsample ratios via Bayesian search." },
        { week: "Week 19", topic: "SHAP & LIME Interpretability for Black-Box Models", task: "Construct SHAP summary and waterfall plots for loan rejection defense." },
        { week: "Week 20", topic: "Reproducible Model Packaging & Month 5 Assessment", task: "Export serialized ML pipelines with Conda environment lockfiles." },
      ],
    },
    {
      id: "month-6",
      month: "Month 6",
      weeks: "Weeks 21–24",
      title: "Real-World Projects & Final Capstone",
      icon: Trophy,
      status: hasUserOrPreview ? "upcoming" : "available",
      progressPercent: 0,
      prerequisite: "Unlocks after passing Months 1–5 Technical Deliverables",
      focus:
        "An end-to-end enterprise capstone project taking uncleaned data through problem formulation, analysis, modeling, and executive defense.",
      deliverables: [
        { title: "Capstone Project Proposal & problem framing brief", completed: false },
        { title: "Full clean codebase & Jupyter Notebooks with clean documentation", completed: false },
        { title: "Executive technical report & slide deck justifying design choices", completed: false },
        { title: "Instructor viva / evaluation and inclusion in verified student portfolio", completed: false },
      ],
      skills: ["End-to-End Workflow", "Capstone Defense", "Portfolio Curation", "Executive Communication"],
      weeklyBreakdown: [
        { week: "Week 21", topic: "Enterprise Problem Formulation & Data Architecture", task: "Author a project charter translating raw data into quantifiable ROI." },
        { week: "Week 22", topic: "Pipeline Implementation & Statistical Modeling", task: "Execute end-to-end data pipeline from raw ingestion to model inferencing." },
        { week: "Week 23", topic: "Executive Dossier & Recruiter Portfolio Packaging", task: "Format GitHub repository, CI test coverage, and candidate report." },
        { week: "Week 24", topic: "Live Instructor Viva Defense & Certification Issuance", task: "Present capstone findings before the Academy Evaluation Board." },
      ],
    },
  ];

  // Filtered stages
  const filteredStages = roadmapStages.filter((stage) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "completed") return stage.status === "completed";
    if (activeFilter === "active") return stage.status === "active";
    if (activeFilter === "upcoming") return stage.status === "upcoming";
    return true;
  });

  const toggleWeekExpansion = (monthName: string) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [monthName]: !prev[monthName],
    }));
  };

  return (
    <div className="py-10 sm:py-14 space-y-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HEADER SECTION */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 animate-fade-in-up">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-teal-200/80 text-teal-800 text-xs font-semibold uppercase tracking-wider shadow-sm backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-teal-600 animate-pulse-slow" />
              24-Week Practice Curriculum
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-navy-950 tracking-tight">
              Six-Month Practical Roadmap
            </h1>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              No passive video lectures. Each month features hands-on production challenges,
              real-world datasets, timed technical benchmark exams, and standardized human instructor reviews.
            </p>
          </div>

          {/* Quick Demo Student Toggle if not logged in */}
          {!user && (
            <div className="flex items-center gap-2 text-xs bg-white/80 p-2.5 rounded-xl border border-slate-200 shadow-xs shrink-0">
              <span className="text-slate-600 font-medium">Demo Student View:</span>
              <button
                type="button"
                onClick={() => setPreviewStudentMode(!previewStudentMode)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  previewStudentMode
                    ? "bg-teal-600 text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                {previewStudentMode ? "✓ Active Progress On" : "Preview Progress"}
              </button>
            </div>
          )}
        </div>

        {/* 2. STUDENT LIVE PROGRESSION TRACKER (Active when logged in or previewing) */}
        {hasUserOrPreview ? (
          <div className="mt-10 bg-gradient-to-br from-navy-950 via-slate-900 to-teal-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl border border-teal-500/30 relative overflow-hidden animate-fade-in-up">
            {/* Ambient Background Glows */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-6">
              {/* Top Row: User identity & overall completion */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-teal-400/20 border border-teal-300/40 flex items-center justify-center text-teal-300 font-black shadow-inner">
                    <User className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs uppercase tracking-wider text-teal-400 font-bold">
                        Active Practitioner Hub
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 font-bold">
                        Cohort 2026-A
                      </span>
                    </div>
                    <h2 className="text-xl sm:text-2xl font-black text-white">{studentName}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Link
                    href={`/portfolio/${currentStudentId}`}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-teal-200 border border-teal-400/30 text-xs font-bold transition-all"
                  >
                    <Award className="w-4 h-4 text-teal-300" />
                    <span>View Public Portfolio</span>
                  </Link>

                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-teal-400 hover:bg-teal-300 text-navy-950 text-xs font-black transition-all shadow-md transform hover:-translate-y-0.5"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Open Dashboard</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Middle Row: 6-Month Visual Stepper Bar */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">
                    Curriculum Completion: <strong className="text-teal-300">Month 1 Passed • Month 2 In Progress</strong>
                  </span>
                  <span className="font-mono text-teal-400 font-bold">1 / 6 Months Audited (25% Total Track)</span>
                </div>

                {/* 6 Segment Indicator */}
                <div className="grid grid-cols-6 gap-2 sm:gap-3">
                  {/* Month 1 */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50" />
                    <div className="flex items-center justify-between text-[11px] font-bold text-emerald-300">
                      <span>M1</span>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    </div>
                  </div>

                  {/* Month 2 */}
                  <div className="space-y-1.5">
                    <div className="h-2.5 rounded-full bg-teal-400/40 relative overflow-hidden">
                      <div className="h-full bg-teal-400 rounded-full w-2/5 animate-pulse" />
                    </div>
                    <div className="flex items-center justify-between text-[11px] font-bold text-teal-300">
                      <span>M2</span>
                      <Zap className="w-3 h-3 text-teal-300 animate-bounce" />
                    </div>
                  </div>

                  {/* Month 3 */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-2.5 rounded-full bg-white/20" />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>M3</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Month 4 */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-2.5 rounded-full bg-white/20" />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>M4</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Month 5 */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-2.5 rounded-full bg-white/20" />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>M5</span>
                      <Lock className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>

                  {/* Month 6 */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-2.5 rounded-full bg-white/20" />
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>M6</span>
                      <Trophy className="w-3 h-3 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Context Banner */}
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-300 flex items-center justify-center shrink-0">
                    <PlayCircle className="w-5 h-5 text-teal-300" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-teal-300 tracking-wider block">
                      Active Sprint
                    </span>
                    <strong className="text-sm font-bold text-white block">
                      Month 2: Data Cleaning, Missing Imputation &amp; Outlier Strategy
                    </strong>
                    <span className="text-xs text-slate-300">
                      Next milestone submission due this Sunday • Evaluated by senior faculty
                    </span>
                  </div>
                </div>

                <Link
                  href="/dashboard"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-teal-500/20 hover:bg-teal-500/30 text-teal-200 border border-teal-400/40 text-xs font-bold transition-all shrink-0"
                >
                  <span>Submit Solution in Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        ) : (
          /* Public Callout for Non-Logged In Users */
          <div className="mt-8 bg-white/80 backdrop-blur-md rounded-2xl border border-teal-200/80 p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in-up">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0 border border-teal-200/60">
                <ShieldCheck className="w-5 h-5 text-teal-600" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-navy-950">Track Your Real-Time Milestone Progress</h3>
                <p className="text-xs text-slate-600">
                  Enrolled students track live submission reviews, 5-pillar rubric grades, and benchmark exam passes directly on this roadmap.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/login"
                className="px-4 py-2 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
              >
                Student Sign In
              </Link>
              <Link
                href="/program"
                className="px-4 py-2 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs shadow-sm transition-all"
              >
                Enroll Now
              </Link>
            </div>
          </div>
        )}

        {/* 3. INTERACTIVE ROADMAP FILTERS */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-slate-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Filter Curriculum:
            </span>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveFilter("all")}
              className={`px-3.5 py-1.5 rounded-xl transition-all ${
                activeFilter === "all"
                  ? "bg-navy-950 text-white shadow-sm"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              All 6 Months ({roadmapStages.length})
            </button>

            {hasUserOrPreview && (
              <>
                <button
                  type="button"
                  onClick={() => setActiveFilter("active")}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeFilter === "active"
                      ? "bg-teal-700 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                  <span>My Active Sprint (Month 2)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFilter("completed")}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeFilter === "completed"
                      ? "bg-emerald-700 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Completed (Month 1)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveFilter("upcoming")}
                  className={`px-3.5 py-1.5 rounded-xl transition-all flex items-center gap-1.5 ${
                    activeFilter === "upcoming"
                      ? "bg-slate-700 text-white shadow-sm"
                      : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Upcoming (Months 3–6)</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 4. ROADMAP TIMELINE CARDS */}
        <div className="space-y-8">
          {filteredStages.map((stage) => {
            const Icon = stage.icon;
            const isCompleted = stage.status === "completed";
            const isActive = stage.status === "active";
            const isUpcoming = stage.status === "upcoming";
            const isExpanded = Boolean(expandedWeeks[stage.month]);

            return (
              <div
                key={stage.id}
                className={`rounded-3xl border transition-all duration-300 relative overflow-hidden ${
                  isActive
                    ? "bg-white shadow-lg border-teal-500/60 ring-2 ring-teal-500/20"
                    : isCompleted
                    ? "bg-white/95 shadow-sm border-emerald-500/40"
                    : "bg-white/75 backdrop-blur-md shadow-xs border-slate-200/90"
                }`}
              >
                {/* Active Indicator Top Glow Bar */}
                {isActive && (
                  <div className="h-1.5 w-full bg-gradient-to-r from-teal-500 via-cyan-400 to-emerald-400 animate-pulse" />
                )}

                <div className="p-6 sm:p-8 lg:p-10 space-y-6">
                  {/* Stage Header Row */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                    <div className="space-y-3 max-w-xl">
                      {/* Status Badges */}
                      <div className="flex flex-wrap items-center gap-2.5">
                        <span className="px-3 py-1 bg-navy-950 text-teal-400 font-bold text-xs uppercase rounded-lg shadow-xs">
                          {stage.month}
                        </span>
                        <span className="text-xs font-semibold text-slate-500">
                          {stage.weeks}
                        </span>

                        {isCompleted && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                            <span>100% Passed • Rubric: {stage.score}</span>
                          </span>
                        )}

                        {isActive && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-teal-50 text-teal-800 border border-teal-300 text-xs font-bold animate-pulse">
                            <span className="w-2 h-2 rounded-full bg-teal-500" />
                            <span>CURRENTLY ACTIVE MILESTONE</span>
                          </span>
                        )}

                        {isUpcoming && (
                          <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200 text-xs font-medium">
                            <Lock className="w-3 h-3 text-slate-400" />
                            <span>Locked • Prerequisite Required</span>
                          </span>
                        )}
                      </div>

                      {/* Stage Title */}
                      <div className="flex items-center gap-3 pt-1">
                        <div
                          className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 shadow-xs ${
                            isActive
                              ? "bg-teal-500 text-navy-950 font-bold"
                              : isCompleted
                              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                              : "bg-slate-100 text-slate-600"
                          }`}
                        >
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl sm:text-2xl font-black text-navy-950">
                            {stage.title}
                          </h3>
                        </div>
                      </div>

                      <p className="text-slate-600 text-sm leading-relaxed">
                        {stage.focus}
                      </p>

                      {/* Prerequisite Notice for Upcoming */}
                      {isUpcoming && stage.prerequisite && (
                        <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-center gap-2">
                          <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                          <span>{stage.prerequisite}</span>
                        </div>
                      )}

                      {/* Skill Tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {stage.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2.5 py-0.5 rounded-lg bg-slate-100/90 text-slate-700 text-xs font-medium border border-slate-200/70"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right Block: Deliverables & Quick Actions */}
                    <div className="lg:max-w-md w-full space-y-4">
                      <div className="bg-slate-50/90 rounded-2xl p-5 border border-slate-200/90 space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                            Required Practice Deliverables
                          </h4>
                          <span className="text-[11px] font-semibold text-slate-500">
                            {stage.deliverables.filter((d) => d.completed).length} / {stage.deliverables.length} Done
                          </span>
                        </div>

                        <ul className="space-y-2.5 text-xs text-slate-700">
                          {stage.deliverables.map((deliv, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5">
                              {deliv.completed ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                              ) : (
                                <div className="w-4 h-4 rounded-full border-2 border-slate-300 shrink-0 mt-0.5" />
                              )}
                              <span className={deliv.completed ? "font-medium text-slate-900" : "text-slate-600"}>
                                {deliv.title}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Benchmark exam badge if completed */}
                        {isCompleted && stage.examScore && (
                          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-900 flex items-center gap-1.5">
                              <Trophy className="w-3.5 h-3.5 text-amber-500" />
                              <span>Month 1 Benchmark Exam:</span>
                            </span>
                            <span className="font-black text-emerald-700">
                              {stage.examScore} (PASSED)
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Stage Action Buttons */}
                      <div className="flex flex-wrap items-center gap-2">
                        {isActive && (
                          <Link
                            href="/dashboard"
                            className="flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-xs shadow-md transition-all transform hover:-translate-y-0.5"
                          >
                            <PlayCircle className="w-4 h-4" />
                            <span>Continue Active Task</span>
                          </Link>
                        )}

                        {isCompleted && (
                          <Link
                            href={`/portfolio/${currentStudentId}`}
                            className="flex-1 inline-flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-navy-950 hover:bg-navy-800 text-white font-bold text-xs shadow-sm transition-all"
                          >
                            <Award className="w-3.5 h-3.5 text-teal-400" />
                            <span>View Evaluated Code</span>
                          </Link>
                        )}

                        <button
                          type="button"
                          onClick={() => toggleWeekExpansion(stage.month)}
                          className="px-3.5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs transition-colors flex items-center gap-1.5"
                        >
                          <span>{isExpanded ? "Hide Weeks" : "Weekly Breakdown"}</span>
                          {isExpanded ? (
                            <ChevronUp className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronDown className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* 5. EXPANDABLE WEEKLY DRILLDOWN ACCORDION */}
                  {isExpanded && (
                    <div className="pt-4 border-t border-slate-100 animate-fade-in-up space-y-3">
                      <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase tracking-wider">
                        <span>Weekly Hands-on Execution Schedule</span>
                        <span>4 Weeks • Rigorous Deliverables</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                        {stage.weeklyBreakdown.map((item, wIdx) => (
                          <div
                            key={wIdx}
                            className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5"
                          >
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black uppercase text-teal-700 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                                {item.week}
                              </span>
                              {isCompleted ? (
                                <span className="text-[10px] font-bold text-emerald-600">Audited</span>
                              ) : isActive && wIdx === 0 ? (
                                <span className="text-[10px] font-bold text-teal-700 animate-pulse">In Progress</span>
                              ) : null}
                            </div>
                            <h5 className="text-xs font-bold text-navy-950 line-clamp-1">
                              {item.topic}
                            </h5>
                            <p className="text-[11px] text-slate-600 leading-relaxed">
                              {item.task}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* 6. WEEKLY STRUCTURE METHODOLOGY CARD */}
        <div className="bg-white/90 backdrop-blur-md rounded-3xl border border-slate-200/90 p-8 shadow-sm space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-navy-900 text-teal-400 flex items-center justify-center font-bold">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy-950">
                How Every Single Week Operates
              </h2>
              <p className="text-xs text-slate-500">
                The battle-tested 4-step cadence ensuring production-grade code habits
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="space-y-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="font-black text-teal-700 text-xs uppercase tracking-wider block">
                1. The Brief &amp; Raw Dataset
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                You receive a concrete analytical scenario, dataset schema dictionary, and specific business questions to answer.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="font-black text-cyan-700 text-xs uppercase tracking-wider block">
                2. Independent Execution
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                You write code, explore files, clean anomalies, and build pipelines in your own local terminal or Jupyter environment.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="font-black text-indigo-700 text-xs uppercase tracking-wider block">
                3. Submission &amp; CI Checks
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Upload your solution (.py, .ipynb, .sql, .pdf report) to the Academy portal before the weekly deadline.
              </p>
            </div>

            <div className="space-y-2 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/70">
              <span className="font-black text-emerald-700 text-xs uppercase tracking-wider block">
                4. Human Rubric Audit
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Senior instructors review your submission against standardized 5-pillar rubrics and return detailed line-by-line feedback.
              </p>
            </div>
          </div>
        </div>

        {/* 7. BOTTOM NAVIGATION CTAS */}
        <div className="text-center space-y-4 pt-6">
          <p className="text-slate-600 text-sm">
            Ready to review the full technical curriculum or start your active challenge?
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-black text-sm shadow-md transition-all transform hover:-translate-y-0.5"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Go to Student Dashboard</span>
            </Link>

            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-navy-900 text-white hover:bg-navy-800 font-semibold text-sm shadow-md transition-all"
            >
              <span>See How It Works</span>
              <ArrowRight className="w-4 h-4 text-teal-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
