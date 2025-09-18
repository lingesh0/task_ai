import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  CheckCircle2, 
  Circle, 
  Clock,
  Flag,
  Brain,
  Calendar,
  User,
  Mic,
  List,
  Grid3X3,
  X
} from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

import React from "react";

export default function TaskBoard(): JSX.Element {
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isCreateTaskOpen, setIsCreateTaskOpen] = useState(false);
  const [isVoiceTaskOpen, setIsVoiceTaskOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "todo",
    dueDate: "",
    assignee: "",
    tags: []
  });
  const [voiceInput, setVoiceInput] = useState("");
  const { toast } = useToast();

  const columns = [
    { id: 'todo', title: 'To Do', count: 5 },
    { id: 'progress', title: 'In Progress', count: 3 },
    { id: 'done', title: 'Done', count: 2 }
  ];

  const handleCreateTask = () => {
    // Validate task data
    if (!newTask.title.trim()) {
      toast({
        title: "Error",
        description: "Task title is required",
        variant: "destructive"
      });
      return;
    }

    // Create a new task with a unique ID
    const task = {
      ...newTask,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Add task to the list (in a real app, this would call an API)
    console.log("New task created:", task);
    
    // Reset form and close dialog
    setNewTask({
      title: "",
      description: "",
      priority: "Medium",
      status: "todo",
      dueDate: "",
      assignee: "",
      tags: []
    });
    setIsCreateTaskOpen(false);
    
    // Show success message
    toast({
      title: "Success",
      description: "Task created successfully",
    });
  };

  const handleVoiceToTask = () => {
    // Validate voice input
    if (!voiceInput.trim()) {
      toast({
        title: "Error",
        description: "Voice input is required",
        variant: "destructive"
      });
      return;
    }

    // Create a task from voice input
    const task = {
      id: Date.now().toString(),
      title: voiceInput,
      description: "Created from voice input",
      priority: "Medium",
      status: "todo",
      dueDate: "",
      assignee: "",
      tags: [],
      createdAt: new Date().toISOString()
    };

    // Add task to the list (in a real app, this would call an API)
    console.log("New voice task created:", task);
    
    // Reset form and close dialog
    setVoiceInput("");
    setIsVoiceTaskOpen(false);
    
    // Show success message
    toast({
      title: "Success",
      description: "Voice task created successfully",
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'bg-red-500';
      case 'Medium': return 'bg-yellow-500';
      case 'Low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  // Sample tasks data
  const tasks = [
    { id: '1', title: 'Research competitors', description: 'Analyze top 5 competitors', status: 'todo', priority: 'High', dueDate: '2023-06-15', assignee: 'John Doe' },
    { id: '2', title: 'Design mockups', description: 'Create initial UI mockups', status: 'progress', priority: 'Medium', dueDate: '2023-06-20', assignee: 'Jane Smith' },
    { id: '3', title: 'Setup database', description: 'Configure and setup database schema', status: 'done', priority: 'High', dueDate: '2023-06-10', assignee: 'Mike Johnson' },
    { id: '4', title: 'User testing', description: 'Conduct user testing sessions', status: 'todo', priority: 'Medium', dueDate: '2023-06-25', assignee: 'Sarah Williams' },
    { id: '5', title: 'API integration', description: 'Integrate with payment API', status: 'progress', priority: 'High', dueDate: '2023-06-18', assignee: 'David Brown' },
    { id: '6', title: 'Documentation', description: 'Write technical documentation', status: 'todo', priority: 'Low', dueDate: '2023-06-30', assignee: 'Emily Davis' },
    { id: '7', title: 'Bug fixes', description: 'Fix reported bugs in v1.2', status: 'progress', priority: 'Medium', dueDate: '2023-06-22', assignee: 'Alex Turner' },
    { id: '8', title: 'Performance optimization', description: 'Optimize loading times', status: 'done', priority: 'Medium', dueDate: '2023-06-12', assignee: 'Chris Martin' },
    { id: '9', title: 'Security audit', description: 'Perform security assessment', status: 'todo', priority: 'High', dueDate: '2023-06-28', assignee: 'Lisa Anderson' },
    { id: '10', title: 'Deploy to staging', description: 'Deploy latest changes to staging', status: 'done', priority: 'High', dueDate: '2023-06-08', assignee: 'Tom Wilson' }
  ];

  function getTasksByStatus(status: string) {
    return tasks.filter(task => task.status === status);
  }
  
  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Create Task Dialog */}
        <Dialog open={isCreateTaskOpen} onOpenChange={setIsCreateTaskOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Task description"
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({...newTask, priority: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={newTask.status}
                    onValueChange={(value) => setNewTask({...newTask, status: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="todo">To Do</SelectItem>
                      <SelectItem value="progress">In Progress</SelectItem>
                      <SelectItem value="done">Done</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="assignee">Assignee</Label>
                  <Input
                    id="assignee"
                    placeholder="Assignee name"
                    value={newTask.assignee}
                    onChange={(e) => setNewTask({...newTask, assignee: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleCreateTask}>Create Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Voice Task Dialog */}
        <Dialog open={isVoiceTaskOpen} onOpenChange={setIsVoiceTaskOpen}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create Task from Voice</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="voiceInput">Voice Input</Label>
                <div className="flex gap-2">
                  <Input
                    id="voiceInput"
                    placeholder="Your voice will appear here..."
                    value={voiceInput}
                    onChange={(e) => setVoiceInput(e.target.value)}
                    className="flex-1"
                  />
                  <Button variant="outline" size="icon">
                    <Mic className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Tip: Speak clearly and include task details like priority and due date.
                </p>
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={handleVoiceToTask}>Create Voice Task</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Task Board</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-lg border px-3 py-1">
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewMode('kanban')}>
                <Grid3X3 className={`h-4 w-4 ${viewMode === 'kanban' ? 'text-primary' : 'text-muted-foreground'}`} />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setViewMode('list')}>
                <List className={`h-4 w-4 ${viewMode === 'list' ? 'text-primary' : 'text-muted-foreground'}`} />
              </Button>
            </div>
            <Button variant="outline" size="sm" className="h-8 gap-1">
              <Filter className="h-3.5 w-3.5" />
              <span>Filter</span>
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search tasks..."
                className="h-8 w-[150px] sm:w-[200px] pl-8"
              />
            </div>
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsVoiceTaskOpen(true)}>
              <Mic className="h-3.5 w-3.5" />
              <span>Voice Task</span>
            </Button>
            <Button size="sm" className="h-8 gap-1" onClick={() => setIsCreateTaskOpen(true)}>
              <Plus className="h-3.5 w-3.5" />
              <span>Add Task</span>
            </Button>
          </div>
        </div>

        {/* Kanban Board View */}
        {viewMode === 'kanban' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {columns.map(column => (
              <div key={column.id} className="flex flex-col">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium">{column.title}</h3>
                  <Badge variant="outline">{column.count}</Badge>
                </div>
                <div className="flex flex-col gap-2">
                  {getTasksByStatus(column.id).map(task => (
                    <Card key={task.id} className="shadow-sm">
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-sm">{task.title}</h4>
                          <Badge className={`${getPriorityColor(task.priority)} text-white text-xs`}>
                            {task.priority}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mb-3 line-clamp-2">
                          {task.description}
                        </p>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{task.dueDate}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Avatar className="h-5 w-5">
                              <AvatarFallback className="text-[10px]">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <Card>
            <CardHeader className="px-6 py-4">
              <CardTitle>All Tasks</CardTitle>
            </CardHeader>
            <div className="overflow-x-auto">
              <div className="inline-block min-w-full align-middle">
                <table className="min-w-full divide-y divide-border">
                  <thead>
                    <tr className="bg-muted/50">
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                        Task
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                        Status
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                        Priority
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                        Due Date
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                        Assignee
                      </th>
                      <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border bg-background">
                    {tasks.map(task => (
                      <tr key={task.id}>
                        <td className="px-4 py-3 text-sm">
                          <div className="font-medium">{task.title}</div>
                          <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
                            {task.description}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            {task.status === 'todo' && <Circle className="h-3 w-3 text-muted-foreground" />}
                            {task.status === 'progress' && <Clock className="h-3 w-3 text-blue-500" />}
                            {task.status === 'done' && <CheckCircle2 className="h-3 w-3 text-green-500" />}
                            <span>
                              {task.status === 'todo' && 'To Do'}
                              {task.status === 'progress' && 'In Progress'}
                              {task.status === 'done' && 'Done'}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <Badge className={`${getPriorityColor(task.priority)} text-white`}>
                            {task.priority}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{task.dueDate}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <span>{task.assignee}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon-sm">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>Edit</DropdownMenuItem>
                              <DropdownMenuItem>Delete</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}