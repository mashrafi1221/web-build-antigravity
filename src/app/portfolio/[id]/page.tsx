import { Metadata } from "next";
import { supabase } from "@/lib/supabase";
import CandidatePortfolioClient, {
  PortfolioData,
} from "./CandidatePortfolioClient";

interface PageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { data } = await supabase.rpc("get_public_portfolio", {
    target_user_id: params.id,
  });

  const portfolio = data as PortfolioData | null;
  const name = portfolio?.profile?.full_name || "Candidate";

  return {
    title: `${name} | Verified Data Science Candidate Portfolio`,
    description: `View ${name}'s verified data manipulation projects, 5-pillar rubric evaluations, and technical benchmark examination results on Data Science Job-Ready Academy.`,
    openGraph: {
      title: `${name} — Verified Data Science Practitioner`,
      description: `Audited practical submissions, GitHub code repositories, and benchmark examination proof verified by academy staff.`,
      type: "profile",
    },
  };
}

export default async function PortfolioPage({ params }: PageProps) {
  const { data, error } = await supabase.rpc("get_public_portfolio", {
    target_user_id: params.id,
  });

  if (error) {
    console.error("Server-side portfolio fetch error:", error);
  }

  const portfolioData = (data as PortfolioData) || null;

  return (
    <CandidatePortfolioClient
      initialData={portfolioData}
      studentId={params.id}
    />
  );
}
