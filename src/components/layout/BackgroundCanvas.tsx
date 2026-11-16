import React from "react";

export function BackgroundCanvas() {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
      {/* 1. Subtle Engineering Grid Pattern */}
      <div className="absolute inset-0 bg-tech-grid opacity-60 [mask-image:radial-gradient(ellipse_at_top,white_70%,transparent_100%)]" />

      {/* 2. Soft Data Dot Matrix overlay */}
      <div className="absolute inset-0 bg-tech-dots opacity-30 [mask-image:radial-gradient(ellipse_at_center,white_60%,transparent_100%)]" />

      {/* 3. Ambient Glowing Orbs / Gradient Meshes */}
      {/* Top Left Teal Glow */}
      <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-teal-300/15 blur-[130px] mix-blend-multiply" />

      {/* Top Center-Right Cyan Glow */}
      <div className="absolute -top-20 right-10 w-[550px] h-[550px] rounded-full bg-cyan-300/15 blur-[120px] mix-blend-multiply" />

      {/* Middle Center Indigo Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-indigo-200/10 blur-[150px] mix-blend-multiply" />

      {/* Bottom Right Subtle Navy Accent Glow */}
      <div className="absolute bottom-10 right-1/4 w-[600px] h-[600px] rounded-full bg-teal-400/10 blur-[140px] mix-blend-multiply" />
    </div>
  );
}
