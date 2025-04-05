
import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, ArrowRight, AlertCircle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOption: string;
  explanation: string;
}

// Sample quiz data
const sampleQuiz: QuizQuestion[] = [
  {
    id: '1',
    question: 'What is the primary function of photosynthesis?',
    options: [
      { id: 'a', text: 'To produce oxygen only' },
      { id: 'b', text: 'To convert light energy into chemical energy' },
      { id: 'c', text: 'To break down glucose for energy' },
      { id: 'd', text: 'To remove carbon dioxide from the atmosphere' },
    ],
    correctOption: 'b',
    explanation: 'Photosynthesis is the process by which green plants and certain other organisms convert light energy into chemical energy. During photosynthesis, plants capture light energy and use it to convert water, carbon dioxide, and minerals into oxygen and energy-rich organic compounds.',
  },
  {
    id: '2',
    question: 'Which of the following is a solution to the quadratic equation x² + 5x + 6 = 0?',
    options: [
      { id: 'a', text: 'x = -2 and x = -3' },
      { id: 'b', text: 'x = 2 and x = 3' },
      { id: 'c', text: 'x = -2 and x = 3' },
      { id: 'd', text: 'x = 2 and x = -3' },
    ],
    correctOption: 'a',
    explanation: 'To solve x² + 5x + 6 = 0, we can factor the expression as (x + 2)(x + 3) = 0. Setting each factor equal to zero gives us x = -2 and x = -3.',
  },
  {
    id: '3',
    question: 'Which of these elements is a noble gas?',
    options: [
      { id: 'a', text: 'Sodium (Na)' },
      { id: 'b', text: 'Chlorine (Cl)' },
      { id: 'c', text: 'Argon (Ar)' },
      { id: 'd', text: 'Magnesium (Mg)' },
    ],
    correctOption: 'c',
    explanation: 'Noble gases are a group of chemical elements with similar properties. They are all odorless, colorless, monatomic gases with very low chemical reactivity. The six noble gases are helium (He), neon (Ne), argon (Ar), krypton (Kr), xenon (Xe), and radon (Rn).',
  },
];

const Quiz = () => {
  const { toast } = useToast();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  
  const currentQuestion = sampleQuiz[currentQuestionIndex];
  
  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOption(optionId);
    }
  };
  
  const handleSubmitAnswer = () => {
    if (!selectedOption) {
      toast({
        title: "Please select an answer",
        description: "You need to choose an option before submitting.",
        variant: "destructive",
      });
      return;
    }
    
    setIsAnswerSubmitted(true);
    
    if (selectedOption === currentQuestion.correctOption) {
      setScore(score + 1);
    }
  };
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < sampleQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsAnswerSubmitted(false);
    } else {
      setQuizCompleted(true);
    }
  };
  
  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizCompleted(false);
  };
  
  if (quizCompleted) {
    return (
      <Card className="w-full shadow-sm animate-fade-in">
        <CardHeader className="text-center">
          <CardTitle>Quiz Completed!</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center space-y-4">
          <div className="text-7xl font-bold mb-2">{score}/{sampleQuiz.length}</div>
          <p className="text-xl font-medium">
            {score === sampleQuiz.length 
              ? "Perfect score! Excellent work!" 
              : score >= Math.floor(sampleQuiz.length / 2) 
                ? "Good job! Keep learning." 
                : "Keep practicing to improve your score."}
          </p>
          <div className="w-full max-w-md bg-muted/30 rounded-full h-4 mt-4">
            <div 
              className="bg-primary h-4 rounded-full transition-all duration-1000" 
              style={{ width: `${(score / sampleQuiz.length) * 100}%` }}
            ></div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={handleRestartQuiz}>Restart Quiz</Button>
        </CardFooter>
      </Card>
    );
  }
  
  return (
    <Card className="w-full shadow-sm">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Knowledge Check</CardTitle>
          <div className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {sampleQuiz.length}
          </div>
        </div>
        <div className="w-full bg-muted/30 h-1 mt-2">
          <div 
            className="bg-primary h-1 transition-all duration-300" 
            style={{ width: `${((currentQuestionIndex) / sampleQuiz.length) * 100}%` }}
          ></div>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <h3 className="text-lg font-medium">{currentQuestion.question}</h3>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option) => (
            <div
              key={option.id}
              className={cn(
                "quiz-option cursor-pointer",
                selectedOption === option.id && "selected",
                isAnswerSubmitted && option.id === currentQuestion.correctOption && "correct",
                isAnswerSubmitted && 
                  selectedOption === option.id && 
                  selectedOption !== currentQuestion.correctOption && 
                  "incorrect"
              )}
              onClick={() => handleOptionSelect(option.id)}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="w-6 h-6 flex items-center justify-center rounded-full border mr-3 text-sm font-medium">
                    {option.id.toUpperCase()}
                  </div>
                  <span>{option.text}</span>
                </div>
                
                {isAnswerSubmitted && option.id === currentQuestion.correctOption && (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                )}
                
                {isAnswerSubmitted && 
                  selectedOption === option.id && 
                  selectedOption !== currentQuestion.correctOption && (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
              </div>
            </div>
          ))}
        </div>
        
        {isAnswerSubmitted && (
          <div className="bg-muted/40 p-4 rounded-lg border-l-4 border-primary animate-fade-in">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <h4 className="font-medium">Explanation:</h4>
                <p className="text-sm text-muted-foreground mt-1">{currentQuestion.explanation}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!isAnswerSubmitted ? (
          <Button onClick={handleSubmitAnswer} disabled={!selectedOption}>
            Submit Answer
          </Button>
        ) : (
          <Button onClick={handleNextQuestion} className="flex items-center">
            {currentQuestionIndex < sampleQuiz.length - 1 ? "Next Question" : "See Results"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default Quiz;
