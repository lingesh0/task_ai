import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, ArrowLeft, CheckCircle, Brain } from "lucide-react";
import { Link } from "react-router-dom";
import taskflowLogo from "@/assets/taskflow-logo.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This would normally send a password reset email
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
        <div className="w-full max-w-md relative z-10">
          <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-smooth mb-8">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Link>

          <Card className="gradient-card shadow-ai border-0 text-center">
            <CardHeader className="space-y-6">
              <div className="flex items-center justify-center">
                <div className="w-16 h-16 bg-ai-success/10 rounded-full flex items-center justify-center">
                  <CheckCircle className="h-8 w-8 text-ai-success" />
                </div>
              </div>
              <div>
                <CardTitle className="text-2xl">Check Your Email</CardTitle>
                <CardDescription className="text-base mt-2">
                  We've sent a password reset link to <strong>{email}</strong>
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="text-sm text-muted-foreground space-y-2">
                <p>Didn't receive the email? Check your spam folder or</p>
                <Button variant="link" className="p-0 h-auto text-primary" onClick={() => setIsSubmitted(false)}>
                  try a different email address
                </Button>
              </div>

              <div className="space-y-4">
                <Button variant="brain" size="lg" className="w-full" onClick={() => window.location.href = '/login'}>
                  <Brain className="h-4 w-4 mr-2" />
                  Back to Sign In
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-subtle flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 gradient-brain opacity-5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 gradient-ai opacity-5 rounded-full blur-3xl animate-float" />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Back to Login */}
        <Link to="/login" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-smooth mb-8">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Sign In
        </Link>

        <Card className="gradient-card shadow-ai border-0">
          <CardHeader className="text-center space-y-6">
            <div className="flex items-center justify-center space-x-3">
              <img src={taskflowLogo} alt="TaskFlow AI" className="h-12 w-12 animate-pulse-slow" />
              <div>
                <h1 className="text-2xl font-bold gradient-ai bg-clip-text text-transparent">
                  TaskFlow AI
                </h1>
                <p className="text-xs text-muted-foreground">Plan Smart, Act Fast</p>
              </div>
            </div>
            <div>
              <CardTitle className="text-2xl">Reset Your Password</CardTitle>
              <CardDescription className="text-base mt-2">
                Enter your email address and we'll send you a link to reset your password
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>

              <Button type="submit" variant="brain" size="lg" className="w-full">
                <Mail className="h-4 w-4 mr-2" />
                Send Reset Link
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">Remember your password? </span>
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Having trouble? Contact our support team for assistance
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;