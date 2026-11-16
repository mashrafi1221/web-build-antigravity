"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Terminal, Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(
      "Phase 1 Visual Foundation: Supabase Auth integration will be wired in Phase 2."
    );
  };

  return (
    <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl border border-slate-200/90 shadow-xl card-hover-lift">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-xl bg-navy-900 text-teal-400 mx-auto flex items-center justify-center font-bold shadow-md">
            <Terminal className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-extrabold text-navy-950">
            Sign In to Your Account
          </h2>
          <p className="text-sm text-slate-500">
            Access your 6-month roadmap, challenges, and evaluations.
          </p>
        </div>

        {statusMessage && (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-lg text-xs text-teal-800 font-medium">
            {statusMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Password
              </label>
              <span className="text-xs text-slate-400 cursor-not-allowed">
                Forgot password?
              </span>
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3.5" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50/80 border border-slate-200 rounded-lg text-sm text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-4 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-semibold text-sm shadow-md transition-all transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4 text-teal-400" />
          </button>
        </form>

        <div className="text-center pt-2 border-t border-slate-100 text-sm text-slate-600">
          Don&apos;t have an account yet?{" "}
          <Link
            href="/register"
            className="font-semibold text-teal-700 hover:text-teal-800"
          >
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}
