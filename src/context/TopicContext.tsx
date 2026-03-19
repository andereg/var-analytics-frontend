'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TopicContextType {
  selectedTopicIds: string[];
  addTopic: (id: string) => void;
  removeTopic: (id: string) => void;
}

const TopicContext = createContext<TopicContextType | undefined>(undefined);

export function TopicProvider({ children }: { children: ReactNode }) {
  const [selectedTopicIds, setSelectedTopicIds] = useState<string[]>([]);

  const addTopic = (id: string) => {
    setSelectedTopicIds((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
  };

  const removeTopic = (id: string) => {
    setSelectedTopicIds((prev) => prev.filter((topicId) => topicId !== id));
  };

  return (
    <TopicContext.Provider value={{ selectedTopicIds, addTopic, removeTopic }}>
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
