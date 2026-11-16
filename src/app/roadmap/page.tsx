import React from "react";
import Link from "next/link";
import {
  Calendar,
  CheckCircle2,
  FileCode,
  Database,
  BarChart3,
  Cpu,
  GitBranch,
  Trophy,
  ArrowRight,
  Clock,
} from "lucide-react";

export const metadata = {
  title: "Six-Month Roadmap | Data Science Job-Ready Academy",
  description:
    "The 24-week curriculum roadmap: Month 1 Python & Data Manipulation, Month 2 Data Cleaning & EDA, Month 3 SQL & Stats, Month 4 ML, Month 5 Advanced ML, Month 6 Capstone.",
};

const roadmapData = [
  {
    month: "Month 1",
    weeks: "Weeks 1–4",
    title: "Python & Data Manipulation",
    icon: FileCode,
    focus:
      "Mastering high-performance data manipulation, indexing, transformations, and aggregation using Pandas and NumPy.",
    deliverables: [
      "Python algorithmic & data manipulation challenges",
      "Pandas multi-index filtering and transformation assignment",
      "Vectorized calculation task avoiding inefficient Python loops",
      "End-of-month practical benchmark examination",
    ],
    skills: ["Pandas", "NumPy", "Data Ingestion", "Lambda & Vectorization"],
  },
  {
    month: "Month 2",
    weeks: "Weeks 5–8",
    title: "Data Cleaning & Exploratory Data Analysis (EDA)",
    icon: Database,
    focus:
      "Tackling messy datasets with missing values, incorrect data types, schema drift, anomalies, and multi-source mergers.",
    deliverables: [
      "Dirty dataset audit & cleaning strategy write-up",
      "Automated pipeline handling nulls and type conversions",
      "Comprehensive statistical Exploratory Data Analysis (EDA) notebook",
      "Executive summary report interpreting distribution skew & correlations",
    ],
    skills: ["Data Imputation", "Outlier Detection", "EDA Techniques", "Data Cleaning Rubrics"],
  },
  {
    month: "Month 3",
    weeks: "Weeks 9–12",
    title: "SQL, Statistics & Analytical Visualization",
    icon: BarChart3,
    focus:
      "Executing advanced SQL joins, window functions, hypothesis testing, and producing publication-grade analytical dashboards.",
    deliverables: [
      "Complex analytical SQL query package on relational databases",
      "A/B testing simulation & hypothesis testing report",
      "Interactive data visualization notebook (Matplotlib / Seaborn)",
      "Business intelligence reporting document for non-technical stakeholders",
    ],
    skills: ["PostgreSQL", "Window Functions", "Hypothesis Testing", "Seaborn / Matplotlib"],
  },
  {
    month: "Month 4",
    weeks: "Weeks 13–16",
    title: "Machine Learning Foundations",
    icon: Cpu,
    focus:
      "Building, interpreting, and validating supervised predictive models without data leakage or overfitting.",
    deliverables: [
      "Regression model predicting business KPIs with feature importance",
      "Binary & multi-class classification pipeline on real-world tabular data",
      "Evaluation analysis (Precision, Recall, F1, ROC-AUC vs. accuracy)",
      "Model interpretability write-up with actionable business insights",
    ],
    skills: ["Scikit-Learn", "Regression", "Classification", "Confusion Matrices & ROC"],
  },
  {
    month: "Month 5",
    weeks: "Weeks 17–20",
    title: "Advanced Machine Learning & Model Evaluation",
    icon: GitBranch,
    focus:
      "Feature engineering, tree ensembles (XGBoost/LightGBM), hyperparameter optimization, and rigorous cross-validation.",
    deliverables: [
      "Advanced feature engineering & encoding pipeline",
      "Ensemble gradient-boosted tree model with hyperparameter search",
      "Cross-validation & error diagnostics report identifying edge-case failures",
      "Full ML pipeline code package packaged for reproducibility",
    ],
    skills: ["XGBoost / LightGBM", "Feature Engineering", "K-Fold Validation", "Error Diagnostics"],
  },
  {
    month: "Month 6",
    weeks: "Weeks 21–24",
    title: "Real-World Projects & Final Capstone",
    icon: Trophy,
    focus:
      "An end-to-end enterprise capstone project taking uncleaned data through problem formulation, analysis, modeling, and executive defense.",
    deliverables: [
      "Capstone Project Proposal & problem framing brief",
      "Full clean codebase & Jupyter Notebooks with clean documentation",
      "Executive technical report & slide deck justifying design choices",
      "Instructor viva / evaluation and inclusion in verified student portfolio",
    ],
    skills: ["End-to-End Workflow", "Capstone Defense", "Portfolio Curation", "Executive Communication"],
  },
];

export default function RoadmapPage() {
  return (
    <div className="py-12 sm:py-16 space-y-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">
            24-Week Progression
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-navy-950 tracking-tight">
            Six-Month Practical Roadmap
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            This is a practical roadmap, not a playlist of video courses. Each month features
            actionable challenges, rigorous deadlines, real datasets, and human instructor reviews.
          </p>
        </div>

        {/* WEEKLY STRUCTURE ACCENT CARD */}
        <div className="mt-12 bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <h2 className="text-xl font-bold text-navy-950 mb-4">
            How Every Week Is Structured
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-sm">
            <div className="space-y-2">
              <span className="font-bold text-teal-700 block">1. The Brief &amp; Dataset</span>
              <p className="text-slate-600">
                You receive a concrete analytical scenario, dataset dictionary, and specific business questions to answer.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-cyan-700 block">2. Independent Work</span>
              <p className="text-slate-600">
                You write code, explore files, clean anomalies, and build pipelines in your own local environment.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-indigo-700 block">3. Submission &amp; Rubric</span>
              <p className="text-slate-600">
                You upload your solution (.py, .ipynb, .sql, .pdf report) before the deadline for scoring.
              </p>
            </div>
            <div className="space-y-2">
              <span className="font-bold text-emerald-700 block">4. Evaluated Feedback</span>
              <p className="text-slate-600">
                Instructors review your submission against standardized rubrics and return grades and critique.
              </p>
            </div>
          </div>
        </div>

        {/* ROADMAP TIMELINE */}
        <div className="mt-16 space-y-10">
          {roadmapData.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden"
              >
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  {/* Stage Identity */}
                  <div className="space-y-3 max-w-xl">
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-navy-900 text-teal-400 font-bold text-xs uppercase rounded-md">
                        {stage.month}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {stage.weeks}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 pt-1">
                      <div className="w-10 h-10 rounded-lg bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <h3 className="text-2xl font-bold text-navy-950">
                        {stage.title}
                      </h3>
                    </div>

                    <p className="text-slate-600 text-sm leading-relaxed pt-2">
                      {stage.focus}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {stage.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 text-xs font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Required Deliverables */}
                  <div className="bg-slate-50 rounded-xl p-6 border border-slate-200/80 lg:max-w-md w-full space-y-3">
                    <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Required Practice Deliverables
                    </h4>
                    <ul className="space-y-2 text-sm text-slate-700">
                      {stage.deliverables.map((deliv, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                          <span>{deliv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center space-y-4">
          <p className="text-slate-600 text-sm">
            Ready to review how the platform workflow operates from registration to capstone?
          </p>
          <Link
            href="/how-it-works"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white hover:bg-navy-800 font-semibold text-sm shadow-sm transition-all"
          >
            <span>See How It Works</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </Link>
        </div>
      </div>
    </div>
  );
}
