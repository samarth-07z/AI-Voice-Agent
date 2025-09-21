import React from 'react';
import { Button } from '@/components/ui/button';
import { useMood } from '@/contexts/MoodContext';

export const VoiceToggle = () => {
  const { voiceGender, setVoiceGender } = useMood();

  return (
    <div className="flex items-center bg-muted rounded-lg p-1">
      <Button
        variant={voiceGender === 'female' ? 'default' : 'ghost'}
        size="sm"
        className={`px-3 py-1 text-xs transition-all duration-200 ${
          voiceGender === 'female' 
            ? 'bg-primary text-primary-foreground shadow-sm' 
            : 'hover:bg-muted-foreground/10'
        }`}
        onClick={() => setVoiceGender('female')}
      >
        Female
      </Button>
      <Button
        variant={voiceGender === 'male' ? 'default' : 'ghost'}
        size="sm"
        className={`px-3 py-1 text-xs transition-all duration-200 ${
          voiceGender === 'male' 
            ? 'bg-primary text-primary-foreground shadow-sm' 
            : 'hover:bg-muted-foreground/10'
        }`}
        onClick={() => setVoiceGender('male')}
      >
        Male
      </Button>
    </div>
  );
};