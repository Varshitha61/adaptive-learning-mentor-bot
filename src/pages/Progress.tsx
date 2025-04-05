
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowUpRight, Download, Calendar as CalendarIcon, Clock } from "lucide-react";

// Mock data for charts
const weeklyProgressData = [
  { day: "Mon", minutes: 45, completion: 3 },
  { day: "Tue", minutes: 65, completion: 4 },
  { day: "Wed", minutes: 30, completion: 2 },
  { day: "Thu", minutes: 90, completion: 5 },
  { day: "Fri", minutes: 45, completion: 2 },
  { day: "Sat", minutes: 120, completion: 7 },
  { day: "Sun", minutes: 60, completion: 3 },
];

const subjectProgressData = [
  { subject: "Mathematics", progress: 65, target: 100 },
  { subject: "Science", progress: 42, target: 100 },
  { subject: "English", progress: 78, target: 100 },
  { subject: "History", progress: 30, target: 100 },
];

const activityHistory = [
  { date: "2023-04-15", activity: "Completed 'Introduction to Algebra'", duration: "45 min", score: "95%" },
  { date: "2023-04-14", activity: "Quiz: Polynomial Operations", duration: "25 min", score: "85%" },
  { date: "2023-04-14", activity: "Lesson: Factoring Polynomials", duration: "30 min", score: "-" },
  { date: "2023-04-13", activity: "Chat with AI Tutor", duration: "15 min", score: "-" },
  { date: "2023-04-12", activity: "Quiz: Cell Structure", duration: "20 min", score: "90%" },
  { date: "2023-04-11", activity: "Lesson: DNA and Genetics", duration: "40 min", score: "-" },
];

const strengthsAndWeaknesses = [
  { category: "Strengths", areas: ["Algebra", "Grammar", "Problem Solving"] },
  { category: "Needs Improvement", areas: ["Calculus", "Chemistry", "Historical Analysis"] },
];

const Progress = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Your Progress</h1>
          <p className="text-muted-foreground">
            Track your learning journey, identify strengths and areas for improvement.
          </p>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">By Subject</TabsTrigger>
            <TabsTrigger value="history">Activity History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="space-y-6">
            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Weekly Learning Activity</CardTitle>
                <CardDescription>Your learning time and completed activities for the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={weeklyProgressData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                      <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                      <Tooltip />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="minutes"
                        name="Minutes Studied"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="completion"
                        name="Activities Completed"
                        stroke="#82ca9d"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Strengths and Weaknesses */}
            <div className="grid gap-6 md:grid-cols-2">
              {strengthsAndWeaknesses.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className={category.category === "Strengths" ? "text-green-600" : "text-amber-600"}>
                      {category.category}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-2">
                      {category.areas.map((area, index) => (
                        <div key={index} className="flex items-center p-2 bg-gray-50 rounded-md">
                          <div
                            className={`w-2 h-2 rounded-full mr-2 ${
                              category.category === "Strengths" ? "bg-green-500" : "bg-amber-500"
                            }`}
                          />
                          <span>{area}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Today's Study Calendar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Study Calendar</CardTitle>
                <CardDescription>Plan your learning sessions and track your consistency</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                  <Calendar
                    mode="single"
                    className="border rounded-md"
                  />
                </div>
                <div className="flex-1 space-y-4">
                  <h3 className="font-medium">Today's Schedule</h3>
                  <div className="space-y-2">
                    <div className="p-3 border rounded-md bg-blue-50 border-blue-100">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Algebra Practice</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>30 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">Start</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Biology Quiz</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>15 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">Start</Button>
                      </div>
                    </div>
                    <div className="p-3 border rounded-md">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Literature Review</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>45 minutes</span>
                          </div>
                        </div>
                        <Button size="sm" variant="ghost">Start</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="subjects" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Subject Progress</CardTitle>
                <CardDescription>Your progress across different subjects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={subjectProgressData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="subject" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="progress" name="Current Progress" fill="#8884d8" />
                      <Bar dataKey="target" name="Target" fill="#82ca9d" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            {/* Individual Subject Cards */}
            <div className="grid gap-6 sm:grid-cols-2">
              {subjectProgressData.map((subject) => (
                <Card key={subject.subject}>
                  <CardHeader className="pb-2">
                    <CardTitle>{subject.subject}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span className="font-medium">{subject.progress}%</span>
                        </div>
                        <div className="h-2 rounded-full bg-gray-200">
                          <div 
                            className="h-2 rounded-full bg-blue-600" 
                            style={{ width: `${subject.progress}%` }}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold text-blue-600">
                            {Math.floor(subject.progress / 10)}
                          </div>
                          <div className="text-xs text-gray-500">Lessons</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold text-green-600">
                            {Math.floor(subject.progress / 20)}
                          </div>
                          <div className="text-xs text-gray-500">Quizzes</div>
                        </div>
                        <div className="border rounded-md p-2">
                          <div className="text-2xl font-bold text-amber-600">
                            {Math.floor(subject.progress / 25) + 1}
                          </div>
                          <div className="text-xs text-gray-500">Level</div>
                        </div>
                      </div>
                      
                      <Button className="w-full" variant="outline">
                        View Details
                        <ArrowUpRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="history">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Activity History</CardTitle>
                  <CardDescription>Your learning activities and achievements</CardDescription>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Score</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activityHistory.map((activity, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{activity.date}</TableCell>
                        <TableCell>{activity.activity}</TableCell>
                        <TableCell>{activity.duration}</TableCell>
                        <TableCell>{activity.score}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Progress;
