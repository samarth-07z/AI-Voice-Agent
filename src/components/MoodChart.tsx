import React from 'react';
import { MoodEntry } from '@/contexts/MoodContext';

interface MoodChartProps {
  moods: MoodEntry[];
}

export const MoodChart = ({ moods }: MoodChartProps) => {
  // Get last 7 days of moods for the chart
  const last7Days = moods.slice(0, 7).reverse();
  
  if (moods.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">No mood data yet.</p>
        <p className="text-sm text-muted-foreground mt-1">
          Start tracking your mood to see your progress!
        </p>
      </div>
    );
  }

  const maxMood = 5;

  return (
    <div className="space-y-4">
      {/* Simple Bar Chart */}
      <div className="flex items-end justify-between h-32 space-x-2">
        {last7Days.map((mood, index) => (
          <div key={mood.id} className="flex flex-col items-center flex-1">
            <div className="relative w-full bg-muted rounded-t-lg overflow-hidden" style={{ height: '100px' }}>
              <div 
                className="absolute bottom-0 w-full bg-gradient-hero rounded-t-lg transition-all duration-500"
                style={{ 
                  height: `${(mood.mood / maxMood) * 100}%`,
                  opacity: 0.8 
                }}
              />
              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold text-white">
                {mood.mood}
              </div>
            </div>
            <div className="mt-2 text-xs text-muted-foreground text-center">
              {mood.timestamp.toLocaleDateString([], { 
                month: 'short', 
                day: 'numeric' 
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Mood Scale Reference */}
      <div className="flex justify-between text-xs text-muted-foreground border-t pt-2">
        <span>😢 1</span>
        <span>😞 2</span>
        <span>😐 3</span>
        <span>😊 4</span>
        <span>😄 5</span>
      </div>

      {/* Quick Stats */}
      {moods.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="text-center p-2 rounded-lg bg-calm-blue/20">
            <p className="text-sm text-muted-foreground">Average</p>
            <p className="font-semibold">
              {(moods.reduce((sum, mood) => sum + mood.mood, 0) / moods.length).toFixed(1)}
            </p>
          </div>
          <div className="text-center p-2 rounded-lg bg-calm-green/20">
            <p className="text-sm text-muted-foreground">Best Day</p>
            <p className="font-semibold">
              {Math.max(...moods.map(mood => mood.mood))}/5
            </p>
          </div>
        </div>
      )}
    </div>
  );
};