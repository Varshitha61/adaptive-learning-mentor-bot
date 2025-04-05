
import AppLayout from '@/components/layout/AppLayout';
import AITutor from '@/components/tutor/AITutor';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Edit, FileQuestion, History, Star } from 'lucide-react';

const AITutorPage = () => {
  return (
    <AppLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">AI Tutor</h1>
          <p className="text-muted-foreground mt-1">
            Get personalized help, explanations, and practice exercises in real-time
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 h-[75vh]">
            <AITutor />
          </div>
          
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Learning Suggestions</CardTitle>
                <CardDescription>Topics to explore based on your recent activity</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="topics">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="topics">Topics</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="topics" className="space-y-4 mt-4">
                    <SuggestionItem 
                      title="Newton's Laws of Motion"
                      icon={<FileQuestion className="h-5 w-5 text-blue-500" />}
                      description="Based on your recent physics questions"
                    />
                    <SuggestionItem 
                      title="Polynomial Functions"
                      icon={<Edit className="h-5 w-5 text-purple-500" />}
                      description="Aligns with your math coursework"
                    />
                    <SuggestionItem 
                      title="Chemical Bonding"
                      icon={<BookOpen className="h-5 w-5 text-green-500" />}
                      description="Recommended for your chemistry progress"
                    />
                  </TabsContent>
                  
                  <TabsContent value="history" className="space-y-4 mt-4">
                    <HistoryItem 
                      title="Photosynthesis Process"
                      timestamp="Today, 10:23 AM"
                    />
                    <HistoryItem 
                      title="Solving Quadratic Equations"
                      timestamp="Yesterday, 3:45 PM"
                    />
                    <HistoryItem 
                      title="American Civil War Causes"
                      timestamp="Oct 3, 11:30 AM"
                    />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>AI Tutor Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted/40 rounded-lg p-4">
                  <h3 className="font-medium flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Be Specific
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ask targeted questions for more accurate responses.
                  </p>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <h3 className="font-medium flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Request Examples
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ask for practice problems to reinforce concepts.
                  </p>
                </div>
                
                <div className="bg-muted/40 rounded-lg p-4">
                  <h3 className="font-medium flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    Ask for Explanations
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    If you don't understand something, ask for simpler explanations.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

interface SuggestionItemProps {
  title: string;
  icon: React.ReactNode;
  description: string;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ title, icon, description }) => {
  return (
    <div className="flex items-center space-x-3 p-3 border rounded-lg hover:border-primary/50 hover:bg-muted/20 transition-colors cursor-pointer">
      <div className="bg-muted rounded-full p-2">
        {icon}
      </div>
      <div>
        <h4 className="font-medium">{title}</h4>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

interface HistoryItemProps {
  title: string;
  timestamp: string;
}

const HistoryItem: React.FC<HistoryItemProps> = ({ title, timestamp }) => {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg hover:border-primary/50 hover:bg-muted/20 transition-colors cursor-pointer">
      <div className="flex items-center space-x-3">
        <History className="h-4 w-4 text-muted-foreground" />
        <h4 className="font-medium">{title}</h4>
      </div>
      <span className="text-xs text-muted-foreground">{timestamp}</span>
    </div>
  );
};

export default AITutorPage;
