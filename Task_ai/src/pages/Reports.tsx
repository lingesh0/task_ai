import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Download, 
  Calendar,
  Clock,
  Target,
  Brain,
  CheckCircle2,
  AlertCircle,
  Users,
  Zap,
  FileText,
  Mail
} from "lucide-react";
import AppLayout from "@/components/AppLayout";

const Reports = () => {
  const weeklyStats = [
    { day: 'Mon', completed: 8, created: 10 },
    { day: 'Tue', completed: 12, created: 15 },
    { day: 'Wed', completed: 6, created: 8 },
    { day: 'Thu', completed: 15, created: 18 },
    { day: 'Fri', completed: 10, created: 12 },
    { day: 'Sat', completed: 4, created: 5 },
    { day: 'Sun', completed: 2, created: 3 }
  ];

  const productivityInsights = [
    {
      title: "Peak Performance Hours",
      value: "2:00 PM - 4:00 PM",
      description: "You complete 40% more tasks during this window",
      trend: "up",
      icon: Clock,
      color: "text-ai-success"
    },
    {
      title: "Average Task Completion Time",
      value: "2.3 hours",
      description: "15% faster than last month",
      trend: "up",
      icon: Target,
      color: "text-ai-primary"
    },
    {
      title: "Focus Score",
      value: "87%",
      description: "Based on task switching patterns",
      trend: "up",
      icon: Brain,
      color: "text-ai-accent"
    },
    {
      title: "Deadline Success Rate",
      value: "92%",
      description: "3% improvement this month",
      trend: "up",
      icon: CheckCircle2,
      color: "text-ai-secondary"
    }
  ];

  const taskCategories = [
    { name: "Development", completed: 45, total: 52, color: "bg-blue-500" },
    { name: "Meetings", completed: 28, total: 30, color: "bg-green-500" },
    { name: "Design", completed: 18, total: 25, color: "bg-purple-500" },
    { name: "Documentation", completed: 12, total: 15, color: "bg-orange-500" },
    { name: "Planning", completed: 8, total: 10, color: "bg-pink-500" }
  ];

  const aiRecommendations = [
    {
      title: "Optimize Meeting Schedule",
      description: "Consider consolidating your Tuesday meetings to create a 3-hour focus block",
      impact: "High",
      icon: Calendar,
      color: "border-ai-warning bg-ai-warning/5"
    },
    {
      title: "Delegate Documentation Tasks",
      description: "You have 7 documentation tasks that could be delegated to team members",
      impact: "Medium",
      icon: Users,
      color: "border-ai-secondary bg-ai-secondary/5"
    },
    {
      title: "Break Down Large Tasks",
      description: "3 tasks have been pending for over a week. Consider breaking them into smaller subtasks",
      impact: "High",
      icon: Target,
      color: "border-ai-primary bg-ai-primary/5"
    }
  ];

  const getMaxValue = () => {
    return Math.max(...weeklyStats.flatMap(day => [day.completed, day.created]));
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Analytics & Reports</h1>
            <p className="text-muted-foreground mt-1">
              AI-powered insights into your productivity and task management patterns
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button variant="outline">
              <Mail className="h-4 w-4 mr-2" />
              Email Report
            </Button>
            <Button variant="ai">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {productivityInsights.map((insight, index) => {
            const Icon = insight.icon;
            const TrendIcon = insight.trend === 'up' ? TrendingUp : TrendingDown;
            return (
              <Card key={index} className="gradient-card shadow-card border-0 hover:shadow-ai transition-smooth">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <Icon className={`h-8 w-8 ${insight.color}`} />
                    <TrendIcon className={`h-4 w-4 ${insight.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{insight.title}</p>
                    <p className="text-2xl font-bold mt-1">{insight.value}</p>
                    <p className="text-xs text-muted-foreground mt-2">{insight.description}</p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2">
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-ai-primary" />
                  <span>Weekly Activity</span>
                </CardTitle>
                <CardDescription>Tasks created vs completed over the past week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {weeklyStats.map((day, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{day.day}</span>
                        <span className="text-muted-foreground">
                          {day.completed}/{day.created} completed
                        </span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex space-x-2">
                          <div className="flex-1">
                            <div className="bg-muted rounded-full h-3 overflow-hidden">
                              <div 
                                className="h-full gradient-ai rounded-full transition-all duration-500"
                                style={{ width: `${(day.completed / getMaxValue()) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="bg-muted rounded-full h-3 overflow-hidden">
                              <div 
                                className="h-full bg-muted-foreground/50 rounded-full transition-all duration-500"
                                style={{ width: `${(day.created / getMaxValue()) * 100}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Completed: {day.completed}</span>
                          <span>Created: {day.created}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-center space-x-6 mt-6 text-sm">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 gradient-ai rounded-full" />
                    <span>Completed Tasks</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-muted-foreground/50 rounded-full" />
                    <span>Created Tasks</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Task Categories */}
          <div>
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-ai-secondary" />
                  <span>Task Categories</span>
                </CardTitle>
                <CardDescription>Completion rate by category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {taskCategories.map((category, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${category.color}`} />
                        <span className="text-sm font-medium">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((category.completed / category.total) * 100)}%
                      </span>
                    </div>
                    <Progress value={(category.completed / category.total) * 100} className="h-2" />
                    <div className="text-xs text-muted-foreground">
                      {category.completed} of {category.total} completed
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Recommendations */}
        <Card className="gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5 text-ai-accent animate-pulse-slow" />
              <span>AI-Powered Recommendations</span>
            </CardTitle>
            <CardDescription>
              Personalized suggestions to improve your productivity
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {aiRecommendations.map((rec, index) => {
                const Icon = rec.icon;
                return (
                  <div key={index} className={`p-4 rounded-lg border-2 ${rec.color}`}>
                    <div className="flex items-start space-x-3">
                      <Icon className="h-5 w-5 mt-1" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{rec.title}</h4>
                          <Badge variant={rec.impact === 'High' ? 'destructive' : 'secondary'}>
                            {rec.impact}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {rec.description}
                        </p>
                        <Button variant="outline" size="sm">
                          Apply Suggestion
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Performance Summary */}
        <Card className="gradient-card shadow-card border-0">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-ai-primary" />
              <span>Monthly Summary</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-3xl font-bold gradient-ai bg-clip-text text-transparent mb-2">
                  127
                </div>
                <div className="text-sm text-muted-foreground">Tasks Completed</div>
                <div className="text-xs text-green-500 mt-1">↑ 23% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-ai bg-clip-text text-transparent mb-2">
                  94%
                </div>
                <div className="text-sm text-muted-foreground">On-Time Completion</div>
                <div className="text-xs text-green-500 mt-1">↑ 8% from last month</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold gradient-ai bg-clip-text text-transparent mb-2">
                  42h
                </div>
                <div className="text-sm text-muted-foreground">Time Saved with AI</div>
                <div className="text-xs text-green-500 mt-1">↑ 15% from last month</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Backend Integration Notice */}
        <Card className="gradient-card shadow-card border-0 bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 border-ai-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <BarChart3 className="h-8 w-8 text-ai-primary" />
              <div>
                <h3 className="text-lg font-semibold text-ai-primary">Advanced Analytics Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect to Supabase to unlock real-time analytics, custom reports, data export, and AI-powered insights based on your actual usage patterns.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default Reports;