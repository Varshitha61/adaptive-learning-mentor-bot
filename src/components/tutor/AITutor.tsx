
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff, Loader2 } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'ai';
  content: string;
}

const SAMPLE_RESPONSES: { [key: string]: string } = {
  "hello": "Hi there! I'm your AI learning assistant. How can I help you today?",
  "help": "I'm here to help you learn! You can ask me questions about math, science, history, literature, and more. I can also provide practice problems and explanations.",
  "math": "I'd be happy to help with math! What topic are you studying? Algebra, calculus, geometry, or something else?",
  "science": "Science is fascinating! Are you interested in biology, chemistry, physics, or another branch of science?",
  "default": "Thanks for your question! Let me think about how to help you learn this concept effectively."
};

const AITutor = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'ai',
      content: "Hello! I'm your personal AI tutor. How can I help you learn today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (question: string) => {
    const lowerQuestion = question.toLowerCase();
    
    // Simple keyword matching for demo purposes
    if (lowerQuestion.includes('hello') || lowerQuestion.includes('hi')) {
      return SAMPLE_RESPONSES.hello;
    } else if (lowerQuestion.includes('help')) {
      return SAMPLE_RESPONSES.help;
    } else if (lowerQuestion.includes('math')) {
      return SAMPLE_RESPONSES.math;
    } else if (lowerQuestion.includes('science')) {
      return SAMPLE_RESPONSES.science;
    }
    
    return SAMPLE_RESPONSES.default;
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsProcessing(true);
    
    // Simulate AI response delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'ai',
        content: generateResponse(userMessage.content)
      };
      
      setMessages(prev => [...prev, aiMessage]);
      setIsProcessing(false);
    }, 1500);
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      // In a real implementation, this would start voice recording
      // and use speech-to-text to convert to input
      setTimeout(() => {
        setInput(prev => prev + "I need help understanding photosynthesis.");
        setIsRecording(false);
      }, 2000);
    }
  };

  return (
    <Card className="flex flex-col h-full shadow-sm border">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">AI Learning Tutor</h2>
        <p className="text-sm text-muted-foreground">Ask questions to get personalized help with your studies.</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={cn(
              "flex",
              message.role === 'user' ? 'justify-end' : 'justify-start'
            )}
          >
            <div
              className={cn(
                message.role === 'user' ? 'chat-message-user' : 'chat-message-ai'
              )}
            >
              {message.content}
            </div>
          </div>
        ))}
        
        {isProcessing && (
          <div className="flex justify-start">
            <div className="chat-message-ai typing-bubble">
              Thinking
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your studies..."
            className="flex-1 resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="flex flex-col space-y-2">
            <Button
              onClick={handleSendMessage}
              disabled={!input.trim() || isProcessing}
              size="icon"
            >
              {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
            <Button
              onClick={toggleRecording}
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Your AI tutor is here to help with any subject. Ask specific questions for better responses.
        </p>
      </div>
    </Card>
  );
};

export default AITutor;
