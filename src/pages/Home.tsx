import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Mic, User, UserCheck, Heart } from 'lucide-react';
import { useMood } from '@/contexts/MoodContext';
import { MoodTracker } from '@/components/MoodTracker';
import { VoiceToggle } from '@/components/VoiceToggle';
import wellnessHero from '@/assets/wellness-hero.jpg';

const Home = () => {
  const navigate = useNavigate();
  const { voiceGender } = useMood();

  const handleStartConversation = () => {
    navigate('/conversation');
  };

  return (
    <div className="min-h-screen bg-gradient-wellness p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center pt-8 pb-4">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-card flex items-center justify-center shadow-soft">
            <Heart className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Mental Wellness Companion
          </h1>
          <p className="text-muted-foreground">
            Your AI friend for mental wellness support
          </p>
        </div>

        {/* Hero Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-wellness">
          <img 
            src={wellnessHero} 
            alt="Calming wellness background" 
            className="w-full h-48 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>

        {/* Call AI Button */}
        <Card className="p-6 bg-gradient-card shadow-wellness">
          <div className="text-center space-y-4">
            <Button
              onClick={handleStartConversation}
              size="lg"
              className="w-full h-16 text-lg font-semibold bg-gradient-hero hover:shadow-glow transition-all duration-300 transform hover:scale-105"
            >
              <Mic className="w-6 h-6 mr-3" />
              Start AI Chat
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Tap to begin a supportive conversation
            </p>
          </div>
        </Card>

        {/* Voice Settings */}
        <Card className="p-4 bg-gradient-card shadow-soft">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {voiceGender === 'female' ? (
                <User className="w-5 h-5 text-primary" />
              ) : (
                <UserCheck className="w-5 h-5 text-primary" />
              )}
              <span className="font-medium">AI Voice</span>
            </div>
            <VoiceToggle />
          </div>
        </Card>

        {/* Mood Tracker */}
        <Card className="p-6 bg-gradient-card shadow-soft">
          <h3 className="font-semibold mb-4 text-center">How are you feeling?</h3>
          <MoodTracker />
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <Button 
            variant="outline" 
            className="h-12 bg-calm-blue/20 border-calm-blue/30 hover:bg-calm-blue/30"
            onClick={() => navigate('/dashboard')}
          >
            View Progress
          </Button>
          <Button 
            variant="outline"
            className="h-12 bg-calm-green/20 border-calm-green/30 hover:bg-calm-green/30"
          >
            Daily Tips
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;