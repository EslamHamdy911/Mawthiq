import React from 'react';
import { ProjectDetails, ProjectType, LicenseType, Language } from '../types';
import { translations } from '../utils/translations';
import { Code2, Type, Link as LinkIcon, FileText, User, Terminal } from 'lucide-react';

interface InputFormProps {
  details: ProjectDetails;
  onChange: (details: ProjectDetails) => void;
  onSubmit: () => void;
  isGenerating: boolean;
  lang: Language;
}

export const InputForm: React.FC<InputFormProps> = ({ details, onChange, onSubmit, isGenerating, lang }) => {
  const t = translations[lang];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ ...details, [name]: value });
  };

  const inputClass = "w-full bg-slate-50 dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-lg py-2.5 px-4 text-slate-900 dark:text-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-slate-600";
  const labelClass = "block text-sm font-medium text-slate-600 dark:text-slate-400 mb-1";
  const iconClass = "absolute right-3 top-3 w-4 h-4 text-slate-400 dark:text-slate-500 rtl:right-auto rtl:left-3";

  return (
    <div className="bg-white/80 dark:bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl h-full overflow-y-auto custom-scrollbar transition-colors duration-300">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-200 dark:border-slate-700 pb-4">
        <div className="p-2 bg-indigo-500/10 dark:bg-indigo-500/20 rounded-lg">
          <Terminal className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">{t.projectDetails}</h2>
      </div>

      <div className="space-y-5">
        
        {/* Project Name & Tagline */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.projectName}</label>
            <div className="relative">
              <Type className={iconClass} />
              <input
                type="text"
                name="projectName"
                value={details.projectName}
                onChange={handleChange}
                placeholder={t.projectNamePlaceholder}
                className={`${inputClass} ltr:pr-4 rtl:pl-4`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>{t.projectType}</label>
            <select
              name="projectType"
              value={details.projectType}
              onChange={handleChange}
              className={inputClass}
            >
              {Object.values(ProjectType).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Tagline */}
         <div>
            <label className={labelClass}>{t.tagline}</label>
            <input
              type="text"
              name="tagline"
              value={details.tagline}
              onChange={handleChange}
              placeholder={t.taglinePlaceholder}
              className={inputClass}
            />
          </div>

        {/* Description */}
        <div>
          <label className={labelClass}>{t.description}</label>
          <textarea
            name="description"
            value={details.description}
            onChange={handleChange}
            rows={4}
            placeholder={t.descriptionPlaceholder}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Tech Stack & Features */}
        <div className="grid grid-cols-1 gap-4">
           <div>
            <label className={labelClass}>{t.technologies}</label>
            <div className="relative">
              <Code2 className={iconClass} />
              <input
                type="text"
                name="technologies"
                value={details.technologies}
                onChange={handleChange}
                placeholder={t.technologiesPlaceholder}
                className={`${inputClass} ltr:pr-4 rtl:pl-4`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>{t.features}</label>
             <textarea
                name="features"
                value={details.features}
                onChange={handleChange}
                rows={3}
                placeholder={t.featuresPlaceholder}
                className={`${inputClass} resize-none`}
              />
          </div>
        </div>

        {/* Links & License */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{t.demoUrl}</label>
            <div className="relative">
              <LinkIcon className={iconClass} />
              <input
                type="url"
                name="demoUrl"
                value={details.demoUrl}
                onChange={handleChange}
                placeholder="https://demo.example.com"
                className={`${inputClass} ltr:pr-4 rtl:pl-4`}
              />
            </div>
          </div>
           <div>
            <label className={labelClass}>{t.license}</label>
            <div className="relative">
              <FileText className={iconClass} />
               <select
                name="license"
                value={details.license}
                onChange={handleChange}
                className={`${inputClass} appearance-none ltr:pr-4 rtl:pl-4`}
              >
                {Object.values(LicenseType).map((lic) => (
                  <option key={lic} value={lic}>{lic}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        
         {/* Author Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
            <label className={labelClass}>{t.authorName}</label>
            <div className="relative">
              <User className={iconClass} />
              <input
                type="text"
                name="authorName"
                value={details.authorName}
                onChange={handleChange}
                placeholder={t.authorPlaceholder}
                className={`${inputClass} ltr:pr-4 rtl:pl-4`}
              />
            </div>
          </div>
           <div>
            <label className={labelClass}>{t.githubUsername}</label>
            <input
              type="text"
              name="githubUsername"
              value={details.githubUsername}
              onChange={handleChange}
              placeholder="johndoe"
              className={inputClass}
            />
          </div>
        </div>

        <button
          onClick={onSubmit}
          disabled={isGenerating}
          className={`w-full py-3.5 px-6 rounded-xl text-white font-bold text-lg shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0
            ${isGenerating 
              ? 'bg-slate-500 dark:bg-slate-700 cursor-not-allowed opacity-75' 
              : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 shadow-indigo-500/25'
            }`}
        >
          {isGenerating ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t.generating}
            </span>
          ) : (
            t.generate
          )}
        </button>
      </div>
    </div>
  );
};