import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { useAuth } from "@/store/AppContext";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type: "signin" | "join";
}

const AuthDialog = ({ isOpen, onClose, type }: AuthDialogProps) => {
  const { signInWithEmail, isLoading, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailForm, setShowEmailForm] = useState(false);

  // Removed handleDemoLogin as we only use email/password login

  const handleEmailLogin = async () => {
    if (signInWithEmail) {
      await signInWithEmail(email, password);
      if (!error) {
        onClose();
      }
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            {type === "signin" ? "Sign In to AJIO" : "Join AJIO"}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          {!showEmailForm ? (
            <>
              <Button variant="outline" className="w-full flex items-center gap-2" disabled={isLoading}>
                <FcGoogle className="w-4 h-4" />
                {type === "signin" ? "Sign in with Google" : "Sign up with Google"}
              </Button>
              <Button 
                variant="outline" 
                className="w-full" 
                disabled={isLoading}
                onClick={() => setShowEmailForm(true)}
              >
                {type === "signin" ? "Sign in with Email" : "Sign up with Email"}
              </Button>
              {type === "signin" && (
                <Button 
                  variant="default" 
                  className="w-full" 
                  onClick={() => setShowEmailForm(true)}
                  disabled={isLoading}
                >
                  "                  Sign in with Demo Account"
                </Button>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              {error && (
                <p className="text-sm text-red-500">{error}</p>
              )}
              <div className="flex flex-col gap-2">
                <Button 
                  variant="default" 
                  className="w-full" 
                  onClick={handleEmailLogin}
                  disabled={isLoading || !email || !password}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  onClick={() => setShowEmailForm(false)}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog; 