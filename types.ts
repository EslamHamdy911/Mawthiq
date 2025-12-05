export enum ProjectType {
  FRONTEND = 'Frontend Application',
  BACKEND = 'Backend Service / API',
  FULLSTACK = 'Fullstack SaaS',
  LIBRARY = 'Open Source Library',
  CLI = 'CLI Tool',
  OTHER = 'Other'
}

export enum LicenseType {
  MIT = 'MIT',
  APACHE2 = 'Apache 2.0',
  GPL3 = 'GPL v3',
  BSD3 = 'BSD 3-Clause',
  NONE = 'None'
}

export type Language = 'ar' | 'en';

export interface ProjectDetails {
  projectName: string;
  tagline: string;
  projectType: ProjectType;
  description: string;
  features: string;
  demoUrl?: string;
  technologies: string;
  installationSteps?: string;
  license: LicenseType;
  authorName?: string;
  githubUsername?: string;
}

export interface GeneratedContent {
  markdown: string;
}

export interface Translation {
  title: string;
  about: string;
  github: string;
  projectDetails: string;
  projectName: string;
  projectNamePlaceholder: string;
  projectType: string;
  tagline: string;
  taglinePlaceholder: string;
  description: string;
  descriptionPlaceholder: string;
  technologies: string;
  technologiesPlaceholder: string;
  features: string;
  featuresPlaceholder: string;
  demoUrl: string;
  license: string;
  authorName: string;
  authorPlaceholder: string;
  githubUsername: string;
  generate: string;
  generating: string;
  preview: string;
  code: string;
  copy: string;
  download: string;
  waiting: string;
  waitingDesc: string;
  error: string;
  installApp: string;
  onboardingTitle: string;
  onboardingStep1: string;
  onboardingStep2: string;
  onboardingStep3: string;
  onboardingNote: string;
  gotIt: string;
}
