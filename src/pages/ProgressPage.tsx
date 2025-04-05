
import AppLayout from '@/components/layout/AppLayout';
import ProgressTracker from '@/components/progress/ProgressTracker';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const ProgressPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">My Progress</h1>
          <p className="text-muted-foreground mt-1">
            Track your learning journey and achievements
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <StatCard 
            title="Total Study Time" 
            value="48 hours" 
            description="+12% from last month" 
            trend="up"
          />
          <StatCard 
            title="Courses Completed" 
            value="3" 
            description="2 in progress" 
            trend="stable"
          />
          <StatCard 
            title="Quiz Average" 
            value="82%" 
            description="+5% improvement" 
            trend="up"
          />
        </div>
        
        <ProgressTracker />
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Learning Achievements</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <AchievementCard 
              title="Fast Learner" 
              description="Completed 3 lessons in one day" 
              earned={true}
            />
            <AchievementCard 
              title="Quiz Master" 
              description="Scored 100% on 5 quizzes" 
              earned={true}
            />
            <AchievementCard 
              title="Consistent Scholar" 
              description="Studied 5 days in a row" 
              earned={true}
            />
            <AchievementCard 
              title="Problem Solver" 
              description="Solved 100 practice problems" 
              earned={false}
              progress={65}
            />
            <AchievementCard 
              title="Subject Expert" 
              description="Mastered all topics in a subject" 
              earned={false}
              progress={42}
            />
            <AchievementCard 
              title="Course Champion" 
              description="Completed 10 courses" 
              earned={false}
              progress={30}
            />
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'up' | 'down' | 'stable';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, description, trend }) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          <p className="text-xs flex items-center">
            {trend === 'up' && <span className="text-green-500">▲</span>}
            {trend === 'down' && <span className="text-red-500">▼</span>}
            <span className="ml-1">{description}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

interface AchievementCardProps {
  title: string;
  description: string;
  earned: boolean;
  progress?: number;
}

const AchievementCard: React.FC<AchievementCardProps> = ({ 
  title, 
  description, 
  earned,
  progress = 0 
}) => {
  return (
    <div className="border rounded-lg p-4 flex flex-col items-center text-center">
      <div className={`w-12 h-12 rounded-full mb-2 flex items-center justify-center ${earned ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
        {earned ? '✓' : progress + '%'}
      </div>
      <h3 className="font-medium text-sm">{title}</h3>
      <p className="text-xs text-muted-foreground mt-1">{description}</p>
      
      {!earned && progress > 0 && (
        <div className="w-full bg-muted h-1 rounded-full mt-2">
          <div 
            className="bg-primary h-1 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default ProgressPage;
