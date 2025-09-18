import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Calendar, 
  Clock, 
  Flag, 
  User, 
  CheckCircle2, 
  Circle,
  MoreHorizontal,
  Brain,
  Zap
} from "lucide-react";

const TaskPreview = () => {
  const sampleTasks = [
    {
      id: 1,
      title: "Review Q4 Budget Analysis",
      description: "Complete comprehensive review of quarterly financial data and prepare summary report",
      priority: "High",
      dueDate: "Today, 5:00 PM",
      category: "Finance",
      progress: 75,
      isCompleted: false,
      aiSuggestions: "Best time: 2-4 PM when you're most focused",
      estimatedTime: "2 hours"
    },
    {
      id: 2,
      title: "Team standup meeting",
      description: "Daily sync with development team to discuss progress and blockers",
      priority: "Medium",
      dueDate: "Tomorrow, 9:00 AM",
      category: "Meetings",
      progress: 0,
      isCompleted: false,
      aiSuggestions: "Prepare agenda 10 minutes before",
      estimatedTime: "30 minutes"
    },
    {
      id: 3,
      title: "Update project documentation",
      description: "Add new API endpoints and update integration guides",
      priority: "Low",
      dueDate: "This week",
      category: "Documentation",
      progress: 100,
      isCompleted: true,
      aiSuggestions: "Great work! This will help the team",
      estimatedTime: "1 hour"
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Intelligent Task Management
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See how AI transforms chaotic task lists into organized, prioritized workflows
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Kanban Board Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {/* To Do Column */}
            <Card className="p-4 gradient-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-muted-foreground">To Do</h3>
                <Badge variant="secondary">2</Badge>
              </div>
              <div className="space-y-3">
                {sampleTasks.filter(task => !task.isCompleted).slice(0, 2).map((task) => (
                  <Card key={task.id} className="p-4 bg-background border border-border hover:shadow-ai transition-smooth">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <Circle className="h-4 w-4 text-muted-foreground" />
                        <span className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`} />
                      </div>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <h4 className="font-medium mb-2 text-sm">{task.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>{task.dueDate}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {task.category}
                      </Badge>
                    </div>
                    
                    {/* AI Insights */}
                    <div className="flex items-center space-x-1 text-xs text-ai-primary bg-ai-primary/10 rounded-md p-2">
                      <Brain className="h-3 w-3" />
                      <span>{task.aiSuggestions}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>

            {/* In Progress Column */}
            <Card className="p-4 gradient-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-muted-foreground">In Progress</h3>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="space-y-3">
                <Card className="p-4 bg-background border border-ai-secondary/50 hover:shadow-glow transition-smooth">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-ai-secondary animate-pulse-slow" />
                      <span className="w-2 h-2 rounded-full bg-orange-500" />
                    </div>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </div>
                  
                  <h4 className="font-medium mb-2 text-sm">Review Q4 Budget Analysis</h4>
                  <p className="text-xs text-muted-foreground mb-3">
                    Complete comprehensive review of quarterly financial data...
                  </p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="gradient-ai h-2 rounded-full" style={{ width: '75%' }} />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>2 hours left</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Finance
                    </Badge>
                  </div>
                </Card>
              </div>
            </Card>

            {/* Done Column */}
            <Card className="p-4 gradient-card shadow-card">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-muted-foreground">Done</h3>
                <Badge variant="secondary">1</Badge>
              </div>
              <div className="space-y-3">
                {sampleTasks.filter(task => task.isCompleted).map((task) => (
                  <Card key={task.id} className="p-4 bg-background border border-ai-success/50 opacity-75">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle2 className="h-4 w-4 text-ai-success" />
                        <span className="w-2 h-2 rounded-full bg-ai-success" />
                      </div>
                      <Button variant="ghost" size="icon-sm">
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </div>
                    
                    <h4 className="font-medium mb-2 text-sm line-through">{task.title}</h4>
                    <p className="text-xs text-muted-foreground mb-3">
                      {task.description}
                    </p>
                    
                    <div className="flex items-center space-x-1 text-xs text-ai-success bg-ai-success/10 rounded-md p-2">
                      <CheckCircle2 className="h-3 w-3" />
                      <span>Completed! Great job!</span>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>

          {/* Features */}
          <div className="text-center">
            <Button variant="brain" size="xl" onClick={() => window.location.href = '/dashboard'}>
              Try Interactive Dashboard
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskPreview;