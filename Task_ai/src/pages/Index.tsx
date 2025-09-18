import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import TaskPreview from "@/components/TaskPreview";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <Hero />
      <Features />
      <TaskPreview />
      <ChatBot />
      
      {/* Backend Integration Notice */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto bg-gradient-to-r from-ai-primary/10 to-ai-secondary/10 rounded-2xl p-8 border border-ai-primary/20">
            <h3 className="text-2xl font-bold mb-4 gradient-ai bg-clip-text text-transparent">
              Ready for Full AI Power?
            </h3>
            <p className="text-muted-foreground mb-6 leading-relaxed">
              To unlock advanced features like authentication, database storage, AI-powered task processing, 
              natural language understanding, voice recognition, and multi-language support, connect your project to Supabase.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <p className="text-sm text-muted-foreground">
                🧠 AI Task Processing • 🎤 Voice Recognition • 🌍 Multi-language • 🔐 User Authentication
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Index;
