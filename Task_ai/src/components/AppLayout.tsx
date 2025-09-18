import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { 
  LayoutDashboard, 
  CheckSquare, 
  Calendar, 
  MessageSquare, 
  BarChart3, 
  Settings, 
  Bell,
  Search,
  User,
  LogOut,
  Menu,
  Brain,
  Mic,
  Globe,
  Plus,
  FileDown
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import taskflowLogo from "@/assets/taskflow-logo.png";
import ChatBot from "@/components/ChatBot";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { toast } = useToast();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Tasks', href: '/tasks', icon: CheckSquare },
    { name: 'Calendar', href: '/calendar', icon: Calendar },
    { name: 'AI Assistant', href: '/ai-assistant', icon: MessageSquare },
    { name: 'Reports', href: '/reports', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const isActive = (path: string) => location.pathname === path;

  const handleCreateTask = () => {
    navigate('/tasks');
    toast({
      title: "Create new task",
      description: "You can now create a new task",
    });
  };

  const handleDownloadCSV = () => {
    // In a real app, this would call an API endpoint
    const csvContent = "id,title,status,priority,dueDate\n1,Task 1,In Progress,High,2023-05-15\n2,Task 2,Completed,Medium,2023-05-10";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'tasks-report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Report downloaded",
      description: "Your tasks report has been downloaded as CSV",
    });
  };

  const handleSignOut = async () => {
    try {
      await logout();
      navigate('/auth/login');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to sign out. Please try again."
      });
    }
    // In a real app, this would call an API endpoint to sign out
    navigate('/login');
    toast({
      title: "Signed out",
      description: "You have been signed out successfully",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border">
        {/* Logo */}
        <div className="flex items-center space-x-3 p-6 border-b border-border">
          <img src={taskflowLogo} alt="TaskFlow AI" className="h-8 w-8 animate-pulse-slow" />
          <div>
            <h1 className="text-lg font-bold gradient-ai bg-clip-text text-transparent">
              TaskFlow AI
            </h1>
            <p className="text-xs text-muted-foreground">Plan Smart, Act Fast</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-6 space-y-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-smooth ${
                  isActive(item.href)
                    ? 'gradient-ai text-white shadow-ai'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.name}</span>
              </Link>
            );
          })}
          
          {/* Create Task Button */}
          <Button 
            onClick={handleCreateTask}
            className="w-full mt-4 gradient-ai"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Task
          </Button>
          
          {/* Download CSV Button */}
          <Button 
            onClick={handleDownloadCSV}
            variant="outline"
            className="w-full mt-2"
          >
            <FileDown className="h-4 w-4 mr-2" />
            Download CSV
          </Button>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-card">
          <div className="space-y-3">
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full justify-start"
              onClick={() => navigate('/settings')}
            >
              <User className="h-4 w-4 mr-2" />
              {user?.displayName || user?.email || 'User Profile'}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-muted-foreground"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="pl-64">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-background/80 backdrop-blur-md border-b border-border">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
              
              {/* Search */}
              <div className="relative w-96">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search tasks, projects, or ask AI..."
                  className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg border-0 focus:ring-2 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center space-x-3">
              {/* Voice Input */}
              <Button 
                variant="smart" 
                size="sm"
                onClick={handleCreateTask}
              >
                <Mic className="h-4 w-4 mr-2" />
                Voice Task
              </Button>

              {/* Language */}
              <Button variant="ghost" size="icon">
                <Globe className="h-4 w-4" />
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </Button>

              {/* AI Insights */}
              <Button variant="ai" size="sm">
                <Brain className="h-4 w-4 mr-2" />
                AI Insights
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>

      {/* Floating Chatbot */}
      <ChatBot />
    </div>
  );
};

export default AppLayout;