import { Card } from "@/components/ui/card";
import { 
  Brain, 
  Mic, 
  Globe, 
  Zap, 
  MessageSquare, 
  Calendar,
  Target,
  Users,
  Bell
} from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: "Natural Language Processing",
      description: "Just type or speak naturally. Our AI understands context and creates structured tasks automatically.",
      color: "text-ai-primary",
      bgColor: "bg-ai-primary/10"
    },
    {
      icon: Mic,
      title: "Voice-to-Task Creation",
      description: "Speak your tasks and watch them transform into organized action items with deadlines and priorities.",
      color: "text-ai-secondary",
      bgColor: "bg-ai-secondary/10"
    },
    {
      icon: Zap,
      title: "Smart Prioritization",
      description: "AI analyzes urgency, impact, and dependencies to automatically rank your tasks for maximum productivity.",
      color: "text-ai-accent",
      bgColor: "bg-ai-accent/10"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Work in your preferred language. Supports 50+ languages with real-time translation and localization.",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10"
    },
    {
      icon: MessageSquare,
      title: "AI Chat Assistant",
      description: "Ask questions, get insights, and manage tasks conversationally with your personal AI assistant.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10"
    },
    {
      icon: Target,
      title: "Intelligent Suggestions",
      description: "Get AI-powered recommendations for task breakdown, time estimates, and optimal scheduling.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    },
    {
      icon: Calendar,
      title: "Smart Scheduling",
      description: "AI finds the best times for your tasks based on your patterns, energy levels, and availability.",
      color: "text-orange-500",
      bgColor: "bg-orange-500/10"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Share tasks, assign responsibilities, and track team progress with intelligent workflow management.",
      color: "text-cyan-500",
      bgColor: "bg-cyan-500/10"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Receive timely reminders and insights that adapt to your work patterns and preferences.",
      color: "text-pink-500",
      bgColor: "bg-pink-500/10"
    }
  ];

  return (
    <section id="features" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-brain bg-clip-text text-transparent">
              AI-Powered Features
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience the future of productivity with intelligent automation, 
            natural language understanding, and adaptive workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="p-6 gradient-card shadow-card hover:shadow-ai transition-smooth border-0 group"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-bounce`}>
                <feature.icon className={`h-6 w-6 ${feature.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold mb-3 group-hover:gradient-ai group-hover:bg-clip-text group-hover:text-transparent transition-smooth">
                {feature.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>

        {/* Call-to-Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 text-sm mb-6">
            <Brain className="h-4 w-4 text-ai-accent animate-pulse-slow" />
            <span>Powered by Advanced AI Technology</span>
          </div>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their productivity 
            with TaskFlow AI's intelligent task management system.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Features;