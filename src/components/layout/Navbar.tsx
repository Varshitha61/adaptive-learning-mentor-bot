
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Bell } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Navbar = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        setUserName(user.name || 'Student');
      } catch (e) {
        setUserName('Student');
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
    navigate('/auth');
  };

  return (
    <header className="h-16 flex items-center justify-between px-4 md:px-6 border-b bg-white dark:bg-gray-900">
      <div>
        <h1 className="text-xl font-semibold">Welcome, {userName}</h1>
      </div>
      <div className="flex items-center space-x-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500"></span>
        </Button>
        <Button 
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="flex items-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
