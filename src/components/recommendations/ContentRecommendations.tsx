
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Video, FileText, Lightbulb } from 'lucide-react';

// Sample recommendation data
const recommendedContent = [
  {
    id: '1',
    type: 'video',
    title: 'Understanding Quantum Mechanics',
    description: 'A comprehensive introduction to the basics of quantum physics.',
    duration: '18 min',
    source: 'Physics Academy',
    relevance: 'Based on your interest in advanced physics',
  },
  {
    id: '2',
    type: 'article',
    title: 'The Art of Mathematical Proofs',
    description: 'Learn the techniques for constructing elegant mathematical proofs.',
    readTime: '12 min',
    source: 'MathWorld Journal',
    relevance: 'Recommended for your calculus course',
  },
  {
    id: '3',
    type: 'course',
    title: 'Advanced Data Structures',
    description: 'Master complex data structures for efficient algorithm design.',
    modules: 8,
    source: 'Computer Science Hub',
    relevance: 'Complements your programming studies',
  },
  {
    id: '4',
    type: 'quiz',
    title: 'World History: Renaissance Period',
    description: 'Test your knowledge of European Renaissance figures and events.',
    questions: 15,
    source: 'History Learning Center',
    relevance: 'Areas you need to strengthen based on your last quiz',
  },
];

const ContentRecommendations = () => {
  return (
    <Card className="w-full shadow-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">Recommended for You</h2>
            <p className="text-sm text-muted-foreground">Personalized content based on your learning patterns</p>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="mb-4">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="courses">Courses</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContent.map(item => (
                <RecommendationCard key={item.id} item={item} />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="videos">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContent
                .filter(item => item.type === 'video')
                .map(item => (
                  <RecommendationCard key={item.id} item={item} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="articles">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContent
                .filter(item => item.type === 'article')
                .map(item => (
                  <RecommendationCard key={item.id} item={item} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="courses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContent
                .filter(item => item.type === 'course')
                .map(item => (
                  <RecommendationCard key={item.id} item={item} />
                ))
              }
            </div>
          </TabsContent>
          
          <TabsContent value="quizzes">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendedContent
                .filter(item => item.type === 'quiz')
                .map(item => (
                  <RecommendationCard key={item.id} item={item} />
                ))
              }
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

interface RecommendationCardProps {
  item: {
    id: string;
    type: string;
    title: string;
    description: string;
    source: string;
    relevance: string;
    duration?: string;
    readTime?: string;
    modules?: number;
    questions?: number;
  };
}

const RecommendationCard: React.FC<RecommendationCardProps> = ({ item }) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="h-5 w-5 text-tutor-blue" />;
      case 'article':
        return <FileText className="h-5 w-5 text-tutor-purple" />;
      case 'course':
        return <BookOpen className="h-5 w-5 text-tutor-green" />;
      case 'quiz':
        return <Lightbulb className="h-5 w-5 text-tutor-teal" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getDetailText = (item: any) => {
    switch (item.type) {
      case 'video':
        return `${item.duration} • ${item.source}`;
      case 'article':
        return `${item.readTime} read • ${item.source}`;
      case 'course':
        return `${item.modules} modules • ${item.source}`;
      case 'quiz':
        return `${item.questions} questions • ${item.source}`;
      default:
        return item.source;
    }
  };

  return (
    <div className="recommendation-card animate-fade-in hover:border-primary/50 transition-colors">
      <div className="p-5">
        <div className="flex items-start space-x-4">
          <div className="mt-1">
            {getTypeIcon(item.type)}
          </div>
          <div className="flex-1">
            <h3 className="font-medium mb-1">{item.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{item.description}</p>
            <div className="flex flex-wrap items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {getDetailText(item)}
              </span>
              <Button variant="ghost" size="sm" className="h-7">
                View
              </Button>
            </div>
            <div className="mt-2">
              <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">
                {item.relevance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentRecommendations;
