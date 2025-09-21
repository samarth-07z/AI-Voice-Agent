import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Mic, MicOff, Heart } from 'lucide-react';
import { useMood } from '@/contexts/MoodContext';
import { ChatBubble } from '@/components/ChatBubble';
import { SentimentDisplay } from '@/components/SentimentDisplay';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'stressed' | 'sad';
}

const Conversation = () => {
  const navigate = useNavigate();
  const { voiceGender } = useMood();
  const [isListening, setIsListening] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: `Hi there! I'm your AI wellness companion. I'm here to listen and support you. How are you feeling today?`,
      isUser: false,
      timestamp: new Date(),
    }
  ]);
  const [currentSentiment, setCurrentSentiment] = useState<'positive' | 'neutral' | 'stressed' | 'sad'>('neutral');

  // Mock AI responses based on common mental health topics
  const mockResponses = [
    {
      text: "I understand that can be really challenging. It's completely normal to feel this way sometimes. Would you like to talk about what's been on your mind?",
      sentiment: 'neutral' as const
    },
    {
      text: "That sounds really positive! I'm glad to hear you're feeling that way. What's been helping you feel good recently?",
      sentiment: 'positive' as const
    },
    {
      text: "I hear that you might be feeling stressed. Let's take a moment to breathe together. Would you like to try a quick breathing exercise?",
      sentiment: 'stressed' as const
    },
    {
      text: "It's okay to feel sad sometimes. Your feelings are valid. I'm here to support you through this. Would you like to share more about what's troubling you?",
      sentiment: 'sad' as const
    },
  ];

  const handleMicToggle = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate voice input after 3 seconds
      setTimeout(() => {
        const userMessage: ChatMessage = {
          id: Date.now().toString(),
          text: "I've been feeling a bit overwhelmed lately with everything going on...",
          isUser: true,
          timestamp: new Date(),
        };
        
        setMessages(prev => [...prev, userMessage]);
        setIsListening(false);
        
        // Add AI response after 2 seconds
        setTimeout(() => {
          const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
          const aiMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            text: randomResponse.text,
            isUser: false,
            timestamp: new Date(),
            sentiment: randomResponse.sentiment,
          };
          
          setMessages(prev => [...prev, aiMessage]);
          setCurrentSentiment(randomResponse.sentiment);
        }, 2000);
      }, 3000);
    }
  };

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
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Heart className="w-4 h-4 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm">AI Companion</p>
              <p className="text-xs text-muted-foreground capitalize">{voiceGender} voice</p>
            </div>
          </div>
          
          <div className="w-10" /> {/* Spacer */}
        </div>
      </div>

      {/* Chat Area */}
      <div className="max-w-md mx-auto p-4 pb-32">
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
          ))}
          
          {isListening && (
            <div className="flex justify-center">
              <Card className="p-4 bg-primary/10 border-primary/20">
                <div className="flex items-center space-x-2 text-primary">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                  <span className="text-sm font-medium ml-2">Listening...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="fixed bottom-0 left-0 right-0 bg-background/90 backdrop-blur-sm border-t border-border/50 p-4">
        <div className="max-w-md mx-auto">
          {/* Sentiment Display */}
          <SentimentDisplay sentiment={currentSentiment} />
          
          {/* Microphone Button */}
          <div className="flex justify-center mt-4">
            <Button
              onClick={handleMicToggle}
              size="lg"
              className={`w-16 h-16 rounded-full ${
                isListening 
                  ? 'bg-destructive hover:bg-destructive/90 shadow-glow' 
                  : 'bg-gradient-hero hover:shadow-glow'
              } transition-all duration-300`}
            >
              {isListening ? (
                <MicOff className="w-8 h-8" />
              ) : (
                <Mic className="w-8 h-8" />
              )}
            </Button>
          </div>
          
          <p className="text-center text-sm text-muted-foreground mt-2">
            {isListening ? 'Tap to stop listening' : 'Tap to speak'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Conversation;