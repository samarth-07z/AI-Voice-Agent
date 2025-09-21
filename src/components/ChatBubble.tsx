import React from 'react';
import { Card } from '@/components/ui/card';
import { User, Heart } from 'lucide-react';

interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  sentiment?: 'positive' | 'neutral' | 'stressed' | 'sad';
}

interface ChatBubbleProps {
  message: ChatMessage;
}

export const ChatBubble = ({ message }: ChatBubbleProps) => {
  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`flex items-end space-x-2 max-w-xs ${message.isUser ? 'flex-row-reverse space-x-reverse' : ''}`}>
        {/* Avatar */}
        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          message.isUser 
            ? 'bg-primary text-primary-foreground' 
            : 'bg-gradient-hero text-white'
        }`}>
          {message.isUser ? (
            <User className="w-4 h-4" />
          ) : (
            <Heart className="w-4 h-4" />
          )}
        </div>

        {/* Message Bubble */}
        <Card className={`p-3 shadow-soft ${
          message.isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card'
        }`}>
          <p className="text-sm leading-relaxed">{message.text}</p>
          <p className={`text-xs mt-1 ${
            message.isUser 
              ? 'text-primary-foreground/70' 
              : 'text-muted-foreground'
          }`}>
            {message.timestamp.toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </Card>
      </div>
    </div>
  );
};