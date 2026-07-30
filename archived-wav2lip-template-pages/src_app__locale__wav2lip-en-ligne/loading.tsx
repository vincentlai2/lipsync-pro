import React from 'react';

/**
 * Premium brand loading animation for /wav2lip-en-ligne.
 * Instead of layout skeletons that flash and shift content, this shows a
 * stunning dark-mode loading animation with neon waveform glows and smooth
 * breathing effects, creating a seamless, top-tier SaaS transition.
 */
export default function Wav2LipLoading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b16] text-white">
      <div className="relative flex flex-col items-center gap-6">
        {/* Glowing neon waveform animation */}
        <div className="relative flex items-center justify-center w-20 h-20">
          {/* Radial pulse background waves */}
          <div className="absolute inset-0 rounded-full bg-blue-500/10 animate-ping duration-[3000ms] opacity-75" />
          <div className="absolute inset-2 rounded-full bg-blue-500/20 animate-pulse duration-[2000ms]" />

          {/* Central brand icon holder with neon border and shadow */}
          <div className="relative z-10 p-4 rounded-full bg-[#0b1020] border border-blue-500/30 shadow-[0_0_30px_rgba(37,99,235,0.25)] flex items-center justify-center">
            {/* Custom SVG Waveform icon */}
            <svg
              className="size-8 text-blue-500 animate-pulse"
              style={{ animationDuration: '2.5s' }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <title>Wav2Lip Waveform</title>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v18M17 7v10M22 10v4M7 5v14M2 9v6"
              />
            </svg>
          </div>
        </div>

        {/* Elegant typography status */}
        <div className="text-center space-y-2">
          <p className="text-sm font-semibold tracking-[0.2em] text-blue-400 uppercase animate-pulse">
            Wav2Lip IA
          </p>
          <p className="text-xs text-zinc-400 font-medium">
            Préparation de votre Studio...
          </p>
        </div>
      </div>
    </div>
  );
}
