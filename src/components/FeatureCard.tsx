import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  recommendedGAI: string[];
  phase: string;
  onClick: () => void;
  disabled?: boolean;
}

export default function FeatureCard({ 
  title, 
  description, 
  icon: Icon, 
  recommendedGAI, 
  phase, 
  onClick,
  disabled = false 
}: FeatureCardProps) {
  return (
    <Card className={`cursor-pointer transition-all hover:shadow-lg ${disabled ? 'opacity-50' : ''}`}>
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <Badge variant="outline" className="text-xs mt-1">
              {phase}
            </Badge>
          </div>
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">Recommended GAI:</p>
            <div className="flex flex-wrap gap-1">
              {recommendedGAI.map((gai) => (
                <Badge key={gai} variant="secondary" className="text-xs">
                  {gai}
                </Badge>
              ))}
            </div>
          </div>
          <Button 
            onClick={onClick} 
            className="w-full" 
            disabled={disabled}
          >
            Launch Tool
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}