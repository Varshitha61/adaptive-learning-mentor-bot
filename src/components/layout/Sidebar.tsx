
import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  BookOpen, 
  MessageCircle, 
  BarChart2, 
  Settings, 
  ChevronLeft, 
  ChevronRight, 
  Lightbulb
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
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

  return (
    <aside 
      className={cn(
        "bg-white dark:bg-gray-900 border-r border-border transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b">
        {!collapsed && (
          <div className="flex items-center">
            <Lightbulb className="h-6 w-6 text-primary" />
            <span className="ml-2 font-semibold text-lg">EduMentor</span>
          </div>
        )}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setCollapsed(!collapsed)}
          className={cn("rounded-full", collapsed && "mx-auto")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      
      <div className="flex flex-col justify-between flex-1 overflow-y-auto">
        <nav className="flex-1 px-2 py-4 space-y-1">
          <SidebarLink to="/dashboard" icon={<Home />} label="Dashboard" collapsed={collapsed} />
          <SidebarLink to="/courses" icon={<BookOpen />} label="Courses" collapsed={collapsed} />
          <SidebarLink to="/ai-tutor" icon={<MessageCircle />} label="AI Tutor" collapsed={collapsed} />
          <SidebarLink to="/progress" icon={<BarChart2 />} label="My Progress" collapsed={collapsed} />
          <SidebarLink to="/settings" icon={<Settings />} label="Settings" collapsed={collapsed} />
        </nav>
        
        {!collapsed && (
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                {userName.charAt(0).toUpperCase()}
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">{userName}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Student</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

interface SidebarLinkProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
}

const SidebarLink = ({ to, icon, label, collapsed }: SidebarLinkProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => 
        cn(
          "flex items-center p-2 text-base font-medium rounded-lg transition-colors",
          isActive 
            ? "bg-primary/10 text-primary" 
            : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
          collapsed && "justify-center"
        )
      }
    >
      <span className="w-5 h-5">{icon}</span>
      {!collapsed && <span className="ml-3">{label}</span>}
    </NavLink>
  );
};

export default Sidebar;
