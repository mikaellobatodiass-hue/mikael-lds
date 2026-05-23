export default function Avatar3D() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Glow behind avatar */}
      <div className="absolute inset-0 rounded-full bg-blue-500/10 blur-3xl" />

      {/* Avatar SVG - cartoon developer */}
      <svg viewBox="0 0 200 240" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 relative z-10 drop-shadow-2xl animate-[float_6s_ease-in-out_infinite]">
        {/* Body / hoodie */}
        <ellipse cx="100" cy="210" rx="55" ry="30" fill="#1d4ed8" opacity="0.3"/>
        <path d="M45 180 Q100 230 155 180 L155 240 L45 240 Z" fill="#1e40af"/>
        <path d="M50 185 Q100 225 150 185 L148 200 Q100 235 52 200 Z" fill="#1d4ed8"/>
        {/* Hoodie strings */}
        <path d="M95 195 Q93 210 90 220" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M105 195 Q107 210 110 220" stroke="#93c5fd" strokeWidth="1.5" strokeLinecap="round"/>

        {/* Neck */}
        <rect x="88" y="155" width="24" height="28" rx="12" fill="#FBBF7A"/>

        {/* Head */}
        <ellipse cx="100" cy="120" rx="42" ry="45" fill="#FBBF7A"/>

        {/* Hair */}
        <path d="M58 105 Q60 70 100 65 Q140 70 142 105 Q138 75 100 70 Q62 75 58 105 Z" fill="#1a1a1a"/>
        <path d="M58 105 Q55 95 58 82 Q62 65 100 60 Q138 65 142 82 Q145 95 142 105 Q140 80 100 75 Q60 80 58 105 Z" fill="#111"/>

        {/* Ears */}
        <ellipse cx="58" cy="118" rx="7" ry="9" fill="#F5A85E"/>
        <ellipse cx="142" cy="118" rx="7" ry="9" fill="#F5A85E"/>
        <ellipse cx="58" cy="118" rx="4" ry="5" fill="#E8956A"/>
        <ellipse cx="142" cy="118" rx="4" ry="5" fill="#E8956A"/>

        {/* Eyes */}
        <ellipse cx="83" cy="115" rx="9" ry="10" fill="white"/>
        <ellipse cx="117" cy="115" rx="9" ry="10" fill="white"/>
        <ellipse cx="85" cy="117" rx="6" ry="7" fill="#1a1a1a"/>
        <ellipse cx="119" cy="117" rx="6" ry="7" fill="#1a1a1a"/>
        <circle cx="87" cy="114" r="2" fill="white"/>
        <circle cx="121" cy="114" r="2" fill="white"/>

        {/* Eyebrows */}
        <path d="M74 105 Q83 101 92 104" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>
        <path d="M108 104 Q117 101 126 105" stroke="#1a1a1a" strokeWidth="2.5" strokeLinecap="round"/>

        {/* Nose */}
        <path d="M97 125 Q100 132 103 125" stroke="#E8956A" strokeWidth="1.5" strokeLinecap="round" fill="none"/>

        {/* Smile */}
        <path d="M86 138 Q100 150 114 138" stroke="#c0644e" strokeWidth="2" strokeLinecap="round" fill="none"/>

        {/* Code bracket on shirt */}
        <text x="85" y="225" fontSize="14" fill="#93c5fd" fontFamily="monospace" fontWeight="bold">&lt;/&gt;</text>

        {/* Floating code elements */}
        <rect x="148" y="90" width="38" height="20" rx="5" fill="#1e3a5f" opacity="0.9"/>
        <text x="152" y="104" fontSize="9" fill="#60a5fa" fontFamily="monospace">git push</text>

        <rect x="12" y="100" width="36" height="20" rx="5" fill="#1e3a5f" opacity="0.9"/>
        <text x="16" y="114" fontSize="9" fill="#34d399" fontFamily="monospace">npm run</text>

        {/* Headphones */}
        <path d="M58 108 Q60 80 100 75 Q140 80 142 108" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round"/>
        <rect x="51" y="105" width="12" height="18" rx="4" fill="#374151"/>
        <rect x="137" y="105" width="12" height="18" rx="4" fill="#374151"/>
        <rect x="52" y="107" width="10" height="14" rx="3" fill="#1d4ed8"/>
        <rect x="138" y="107" width="10" height="14" rx="3" fill="#1d4ed8"/>
      </svg>

      {/* Tech badge floating */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#0f172a] border border-blue-500/30 rounded-full px-3 py-1.5 text-xs text-blue-400 font-mono">
        <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse" />
        Disponível para projetos
      </div>
    </div>
  )
}
