import React, { useState, useEffect } from 'react';
import { ProjectDetails, ProjectType, LicenseType, Language } from './types';
import { generateReadme } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { MarkdownPreview } from './components/MarkdownPreview';
import { OnboardingModal } from './components/OnboardingModal';
import { translations } from './utils/translations';
import { Sparkles, Moon, Sun, Globe, Download as InstallIcon, Github } from 'lucide-react';

const initialDetails: ProjectDetails = {
  projectName: '',
  tagline: '',
  projectType: ProjectType.FRONTEND,
  description: '',
  features: '',
  demoUrl: '',
  technologies: '',
  license: LicenseType.MIT,
  authorName: '',
  githubUsername: ''
};

function App() {
  const [details, setDetails] = useState<ProjectDetails>(initialDetails);
  const [generatedMarkdown, setGeneratedMarkdown] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  // Settings State
  const [lang, setLang] = useState<Language>('ar');
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');
  const [showOnboarding, setShowOnboarding] = useState(false);
  
  // PWA State
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    // Theme initialization
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark');
      document.documentElement.classList.add('dark');
    } else {
      setTheme('light');
      document.documentElement.classList.remove('dark');
    }

    // Language initialization
    const storedLang = localStorage.getItem('lang') as Language;
    if (storedLang) {
      setLang(storedLang);
      document.documentElement.dir = storedLang === 'ar' ? 'rtl' : 'ltr';
      document.documentElement.lang = storedLang;
    }

    // Onboarding Check
    const hasSeenOnboarding = localStorage.getItem('onboardingCompleted');
    if (!hasSeenOnboarding) {
      setShowOnboarding(true);
    }

    // PWA Install Prompt Listener
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
    });
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.theme = newTheme;
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'en' : 'ar';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const handleInstallClick = () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      }
      setDeferredPrompt(null);
    });
  };

  const closeOnboarding = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboardingCompleted', 'true');
  };

  const handleGenerate = async () => {
    if (!details.projectName || !details.description) {
      setError(lang === 'ar' ? 'يرجى إدخال اسم المشروع والوصف على الأقل.' : 'Please enter at least the project name and description.');
      return;
    }

    setIsGenerating(true);
    setError(null);
    try {
      const markdown = await generateReadme(details);
      setGeneratedMarkdown(markdown);
    } catch (err) {
      setError(err instanceof Error ? err.message : translations[lang].error);
    } finally {
      setIsGenerating(false);
    }
  };

  const t = translations[lang];

  return (
    <div className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-slate-950 text-slate-200' : 'bg-slate-100 text-slate-900'} selection:bg-indigo-500/30`}>
      <OnboardingModal isOpen={showOnboarding} onClose={closeOnboarding} lang={lang} />

      {/* Navbar */}
      <nav className="border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-tr from-indigo-500 to-purple-600 p-2 rounded-lg">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                {t.title} <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-300 dark:border-slate-700 ml-2">Beta</span>
              </h1>
            </div>
            
            <div className="flex items-center gap-3">
              {deferredPrompt && (
                 <button 
                  onClick={handleInstallClick}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-medium transition-colors"
                 >
                   <InstallIcon className="w-4 h-4" />
                   {t.installApp}
                 </button>
              )}

              <button 
                onClick={toggleLang}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Change Language"
              >
                <Globe className="w-5 h-5" />
              </button>

              <button 
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-1"></div>

              <a href="https://github.com" target="_blank" rel="noreferrer" className="hidden sm:flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
                <span className="hidden lg:inline">{t.github}</span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-[calc(100vh-4rem)]">
        
        {error && (
          <div className="mb-6 p-4 bg-red-100 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-xl text-red-600 dark:text-red-400 flex items-center gap-3 animate-fade-in">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
             {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-full pb-8">
          {/* Left Column: Input Form */}
          <div className="h-full min-h-[500px]">
            <InputForm 
              details={details} 
              onChange={setDetails} 
              onSubmit={handleGenerate}
              isGenerating={isGenerating}
              lang={lang}
            />
          </div>

          {/* Right Column: Preview */}
          <div className="h-full min-h-[500px]">
            <MarkdownPreview content={generatedMarkdown} lang={lang} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;