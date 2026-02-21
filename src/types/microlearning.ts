export interface LearningBite {
  id: string;
  topicId: string;
  title: string;
  content: string;
  audioUrl?: string;
  duration: number; // in minutes
  type: 'text' | 'podcast' | 'interactive';
  keywords: string[];
  aiIntegration: {
    prompts: string[];
    tools: string[];
    activities: string[];
  };
  gagneEvents: string[];
  arcsElements: string[];
  isDownloadable: boolean;
  order: number;
}

export interface Topic {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  objective: string;
  learningBites: LearningBite[];
  order: number;
  estimatedDuration: number;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  objective: string;
  topics: Topic[];
  order: number;
  totalDuration: number;
  completionBadge: string;
}

export interface UserProgress {
  userId: string;
  learningBiteId: string;
  status: 'not_started' | 'started' | 'completed';
  timeSpent: number;
  notes: string;
  lastAccessed: Date;
  completedAt?: Date;
}

export interface UserNote {
  id: string;
  userId: string;
  learningBiteId: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Achievement {
  id: string;
  userId: string;
  type: 'module_completion' | 'streak' | 'time_milestone' | 'engagement';
  title: string;
  description: string;
  badgeIcon: string;
  earnedAt: Date;
}

export interface LearningMode {
  type: 'text' | 'podcast' | 'offline';
  isActive: boolean;
  preferences: {
    autoPlay?: boolean;
    playbackSpeed?: number;
    textSize?: 'small' | 'medium' | 'large';
    highlightMode?: boolean;
  };
}