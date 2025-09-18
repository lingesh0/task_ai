import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  Activity, 
  Database, 
  Settings, 
  Shield,
  BarChart3,
  Search,
  Plus,
  MoreHorizontal,
  Crown,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Zap,
  Brain,
  Globe
} from "lucide-react";
import AppLayout from "@/components/AppLayout";

const AdminPanel = () => {
  const systemStats = [
    {
      title: "Total Users",
      value: "12,847",
      change: "+234 this week",
      icon: Users,
      color: "text-ai-primary"
    },
    {
      title: "Active Sessions",
      value: "3,421",
      change: "+12% from yesterday",
      icon: Activity,
      color: "text-ai-secondary"
    },
    {
      title: "Tasks Created",
      value: "89,332",
      change: "+1,234 today",
      icon: CheckCircle2,
      color: "text-ai-success"
    },
    {
      title: "AI Processes",
      value: "156,789",
      change: "+2,341 this hour",
      icon: Brain,
      color: "text-ai-accent"
    }
  ];

  const recentUsers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Pro User",
      status: "Active",
      lastActive: "2 minutes ago",
      tasksCreated: 245
    },
    {
      id: 2,
      name: "Jane Smith", 
      email: "jane@example.com",
      role: "Enterprise",
      status: "Active",
      lastActive: "5 minutes ago",
      tasksCreated: 892
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com", 
      role: "Free",
      status: "Inactive",
      lastActive: "2 hours ago",
      tasksCreated: 45
    },
    {
      id: 4,
      name: "Sarah Wilson",
      email: "sarah@example.com",
      role: "Pro User",
      status: "Active", 
      lastActive: "10 minutes ago",
      tasksCreated: 567
    }
  ];

  const systemAlerts = [
    {
      id: 1,
      type: "warning",
      title: "High AI Processing Load",
      message: "AI processing queue is at 85% capacity",
      timestamp: "5 minutes ago"
    },
    {
      id: 2,
      type: "info",
      title: "Database Backup Complete",
      message: "Weekly backup completed successfully",
      timestamp: "2 hours ago"
    },
    {
      id: 3,
      type: "success",
      title: "New Feature Deployed",
      message: "Voice recognition v2.1 is now live",
      timestamp: "1 day ago"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'bg-green-500';
      case 'Inactive': return 'bg-gray-500';
      case 'Suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getRoleVariant = (role: string) => {
    switch (role) {
      case 'Enterprise': return 'default';
      case 'Pro User': return 'secondary';
      case 'Free': return 'outline';
      default: return 'outline';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'success': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'info': return <Clock className="h-4 w-4 text-blue-500" />;
      default: return <Clock className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <AppLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Crown className="h-8 w-8 text-ai-accent" />
            <div>
              <h1 className="text-3xl font-bold">Admin Panel</h1>
              <p className="text-muted-foreground mt-1">
                System administration and user management
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="gradient-ai text-white border-0">
              <Shield className="h-3 w-3 mr-1" />
              Admin Access
            </Badge>
          </div>
        </div>

        {/* System Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {systemStats.map((stat, index) => {
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
          {/* User Management */}
          <div className="lg:col-span-2">
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-ai-primary" />
                      <span>User Management</span>
                    </CardTitle>
                    <CardDescription>Monitor and manage user accounts</CardDescription>
                  </div>
                  <Button variant="ai" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Search */}
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      className="pl-10"
                    />
                  </div>

                  {/* Users Table */}
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="border-b border-border">
                        <tr className="text-left">
                          <th className="p-3 text-sm font-medium text-muted-foreground">User</th>
                          <th className="p-3 text-sm font-medium text-muted-foreground">Role</th>
                          <th className="p-3 text-sm font-medium text-muted-foreground">Status</th>
                          <th className="p-3 text-sm font-medium text-muted-foreground">Activity</th>
                          <th className="p-3 text-sm font-medium text-muted-foreground">Tasks</th>
                          <th className="p-3 text-sm font-medium text-muted-foreground">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentUsers.map((user) => (
                          <tr key={user.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                            <td className="p-3">
                              <div>
                                <div className="font-medium">{user.name}</div>
                                <div className="text-sm text-muted-foreground">{user.email}</div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge variant={getRoleVariant(user.role)}>
                                {user.role}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <span className={`w-2 h-2 rounded-full ${getStatusColor(user.status)}`} />
                                <span className="text-sm">{user.status}</span>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="text-sm text-muted-foreground">{user.lastActive}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm font-medium">{user.tasksCreated}</span>
                            </td>
                            <td className="p-3">
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* System Alerts & Quick Actions */}
          <div className="space-y-6">
            {/* System Alerts */}
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-ai-warning" />
                  <span>System Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="p-3 bg-background rounded-lg border">
                    <div className="flex items-start space-x-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {alert.message}
                        </p>
                        <span className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-ai-accent" />
                  <span>Quick Actions</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Database className="h-4 w-4 mr-2" />
                  Backup Database
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Report
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  System Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Globe className="h-4 w-4 mr-2" />
                  Manage Localization
                </Button>
              </CardContent>
            </Card>

            {/* System Health */}
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-ai-success" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Server CPU</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="gradient-ai h-2 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Memory Usage</span>
                    <span>62%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="gradient-ai h-2 rounded-full" style={{ width: '62%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>AI Processing</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Database Load</span>
                    <span>23%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="gradient-ai h-2 rounded-full" style={{ width: '23%' }} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Backend Integration Notice */}
        <Card className="gradient-card shadow-card border-0 bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 border-ai-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <Crown className="h-8 w-8 text-ai-primary" />
              <div>
                <h3 className="text-lg font-semibold text-ai-primary">Full Admin Features Available</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Connect to Supabase to unlock complete admin functionality including real user management, system monitoring, usage analytics, and advanced security controls.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
};

export default AdminPanel;