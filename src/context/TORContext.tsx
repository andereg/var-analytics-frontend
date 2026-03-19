'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface TORAnalysisData {
  categories: {
    id: number;
    category: string;
    pro: number;
    contra: number;
    ects: number;
    averageGrade: string;
    summary: string;
  }[];
  bestCategory: string;
  weakestCategory: string;
  averageFit: number;
  skills: string[];
  recommendedFields: string[];
}

interface TORContextType {
  analysis: TORAnalysisData | null;
  setAnalysis: (data: TORAnalysisData | null) => void;
  isAnalyzing: boolean;
  setIsAnalyzing: (loading: boolean) => void;
}

const TORContext = createContext<TORContextType | undefined>(undefined);

export function TORProvider({ children }: { children: ReactNode }) {
  const [analysis, setAnalysis] = useState<TORAnalysisData | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  return (
    <TORContext.Provider value={{ analysis, setAnalysis, isAnalyzing, setIsAnalyzing }}>
      {children}
    </TORContext.Provider>
  );
}

export function useTOR() {
  const context = useContext(TORContext);
  if (context === undefined) {
    throw new Error('useTOR must be used within a TORProvider');
  }
  return context;
}
