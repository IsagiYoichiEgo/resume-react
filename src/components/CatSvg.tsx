// Hand-built vector cat. Every moving part is its own group so CSS can animate it.
export function CatSvg() {
  return <svg className="cat-svg" viewBox="0 0 140 150" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id="cat-fur" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFF6EA" />
        <stop offset="1" stopColor="#F3DCC4" />
      </linearGradient>
      <linearGradient id="cat-patch" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFB788" />
        <stop offset="1" stopColor="#F08F5E" />
      </linearGradient>
      <radialGradient id="cat-eye" cx=".4" cy=".35" r=".7">
        <stop offset="0" stopColor="#3FD9BC" />
        <stop offset="1" stopColor="#0F6B60" />
      </radialGradient>
    </defs>

    <g className="cat-tail">
      <path d="M96 128c22 2 34-10 32-28-1-12-10-18-17-14" fill="none" stroke="#F3DCC4" strokeWidth="11" strokeLinecap="round" />
      <path d="M111 86c6-4 13 0 15 8" fill="none" stroke="url(#cat-patch)" strokeWidth="11" strokeLinecap="round" />
    </g>

    <g className="cat-body">
      <path d="M38 132c-4-30 8-56 32-56s36 26 32 56c-1 6-6 9-12 9H50c-6 0-11-3-12-9z" fill="url(#cat-fur)" />
      <path d="M58 98c4 8 20 8 24 0" fill="none" stroke="#E9C9AA" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="70" cy="118" rx="16" ry="18" fill="#FFFBF5" />
      <g className="cat-paw cat-paw-left"><ellipse cx="56" cy="139" rx="10" ry="7" fill="#FFF6EA" /><path d="M52 140v3M56 140v3.5M60 140v3" stroke="#E2BFA0" strokeWidth="1.4" strokeLinecap="round" /></g>
      <g className="cat-paw cat-paw-right"><ellipse cx="84" cy="139" rx="10" ry="7" fill="#FFF6EA" /><path d="M80 140v3M84 140v3.5M88 140v3" stroke="#E2BFA0" strokeWidth="1.4" strokeLinecap="round" /></g>
    </g>

    <g className="cat-head">
      <g className="cat-ear cat-ear-left">
        <path d="M30 40 34 6l28 22z" fill="url(#cat-patch)" />
        <path d="M36 32 38 15l14 12z" fill="#FFC9C2" />
      </g>
      <g className="cat-ear cat-ear-right">
        <path d="M110 40 106 6 78 28z" fill="#FFF6EA" />
        <path d="M104 32 102 15 88 27z" fill="#FFC9C2" />
      </g>
      <ellipse cx="70" cy="54" rx="44" ry="37" fill="url(#cat-fur)" />
      <path d="M30 46c4-18 18-28 32-29-6 10-6 22-1 30-12-6-22-6-31-1z" fill="url(#cat-patch)" />
      <path d="M58 22c3 5 3 10 0 14M70 20v14M82 22c-3 5-3 10 0 14" stroke="#F0CDB0" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      <g className="cat-eyes">
        <g className="cat-eye-open">
          <ellipse cx="52" cy="56" rx="9" ry="10.5" fill="url(#cat-eye)" />
          <ellipse cx="88" cy="56" rx="9" ry="10.5" fill="url(#cat-eye)" />
          <g className="cat-pupils">
            <ellipse cx="52" cy="57" rx="4.2" ry="6.5" fill="#0A1020" />
            <ellipse cx="88" cy="57" rx="4.2" ry="6.5" fill="#0A1020" />
            <circle cx="49.5" cy="52.5" r="2.6" fill="#fff" />
            <circle cx="85.5" cy="52.5" r="2.6" fill="#fff" />
          </g>
        </g>
        <g className="cat-eye-happy" fill="none" stroke="#0A1020" strokeWidth="3" strokeLinecap="round">
          <path d="M44 58q8-10 16 0M80 58q8-10 16 0" />
        </g>
      </g>

      <ellipse className="cat-blush" cx="40" cy="70" rx="7" ry="4" fill="#FF9C9C" opacity=".45" />
      <ellipse className="cat-blush" cx="100" cy="70" rx="7" ry="4" fill="#FF9C9C" opacity=".45" />
      <path d="M66 66h8l-4 4.5z" fill="#F07F86" strokeLinejoin="round" />
      <path d="M70 70.5v3q-3 4-7 1M70 73.5q3 4 7 1" fill="none" stroke="#0A1020" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M26 62l-14-3M26 68l-15 2M114 62l14-3M114 68l15 2" stroke="#D7B697" strokeWidth="1.4" strokeLinecap="round" />

      <g className="cat-collar">
        <path d="M44 86q26 12 52 0" fill="none" stroke="#7DE6D1" strokeWidth="5" strokeLinecap="round" />
        <circle cx="70" cy="94" r="5" fill="#FFD27A" stroke="#C99A3E" strokeWidth="1" />
      </g>
    </g>

    <g className="cat-hearts" fill="#FF7A90">
      <path d="M110 30c0-4 6-5 6 0 0-5 6-4 6 0 0 4-6 8-6 8s-6-4-6-8z" />
      <path d="M20 24c0-3 4.5-3.8 4.5 0 0-3.8 4.5-3 4.5 0 0 3-4.5 6-4.5 6S20 27 20 24z" />
    </g>
  </svg>;
}
