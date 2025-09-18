import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Brain, Mic, Sparkles, ArrowRight } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center gradient-subtle">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-brain opacity-10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-ai opacity-10 rounded-full blur-3xl animate-float" />
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 text-sm">
            <Sparkles className="h-4 w-4 text-ai-accent" />
            <span>AI-Powered Task Management Revolution</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight">
            <span className="gradient-brain bg-clip-text text-transparent">
              Think Smart,
            </span>
            <br />
            <span className="text-foreground">
              Work Faster
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Transform your productivity with AI that understands natural language, 
            prioritizes intelligently, and helps you achieve more with less effort.
          </p>

          {/* Smart Input */}
          <div className="max-w-2xl mx-auto">
            <div className="relative gradient-card p-1 rounded-2xl shadow-card">
              <div className="relative bg-background rounded-xl p-4 flex items-center space-x-3">
                <Brain className="h-6 w-6 text-ai-primary animate-pulse-slow" />
                <Input 
                  placeholder="Try: 'Remind me to finish the project report tomorrow at 5 PM'"
                  className="flex-1 border-0 bg-transparent text-lg placeholder:text-muted-foreground focus-visible:ring-0"
                />
                <Button variant="floating" size="icon-sm">
                  <Mic className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              Speak or type naturally - our AI will create structured tasks automatically
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Button variant="brain" size="xl" className="group" onClick={() => window.location.href = '/signup'}>
              Start Planning Smart
              <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button variant="hero" size="xl" onClick={() => window.location.href = '/dashboard'}>
              View Dashboard Demo
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
            <div className="text-center">
              <div className="text-3xl font-bold gradient-ai bg-clip-text text-transparent">5x</div>
              <div className="text-sm text-muted-foreground">Faster Task Creation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-ai bg-clip-text text-transparent">99%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold gradient-ai bg-clip-text text-transparent">50+</div>
              <div className="text-sm text-muted-foreground">Languages Supported</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;