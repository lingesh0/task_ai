import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Mic, 
  MicOff, 
  Brain, 
  Sparkles, 
  Clock,
  CheckCircle2,
  Calendar,
  Target,
  Zap,
  Globe,
  Volume2,
  VolumeX
} from "lucide-react";
import AppLayout from "@/components/AppLayout";
import chatbotAvatar from "@/assets/chatbot-avatar.svg";

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
  language?: string;
  suggestions?: string[];
}

const AIAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your TaskFlow AI assistant. I can help you create tasks, manage your schedule, provide productivity insights, and much more. I support multiple languages and can understand natural language input. What would you like to work on today?",
      isBot: true,
      timestamp: new Date(),
      suggestions: [
        "Create a task for tomorrow",
        "Show my schedule for this week", 
        "Give me productivity insights",
        "Help me prioritize my tasks"
      ]
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'hi', name: 'हिंदी', flag: '🇮🇳' },
    { code: 'ta', name: 'தமிழ்', flag: '🇮🇳' }
  ];

  const quickActions = [
    {
      title: "Create Task",
      description: "Add a new task with AI assistance",
      icon: Target,
      color: "text-ai-primary",
      prompt: "Help me create a new task"
    },
    {
      title: "Schedule Review",
      description: "Review and optimize your schedule",
      icon: Calendar,
      color: "text-ai-secondary",
      prompt: "Review my schedule for this week"
    },
    {
      title: "Productivity Insights",
      description: "Get personalized productivity tips",
      icon: Zap,
      color: "text-ai-accent",
      prompt: "Give me productivity insights"
    },
    {
      title: "Priority Help",
      description: "Help prioritize your tasks",
      icon: CheckCircle2,
      color: "text-ai-success",
      prompt: "Help me prioritize my tasks"
    }
  ];

  const sampleResponses = [
    "I can help you create that task! Let me break it down with smart prioritization and timeline suggestions.",
    "Based on your current workload, I recommend scheduling this during your peak productivity hours (2-4 PM).",
    "I've analyzed your task patterns. Here are some insights to boost your productivity:",
    "Let me help you organize that better. I can suggest breaking this into smaller, manageable subtasks.",
    "Great question! Based on your history, here's what I recommend for optimal task management."
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: messages.length + 1,
      text: messageText,
      isBot: false,
      timestamp: new Date(),
      language: selectedLanguage
    };

    // Simulate AI response
    const aiResponse: Message = {
      id: messages.length + 2,
      text: sampleResponses[Math.floor(Math.random() * sampleResponses.length)],
      isBot: true,
      timestamp: new Date(),
      suggestions: Math.random() > 0.5 ? [
        "Create a follow-up task",
        "Schedule a reminder",
        "Get more details"
      ] : undefined
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // In a real app, this would start/stop speech recognition
    if (!isListening) {
      // Simulate voice input
      setTimeout(() => {
        setInputValue("Create a task to review the quarterly budget by Friday");
        setIsListening(false);
      }, 2000);
    }
  };

  const formatTime = (timestamp: Date) => {
    return timestamp.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  return (
    <AppLayout>
      <div className="h-[calc(100vh-12rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img src={chatbotAvatar} alt="AI Assistant" className="h-12 w-12 animate-pulse-slow" />
              <div>
                <h1 className="text-3xl font-bold gradient-ai bg-clip-text text-transparent">
                  AI Assistant
                </h1>
                <p className="text-muted-foreground">
                  Your intelligent task management companion
                </p>
              </div>
              <Sparkles className="h-6 w-6 text-ai-accent animate-spin-slow" />
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <select 
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="bg-background border border-border rounded-lg px-3 py-2 text-sm"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.flag} {lang.name}
                </option>
              ))}
            </select>
            <Button variant="outline" size="icon">
              <Globe className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1">
          {/* Quick Actions Sidebar */}
          <Card className="lg:col-span-1 gradient-card shadow-card border-0">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {quickActions.map((action, index) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start h-auto p-4 flex-col items-start space-y-2 hover:shadow-card transition-smooth"
                    onClick={() => handleSendMessage(action.prompt)}
                  >
                    <div className="flex items-center space-x-2 w-full">
                      <Icon className={`h-5 w-5 ${action.color}`} />
                      <span className="font-medium">{action.title}</span>
                    </div>
                    <p className="text-xs text-muted-foreground text-left">
                      {action.description}
                    </p>
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          {/* Chat Interface */}
          <Card className="lg:col-span-3 gradient-card shadow-card border-0 flex flex-col">
            {/* Chat Messages */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className={`max-w-[80%] ${message.isBot ? 'order-2' : 'order-1'}`}>
                    {message.isBot && (
                      <div className="flex items-center space-x-2 mb-2">
                        <img src={chatbotAvatar} alt="AI" className="h-6 w-6" />
                        <span className="text-sm font-medium gradient-ai bg-clip-text text-transparent">
                          TaskFlow AI
                        </span>
                        <Badge variant="outline" className="text-xs">
                          <Brain className="h-3 w-3 mr-1" />
                          AI
                        </Badge>
                      </div>
                    )}
                    
                    <div
                      className={`p-4 rounded-2xl transition-smooth ${
                        message.isBot
                          ? 'bg-muted text-foreground'
                          : 'gradient-ai text-white shadow-ai'
                      }`}
                    >
                      <p className="text-sm leading-relaxed">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {message.isBot && (
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon-sm" className="opacity-70 hover:opacity-100">
                              <Volume2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {message.suggestions && (
                      <div className="mt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">Suggested actions:</p>
                        <div className="flex flex-wrap gap-2">
                          {message.suggestions.map((suggestion, idx) => (
                            <Button
                              key={idx}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                              onClick={() => handleSendMessage(suggestion)}
                            >
                              {suggestion}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </CardContent>

            {/* Input Area */}
            <div className="p-6 border-t border-border">
              <div className="flex items-center space-x-3">
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder={`Ask me anything in ${languages.find(l => l.code === selectedLanguage)?.name}...`}
                    className="pr-12"
                  />
                  {isListening && (
                    <div className="absolute right-3 top-3">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    </div>
                  )}
                </div>
                
                <Button
                  variant={isListening ? "destructive" : "smart"}
                  size="icon"
                  onClick={toggleVoiceInput}
                >
                  {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                </Button>
                
                <Button
                  onClick={() => handleSendMessage()}
                  variant="ai"
                  size="icon"
                  disabled={!inputValue.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>
                  {isListening ? "🎤 Listening..." : "Press Enter to send, Shift+Enter for new line"}
                </span>
                <div className="flex items-center space-x-2">
                  <Brain className="h-3 w-3" />
                  <span>Powered by Advanced AI</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
};

export default AIAssistant;