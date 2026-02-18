'use client';

import { useState } from 'react';

export default function TutorialAlert() {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className={`fixed inset-0 z-50 ${isExpanded ? 'backdrop-blur-sm' : ''}`}>
      <div
        className={`absolute transition-all duration-500 ease-in-out ${
          isExpanded
            ? 'top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 scale-100 opacity-100'
            : 'top-4 right-4 scale-0 opacity-0'
        }`}
        style={{
          transformOrigin: isExpanded ? 'center' : 'top right',
        }}
      >
        <div className="bg-[#FAF3E1] rounded-lg shadow-xl max-w-md w-full mx-4 p-6 relative border border-[#F5E7C6]">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-2 right-2 text-[#222222] hover:text-[#FF6D1F] text-xl"
            title="Close"
          >
            ×
          </button>
          <h2 className="text-lg font-semibold text-[#222222] mb-4">Demo Tutorial</h2>
          <ol className="list-decimal list-inside space-y-2 text-[#222222]">
            <li>Login as admin in new tab</li>
            <li>Change data for Student Bala Sudalaimuthu</li>
            <li>Check simultaneously the data changing in user tab for Bala</li>
          </ol>
        </div>
      </div>
      {!isExpanded && (
        <div className="absolute top-4 right-4 transition-all duration-500 ease-in-out scale-100 opacity-100">
          <button
            onClick={() => setIsExpanded(true)}
            className="bg-[#FF6D1F] text-white px-3 py-2 rounded-full shadow-lg hover:bg-[#e55a1a] transition-colors"
            title="Show Tutorial"
          >
            ?
          </button>
        </div>
      )}
    </div>
  );
}