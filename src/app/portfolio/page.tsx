"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Loader2 } from "lucide-react";

export default function PortfolioRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    checkAndRedirect();
  }, []);

  const checkAndRedirect = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      router.push("/login?redirect=/portfolio");
    } else {
      router.push(`/portfolio/${session.user.id}`);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-16 flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="w-10 h-10 animate-spin text-teal-600 mx-auto mb-4" />
        <p className="text-slate-600 font-medium">Opening Your Verified Portfolio...</p>
      </div>
    </div>
  );
}
