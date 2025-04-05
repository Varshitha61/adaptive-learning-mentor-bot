
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";
import { CheckCircle, XCircle, Clock, ArrowRight, Flag, Loader2 } from "lucide-react";

// Mock quiz data
const mockQuizzes = [
  {
    id: "q1",
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    questions: [
      {
        id: "q1_1",
        text: "What is the solution to the equation 2x + 5 = 15?",
        options: [
          { id: "a", text: "x = 5" },
          { id: "b", text: "x = 10" },
          { id: "c", text: "x = 15" },
          { id: "d", text: "x = 20" },
        ],
        correctAnswer: "a",
      },
      {
        id: "q1_2",
        text: "If f(x) = 3x² + 2x - 1, what is f(2)?",
        options: [
          { id: "a", text: "9" },
          { id: "b", text: "11" },
          { id: "c", text: "15" },
          { id: "d", text: "17" },
        ],
        correctAnswer: "c",
      },
      {
        id: "q1_3",
        text: "Simplify the expression: 3(2x - 4) + 5x",
        options: [
          { id: "a", text: "6x - 12 + 5x" },
          { id: "b", text: "11x - 12" },
          { id: "c", text: "11x + 12" },
          { id: "d", text: "6x + 5x - 12" },
        ],
        correctAnswer: "b",
      },
    ],
  },
  {
    id: "q2",
    title: "Cell Biology",
    subject: "Science",
    questions: [
      {
        id: "q2_1",
        text: "Which organelle is responsible for protein synthesis in a cell?",
        options: [
          { id: "a", text: "Nucleus" },
          { id: "b", text: "Mitochondria" },
          { id: "c", text: "Ribosome" },
          { id: "d", text: "Golgi apparatus" },
        ],
        correctAnswer: "c",
      },
      {
        id: "q2_2",
        text: "What is the primary function of mitochondria in a cell?",
        options: [
          { id: "a", text: "Protein synthesis" },
          { id: "b", text: "Energy production" },
          { id: "c", text: "Waste removal" },
          { id: "d", text: "DNA storage" },
        ],
        correctAnswer: "b",
      },
    ],
  },
];

const Quiz = () => {
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(300); // 5 minutes in seconds
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const activeQuiz = activeQuizId ? mockQuizzes.find(quiz => quiz.id === activeQuizId) : null;
  const currentQuestion = activeQuiz?.questions[currentQuestionIndex];

  const handleSelectQuiz = (quizId: string) => {
    setIsLoading(true);
    // Simulate loading quiz data
    setTimeout(() => {
      setActiveQuizId(quizId);
      setCurrentQuestionIndex(0);
      setAnswers({});
      setQuizCompleted(false);
      setTimeRemaining(300);
      setIsLoading(false);
    }, 1000);
  };

  const handleSelectAnswer = (questionId: string, answerId: string) => {
    setAnswers(prev => ({ ...prev, [questionId]: answerId }));
  };

  const handleNextQuestion = () => {
    if (!activeQuiz) return;
    
    if (currentQuestionIndex < activeQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleSubmitQuiz = () => {
    toast({
      title: "Quiz Submitted",
      description: "Your quiz has been submitted successfully!",
    });
    setActiveQuizId(null);
  };

  const handleFlagQuestion = () => {
    toast({
      title: "Question Flagged",
      description: "This question has been flagged for review later.",
    });
  };

  const calculateScore = () => {
    if (!activeQuiz) return 0;
    
    let correctCount = 0;
    activeQuiz.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        correctCount++;
      }
    });
    
    return (correctCount / activeQuiz.questions.length) * 100;
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Quizzes & Assessments</h1>
          <p className="text-muted-foreground">
            Test your knowledge and track your progress with interactive quizzes.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-lg">Loading quiz...</span>
          </div>
        ) : !activeQuizId ? (
          // Quiz Selection Screen
          <div className="grid gap-6 md:grid-cols-2">
            {mockQuizzes.map(quiz => (
              <Card key={quiz.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => handleSelectQuiz(quiz.id)}>
                <CardHeader>
                  <CardTitle>{quiz.title}</CardTitle>
                  <CardDescription>{quiz.subject}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm mb-4">
                    <span>{quiz.questions.length} Questions</span>
                    <span>Estimated time: {quiz.questions.length * 2} mins</span>
                  </div>
                  <Button className="w-full">Start Quiz</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : quizCompleted ? (
          // Quiz Results Screen
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto rounded-full bg-green-100 p-3 w-16 h-16 flex items-center justify-center mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Quiz Completed!</CardTitle>
              <CardDescription>
                You've completed the {activeQuiz?.title} quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-5xl font-bold mb-2">{Math.round(calculateScore())}%</div>
                <p className="text-muted-foreground">
                  You answered {Object.values(answers).filter((answer, index) => 
                    answer === activeQuiz?.questions[index].correctAnswer
                  ).length} out of {activeQuiz?.questions.length} questions correctly
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-semibold">Question Summary</h3>
                {activeQuiz?.questions.map((question, index) => (
                  <div key={question.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Question {index + 1}</span>
                      {answers[question.id] === question.correctAnswer ? (
                        <div className="flex items-center text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          <span>Correct</span>
                        </div>
                      ) : (
                        <div className="flex items-center text-red-600">
                          <XCircle className="h-4 w-4 mr-1" />
                          <span>Incorrect</span>
                        </div>
                      )}
                    </div>
                    <p className="mb-2">{question.text}</p>
                    <div className="text-sm">
                      <p>Your answer: {question.options.find(opt => opt.id === answers[question.id])?.text || "Not answered"}</p>
                      <p className="font-medium text-green-700">
                        Correct answer: {question.options.find(opt => opt.id === question.correctAnswer)?.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setActiveQuizId(null)}>
                Return to Quizzes
              </Button>
              <Button onClick={handleSubmitQuiz}>
                Save Results
              </Button>
            </CardFooter>
          </Card>
        ) : (
          // Active Quiz Screen
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>{activeQuiz?.title}</CardTitle>
                  <CardDescription>
                    Question {currentQuestionIndex + 1} of {activeQuiz?.questions.length}
                  </CardDescription>
                </div>
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                  <Clock className="h-4 w-4" />
                  <span>{formatTime(timeRemaining)}</span>
                </div>
              </div>
              <div className="mt-2">
                <Progress
                  value={((currentQuestionIndex + 1) / (activeQuiz?.questions.length || 1)) * 100}
                  className="h-2"
                />
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">{currentQuestion?.text}</h3>
                <RadioGroup
                  value={answers[currentQuestion?.id || ""] || ""}
                  onValueChange={(value) => currentQuestion && handleSelectAnswer(currentQuestion.id, value)}
                >
                  {currentQuestion?.options.map(option => (
                    <div key={option.id} className="flex items-center space-x-2 p-3 border rounded-md hover:bg-gray-50 cursor-pointer">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="cursor-pointer flex-1">
                        {option.text}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="ghost" size="sm" onClick={handleFlagQuestion}>
                <Flag className="mr-2 h-4 w-4" />
                Flag for review
              </Button>
              <Button 
                onClick={handleNextQuestion} 
                disabled={!answers[currentQuestion?.id || ""]}
              >
                {currentQuestionIndex < (activeQuiz?.questions.length || 0) - 1 ? (
                  <>
                    Next Question
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                ) : (
                  "Complete Quiz"
                )}
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Quiz;
