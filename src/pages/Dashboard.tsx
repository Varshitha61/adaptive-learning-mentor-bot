
import { useEffect, useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ContentRecommendations from '@/components/recommendations/ContentRecommendations';
import { Button } from '@/components/ui/button';
import { Calendar, BookOpen, ArrowRight, BarChart, Clock } from 'lucide-react';
import Quiz from '@/components/quiz/Quiz';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  
  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserName(user.name || 'Student');
      } catch (e) {
        setUserName('Student');
      }
    }
  }, []);
  
  return (
    <AppLayout>
      <div className="space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome back, {userName}</h1>
            <p className="text-muted-foreground">
              Let's continue your personalized learning journey.
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" className="flex items-center">
              <Calendar className="mr-2 h-4 w-4" />
              Today's Plan
            </Button>
            <Button size="sm" className="flex items-center">
              <BookOpen className="mr-2 h-4 w-4" />
              Continue Learning
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Learning Progress Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <ProgressCard 
                  title="Course Completion" 
                  value="68%" 
                  description="Physics Fundamentals"
                  trend="increasing"
                  icon={<BookOpen className="h-5 w-5" />}
                  color="bg-tutor-blue"
                />
                <ProgressCard 
                  title="Weekly Study Time" 
                  value="14.5h" 
                  description="+2.3 hours from last week"
                  trend="increasing"
                  icon={<Clock className="h-5 w-5" />}
                  color="bg-tutor-purple"
                />
                <ProgressCard 
                  title="Quiz Performance" 
                  value="85%" 
                  description="Last 5 quizzes average"
                  trend="stable"
                  icon={<BarChart className="h-5 w-5" />}
                  color="bg-tutor-green"
                />
              </div>
            </div>
            
            <ContentRecommendations />
            
            <Card>
              <CardHeader>
                <CardTitle>Continue Learning</CardTitle>
                <CardDescription>
                  Pick up where you left off on your active courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ContinueCourseCard 
                    title="Advanced Calculus" 
                    progress={72} 
                    lastLesson="Integration by Parts" 
                    timeLeft="18 min" 
                  />
                  <ContinueCourseCard 
                    title="Introduction to Quantum Physics" 
                    progress={45} 
                    lastLesson="Wave Functions" 
                    timeLeft="25 min" 
                  />
                  <ContinueCourseCard 
                    title="World History: Renaissance" 
                    progress={30} 
                    lastLesson="The Medici Family" 
                    timeLeft="40 min" 
                  />
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="space-y-6">
            <div className="hidden lg:block">
              <h2 className="text-xl font-semibold mb-4">Knowledge Check</h2>
              <Quiz />
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Sessions</CardTitle>
                <CardDescription>
                  Your scheduled learning activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <UpcomingSession 
                  title="Biology Study Group" 
                  time="Today, 3:30 PM" 
                  participants={4} 
                />
                <UpcomingSession 
                  title="Math Problem Solving" 
                  time="Tomorrow, 5:00 PM" 
                  participants={2} 
                />
                <UpcomingSession 
                  title="Physics Lab Review" 
                  time="Oct 15, 2:15 PM" 
                  participants={6} 
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface ProgressCardProps {
  title: string;
  value: string;
  description: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  icon: React.ReactNode;
  color: string;
}

const ProgressCard: React.FC<ProgressCardProps> = ({ 
  title, 
  value, 
  description, 
  trend, 
  icon,
  color
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className={`${color} p-2 rounded-full text-white`}>
            {icon}
          </div>
          <div className="text-right">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">{description}</p>
      </CardContent>
    </Card>
  );
};

interface ContinueCourseCardProps {
  title: string;
  progress: number;
  lastLesson: string;
  timeLeft: string;
}

const ContinueCourseCard: React.FC<ContinueCourseCardProps> = ({
  title,
  progress,
  lastLesson,
  timeLeft,
}) => {
  return (
    <div className="border rounded-lg p-4 hover:border-primary/50 transition-colors duration-200">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">Lesson: {lastLesson}</p>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-sm mb-1">
          <span>{progress}% complete</span>
          <span>{timeLeft} left</span>
        </div>
        <div className="w-full bg-muted h-2 rounded-full">
          <div 
            className="bg-primary h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

interface UpcomingSessionProps {
  title: string;
  time: string;
  participants: number;
}

const UpcomingSession: React.FC<UpcomingSessionProps> = ({
  title,
  time,
  participants,
}) => {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="font-medium">{title}</h3>
      <div className="flex justify-between items-center mt-2">
        <p className="text-sm text-muted-foreground">{time}</p>
        <div className="flex items-center text-sm text-muted-foreground">
          <div className="flex -space-x-1 mr-2">
            {Array.from({ length: Math.min(3, participants) }).map((_, i) => (
              <div 
                key={i}
                className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs border border-background"
              >
                {String.fromCharCode(65 + i)}
              </div>
            ))}
          </div>
          {participants > 3 && <span>+{participants - 3}</span>}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
