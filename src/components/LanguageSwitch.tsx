'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSwitch() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center space-x-1">
      <Globe className="w-4 h-4 text-gray-400" />
      <button
        onClick={() => setLanguage('tr')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          language === 'tr'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        TR
      </button>
      <button
        onClick={() => setLanguage('en')}
        className={`px-2 py-1 text-sm rounded transition-colors ${
          language === 'en'
            ? 'bg-primary text-white'
            : 'text-gray-400 hover:text-white'
        }`}
      >
        EN
      </button>
    </div>
  );
}
