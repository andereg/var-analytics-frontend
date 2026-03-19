'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TopicContextType {
  selectedTopicIds: string[];
  lastAddedTopicId: string | null;
  definiteTopicId: string | null;
  topicSelections: Record<string, { companyId?: string; supervisorId?: string }>;
  addTopic: (id: string) => void;
  removeTopic: (id: string) => void;
  setCompanyForTopic: (topicId: string, companyId: string) => void;
  setSupervisorForTopic: (topicId: string, supervisorId: string) => void;
  setDefiniteTopicId: (id: string | null) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function TopicProvider({ children }: { children: ReactNode }) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);
  const [lastAddedTopicId, setLastAddedTopicId] = useState<string | null>(null);
  const [definiteTopicId, setDefiniteTopicId] = useState<string | null>(null);
  const [topicSelections, setTopicSelections] = useState<Record<string, { companyId?: string; supervisorId?: string }>>({});

  const addTopic = (id: string) => {
    setLastAddedTopicId(id);
    setSelectedTopicIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeTopic = (id: string) => {
    setSelectedTopicIds((prev) => prev.filter((topicId) => topicId !== id));
    if (lastAddedTopicId === id) setLastAddedTopicId(null);
    if (definiteTopicId === id) setDefiniteTopicId(null);
  };

  const setCompanyForTopic = (topicId: string, companyId: string) => {
    setTopicSelections(prev => ({
      ...prev,
      [topicId]: { ...prev[topicId], companyId }
    }));
  };

  const setSupervisorForTopic = (topicId: string, supervisorId: string) => {
    setTopicSelections(prev => ({
      ...prev,
      [topicId]: { ...prev[topicId], supervisorId }
    }));
  };

  return (
    <TopicContext.Provider value={{ 
      selectedTopicIds, 
      lastAddedTopicId, 
      definiteTopicId,
      topicSelections,
      addTopic, 
      removeTopic,
      setCompanyForTopic,
      setSupervisorForTopic,
      setDefiniteTopicId
    }}>
      {children}
    </TopicContext.Provider>
  );
}

export function useTopics() {
  const context = useContext(TopicContext);
  if (context === undefined) {
    throw new Error('useTopics must be used within a TopicProvider');
  }
  return context;
}
