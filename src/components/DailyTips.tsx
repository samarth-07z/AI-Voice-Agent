import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { RefreshCw, ExternalLink } from 'lucide-react';

const wellnessTips = [
  {
    title: "Practice Deep Breathing",
    content: "Take 5 minutes to breathe deeply. Inhale for 4 counts, hold for 4, exhale for 6. This activates your parasympathetic nervous system.",
    category: "Stress Relief"
  },
  {
    title: "Gratitude Practice",
    content: "Write down 3 things you're grateful for today. Research shows gratitude can improve mood and overall well-being.",
    category: "Mindfulness"
  },
  {
    title: "Move Your Body",
    content: "Even 10 minutes of movement can boost endorphins. Try a short walk, stretching, or dancing to your favorite song.",
    category: "Physical Wellness"
  },
  {
    title: "Connect with Someone",
    content: "Reach out to a friend or family member. Social connections are crucial for mental health and can reduce feelings of isolation.",
    category: "Social Wellness"
  },
  {
    title: "Limit Social Media",
    content: "Consider taking a 30-minute break from social media. This can help reduce comparison and anxiety.",
    category: "Digital Wellness"
  },
  {
    title: "Practice Self-Compassion",
    content: "Treat yourself with the same kindness you'd show a good friend. Be gentle with yourself during difficult moments.",
    category: "Self-Care"
  },
  {
    title: "Stay Hydrated",
    content: "Drink water throughout the day. Dehydration can affect mood, energy levels, and cognitive function.",
    category: "Physical Wellness"
  },
  {
    title: "Set Small Goals",
    content: "Break larger tasks into smaller, manageable steps. Celebrating small wins can boost motivation and confidence.",
    category: "Productivity"
  },
  {
    title: "Practice Mindful Eating",
    content: "Eat slowly and pay attention to your food. This can improve digestion and help you feel more satisfied.",
    category: "Mindfulness"
  },
  {
    title: "Create a Bedtime Routine",
    content: "Wind down 30 minutes before bed with calming activities. Good sleep is fundamental to mental health.",
    category: "Sleep Hygiene"
  },
];

export const DailyTips = () => {
  const [currentTip, setCurrentTip] = useState(wellnessTips[0]);
  const [tipIndex, setTipIndex] = useState(0);

  // Get daily tip based on date (so it changes daily but stays consistent)
  useEffect(() => {
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const dailyIndex = dayOfYear % wellnessTips.length;
    setCurrentTip(wellnessTips[dailyIndex]);
    setTipIndex(dailyIndex);
  }, []);

  const getNextTip = () => {
    const nextIndex = (tipIndex + 1) % wellnessTips.length;
    setCurrentTip(wellnessTips[nextIndex]);
    setTipIndex(nextIndex);
  };

  return (
    <div className="space-y-4">
      <div className="p-4 rounded-lg bg-gradient-to-r from-calm-blue/20 to-calm-green/20 border border-calm-blue/30">
        <div className="flex items-start justify-between mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
            {currentTip.category}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={getNextTip}
            className="p-1 h-auto hover:bg-primary/10"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
        
        <h4 className="font-semibold mb-2 text-foreground">
          {currentTip.title}
        </h4>
        
        <p className="text-sm text-muted-foreground leading-relaxed">
          {currentTip.content}
        </p>
      </div>

      {/* Additional Resources */}
      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          size="sm"
          className="h-auto p-3 bg-calm-purple/10 border-calm-purple/20 hover:bg-calm-purple/20"
        >
          <div className="text-left">
            <p className="text-xs font-medium">Meditation</p>
            <p className="text-xs text-muted-foreground">5-min session</p>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          size="sm"
          className="h-auto p-3 bg-wellness-accent/10 border-wellness-accent/20 hover:bg-wellness-accent/20"
        >
          <div className="text-left">
            <p className="text-xs font-medium">Resources</p>
            <p className="text-xs text-muted-foreground">Learn more</p>
          </div>
          <ExternalLink className="w-3 h-3 ml-2" />
        </Button>
      </div>
    </div>
  );
};