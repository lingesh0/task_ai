import { Button } from "@/components/ui/button";
import { Menu, Globe, Moon, Sun, Mic, MessageSquare } from "lucide-react";
import taskflowLogo from "@/assets/taskflow-logo.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <img src={taskflowLogo} alt="TaskFlow AI" className="h-10 w-10 animate-pulse-slow" />
          <div>
            <h1 className="text-xl font-bold gradient-ai bg-clip-text text-transparent">
              TaskFlow AI
            </h1>
            <p className="text-xs text-muted-foreground">Plan Smart, Act Fast</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="/#features" className="text-sm hover:text-primary transition-smooth">Features</a>
          <a href="/dashboard" className="text-sm hover:text-primary transition-smooth">Dashboard</a>
          <a href="/ai-assistant" className="text-sm hover:text-primary transition-smooth">AI Assistant</a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-3">
          {/* Language Selector */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Globe className="h-4 w-4" />
          </Button>
          
          {/* Theme Toggle */}
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>

          {/* Voice Input */}
          <Button variant="smart" size="sm" className="hidden md:flex">
            <Mic className="h-4 w-4" />
            Voice Task
          </Button>

          {/* Get Started */}
          <Button variant="ai" size="sm" onClick={() => window.location.href = '/signup'}>
            Get Started
          </Button>

          {/* Mobile Menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;