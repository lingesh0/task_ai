import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  Calendar as CalendarIcon, 
  Clock,
  Plus,
  Filter,
  Brain,
  Mic,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import AppLayout from "@/components/AppLayout";
import { EventDialog, EventFormData } from "@/components/EventDialog";
import useSpeechRecognition from "@/hooks/useSpeechRecognition";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month");
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [initialEventData, setInitialEventData] = useState<Partial<EventFormData>>({});
  const { toast } = useToast();
  const { 
    transcript, 
    isListening, 
    startListening, 
    stopListening, 
    error 
  } = useSpeechRecognition();

  const handleVoiceCommand = () => {
    if (isListening) {
      stopListening();
      if (transcript) {
        const parsedEvent = parseVoiceCommand(transcript);
        if (parsedEvent) {
          setSelectedDate(parsedEvent.date);
          handleAddEvent(parsedEvent);
        }
      }
    } else {
      startListening();
      toast({
        title: "Voice Recognition Active",
        description: "Start speaking to create an event...",
      });
    }
  };

  const parseVoiceCommand = (command: string): Partial<EventFormData> | null => {
    const lowercaseCommand = command.toLowerCase();
    
    // Date parsing
    const dateMatch = lowercaseCommand.match(/(today|tomorrow|next|on)\s+([a-zA-Z]+\s+\d+)/i);
    let eventDate = new Date();
    
    if (dateMatch) {
      if (dateMatch[1] === "tomorrow") {
        eventDate.setDate(eventDate.getDate() + 1);
      } else if (dateMatch[2]) {
        const parsedDate = new Date(dateMatch[2]);
        if (!isNaN(parsedDate.getTime())) {
          eventDate = parsedDate;
        }
      }
    }

    // Time parsing
    const timeMatch = lowercaseCommand.match(/at\s+(\d{1,2})(:\d{2})?\s*(am|pm)?/i);
    let startTime = "09:00";
    if (timeMatch) {
      let hours = parseInt(timeMatch[1]);
      const minutes = timeMatch[2] ? timeMatch[2].substring(1) : "00";
      const meridian = timeMatch[3]?.toLowerCase();
      
      if (meridian === "pm" && hours < 12) hours += 12;
      if (meridian === "am" && hours === 12) hours = 0;
      
      startTime = `${hours.toString().padStart(2, "0")}:${minutes}`;
    }

    // Extract title
    const titleMatch = lowercaseCommand.match(/^(.*?)(?=\s+(?:at|on|tomorrow)\s+|$)/i);
    const title = titleMatch ? titleMatch[1].trim() : "";

    if (!title) return null;

    return {
      title,
      date: eventDate,
      startTime,
      type: lowercaseCommand.includes("meeting") ? "meeting" : 
            lowercaseCommand.includes("task") ? "task" : "event",
      priority: lowercaseCommand.includes("urgent") || lowercaseCommand.includes("important") ? "High" : "Medium"
    };
  };

  const handleAddEvent = (eventData: Partial<EventFormData>) => {
    setInitialEventData(eventData);
    setIsEventDialogOpen(true);
  };

  // Task type
  interface Task {
    id: number;
    title: string;
    time: string;
    duration: string;
    type: string;
    priority: string;
    date: Date;
  }

  // Default tasks
  const defaultTasks: Task[] = [
    {
      id: 1,
      title: "Team standup meeting",
      time: "9:00 AM",
      duration: "30 min",
      type: "meeting",
      priority: "High",
      date: new Date(2024, 0, 15)
    },
    {
      id: 2,
      title: "Review Q4 budget analysis",
      time: "2:00 PM", 
      duration: "2 hours",
      type: "task",
      priority: "High",
      date: new Date(2024, 0, 15)
    },
    {
      id: 3,
      title: "Client presentation prep",
      time: "10:00 AM",
      duration: "1 hour",
      type: "task", 
      priority: "Medium",
      date: new Date(2024, 0, 16)
    },
    {
      id: 4,
      title: "Project review meeting",
      time: "3:00 PM",
      duration: "45 min",
      type: "meeting",
      priority: "Medium",
      date: new Date(2024, 0, 17)
    }
  ];

  const [tasks, setTasks] = useState<Task[]>(defaultTasks);

  const handleEventSubmit = async (eventData: EventFormData) => {
    console.log("Saving event:", eventData);
    toast({
      title: "Event Created",
      description: "Your event has been successfully added to the calendar.",
    });
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const getTasksForDate = (date: Date | null) => {
    if (!date) return [];
    return tasks.filter(task => 
      task.date.toDateString() === date.toDateString()
    );
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newDate = new Date(currentDate);
    if (direction === "prev") {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "meeting": return "bg-blue-500";
      case "task": return "bg-green-500";
      case "event": return "bg-purple-500";
      default: return "bg-gray-500";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "border-red-500";
      case "Medium": return "border-yellow-500";
      case "Low": return "border-green-500";
      default: return "border-gray-500";
    }
  };

  const days = getDaysInMonth(currentDate);
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Calendar</h1>
            <p className="text-muted-foreground mt-1">
              Schedule and track your tasks with intelligent time management
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="flex items-center space-x-1 bg-muted rounded-lg p-1">
              <Button 
                variant={viewMode === "month" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("month")}
              >
                Month
              </Button>
              <Button 
                variant={viewMode === "week" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("week")}
              >
                Week
              </Button>
              <Button 
                variant={viewMode === "day" ? "default" : "ghost"} 
                size="sm"
                onClick={() => setViewMode("day")}
              >
                Day
              </Button>
            </div>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="icon" onClick={() => navigateMonth("prev")}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-xl font-semibold min-w-48 text-center">
                {formatMonth(currentDate)}
              </h2>
              <Button variant="outline" size="icon" onClick={() => navigateMonth("next")}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>
              Today
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
          <div className="flex items-center space-x-3">
            <Button 
              variant="smart" 
              size="sm"
              onClick={handleVoiceCommand}
              className={isListening ? "bg-red-500 hover:bg-red-600" : ""}
            >
              <Mic className="h-4 w-4 mr-2" />
              {isListening ? "Stop Recording" : "Voice Schedule"}
            </Button>
            <Button 
              variant="ai"
              onClick={() => {
                setInitialEventData({});
                setIsEventDialogOpen(true);
              }}
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Event
            </Button>
            <EventDialog
              open={isEventDialogOpen}
              onOpenChange={setIsEventDialogOpen}
              onSubmit={handleEventSubmit}
              initialData={initialEventData}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-3">
            <Card className="gradient-card shadow-card border-0">
              <CardContent className="p-6">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {weekdays.map((day) => (
                    <div key={day} className="p-2 text-center text-sm font-medium text-muted-foreground">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((date, index) => {
                    const dayTasks = getTasksForDate(date);
                    const isToday = date && date.toDateString() === new Date().toDateString();
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-24 p-2 border rounded-lg transition-colors hover:bg-muted/50 ${
                          date ? "bg-background cursor-pointer" : "bg-muted/25"
                        } ${isToday ? "ring-2 ring-ai-primary bg-ai-primary/5" : ""}`}
                      >
                        {date && (
                          <>
                            <div className={`text-sm font-medium mb-1 ${isToday ? "text-ai-primary" : ""}`}>
                              {date.getDate()}
                            </div>
                            <div className="space-y-1">
                              {dayTasks.slice(0, 2).map((task) => (
                                <div
                                  key={task.id}
                                  className={`text-xs p-1 rounded border-l-2 bg-background/50 ${getPriorityColor(task.priority)}`}
                                >
                                  <div className="flex items-center space-x-1">
                                    <span className={`w-2 h-2 rounded-full ${getTypeColor(task.type)}`} />
                                    <span className="truncate">{task.title}</span>
                                  </div>
                                  <div className="text-muted-foreground flex items-center space-x-1 mt-1">
                                    <Clock className="h-2 w-2" />
                                    <span>{task.time}</span>
                                  </div>
                                </div>
                              ))}
                              {dayTasks.length > 2 && (
                                <div className="text-xs text-muted-foreground">
                                  +{dayTasks.length - 2} more
                                </div>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Schedule */}
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CalendarIcon className="h-5 w-5 text-ai-primary" />
                  <span>Today's Schedule</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {getTasksForDate(new Date()).map((task) => (
                  <div key={task.id} className="p-3 bg-background rounded-lg border">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className={`w-2 h-2 rounded-full ${getTypeColor(task.type)}`} />
                        <Badge variant="outline" className="text-xs capitalize">
                          {task.type}
                        </Badge>
                      </div>
                      <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
                        {task.priority}
                      </Badge>
                    </div>
                    <h3 className="font-medium mb-1">{task.title}</h3>
                    <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{task.time} ({task.duration})</span>
                    </div>
                  </div>
                ))}
                {getTasksForDate(new Date()).length === 0 && (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No tasks scheduled for today
                  </p>
                )}
              </CardContent>
            </Card>

            {/* AI Scheduling Insights */}
            <Card className="gradient-card shadow-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Brain className="h-5 w-5 text-ai-accent animate-spin-slow" />
                  <span>Smart Scheduling</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-ai-primary/10 rounded-lg border border-ai-primary/20">
                  <h4 className="font-medium text-ai-primary mb-1">Optimal Focus Time</h4>
                  <p className="text-sm text-muted-foreground">
                    Schedule important tasks between 2-4 PM for maximum productivity
                  </p>
                </div>
                <div className="p-3 bg-ai-secondary/10 rounded-lg border border-ai-secondary/20">
                  <h4 className="font-medium text-ai-secondary mb-1">Meeting Buffer</h4>
                  <p className="text-sm text-muted-foreground">
                    Add 15-minute buffers between back-to-back meetings
                  </p>
                </div>
                <div className="p-3 bg-ai-accent/10 rounded-lg border border-ai-accent/20">
                  <h4 className="font-medium text-ai-accent mb-1">Weekly Balance</h4>
                  <p className="text-sm text-muted-foreground">
                    You have 5 hours of free time this week for new tasks
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Calendar;
