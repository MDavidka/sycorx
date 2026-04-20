import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Input,
  Tabs,
  Tab,
  Divider,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Link
} from "@heroui/react";
import { 
  Mail, 
  Lock, 
  User, 
  Github, 
  Globe, 
  Database,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { IS_DB_CONNECTED } from "../db";

export function LoginPage() {
  const [selectedTab, setSelectedTab] = useState<string>("login");
  const [isLoading, setIsLoading] = useState(false);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      if (!IS_DB_CONNECTED) {
        onOpen();
      } else {
        // In a real app, handle actual authentication here
        console.log("Authentication successful");
        navigateTo("/dashboard");
      }
    }, 800);
  };

  const handleDemoLogin = () => {
    navigateTo("/dashboard");
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10 opacity-50"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -z-10 opacity-50"></div>

      <div className="w-full max-w-md flex flex-col gap-4">
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-foreground tracking-tight">Welcome Back</h1>
          <p className="text-muted-foreground text-sm mt-1">Sign in to manage your cloud infrastructure.</p>
        </div>

        <Card className="border-border/50 bg-background/60 backdrop-blur-md shadow-xl">
          <CardBody className="p-6">
            <Tabs 
              fullWidth 
              size="md" 
              aria-label="Authentication Tabs" 
              selectedKey={selectedTab} 
              onSelectionChange={(key) => setSelectedTab(key.toString())}
              classNames={{
                tabList: "bg-secondary/50",
                cursor: "bg-background shadow-sm",
                tab: "h-10",
                tabContent: "group-data-[selected=true]:text-foreground font-medium"
              }}
            >
              <Tab key="login" title="Login">
                <form onSubmit={handleAuth} className="flex flex-col gap-4 pt-4">
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    startContent={<Mail className="w-4 h-4 text-muted-foreground" />}
                    classNames={{
                      inputWrapper: "border-border/50 hover:border-border focus-within:!border-primary"
                    }}
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                    startContent={<Lock className="w-4 h-4 text-muted-foreground" />}
                    classNames={{
                      inputWrapper: "border-border/50 hover:border-border focus-within:!border-primary"
                    }}
                  />
                  <div className="flex justify-end">
                    <Link href="#" size="sm" color="primary" className="text-xs font-medium">
                      Forgot password?
                    </Link>
                  </div>
                  <Button 
                    type="submit" 
                    color="primary" 
                    className="w-full font-medium mt-2"
                    isLoading={isLoading}
                  >
                    Sign In
                  </Button>
                </form>
              </Tab>
              
              <Tab key="signup" title="Sign Up">
                <form onSubmit={handleAuth} className="flex flex-col gap-4 pt-4">
                  <Input
                    isRequired
                    label="Full Name"
                    placeholder="Enter your name"
                    type="text"
                    variant="bordered"
                    startContent={<User className="w-4 h-4 text-muted-foreground" />}
                    classNames={{
                      inputWrapper: "border-border/50 hover:border-border focus-within:!border-primary"
                    }}
                  />
                  <Input
                    isRequired
                    label="Email"
                    placeholder="Enter your email"
                    type="email"
                    variant="bordered"
                    startContent={<Mail className="w-4 h-4 text-muted-foreground" />}
                    classNames={{
                      inputWrapper: "border-border/50 hover:border-border focus-within:!border-primary"
                    }}
                  />
                  <Input
                    isRequired
                    label="Password"
                    placeholder="Create a password"
                    type="password"
                    variant="bordered"
                    startContent={<Lock className="w-4 h-4 text-muted-foreground" />}
                    classNames={{
                      inputWrapper: "border-border/50 hover:border-border focus-within:!border-primary"
                    }}
                  />
                  <Button 
                    type="submit" 
                    color="primary" 
                    className="w-full font-medium mt-2"
                    isLoading={isLoading}
                  >
                    Create Account
                  </Button>
                </form>
              </Tab>
            </Tabs>

            <div className="flex items-center gap-4 py-6">
              <Divider className="flex-1 opacity-50" />
              <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Or continue with</span>
              <Divider className="flex-1 opacity-50" />
            </div>

            <div className="flex flex-col gap-3">
              <Button 
                variant="bordered" 
                startContent={<Github className="w-4 h-4" />}
                className="w-full border-border/50 hover:bg-secondary/50 font-medium"
                onClick={(e) => handleAuth(e as any)}
              >
                GitHub
              </Button>
              <Button 
                variant="bordered" 
                startContent={<Globe className="w-4 h-4" />}
                className="w-full border-border/50 hover:bg-secondary/50 font-medium"
                onClick={(e) => handleAuth(e as any)}
              >
                Google
              </Button>
            </div>
          </CardBody>
          <CardFooter className="px-6 py-4 border-t border-border/50 bg-secondary/10 justify-center">
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our <Link href="#" size="sm" className="text-xs">Terms of Service</Link> and <Link href="#" size="sm" className="text-xs">Privacy Policy</Link>.
            </p>
          </CardFooter>
        </Card>

        {/* Demo Mode Helper */}
        {!IS_DB_CONNECTED && (
          <div className="mt-4 text-center">
            <Button 
              variant="light" 
              color="default" 
              size="sm" 
              endContent={<ArrowRight className="w-4 h-4" />}
              onClick={handleDemoLogin}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip login and view demo dashboard
            </Button>
          </div>
        )}
      </div>

      {/* DB Connection Required Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Authentication Unavailable</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center py-4 text-center gap-4">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
                    <Database className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-foreground font-medium text-lg">Database Connection Required</p>
                  <p className="text-muted-foreground text-sm">
                    User authentication requires a live database connection to verify credentials. Please connect your MongoDB database in the Integrations tab to enable login functionality.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter className="flex-col sm:flex-row gap-2">
                <Button color="default" variant="light" onPress={onClose} className="w-full sm:w-auto">
                  Close
                </Button>
                <Button color="primary" variant="flat" onPress={() => { onClose(); handleDemoLogin(); }} className="w-full sm:w-auto">
                  View Demo Dashboard
                </Button>
                <Button color="warning" onPress={onClose} className="w-full sm:w-auto">
                  Connect Database
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}