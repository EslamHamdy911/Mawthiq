import React from 'react';
import { translations } from '../utils/translations';
import { Language } from '../types';
import { Sparkles, Edit3, Download, WifiOff, X } from 'lucide-react';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose, lang }) => {
  if (!isOpen) return null;
  const t = translations[lang];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl max-w-lg w-full border border-slate-200 dark:border-slate-700 overflow-hidden transform transition-all scale-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-violet-600 p-6 text-white text-center relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 text-white/70 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold">{t.onboardingTitle}</h2>
        </div>

        {/* Content */}
        <div className="p-8 space-y-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-xl shrink-0">
                <Edit3 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-lg mb-1">1. {t.projectDetails}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.onboardingStep1}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2.5 bg-violet-100 dark:bg-violet-900/30 text-violet-600 dark:text-violet-400 rounded-xl shrink-0">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-lg mb-1">2. AI Generation</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.onboardingStep2}</p>
              </div>
            </div>

             <div className="flex items-start gap-4">
              <div className="p-2.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-xl shrink-0">
                <Download className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 dark:text-white text-lg mb-1">3. Export</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{t.onboardingStep3}</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-xl flex items-center gap-3 text-slate-600 dark:text-slate-400 text-sm">
            <WifiOff className="w-5 h-5 shrink-0" />
            <p>{t.onboardingNote}</p>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold hover:opacity-90 transition-opacity"
          >
            {t.gotIt}
          </button>
        </div>
      </div>
    </div>
  );
};
