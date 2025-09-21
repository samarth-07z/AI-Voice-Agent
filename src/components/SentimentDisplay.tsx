import React from 'react';
import { Card } from '@/components/ui/card';
import { Heart, AlertCircle, Smile, Frown } from 'lucide-react';

interface SentimentDisplayProps {
  sentiment: 'positive' | 'neutral' | 'stressed' | 'sad';
}

const sentimentConfig = {
  positive: {
    icon: Smile,
    label: 'You sound positive',
    color: 'bg-calm-green/20 border-calm-green/30 text-calm-green',
    iconColor: 'text-green-600',
  },
  neutral: {
    icon: Heart,
    label: 'Listening carefully',
    color: 'bg-calm-blue/20 border-calm-blue/30 text-calm-blue',
    iconColor: 'text-blue-600',
  },
  stressed: {
    icon: AlertCircle,
    label: 'You sound a bit stressed',
    color: 'bg-wellness-accent/20 border-wellness-accent/30 text-wellness-accent-foreground',
    iconColor: 'text-orange-600',
  },
  sad: {
    icon: Frown,
    label: 'I hear some sadness',
    color: 'bg-calm-purple/20 border-calm-purple/30 text-calm-purple',
    iconColor: 'text-purple-600',
  },
};

export const SentimentDisplay = ({ sentiment }: SentimentDisplayProps) => {
  const config = sentimentConfig[sentiment];
  const Icon = config.icon;

  return (
    <Card className={`p-3 ${config.color}`}>
      <div className="flex items-center justify-center space-x-2">
        <Icon className={`w-4 h-4 ${config.iconColor}`} />
        <span className="text-sm font-medium">{config.label}</span>
      </div>
    </Card>
  );
};