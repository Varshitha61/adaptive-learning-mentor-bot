
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Brain, LineChart, MessageCircle } from "lucide-react";

export default function Index() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate("/dashboard");
    }
  }, [currentUser, navigate]);

  const features = [
    {
      icon: <Brain className="h-8 w-8 text-indigo-500" />,
      title: "Personalized Learning",
      description: "AI-powered learning paths tailored to your unique learning style and pace."
    },
    {
      icon: <MessageCircle className="h-8 w-8 text-indigo-500" />,
      title: "24/7 AI Tutor",
      description: "Get instant help with challenging topics whenever you need it."
    },
    {
      icon: <LineChart className="h-8 w-8 text-indigo-500" />,
      title: "Progress Tracking",
      description: "Visualize your learning journey with detailed analytics and insights."
    },
    {
      icon: <BookOpen className="h-8 w-8 text-indigo-500" />,
      title: "Rich Resources",
      description: "Access curated educational content based on your interests and goals."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Your Personal AI Tutor
          </h1>
          <p className="text-xl md:text-2xl mb-10 max-w-3xl mx-auto">
            Experience personalized learning powered by advanced AI that adapts to your unique learning style and pace.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-white text-indigo-600 hover:bg-gray-100"
              onClick={() => navigate("/register")}
            >
              Get Started
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-white text-white hover:bg-white hover:text-indigo-600"
              onClick={() => navigate("/login")}
            >
              Sign In
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose AI Tutor?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-none shadow-lg">
                <CardHeader>
                  <div className="mb-2">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to transform your learning experience?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of students who are already benefiting from personalized AI tutoring.
          </p>
          <Button 
            size="lg" 
            className="bg-indigo-600 hover:bg-indigo-700"
            onClick={() => navigate("/register")}
          >
            Start Learning Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 bg-gray-900 text-white mt-auto">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-sm">© 2025 AI Tutor. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
