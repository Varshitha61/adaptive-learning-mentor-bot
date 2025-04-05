
import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, BookOpen, Video, FileText, Clock, Bookmark, ExternalLink, ThumbsUp, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock resource data
const mockResources = [
  {
    id: "r1",
    title: "Understanding Algebraic Expressions",
    type: "article",
    subject: "Mathematics",
    level: "Beginner",
    duration: "10 min read",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    description: "Learn the basics of algebraic expressions and how to manipulate them effectively.",
    tags: ["algebra", "expressions", "fundamentals"],
  },
  {
    id: "r2",
    title: "Quadratic Equations Explained",
    type: "video",
    subject: "Mathematics",
    level: "Intermediate",
    duration: "15 min watch",
    thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb",
    description: "A comprehensive tutorial on solving quadratic equations through various methods.",
    tags: ["algebra", "quadratic", "equations"],
  },
  {
    id: "r3",
    title: "Introduction to Cell Biology",
    type: "video",
    subject: "Science",
    level: "Beginner",
    duration: "20 min watch",
    thumbnail: "https://images.unsplash.com/photo-1530973428-5bf2db2e4760",
    description: "Explore the fundamental concepts of cell structure and function in living organisms.",
    tags: ["biology", "cells", "science"],
  },
  {
    id: "r4",
    title: "DNA Structure and Replication",
    type: "article",
    subject: "Science",
    level: "Intermediate",
    duration: "15 min read",
    thumbnail: "https://images.unsplash.com/photo-1530973428-5bf2db2e4760",
    description: "Understand the double helix structure of DNA and how it replicates during cell division.",
    tags: ["biology", "DNA", "genetics"],
  },
  {
    id: "r5",
    title: "Shakespeare's Hamlet: Analysis",
    type: "document",
    subject: "English",
    level: "Advanced",
    duration: "30 min read",
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d",
    description: "A deep dive into the themes, characters, and literary devices in Shakespeare's Hamlet.",
    tags: ["literature", "shakespeare", "analysis"],
  },
  {
    id: "r6",
    title: "The Industrial Revolution",
    type: "document",
    subject: "History",
    level: "Intermediate",
    duration: "25 min read",
    thumbnail: "https://images.unsplash.com/photo-1533643593489-e2f3973cd728",
    description: "Explore the significant technological and social changes during the Industrial Revolution.",
    tags: ["history", "industrial", "revolution"],
  },
];

type ResourceType = "article" | "video" | "document";

const Resources = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [activeType, setActiveType] = useState<ResourceType | null>(null);
  const [activeLevel, setActiveLevel] = useState<string | null>(null);

  const filteredResources = mockResources.filter((resource) => {
    const matchesSearch =
      searchTerm === "" ||
      resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      resource.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesSubject = activeSubject === null || resource.subject === activeSubject;
    const matchesType = activeType === null || resource.type === activeType;
    const matchesLevel = activeLevel === null || resource.level === activeLevel;

    return matchesSearch && matchesSubject && matchesType && matchesLevel;
  });

  const getResourceTypeIcon = (type: string) => {
    switch (type) {
      case "article":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      case "document":
        return <BookOpen className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-blue-100 text-blue-800";
      case "Advanced":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleClearFilters = () => {
    setActiveSubject(null);
    setActiveType(null);
    setActiveLevel(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Learning Resources</h1>
          <p className="text-muted-foreground">
            Discover personalized educational content to enhance your learning experience.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Subject
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveSubject("Mathematics")}>Mathematics</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSubject("Science")}>Science</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSubject("English")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveSubject("History")}>History</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Type
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveType("article")}>Articles</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveType("video")}>Videos</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveType("document")}>Documents</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  Level
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setActiveLevel("Beginner")}>Beginner</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveLevel("Intermediate")}>Intermediate</DropdownMenuItem>
                <DropdownMenuItem onClick={() => setActiveLevel("Advanced")}>Advanced</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {(activeSubject || activeType || activeLevel) && (
              <Button variant="ghost" onClick={handleClearFilters}>
                Clear Filters
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters */}
        {(activeSubject || activeType || activeLevel) && (
          <div className="flex flex-wrap gap-2">
            {activeSubject && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                Subject: {activeSubject}
              </Badge>
            )}
            {activeType && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                Type: {activeType.charAt(0).toUpperCase() + activeType.slice(1)}
              </Badge>
            )}
            {activeLevel && (
              <Badge variant="secondary" className="flex items-center gap-1 px-3 py-1">
                Level: {activeLevel}
              </Badge>
            )}
          </div>
        )}

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="recommended">Recommended</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="space-y-6">
            {filteredResources.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredResources.map((resource) => (
                  <Card key={resource.id} className="overflow-hidden flex flex-col">
                    <CardHeader className="p-0">
                      <div className="h-40 bg-gray-200 relative">
                        <div className="absolute top-2 left-2 flex space-x-2">
                          <Badge className={getLevelColor(resource.level)}>
                            {resource.level}
                          </Badge>
                          <Badge variant="secondary" className="flex items-center gap-1">
                            {getResourceTypeIcon(resource.type)}
                            <span>{resource.type.charAt(0).toUpperCase() + resource.type.slice(1)}</span>
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1 pt-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline">{resource.subject}</Badge>
                        <div className="flex items-center text-sm text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {resource.duration}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg mb-2">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {resource.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mt-auto">
                        {resource.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="pt-0 flex justify-between">
                      <Button variant="outline" size="sm">
                        <Bookmark className="h-4 w-4 mr-1" />
                        Save
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-20 border rounded-lg bg-gray-50">
                <BookOpen className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No resources found</h3>
                <p className="text-gray-500 max-w-md mx-auto">
                  Try adjusting your search or filter criteria to find learning materials.
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="recommended">
            <Card>
              <CardHeader>
                <CardTitle>Personalized Recommendations</CardTitle>
                <CardDescription>
                  Resources tailored to your learning style and current progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {mockResources.slice(0, 3).map((resource) => (
                    <div key={resource.id} className="flex border rounded-lg overflow-hidden hover:border-primary">
                      <div className="w-24 h-24 bg-gray-200 flex-shrink-0"></div>
                      <div className="p-3 flex-1">
                        <div className="flex justify-between">
                          <Badge className={getLevelColor(resource.level)}>
                            {resource.level}
                          </Badge>
                          <div className="flex items-center text-gray-500 text-xs">
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            <span>98% match</span>
                          </div>
                        </div>
                        <h3 className="font-medium mt-1">{resource.title}</h3>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            {getResourceTypeIcon(resource.type)}
                            <span>{resource.duration}</span>
                          </div>
                          <Button size="sm" variant="ghost">View</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="saved">
            <div className="text-center py-20 border rounded-lg bg-gray-50">
              <Bookmark className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No saved resources yet</h3>
              <p className="text-gray-500 max-w-md mx-auto">
                Save resources by clicking the bookmark icon to access them later.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
};

export default Resources;
