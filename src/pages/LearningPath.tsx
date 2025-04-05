
import { useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, CheckCircle, Clock, PlayCircle, Star, Lock, BookOpenCheck } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

// Mock learning path data
const learningPaths = {
  math: {
    name: "Mathematics",
    description: "Master mathematical concepts from algebra to calculus",
    progress: 65,
    modules: [
      {
        id: "m1",
        title: "Algebra Fundamentals",
        description: "Master the basics of algebra including equations, inequalities, and functions",
        completed: true,
        progress: 100,
        lessons: [
          { id: "l1", title: "Variables and Expressions", duration: "15 min", completed: true },
          { id: "l2", title: "Solving Linear Equations", duration: "20 min", completed: true },
          { id: "l3", title: "Graphing Linear Functions", duration: "25 min", completed: true },
        ]
      },
      {
        id: "m2",
        title: "Intermediate Algebra",
        description: "Advance your algebra skills with polynomials, rational expressions, and more",
        completed: false,
        progress: 67,
        lessons: [
          { id: "l4", title: "Polynomial Operations", duration: "20 min", completed: true },
          { id: "l5", title: "Factoring Polynomials", duration: "25 min", completed: true },
          { id: "l6", title: "Rational Expressions", duration: "20 min", completed: false },
        ]
      },
      {
        id: "m3",
        title: "Introduction to Calculus",
        description: "Begin exploring calculus concepts with limits and derivatives",
        completed: false,
        progress: 0,
        locked: true,
        lessons: [
          { id: "l7", title: "Understanding Limits", duration: "30 min", completed: false },
          { id: "l8", title: "Introduction to Derivatives", duration: "35 min", completed: false },
          { id: "l9", title: "Applications of Derivatives", duration: "40 min", completed: false },
        ]
      }
    ]
  },
  science: {
    name: "Science",
    description: "Explore biology, chemistry, physics and other scientific disciplines",
    progress: 42,
    modules: [
      {
        id: "sm1",
        title: "Biology Basics",
        description: "Understand fundamental concepts of living organisms",
        completed: false,
        progress: 33,
        lessons: [
          { id: "sl1", title: "Cell Structure", duration: "25 min", completed: true },
          { id: "sl2", title: "DNA and Genetics", duration: "30 min", completed: false },
          { id: "sl3", title: "Ecosystems", duration: "20 min", completed: false },
        ]
      },
      {
        id: "sm2",
        title: "Chemistry Fundamentals",
        description: "Learn about atoms, elements, and chemical reactions",
        completed: false,
        progress: 0,
        lessons: [
          { id: "sl4", title: "Atomic Structure", duration: "20 min", completed: false },
          { id: "sl5", title: "Periodic Table", duration: "25 min", completed: false },
          { id: "sl6", title: "Chemical Bonding", duration: "30 min", completed: false },
        ]
      }
    ]
  },
  english: {
    name: "English",
    description: "Develop your language, writing, and literary analysis skills",
    progress: 78,
    modules: []
  },
  history: {
    name: "History",
    description: "Explore world history from ancient civilizations to modern times",
    progress: 30,
    modules: []
  }
};

const LearningPath = () => {
  const location = useLocation();
  const { toast } = useToast();
  const initialSubject = location.state?.subject || "math";
  const [activeSubject, setActiveSubject] = useState(initialSubject);

  const handleStartLesson = (moduleId: string, lessonId: string, lessonTitle: string) => {
    toast({
      title: "Starting Lesson",
      description: `Loading "${lessonTitle}"...`,
    });
    // In a real app, this would navigate to the lesson content
  };

  const currentPath = learningPaths[activeSubject as keyof typeof learningPaths];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Learning Paths</h1>
          <p className="text-muted-foreground">
            Personalized learning journeys tailored to your pace and preferences.
          </p>
        </div>

        <Tabs defaultValue={activeSubject} className="w-full" onValueChange={(value) => setActiveSubject(value)}>
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="math">Mathematics</TabsTrigger>
            <TabsTrigger value="science">Science</TabsTrigger>
            <TabsTrigger value="english">English</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          {Object.entries(learningPaths).map(([subject, path]) => (
            <TabsContent key={subject} value={subject} className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{path.name}</CardTitle>
                      <CardDescription>{path.description}</CardDescription>
                    </div>
                    <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm font-medium">
                      {path.progress}% Complete
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={path.progress} className="h-2" />
                </CardContent>
              </Card>

              {path.modules.length > 0 ? (
                path.modules.map((module) => (
                  <Card key={module.id} className={module.locked ? "opacity-70" : ""}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                          {module.completed ? (
                            <div className="bg-green-100 p-2 rounded-full">
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                          ) : module.locked ? (
                            <div className="bg-gray-100 p-2 rounded-full">
                              <Lock className="h-5 w-5 text-gray-400" />
                            </div>
                          ) : (
                            <div className="bg-blue-100 p-2 rounded-full">
                              <BookOpen className="h-5 w-5 text-blue-600" />
                            </div>
                          )}
                          <CardTitle>{module.title}</CardTitle>
                        </div>
                        <div className="bg-blue-50 px-3 py-1 rounded-full text-blue-700 text-sm font-medium">
                          {module.progress}% Complete
                        </div>
                      </div>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {module.lessons.map((lesson, index) => (
                          <div 
                            key={lesson.id} 
                            className={`flex justify-between items-center p-3 border rounded-lg ${
                              lesson.completed ? "bg-green-50 border-green-100" : "bg-white"
                            } ${module.locked ? "cursor-not-allowed" : "hover:bg-gray-50"}`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-xs font-medium">
                                {index + 1}
                              </div>
                              <div>
                                <p className="font-medium">{lesson.title}</p>
                                <div className="flex items-center text-sm text-gray-500">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {lesson.duration}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {lesson.completed ? (
                                <div className="flex items-center gap-1 text-green-600 text-sm">
                                  <CheckCircle className="h-4 w-4" />
                                  <span>Completed</span>
                                </div>
                              ) : (
                                <Button 
                                  size="sm"
                                  disabled={module.locked}
                                  onClick={() => handleStartLesson(module.id, lesson.id, lesson.title)}
                                >
                                  <PlayCircle className="h-4 w-4 mr-1" />
                                  Start
                                </Button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      {module.locked ? (
                        <div className="w-full text-center text-sm text-gray-500">
                          Complete the previous module to unlock
                        </div>
                      ) : module.completed ? (
                        <div className="w-full text-center text-sm text-green-600 font-medium">
                          Module Completed
                        </div>
                      ) : (
                        <Button variant="outline" className="w-full">
                          <BookOpenCheck className="mr-2 h-4 w-4" />
                          Continue Module
                        </Button>
                      )}
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="py-20 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No modules available yet</h3>
                  <p className="text-gray-500 max-w-sm mx-auto">
                    This learning path is still being developed. Come back soon for exciting content!
                  </p>
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="h-5 w-5 text-amber-500 mr-2" />
              Personalized Recommendations
            </CardTitle>
            <CardDescription>
              Based on your learning style and progress, we suggest these next steps:
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Try a visual approach</h3>
              <p className="text-sm text-gray-500 mb-4">
                We've noticed you learn better with visual aids. Try these interactive lessons on geometry.
              </p>
              <Button size="sm" className="w-full">View Interactive Geometry</Button>
            </div>
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium mb-2">Review weak areas</h3>
              <p className="text-sm text-gray-500 mb-4">
                Based on your quiz results, polynomials might need extra attention.
              </p>
              <Button size="sm" className="w-full">Revisit Polynomials</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default LearningPath;
