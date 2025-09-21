import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, TrendingUp, Calendar, Lightbulb, Heart } from 'lucide-react';
import { useMood } from '@/contexts/MoodContext';
import { MoodChart } from '@/components/MoodChart';
import { DailyTips } from '@/components/DailyTips';

const Dashboard = () => {
  const navigate = useNavigate();
  const { moods, currentMood } = useMood();

  const getMoodEmoji = (mood: number) => {
    const emojis = ['😢', '😞', '😐', '😊', '😄'];
    return emojis[mood - 1] || '😐';
  };

  const getMoodLabel = (mood: number) => {
    const labels = ['Very Sad', 'Sad', 'Neutral', 'Happy', 'Very Happy'];
    return labels[mood - 1] || 'Neutral';
  };

  // Calculate streak (simplified)
  const currentStreak = moods.length > 0 ? Math.min(moods.length, 7) : 0;

  return (
    <div className="min-h-screen bg-gradient-wellness">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-sm border-b border-border/50 p-4">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/')}
            className="p-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <h1 className="font-semibold">Your Progress</h1>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      <div className="max-w-md mx-auto p-4 space-y-6">
        {/* Current Status */}
        <Card className="p-6 bg-gradient-card shadow-wellness">
          <div className="text-center">
            <div className="text-4xl mb-2">{getMoodEmoji(currentMood)}</div>
            <h3 className="font-semibold text-lg mb-1">Current Mood</h3>
            <p className="text-muted-foreground">{getMoodLabel(currentMood)}</p>
          </div>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-calm-blue/20 border-calm-blue/30">
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Streak</p>
                <p className="font-semibold">{currentStreak} days</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 bg-calm-green/20 border-calm-green/30">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Entries</p>
                <p className="font-semibold">{moods.length}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Mood Chart */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Mood History</h3>
          </div>
          <MoodChart moods={moods} />
        </Card>

        {/* Recent Moods */}
        {moods.length > 0 && (
          <Card className="p-6 bg-gradient-card shadow-soft">
            <h3 className="font-semibold mb-4">Recent Check-ins</h3>
            <div className="space-y-3">
              {moods.slice(0, 5).map((mood) => (
                <div key={mood.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{mood.emoji}</span>
                    <div>
                      <p className="font-medium">{getMoodLabel(mood.mood)}</p>
                      <p className="text-sm text-muted-foreground">
                        {mood.timestamp.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{mood.mood}/5</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Daily Tips */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-wellness-accent" />
            <h3 className="font-semibold">Daily Wellness Tips</h3>
          </div>
          <DailyTips />
        </Card>

        {/* Action Buttons */}
        <div className="space-y-3">
          <Button 
            onClick={() => navigate('/conversation')}
            className="w-full h-12 bg-gradient-hero hover:shadow-glow"
          >
            Start New Session
          </Button>
          
          <Button 
            variant="outline"
            onClick={() => navigate('/')}
            className="w-full h-12 bg-calm-purple/20 border-calm-purple/30 hover:bg-calm-purple/30"
          >
            Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;