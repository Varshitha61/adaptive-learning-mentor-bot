
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ArrowRight, BookOpen, CheckCircle, Clock, MessageCircle, PlayCircle } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const subjects = [
  { id: 'math', name: 'Mathematics', progress: 65, icon: '📊' },
  { id: 'science', name: 'Science', progress: 42, icon: '🧪' },
  { id: 'english', name: 'English', progress: 78, icon: '📚' },
  { id: 'history', name: 'History', progress: 30, icon: '🏛️' },
];

const recentActivities = [
  { id: 1, type: 'quiz', title: 'Algebra Fundamentals Quiz', date: '2 hours ago', score: '85%' },
  { id: 2, type: 'lesson', title: 'Introduction to Chemistry', date: 'Yesterday', completed: true },
  { id: 3, type: 'chat', title: 'Help with Geometry Problem', date: '2 days ago', messages: 8 },
];

const recommendedLessons = [
  { id: 1, title: 'Advanced Algebra: Quadratic Equations', subject: 'Mathematics', duration: '30 min' },
  { id: 2, title: 'Cell Biology: The Basics', subject: 'Science', duration: '25 min' },
];

const Dashboard = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 18) setGreeting('Good afternoon');
    else setGreeting('Good evening');
  }, []);

  if (!currentUser) return null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{greeting}, {currentUser.name}!</h1>
          <p className="text-muted-foreground">
            Here's an overview of your learning progress and recommended activities.
          </p>
        </div>

        {/* Subject Progress */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {subjects.map((subject) => (
            <Card key={subject.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="text-xl">{subject.icon}</div>
                <div className="text-sm font-medium">{subject.progress}% complete</div>
              </CardHeader>
              <CardContent>
                <div className="text-lg font-bold mb-2">{subject.name}</div>
                <Progress value={subject.progress} className="h-2" />
              </CardContent>
              <CardFooter>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="ml-auto text-xs" 
                  onClick={() => navigate('/learning-path', { state: { subject: subject.id } })}
                >
                  Continue Learning
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Recent Activity */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your learning activities from the past week</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-center space-x-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                    {activity.type === 'quiz' && <CheckCircle className="h-5 w-5 text-indigo-600" />}
                    {activity.type === 'lesson' && <BookOpen className="h-5 w-5 text-indigo-600" />}
                    {activity.type === 'chat' && <MessageCircle className="h-5 w-5 text-indigo-600" />}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">{activity.title}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.score && <span className="font-medium text-green-600">{activity.score}</span>}
                    {activity.completed && <span className="font-medium text-green-600">Completed</span>}
                    {activity.messages && <span>{activity.messages} messages</span>}
                  </div>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => navigate('/progress')}
              >
                View All Activity
              </Button>
            </CardFooter>
          </Card>

          {/* Recommended Lessons */}
          <Card className="col-span-1">
            <CardHeader>
              <CardTitle>Recommended for You</CardTitle>
              <CardDescription>Based on your learning style and progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {recommendedLessons.map((lesson) => (
                <div key={lesson.id} className="flex flex-col space-y-2 p-3 border rounded-lg">
                  <div className="flex justify-between">
                    <h3 className="font-medium">{lesson.title}</h3>
                    <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-full">
                      {lesson.subject}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="h-4 w-4 mr-1" />
                    {lesson.duration}
                  </div>
                  <Button 
                    size="sm"
                    className="w-full mt-2"
                    onClick={() => navigate('/learning-path')}
                  >
                    <PlayCircle className="mr-1 h-4 w-4" />
                    Start Lesson
                  </Button>
                </div>
              ))}
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full" 
                onClick={() => navigate('/resources')}
              >
                View All Recommendations
              </Button>
            </CardFooter>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
            <Button 
              onClick={() => navigate('/tutor-chat')}
              className="flex flex-col h-auto py-4 space-y-2 bg-blue-600 hover:bg-blue-700"
            >
              <MessageCircle className="h-6 w-6" />
              <span>Ask Your AI Tutor</span>
            </Button>
            <Button 
              onClick={() => navigate('/quiz')}
              className="flex flex-col h-auto py-4 space-y-2 bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-6 w-6" />
              <span>Take a Quick Quiz</span>
            </Button>
            <Button 
              onClick={() => navigate('/learning-path')}
              className="flex flex-col h-auto py-4 space-y-2 bg-purple-600 hover:bg-purple-700"
            >
              <BookOpen className="h-6 w-6" />
              <span>Continue Learning</span>
            </Button>
            <Button 
              onClick={() => navigate('/profile')}
              className="flex flex-col h-auto py-4 space-y-2 bg-amber-600 hover:bg-amber-700"
            >
              <PlayCircle className="h-6 w-6" />
              <span>Update Your Profile</span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
