import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Brain, 
  Mic, 
  Plus, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  TrendingUp,
  Calendar,
  Target,
  Zap,
  User,
  BarChart3
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import { useAuth } from "@/contexts/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const quickStats = [
    {
      title: "Tasks Today",
      value: "8",
      change: "+2 from yesterday",
      icon: CheckCircle2,
      color: "text-ai-success"
    },
    {
      title: "Completion Rate",
      value: "85%",
      change: "+12% this week",
      icon: Target,
      color: "text-ai-primary"
    },
    {
      title: "AI Suggestions",
      value: "12",
      change: "3 implemented",
      icon: Brain,
      color: "text-ai-accent"
    },
    {
      title: "Productivity Score",
      value: "92",
      change: "+5 this week",
      icon: TrendingUp,
      color: "text-ai-secondary"
    }
  ];

  const todayTasks = [
    {
      id: 1,
      title: "Review Q4 Budget Analysis",
      priority: "High",
      dueTime: "2:00 PM",
      completed: false,
      aiSuggestion: "Best tackled during your peak focus hours (2-4 PM)"
    },
    {
      id: 2,
      title: "Team standup meeting",
      priority: "Medium", 
      dueTime: "10:00 AM",
      completed: true,
      aiSuggestion: "Completed efficiently! Good job"
    },
    {
      id: 3,
      title: "Update project documentation",
      priority: "Low",
      dueTime: "End of day",
      completed: false,
      aiSuggestion: "Can be delegated to junior team member"
    }
  ];

  const aiInsights = [
    {
      type: "productivity",
      title: "Peak Performance Time",
      description: "You're most productive between 2-4 PM. Schedule important tasks during this window.",
      icon: Clock,
      color: "bg-blue-500/10 text-blue-600 border-blue-200"
    },
    {
      type: "workload",
      title: "Workload Balance",
      description: "You have 3 high-priority tasks today. Consider postponing 1 non-urgent item.",
      icon: AlertCircle,
      color: "bg-orange-500/10 text-orange-600 border-orange-200"
    },
    {
      type: "collaboration",
      title: "Team Dependency",
      description: "2 tasks are waiting for team input. Send follow-up reminders.",
      icon: User,
      color: "bg-purple-500/10 text-purple-600 border-purple-200"
    }
  ];

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              Good morning, {user?.displayName || 'there'}! 👋
            </h1>
            <p className="text-muted-foreground mt-1">
              You have 8 tasks today. AI suggests starting with high-priority items at 2 PM.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="gradient-ai text-white border-0">
              <Zap className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
        </div>

        {/* Quick Task Creation */}
        <Card className="gradient-card shadow-card border-0">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <Brain className="h-8 w-8 text-ai-primary animate-pulse-slow" />
              <div className="flex-1">
                <Input
                  placeholder="Tell me what you need to do... (e.g., 'Call client about proposal tomorrow at 3 PM')"
                  className="text-lg border-0 bg-transparent focus-visible:ring-0 placeholder:text-muted-foreground"
                />
              </div>
              <Button variant="floating" size="icon">
                <Mic className="h-4 w-4" />
              </Button>
              <Button variant="ai">
                <Plus className="h-4 w-4 mr-2" />
                Create Task
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-3 ml-12">
              AI will automatically set priority, deadline, and category based on your natural language input
            </p>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="gradient-card shadow-card border-0 hover:shadow-ai transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                    </div>
                    <div className={`p-3 rounded-lg bg-background ${stat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Tasks */}
          <div className="lg:col-span-2">
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <CheckCircle2 className="h-5 w-5 text-ai-primary" />
                      <span>Today's Tasks</span>
                    </CardTitle>
                    <CardDescription>AI-prioritized for optimal productivity</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Calendar className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {todayTasks.map((task) => (
                  <div key={task.id} className={`p-4 rounded-lg border ${task.completed ? 'bg-muted/50 opacity-75' : 'bg-background'} hover:shadow-card transition-smooth`}>
                    <div className="flex items-start space-x-3">
                      <button className="mt-1">
                        {task.completed ? (
                          <CheckCircle2 className="h-5 w-5 text-ai-success" />
                        ) : (
                          <div className="h-5 w-5 rounded-full border-2 border-muted-foreground hover:border-ai-primary transition-colors" />
                        )}
                      </button>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className={`font-medium ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                            {task.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant={task.priority === 'High' ? 'destructive' : task.priority === 'Medium' ? 'default' : 'secondary'}>
                              {task.priority}
                            </Badge>
                            <span className="text-sm text-muted-foreground">{task.dueTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1 text-xs text-ai-primary bg-ai-primary/10 rounded-md p-2">
                          <Brain className="h-3 w-3" />
                          <span>{task.aiSuggestion}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* AI Insights */}
          <div>
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-ai-accent animate-spin-slow" />
                  <span>AI Insights</span>
                </CardTitle>
                <CardDescription>Personalized productivity recommendations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {aiInsights.map((insight, index) => {
                  const Icon = insight.icon;
                  return (
                    <div key={index} className={`p-4 rounded-lg border ${insight.color}`}>
                      <div className="flex items-start space-x-3">
                        <Icon className="h-5 w-5 mt-1" />
                        <div>
                          <h4 className="font-medium mb-1">{insight.title}</h4>
                          <p className="text-sm opacity-80">{insight.description}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Weekly Progress */}
            <Card className="gradient-card shadow-card border-0 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-ai-secondary" />
                  <span>Weekly Progress</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Completed Tasks</span>
                      <span>28/35</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>AI Suggestions Used</span>
                      <span>12/15</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Productivity Score</span>
                      <span>92%</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;