// Hand-built vector cat. Every moving part is its own group so CSS can animate it.
import { useId } from 'react';

export function CatSvg() {
  const id = useId().replace(/:/g, '');
  return <svg className="cat-svg" viewBox="0 0 140 150" aria-hidden="true" focusable="false">
    <defs>
      <linearGradient id={id + "cat-fur"} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FFF6EA" />
        <stop offset="1" stopColor="#F3DCC4" />
      </linearGradient>
      <linearGradient id={id + "cat-patch"} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#FFB788" />
        <stop offset="1" stopColor="#F08F5E" />
      </linearGradient>
      <radialGradient id={id + "cat-eye"} cx=".4" cy=".35" r=".7">
        <stop offset="0" stopColor="#3FD9BC" />
        <stop offset="1" stopColor="#0F6B60" />
      </radialGradient>
    </defs>

    <g className="cat-tail">
      <path d="M96 128c22 2 34-10 32-28-1-12-10-18-17-14" fill="none" stroke="#F3DCC4" strokeWidth="11" strokeLinecap="round" />
      <path d="M111 86c6-4 13 0 15 8" fill="none" stroke={`url(#${id}cat-patch)`} strokeWidth="11" strokeLinecap="round" />
    </g>

    <g className="cat-body">
      <path d="M38 132c-4-30 8-56 32-56s36 26 32 56c-1 6-6 9-12 9H50c-6 0-11-3-12-9z" fill={`url(#${id}cat-fur)`} />
      <path d="M58 98c4 8 20 8 24 0" fill="none" stroke="#E9C9AA" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="70" cy="118" rx="16" ry="18" fill="#FFFBF5" />
      <g className="cat-paw cat-paw-left"><ellipse cx="56" cy="139" rx="10" ry="7" fill="#FFF6EA" /><path d="M52 140v3M56 140v3.5M60 140v3" stroke="#E2BFA0" strokeWidth="1.4" strokeLinecap="round" /></g>
      <g className="cat-paw cat-paw-right"><ellipse cx="84" cy="139" rx="10" ry="7" fill="#FFF6EA" /><path d="M80 140v3M84 140v3.5M88 140v3" stroke="#E2BFA0" strokeWidth="1.4" strokeLinecap="round" /></g>
    </g>

    <g className="cat-head">
      <g className="cat-ear cat-ear-left">
        <path d="M30 40 34 6l28 22z" fill={`url(#${id}cat-patch)`} />
        <path d="M36 32 38 15l14 12z" fill="#FFC9C2" />
      </g>
      <g className="cat-ear cat-ear-right">
        <path d="M110 40 106 6 78 28z" fill="#FFF6EA" />
        <path d="M104 32 102 15 88 27z" fill="#FFC9C2" />
      </g>
      <ellipse cx="70" cy="54" rx="44" ry="37" fill={`url(#${id}cat-fur)`} />
      <path d="M30 46c4-18 18-28 32-29-6 10-6 22-1 30-12-6-22-6-31-1z" fill={`url(#${id}cat-patch)`} />
      <path d="M58 22c3 5 3 10 0 14M70 20v14M82 22c-3 5-3 10 0 14" stroke="#F0CDB0" strokeWidth="2.2" strokeLinecap="round" fill="none" />

      <g className="cat-eyes">
        <g className="cat-eye-open">
          <ellipse cx="52" cy="56" rx="9" ry="10.5" fill={`url(#${id}cat-eye)`} />
          <ellipse cx="88" cy="56" rx="9" ry="10.5" fill={`url(#${id}cat-eye)`} />
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
        <g className="cat-eye-sleep" fill="none" stroke="#0A1020" strokeWidth="3" strokeLinecap="round">
          <path d="M44 56q8 8 16 0M80 56q8 8 16 0" />
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

    {/* Scene props: only the one matching the current section is shown. */}
    <g className="cat-prop cat-prop-glass">
      <circle cx="112" cy="58" r="15" fill="#7DE6D133" stroke="#2B3B57" strokeWidth="5" />
      <circle cx="107" cy="52" r="4" fill="#ffffffaa" />
      <path d="M101 70 88 92" stroke="#2B3B57" strokeWidth="7" strokeLinecap="round" />
      <ellipse cx="88" cy="93" rx="8" ry="6" fill="#FFF6EA" />
    </g>
    <g className="cat-prop cat-prop-ball">
      <g className="cat-ball">
        <circle cx="118" cy="134" r="13" fill="#FFFDF8" stroke="#0A1020" strokeWidth="1.6" />
        <path d="M118 127l6 4-2 7h-8l-2-7z" fill="#0A1020" />
        <path d="M118 121v6M124 131l7-2M122 138l4 7M114 138l-4 7M112 131l-7-2" stroke="#0A1020" strokeWidth="1.4" />
      </g>
    </g>
    <g className="cat-prop cat-prop-laptop">
      <path d="M40 114h60l6 22H34z" fill="#2B3B57" />
      <rect x="44" y="96" width="52" height="20" rx="3" fill="#1A2740" />
      <rect className="cat-screen" x="48" y="99" width="44" height="14" rx="2" fill="#7DE6D1" />
      <path className="cat-code" d="M52 103h14M52 107h22M52 111h10" stroke="#0A1020" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse className="cat-type cat-type-l" cx="58" cy="126" rx="8" ry="5.5" fill="#FFF6EA" />
      <ellipse className="cat-type cat-type-r" cx="82" cy="126" rx="8" ry="5.5" fill="#FFF6EA" />
    </g>
    <g className="cat-prop cat-prop-wave">
      <path className="cat-wave-arm" d="M94 112c12-6 18-18 17-32" stroke="#FFF6EA" strokeWidth="13" strokeLinecap="round" fill="none" />
      <g className="cat-wave-hand"><ellipse cx="111" cy="75" rx="10" ry="10.5" fill="#FFF6EA" /><path d="M108 70v-3M112 69v-3.5M116 70v-3" stroke="#E2BFA0" strokeWidth="1.4" strokeLinecap="round" /></g>
    </g>
    <g className="cat-zzz" fill="#AAB4C7" fontFamily="Unbounded, sans-serif" fontWeight="600">
      <text x="104" y="30" fontSize="12">z</text><text x="114" y="18" fontSize="15">z</text><text x="126" y="4" fontSize="18">Z</text>
    </g>

    <g className="cat-hearts" fill="#FF7A90">
      <path d="M110 30c0-4 6-5 6 0 0-5 6-4 6 0 0 4-6 8-6 8s-6-4-6-8z" />
      <path d="M20 24c0-3 4.5-3.8 4.5 0 0-3.8 4.5-3 4.5 0 0 3-4.5 6-4.5 6S20 27 20 24z" />
    </g>
  </svg>;
}
