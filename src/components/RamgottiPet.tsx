import React from 'react';
import { PetState } from '../types';

interface Props {
  state: PetState;
  onClick?: () => void;
}

export const RamgottiPet: React.FC<Props> = ({ state, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`relative cursor-pointer transition-transform duration-300 hover:scale-105 select-none ${
        state === 'panic' ? 'animate-wiggle' : state === 'cleaning' ? 'animate-bounce-gentle' : ''
      }`}
    >
      <svg
        viewBox="0 0 160 140"
        className="w-36 h-32 drop-shadow-xl"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Shadow */}
        <ellipse cx="80" cy="125" rx="44" ry="10" fill="#090d16" opacity="0.4" />

        {/* --- Fluffy Lamb Body (White Cloud) --- */}
        <g className="transition-all duration-300">
          <ellipse cx="80" cy="80" rx="46" ry="34" fill="#f8fafc" />
          <circle cx="50" cy="65" r="22" fill="#f8fafc" />
          <circle cx="110" cy="65" r="22" fill="#f8fafc" />
          <circle cx="80" cy="52" r="24" fill="#f8fafc" />
          <circle cx="44" cy="92" r="18" fill="#f8fafc" />
          <circle cx="116" cy="92" r="18" fill="#f8fafc" />

          {/* Golden Horns */}
          <path
            d="M62,60 C52,54 48,42 56,36 C64,30 68,44 64,54"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M98,60 C108,54 112,42 104,36 C96,30 92,44 96,54"
            stroke="#f59e0b"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
          />

          {/* Peach Face */}
          <ellipse cx="80" cy="82" rx="22" ry="19" fill="#fed7aa" />

          {/* Blushing Cheeks */}
          <ellipse cx="66" cy="86" rx="4.5" ry="3" fill="#f472b6" opacity="0.65" />
          <ellipse cx="94" cy="86" rx="4.5" ry="3" fill="#f472b6" opacity="0.65" />

          {/* --- Facial Expressions by State --- */}
          {state === 'sleep' && (
            <>
              {/* Closed Sleeping Eyes */}
              <path d="M70,80 Q74,84 78,80" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M82,80 Q86,84 90,80" stroke="#78350f" strokeWidth="2.5" strokeLinecap="round" />
              {/* Nose/Mouth */}
              <circle cx="80" cy="87" r="1.5" fill="#ea580c" />
            </>
          )}

          {state === 'warning' && (
            <>
              {/* Wondering Eyes */}
              <circle cx="72" cy="78" r="3.5" fill="#1e293b" />
              <circle cx="88" cy="78" r="3.5" fill="#1e293b" />
              <circle cx="73" cy="77" r="1.2" fill="#ffffff" />
              <circle cx="89" cy="77" r="1.2" fill="#ffffff" />
              <ellipse cx="80" cy="87" rx="2" ry="1.5" fill="#ea580c" />
            </>
          )}

          {state === 'panic' && (
            <>
              {/* Shook Wide Eyes */}
              <circle cx="72" cy="78" r="4.5" fill="#1e293b" />
              <circle cx="88" cy="78" r="4.5" fill="#1e293b" />
              <circle cx="73.5" cy="76.5" r="1.5" fill="#ffffff" />
              <circle cx="89.5" cy="76.5" r="1.5" fill="#ffffff" />
              {/* Open Screaming Mouth */}
              <ellipse cx="80" cy="90" rx="4" ry="5.5" fill="#ef4444" />
              {/* Giant Sweatdrop */}
              <path
                d="M106,56 C106,56 100,66 100,70 A5,5 0 0,0 110,70 C110,66 106,56 106,56 Z"
                fill="#38bdf8"
                className="animate-pulse"
              />
            </>
          )}

          {state === 'cleaning' && (
            <>
              {/* Determined Eyes */}
              <path d="M69,79 L77,82" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <path d="M91,79 L83,82" stroke="#78350f" strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="80" cy="88" rx="2.5" ry="2" fill="#ea580c" />
              {/* Magic Broom */}
              <line x1="110" y1="45" x2="128" y2="95" stroke="#d97706" strokeWidth="4.5" strokeLinecap="round" />
              <path d="M120,85 L138,98 L124,106 Z" fill="#f59e0b" />
            </>
          )}

          {state === 'cheerful' && (
            <>
              {/* Happy Crescent Eyes */}
              <path d="M68,79 Q73,73 78,79" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
              <path d="M82,79 Q87,73 92,79" stroke="#78350f" strokeWidth="3" strokeLinecap="round" fill="none" />
              {/* Joyful Smile */}
              <path d="M75,87 Q80,94 85,87" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" fill="none" />
            </>
          )}

          {/* Tiny Hooves */}
          <rect x="64" y="110" width="8" height="8" rx="3" fill="#cbd5e1" />
          <rect x="88" y="110" width="8" height="8" rx="3" fill="#cbd5e1" />
        </g>
      </svg>

      {/* Floating particles for Sleep */}
      {state === 'sleep' && (
        <div className="absolute -top-1 right-3 flex flex-col font-pixel text-indigo-400 select-none pointer-events-none">
          <span className="text-xs animate-bounce">z</span>
          <span className="text-sm -mt-1 font-bold animate-pulse">Z</span>
        </div>
      )}

      {/* Sparkles for Cheerful */}
      {state === 'cheerful' && (
        <div className="absolute -top-3 left-2 text-yellow-400 text-lg animate-ping pointer-events-none select-none">
          ✨
        </div>
      )}
    </div>
  );
};
