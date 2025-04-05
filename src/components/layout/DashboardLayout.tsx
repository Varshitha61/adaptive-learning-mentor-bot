
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BookOpen,
  MessageCircle,
  User,
  LineChart,
  FileQuestion,
  FileText,
  Menu,
  X,
  LogOut
} from "lucide-react";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard className="h-5 w-5" /> },
    { path: "/learning-path", label: "Learning Path", icon: <BookOpen className="h-5 w-5" /> },
    { path: "/tutor-chat", label: "Chat with Tutor", icon: <MessageCircle className="h-5 w-5" /> },
    { path: "/quiz", label: "Quizzes", icon: <FileQuestion className="h-5 w-5" /> },
    { path: "/progress", label: "Progress", icon: <LineChart className="h-5 w-5" /> },
    { path: "/resources", label: "Resources", icon: <FileText className="h-5 w-5" /> },
    { path: "/profile", label: "Profile", icon: <User className="h-5 w-5" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b bg-white">
        <Link to="/dashboard" className="font-bold text-xl text-indigo-600">AI Tutor</Link>
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Sidebar for desktop / Mobile Menu */}
      <div 
        className={`
          ${mobileMenuOpen ? 'block' : 'hidden'} 
          md:block md:w-64 bg-white border-r md:min-h-screen
        `}
      >
        <div className="p-4 hidden md:block">
          <Link to="/dashboard" className="font-bold text-xl text-indigo-600">AI Tutor</Link>
        </div>
        
        <div className="p-2">
          {currentUser && (
            <div className="flex items-center p-2 mb-4">
              <div className="h-9 w-9 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-700 font-semibold">
                {currentUser.name.charAt(0)}
              </div>
              <div className="ml-2 overflow-hidden">
                <p className="font-medium truncate">{currentUser.name}</p>
                <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === item.path
                    ? "bg-indigo-50 text-indigo-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span className="ml-3">{item.label}</span>
              </Link>
            ))}
            
            <Button 
              variant="ghost" 
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50" 
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Logout
            </Button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
