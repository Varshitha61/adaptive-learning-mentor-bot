
import { useState } from 'react';
import AppLayout from '@/components/layout/AppLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Clock, PlayCircle, Award, Filter, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

// Sample course data
const courses = [
  {
    id: '1',
    title: 'Introduction to Calculus',
    description: 'Learn the fundamentals of calculus, including limits, derivatives, and integrals.',
    category: 'Mathematics',
    level: 'Intermediate',
    duration: '8 hours',
    enrolled: true,
    progress: 45,
    image: 'https://source.unsplash.com/random/400x200/?math',
  },
  {
    id: '2',
    title: 'Basic Physics Principles',
    description: 'Understand the core concepts of classical physics, including mechanics and thermodynamics.',
    category: 'Physics',
    level: 'Beginner',
    duration: '12 hours',
    enrolled: true,
    progress: 70,
    image: 'https://source.unsplash.com/random/400x200/?physics',
  },
  {
    id: '3',
    title: 'Organic Chemistry',
    description: 'Explore the fascinating world of organic compounds and their reactions.',
    category: 'Chemistry',
    level: 'Advanced',
    duration: '15 hours',
    enrolled: false,
    progress: 0,
    image: 'https://source.unsplash.com/random/400x200/?chemistry',
  },
  {
    id: '4',
    title: 'World History: Ancient Civilizations',
    description: 'Journey through the great ancient civilizations and their contributions to human development.',
    category: 'History',
    level: 'Beginner',
    duration: '10 hours',
    enrolled: false,
    progress: 0,
    image: 'https://source.unsplash.com/random/400x200/?history',
  },
  {
    id: '5',
    title: 'English Literature Classics',
    description: 'Analyze and appreciate the most influential works of English literature.',
    category: 'Literature',
    level: 'Intermediate',
    duration: '14 hours',
    enrolled: true,
    progress: 20,
    image: 'https://source.unsplash.com/random/400x200/?books',
  },
  {
    id: '6',
    title: 'Advanced Data Structures',
    description: 'Master complex data structures essential for efficient algorithm design and implementation.',
    category: 'Computer Science',
    level: 'Advanced',
    duration: '16 hours',
    enrolled: false,
    progress: 0,
    image: 'https://source.unsplash.com/random/400x200/?coding',
  },
];

const CoursesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const enrolledCourses = courses.filter(course => course.enrolled);
  const availableCourses = courses.filter(course => !course.enrolled);
  const filteredEnrolledCourses = enrolledCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredAvailableCourses = availableCourses.filter(
    course => course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
             course.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  return (
    <AppLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold">Courses</h1>
            <p className="text-muted-foreground">
              Explore and manage your learning courses
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="relative max-w-md w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="flex items-center w-full md:w-auto">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
        </div>
        
        <Tabs defaultValue="enrolled">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="enrolled">My Courses</TabsTrigger>
            <TabsTrigger value="available">Available Courses</TabsTrigger>
          </TabsList>
          
          <TabsContent value="enrolled">
            {filteredEnrolledCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredEnrolledCourses.map(course => (
                  <CourseCard key={course.id} course={course} enrolled />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg mt-6">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm ? 'Try a different search term' : 'You haven\'t enrolled in any courses yet'}
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="available">
            {filteredAvailableCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {filteredAvailableCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 text-center border rounded-lg mt-6">
                <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No courses found</h3>
                <p className="text-muted-foreground mt-1">
                  {searchTerm ? 'Try a different search term' : 'No available courses at the moment'}
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

interface CourseCardProps {
  course: {
    id: string;
    title: string;
    description: string;
    category: string;
    level: string;
    duration: string;
    enrolled: boolean;
    progress: number;
    image: string;
  };
  enrolled?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, enrolled = false }) => {
  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        {/* This would normally be an actual image, using placeholder for demo */}
        <div 
          className="w-full h-full bg-muted bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${course.image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        <Badge className="absolute top-2 right-2 bg-white text-primary">
          {course.category}
        </Badge>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{course.title}</CardTitle>
        </div>
        <CardDescription>{course.description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center">
            <Award className="h-4 w-4 mr-1" />
            <span>{course.level}</span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration}</span>
          </div>
        </div>
        
        {enrolled && course.progress > 0 && (
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{course.progress}% Complete</span>
            </div>
            <div className="w-full bg-muted h-2 rounded-full">
              <div 
                className="bg-primary h-2 rounded-full"
                style={{ width: `${course.progress}%` }}
              />
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {enrolled ? (
          <Button className="w-full" size="sm">
            <PlayCircle className="mr-2 h-4 w-4" />
            {course.progress > 0 ? 'Continue Learning' : 'Start Learning'}
          </Button>
        ) : (
          <Button variant="outline" className="w-full" size="sm">
            Enroll Now
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CoursesPage;
