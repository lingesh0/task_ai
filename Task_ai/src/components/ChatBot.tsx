import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { MessageSquare, Send, X, Sparkles } from "lucide-react";
import chatbotAvatar from "@/assets/chatbot-avatar.svg";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your TaskFlow AI assistant. I can help you create tasks, set priorities, and manage your workflow. Try saying something like 'Create a task to review the budget by Friday'",
      isBot: true,
    }
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      isBot: false,
    };

    // Simulate AI response
    const aiResponse = {
      id: messages.length + 2,
      text: "I understand you want to create a task. Let me help you structure that with smart prioritization and deadline suggestions. Would you like me to add this to your task board?",
      isBot: true,
    };

    setMessages([...messages, userMessage, aiResponse]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      <Button
        onClick={() => setIsOpen(true)}
        variant="floating"
        size="icon-lg"
        className={`fixed bottom-6 right-6 z-50 shadow-glow animate-bounce-slow ${isOpen ? 'hidden' : ''}`}
      >
        <img src={chatbotAvatar} alt="AI Assistant" className="h-8 w-8" />
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[500px] z-50 gradient-card shadow-ai border-0">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center space-x-3">
              <img src={chatbotAvatar} alt="AI Assistant" className="h-8 w-8 animate-pulse-slow" />
              <div>
                <h3 className="font-semibold gradient-ai bg-clip-text text-transparent">TaskFlow AI</h3>
                <p className="text-xs text-muted-foreground">Your intelligent assistant</p>
              </div>
              <Sparkles className="h-4 w-4 text-ai-accent animate-spin-slow" />
            </div>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="icon-sm"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg transition-smooth ${
                    message.isBot
                      ? 'bg-muted text-muted-foreground'
                      : 'gradient-ai text-white shadow-ai'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex items-center space-x-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about your tasks..."
                className="flex-1"
              />
              <Button
                onClick={handleSendMessage}
                variant="ai"
                size="icon-sm"
                disabled={!inputValue.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Powered by Advanced AI • Multi-language Support
            </p>
          </div>
        </Card>
      )}
    </>
  );
};

export default ChatBot;