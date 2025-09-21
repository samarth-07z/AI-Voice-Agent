import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface MoodEntry {
  id: string;
  mood: number; // 1-5 scale
  emoji: string;
  timestamp: Date;
  notes?: string;
}

interface MoodContextType {
  moods: MoodEntry[];
  currentMood: number;
  addMood: (mood: number, emoji: string, notes?: string) => void;
  setCurrentMood: (mood: number) => void;
  voiceGender: 'male' | 'female';
  setVoiceGender: (gender: 'male' | 'female') => void;
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const useMood = () => {
  const context = useContext(MoodContext);
  if (context === undefined) {
    throw new Error('useMood must be used within a MoodProvider');
  }
  return context;
};

export const MoodProvider = ({ children }: { children: ReactNode }) => {
  const [moods, setMoods] = useState<MoodEntry[]>([]);
  const [currentMood, setCurrentMood] = useState<number>(3);
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('female');

  const addMood = (mood: number, emoji: string, notes?: string) => {
    const newMood: MoodEntry = {
      id: Date.now().toString(),
      mood,
      emoji,
      timestamp: new Date(),
      notes,
    };
    setMoods(prev => [newMood, ...prev]);
    setCurrentMood(mood);
  };

  const value: MoodContextType = {
    moods,
    currentMood,
    addMood,
    setCurrentMood,
    voiceGender,
    setVoiceGender,
  };

  return (
    <MoodContext.Provider value={value}>
      {children}
    </MoodContext.Provider>
  );
};