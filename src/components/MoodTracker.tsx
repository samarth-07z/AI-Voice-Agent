import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useMood } from '@/contexts/MoodContext';

const moodOptions = [
  { value: 1, emoji: '😢', label: 'Very Sad', color: 'bg-red-100 hover:bg-red-200 border-red-200' },
  { value: 2, emoji: '😞', label: 'Sad', color: 'bg-orange-100 hover:bg-orange-200 border-orange-200' },
  { value: 3, emoji: '😐', label: 'Neutral', color: 'bg-calm-blue/30 hover:bg-calm-blue/50 border-calm-blue/40' },
  { value: 4, emoji: '😊', label: 'Happy', color: 'bg-calm-green/30 hover:bg-calm-green/50 border-calm-green/40' },
  { value: 5, emoji: '😄', label: 'Very Happy', color: 'bg-wellness-accent/30 hover:bg-wellness-accent/50 border-wellness-accent/40' },
];

export const MoodTracker = () => {
  const { currentMood, addMood } = useMood();
  const [selectedMood, setSelectedMood] = useState<number>(currentMood);

  const handleMoodSelect = (moodValue: number, emoji: string) => {
    setSelectedMood(moodValue);
    addMood(moodValue, emoji);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-5 gap-2">
        {moodOptions.map((mood) => (
          <Button
            key={mood.value}
            variant="outline"
            className={`h-16 flex flex-col items-center justify-center space-y-1 transition-all duration-200 ${
              selectedMood === mood.value 
                ? 'ring-2 ring-primary ring-offset-2 scale-105' 
                : ''
            } ${mood.color}`}
            onClick={() => handleMoodSelect(mood.value, mood.emoji)}
          >
            <span className="text-2xl">{mood.emoji}</span>
            <span className="text-xs font-medium">{mood.value}</span>
          </Button>
        ))}
      </div>
      
      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Current: {moodOptions.find(m => m.value === selectedMood)?.label}
        </p>
      </div>
    </div>
  );
};