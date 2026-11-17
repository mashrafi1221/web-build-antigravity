import React from "react";
import { Metadata } from "next";
import { RoadmapClient } from "./RoadmapClient";

export const metadata: Metadata = {
  title: "Six-Month Practice Roadmap | Data Science Job-Ready Academy",
  description:
    "The 24-week curriculum roadmap: Month 1 Python & Data Manipulation, Month 2 Data Cleaning & EDA, Month 3 SQL & Stats, Month 4 ML, Month 5 Advanced ML, Month 6 Capstone. Live student progress tracking, weekly challenge breakdown, and milestone exams.",
};

export default function RoadmapPage() {
  return <RoadmapClient />;
}
