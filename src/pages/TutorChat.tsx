
import { useState, useRef, useEffect } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Send, Bot, User, Sparkles, Plus, Mic, Square } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

type MessageType = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const suggestedQuestions = [
  "Explain the concept of photosynthesis",
  "Help me solve this quadratic equation: 2x² + 5x - 3 = 0",
  "What are the key themes in Shakespeare's Hamlet?",
  "How do I calculate the area of a circle?",
];

const TutorChat = () => {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<MessageType[]>([
    {
      id: '1',
      content: `Hello ${currentUser?.name || 'there'}! I'm your AI tutor. How can I help you with your studies today?`,
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMessage: MessageType = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputValue);
      const aiMessage: MessageType = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Mock AI response generator - would be replaced by actual API call
  const generateAIResponse = (userInput: string): string => {
    const lowerInput = userInput.toLowerCase();
    
    if (lowerInput.includes("photosynthesis")) {
      return "Photosynthesis is the process by which green plants, algae, and some bacteria convert light energy, usually from the sun, into chemical energy in the form of glucose. The process occurs in the chloroplasts of plant cells and involves chlorophyll, which captures light energy. The basic equation is: 6CO₂ + 6H₂O + light energy → C₆H₁₂O₆ (glucose) + 6O₂";
    }
    
    if (lowerInput.includes("quadratic") || lowerInput.includes("equation")) {
      return "To solve a quadratic equation like 2x² + 5x - 3 = 0, you can use the quadratic formula: x = (-b ± √(b² - 4ac)) / 2a. In this case, a = 2, b = 5, and c = -3.\n\nCalculating:\nx = (-5 ± √(25 - 4(2)(-3))) / (2(2))\nx = (-5 ± √(25 + 24)) / 4\nx = (-5 ± √49) / 4\nx = (-5 ± 7) / 4\n\nThis gives us two solutions:\nx₁ = (-5 + 7) / 4 = 2 / 4 = 0.5\nx₂ = (-5 - 7) / 4 = -12 / 4 = -3";
    }
    
    if (lowerInput.includes("hamlet") || lowerInput.includes("shakespeare")) {
      return "Key themes in Shakespeare's Hamlet include:\n1. Revenge - Hamlet's quest to avenge his father's murder\n2. Appearance vs. Reality - The contrast between what seems to be and what is\n3. Madness - Real and feigned mental illness\n4. Corruption and Decay - The rottenness in Denmark and moral corruption\n5. Death and Mortality - Contemplation of suicide, the afterlife, and the physical reality of death\n6. Action vs. Inaction - Hamlet's delay in fulfilling his revenge";
    }
    
    if (lowerInput.includes("circle") && lowerInput.includes("area")) {
      return "To calculate the area of a circle, you use the formula: Area = πr², where r is the radius of the circle. For example, if you have a circle with radius 5 cm, the area would be: Area = π × 5² = π × 25 = 78.54 cm²";
    }
    
    return "That's an interesting question. To provide you with the most accurate response, I'd need to access additional educational resources. In a fully implemented version, I would connect to a knowledge base to give you a detailed explanation. How else can I help with your studies today?";
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    setInputValue(question);
    // Optional: Automatically send the question
    // setInputValue("");
    // const userMessage = { id: Date.now().toString(), content: question, sender: 'user', timestamp: new Date() };
    // setMessages((prev) => [...prev, userMessage]);
    // ... rest of send logic
  };

  const toggleVoiceRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      toast({
        title: "Voice recording stopped",
        description: "Your message is being processed...",
      });
      
      // Simulate voice recognition result
      setTimeout(() => {
        const recognizedText = "Can you explain the law of conservation of energy?";
        setInputValue(recognizedText);
      }, 1000);
    } else {
      setIsRecording(true);
      toast({
        title: "Voice recording started",
        description: "Speak clearly into your microphone...",
      });
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-[calc(100vh-120px)]">
        <h1 className="text-2xl font-bold mb-6">Chat with Your AI Tutor</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 flex-1">
          {/* Main Chat Area */}
          <Card className="md:col-span-3 flex flex-col">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl">Learning Assistant</CardTitle>
            </CardHeader>
            
            <CardContent className="flex-1 overflow-y-auto pb-2">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex",
                      message.sender === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div
                      className={cn(
                        "max-w-[80%] rounded-lg p-4",
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-900",
                        "flex"
                      )}
                    >
                      {message.sender === "ai" && (
                        <Bot className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                      )}
                      <div className="whitespace-pre-wrap">{message.content}</div>
                      {message.sender === "user" && (
                        <User className="h-5 w-5 ml-2 flex-shrink-0 mt-0.5" />
                      )}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-4 flex items-center">
                      <Bot className="h-5 w-5 mr-2" />
                      <span className="animate-pulse">Typing...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            </CardContent>
            
            <div className="p-4 border-t">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex space-x-2"
              >
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  onClick={toggleVoiceRecording}
                  className={isRecording ? "bg-red-100 text-red-500" : ""}
                >
                  {isRecording ? <Square className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                </Button>
                <Input
                  placeholder="Ask any study question..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={isTyping}
                  className="flex-1"
                />
                <Button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </Card>
          
          {/* Sidebar with suggestions */}
          <div className="hidden md:block">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg flex items-center">
                  <Sparkles className="h-4 w-4 mr-2 text-amber-500" />
                  Suggested Questions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="w-full justify-start h-auto py-2 px-3 text-left font-normal text-sm"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      {question}
                    </Button>
                  ))}
                </div>
                <Button
                  className="w-full mt-4"
                  variant="ghost"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  More Topics
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default TutorChat;
