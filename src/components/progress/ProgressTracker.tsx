
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the charts
const studyTimeData = [
  { name: 'Mon', time: 2.5 },
  { name: 'Tue', time: 3.2 },
  { name: 'Wed', time: 1.8 },
  { name: 'Thu', time: 4.0 },
  { name: 'Fri', time: 2.7 },
  { name: 'Sat', time: 1.5 },
  { name: 'Sun', time: 3.5 },
];

const quizScoreData = [
  { subject: 'Math', score: 85 },
  { subject: 'Science', score: 90 },
  { subject: 'History', score: 75 },
  { subject: 'Literature', score: 82 },
  { subject: 'Languages', score: 88 },
];

const progressData = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 45 },
  { name: 'Week 4', progress: 60 },
  { name: 'Week 5', progress: 78 },
  { name: 'Week 6', progress: 85 },
];

const ProgressTracker = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <CardTitle>Your Learning Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList className="mb-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
            <TabsTrigger value="time">Study Time</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-4">
            <div>
              <h3 className="text-lg font-medium mb-2">Course Completion</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4">
                <StatCard title="Courses Enrolled" value="5" />
                <StatCard title="Completion Rate" value="78%" />
                <StatCard title="Practice Problems" value="132" />
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="subjects">
            <div>
              <h3 className="text-lg font-medium mb-2">Performance by Subject</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={quizScoreData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2">Subject Strengths</h4>
                {quizScoreData.map((item, index) => (
                  <SubjectProgress 
                    key={index} 
                    subject={item.subject} 
                    progress={item.score} 
                  />
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="time">
            <div>
              <h3 className="text-lg font-medium mb-2">Study Time (hours)</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={studyTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="time" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-1">Weekly Total</h4>
                <p className="text-2xl font-bold">
                  {studyTimeData.reduce((acc, curr) => acc + curr.time, 0).toFixed(1)} hours
                </p>
                <p className="text-sm text-muted-foreground">Your study consistency is improving!</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface StatCardProps {
  title: string;
  value: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value }) => {
  return (
    <div className="bg-muted/40 p-4 rounded-lg">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
};

interface SubjectProgressProps {
  subject: string;
  progress: number;
}

const SubjectProgress: React.FC<SubjectProgressProps> = ({ subject, progress }) => {
  return (
    <div className="mb-3">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium">{subject}</span>
        <span className="text-sm font-medium">{progress}%</span>
      </div>
      <div className="progress-bar">
        <div 
          className="progress-bar-fill bg-gradient-to-r from-primary to-tutor-teal" 
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressTracker;
