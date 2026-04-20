import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Chip,
  Tabs,
  Tab,
  Progress,
  Divider,
  Skeleton,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { 
  ArrowLeft, 
  Server, 
  Activity, 
  Cpu, 
  HardDrive, 
  Globe, 
  Power, 
  RefreshCw, 
  Trash2, 
  Database,
  Terminal,
  Clock,
  Shield,
  AlertTriangle
} from "lucide-react";
import { getInstanceById, IS_DB_CONNECTED } from "../db";
import { Instance, InstanceStatus } from "../types";
import { formatDate } from "../utils";

// Mock data for when DB is not connected
const MOCK_INSTANCE: Instance = {
  id: "inst_1a2b3c",
  userId: "user_1",
  name: "prod-web-server",
  planId: "plan_pro",
  status: "running",
  region: "us-east-1",
  ipAddress: "198.51.100.23",
  createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
  updatedAt: new Date().toISOString(),
};

const MOCK_METRICS = {
  cpu: 42,
  ram: 68,
  storage: 35,
  bandwidth: 12,
  uptime: "30d 14h 22m"
};

const statusColorMap: Record<InstanceStatus, "success" | "danger" | "warning" | "default"> = {
  running: "success",
  stopped: "default",
  starting: "warning",
  error: "danger",
  pending: "warning",
};

export function InstanceDetailPage() {
  const [instance, setInstance] = useState<Instance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [activeTab, setActiveTab] = useState("overview");

  // In a real app, we'd extract the ID from the URL router
  // For this SPA demo, we'll just use a hardcoded ID or grab it from window.location
  const instanceId = window.location.pathname.split('/').pop() || "inst_1a2b3c";

  useEffect(() => {
    async function fetchInstance() {
      setIsLoading(true);
      if (IS_DB_CONNECTED) {
        try {
          const response = await getInstanceById(instanceId);
          if (response.data) {
            setInstance(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch instance:", error);
        }
      } else {
        // Simulate network delay for mock data
        setTimeout(() => {
          setInstance(MOCK_INSTANCE);
          setIsLoading(false);
        }, 600);
        return;
      }
      setIsLoading(false);
    }

    fetchInstance();
  }, [instanceId]);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const handleAction = (action: string) => {
    if (!IS_DB_CONNECTED) {
      onOpen();
      return;
    }
    console.log(`Executing ${action} on instance ${instance?.id}`);
    // Implement actual action logic here when DB is connected
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12 w-full min-h-[calc(100vh-4rem)]">
        <Skeleton className="w-32 h-10 rounded-lg mb-8" />
        <Card className="mb-8 border-border/50 bg-background/50">
          <CardBody className="p-8">
            <Skeleton className="w-1/3 h-8 rounded-lg mb-4" />
            <Skeleton className="w-1/4 h-4 rounded-lg" />
          </CardBody>
        </Card>
        <Skeleton className="w-full h-[400px] rounded-xl" />
      </div>
    );
  }

  if (!instance) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-24 w-full text-center">
        <Server className="w-16 h-16 text-muted-foreground mx-auto mb-6 opacity-50" />
        <h1 className="text-3xl font-bold text-foreground mb-4">Instance Not Found</h1>
        <p className="text-muted-foreground mb-8">The server instance you are looking for does not exist or you don't have access to it.</p>
        <Button color="primary" onClick={() => navigateTo('/dashboard')} startContent={<ArrowLeft className="w-4 h-4" />}>
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full min-h-[calc(100vh-4rem)]">
      
      {/* Top Navigation */}
      <Button 
        variant="light" 
        startContent={<ArrowLeft className="w-4 h-4" />} 
        onClick={() => navigateTo('/dashboard')}
        className="mb-6 -ml-4 text-muted-foreground hover:text-foreground"
      >
        Back to Dashboard
      </Button>

      {/* DB Connection Warning */}
      {!IS_DB_CONNECTED && (
        <Card className="mb-8 border-amber-500/20 bg-amber-500/5 shadow-none">
          <CardBody className="flex flex-row items-center gap-4 py-4">
            <div className="p-2 bg-amber-500/20 rounded-full shrink-0">
              <Database className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-amber-800 dark:text-amber-300">Demo Mode Active</h3>
              <p className="text-sm text-amber-700/80 dark:text-amber-400/80">
                Database integration is not connected. Displaying mock metrics and configuration. Actions are disabled.
              </p>
            </div>
            <Button size="sm" color="warning" variant="flat" className="shrink-0 font-medium" onPress={onOpen}>
              Connect Database
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Instance Header Card */}
      <Card className="mb-8 border-border/50 bg-background/50 shadow-sm overflow-visible">
        <CardBody className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <h1 className="text-3xl font-bold text-foreground tracking-tight">{instance.name}</h1>
              <Chip 
                className="capitalize font-medium" 
                color={statusColorMap[instance.status]} 
                variant="flat"
              >
                {instance.status}
              </Chip>
            </div>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="font-mono bg-secondary/50 px-1.5 py-0.5 rounded text-foreground">{instance.id}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" />
                {instance.ipAddress || "Unassigned IP"}
              </span>
              <span className="flex items-center gap-1.5">
                <Server className="w-4 h-4" />
                {instance.region}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                Created {formatDate(instance.createdAt)}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button 
              color={instance.status === 'running' ? "default" : "success"} 
              variant={instance.status === 'running' ? "bordered" : "solid"}
              startContent={instance.status === 'running' ? <Power className="w-4 h-4" /> : <Power className="w-4 h-4" />}
              onClick={() => handleAction(instance.status === 'running' ? 'stop' : 'start')}
              className="flex-1 md:flex-none font-medium"
            >
              {instance.status === 'running' ? 'Stop' : 'Start'}
            </Button>
            <Button 
              color="default" 
              variant="bordered"
              startContent={<RefreshCw className="w-4 h-4" />}
              onClick={() => handleAction('restart')}
              className="flex-1 md:flex-none font-medium"
              isDisabled={instance.status !== 'running'}
            >
              Restart
            </Button>
          </div>
        </CardBody>
      </Card>

      {/* Main Content Tabs */}
      <Tabs 
        aria-label="Instance Details" 
        selectedKey={activeTab} 
        onSelectionChange={(key) => setActiveTab(key.toString())}
        color="primary"
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-border/50",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary font-medium"
        }}
      >
        <Tab 
          key="overview" 
          title={
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Overview</span>
            </div>
          }
        >
          <div className="py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Resource Usage */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="border-border/50 bg-background/50 shadow-sm">
                <CardHeader className="px-6 py-4 border-b border-border/50">
                  <h3 className="text-lg font-semibold text-foreground">Resource Usage</h3>
                </CardHeader>
                <CardBody className="p-6 space-y-8">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">CPU Utilization</span>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{MOCK_METRICS.cpu}%</span>
                    </div>
                    <Progress 
                      value={MOCK_METRICS.cpu} 
                      color={MOCK_METRICS.cpu > 80 ? "danger" : MOCK_METRICS.cpu > 60 ? "warning" : "primary"} 
                      className="h-2"
                    />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Memory (RAM)</span>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{MOCK_METRICS.ram}%</span>
                    </div>
                    <Progress 
                      value={MOCK_METRICS.ram} 
                      color={MOCK_METRICS.ram > 80 ? "danger" : MOCK_METRICS.ram > 60 ? "warning" : "primary"} 
                      className="h-2"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <div className="flex items-center gap-2">
                        <HardDrive className="w-5 h-5 text-primary" />
                        <span className="font-medium text-foreground">Storage (NVMe)</span>
                      </div>
                      <span className="text-sm font-mono text-muted-foreground">{MOCK_METRICS.storage}%</span>
                    </div>
                    <Progress 
                      value={MOCK_METRICS.storage} 
                      color={MOCK_METRICS.storage > 80 ? "danger" : MOCK_METRICS.storage > 60 ? "warning" : "primary"} 
                      className="h-2"
                    />
                  </div>
                </CardBody>
              </Card>

              {/* Network Graph Placeholder */}
              <Card className="border-border/50 bg-background/50 shadow-sm">
                <CardHeader className="px-6 py-4 border-b border-border/50 flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Network Traffic</h3>
                  <Chip size="sm" variant="flat">Last 24 Hours</Chip>
                </CardHeader>
                <CardBody className="p-6 h-64 flex items-center justify-center bg-secondary/10">
                  <div className="text-center">
                    <Activity className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Network visualization requires active database connection.</p>
                  </div>
                </CardBody>
              </Card>
            </div>

            {/* System Info Sidebar */}
            <div className="space-y-6">
              <Card className="border-border/50 bg-background/50 shadow-sm">
                <CardHeader className="px-6 py-4 border-b border-border/50">
                  <h3 className="text-lg font-semibold text-foreground">System Information</h3>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-border/50">
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Operating System</span>
                      <span className="text-sm font-medium text-foreground flex items-center gap-2">
                        Ubuntu 22.04 LTS
                      </span>
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Kernel Version</span>
                      <span className="text-sm font-medium text-foreground">5.15.0-76-generic</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Uptime</span>
                      <span className="text-sm font-medium text-foreground">{MOCK_METRICS.uptime}</span>
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Plan</span>
                      <Chip size="sm" color="primary" variant="flat" className="uppercase tracking-wider text-xs font-bold">
                        {instance.planId.replace('plan_', '')}
                      </Chip>
                    </div>
                  </div>
                </CardBody>
              </Card>

              <Card className="border-border/50 bg-background/50 shadow-sm">
                <CardHeader className="px-6 py-4 border-b border-border/50">
                  <h3 className="text-lg font-semibold text-foreground">Security</h3>
                </CardHeader>
                <CardBody className="p-0">
                  <div className="divide-y divide-border/50">
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Firewall</span>
                      <Chip size="sm" color="success" variant="dot">Active</Chip>
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">DDoS Protection</span>
                      <Chip size="sm" color="success" variant="dot">Enabled</Chip>
                    </div>
                    <div className="px-6 py-4 flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">SSH Keys</span>
                      <span className="text-sm font-medium text-foreground">2 Configured</span>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="px-6 py-4 border-t border-border/50">
                  <Button variant="light" color="primary" className="w-full" size="sm" onClick={() => handleAction('manage_security')}>
                    Manage Security Rules
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </Tab>

        <Tab 
          key="console" 
          title={
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Console</span>
            </div>
          }
        >
          <div className="py-6">
            <Card className="border-border/50 bg-[#0c0c0c] shadow-sm overflow-hidden">
              <CardHeader className="px-4 py-2 border-b border-white/10 bg-[#1a1a1a] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs font-mono text-muted-foreground">root@{instance.name}:~</span>
                </div>
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-danger/80"></div>
                  <div className="w-3 h-3 rounded-full bg-warning/80"></div>
                  <div className="w-3 h-3 rounded-full bg-success/80"></div>
                </div>
              </CardHeader>
              <CardBody className="p-6 h-[500px] font-mono text-sm text-green-400 overflow-y-auto">
                <div className="space-y-1 opacity-80">
                  <p>Welcome to Ubuntu 22.04.2 LTS (GNU/Linux 5.15.0-76-generic x86_64)</p>
                  <p className="mt-4"> * Documentation:  https://help.ubuntu.com</p>
                  <p> * Management:     https://landscape.canonical.com</p>
                  <p> * Support:        https://ubuntu.com/advantage</p>
                  <p className="mt-4">System information as of {new Date().toUTCString()}</p>
                  <div className="grid grid-cols-2 gap-4 mt-2 max-w-md">
                    <p>System load:  0.08</p>
                    <p>Processes:    112</p>
                    <p>Usage of /:   {MOCK_METRICS.storage}% of 50.00GB</p>
                    <p>Users logged in: 1</p>
                    <p>Memory usage: {MOCK_METRICS.ram}%</p>
                    <p>IPv4 address: {instance.ipAddress}</p>
                  </div>
                  <p className="mt-4">0 updates can be applied immediately.</p>
                  <p className="mt-4 text-white">Last login: {new Date(Date.now() - 86400000).toUTCString()} from 203.0.113.42</p>
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-green-400">root@{instance.name}:~#</span>
                    <span className="w-2 h-4 bg-white/80 animate-pulse"></span>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="px-4 py-3 border-t border-white/10 bg-[#1a1a1a]">
                <Button size="sm" variant="flat" color="default" className="text-white/70" onClick={() => handleAction('open_full_console')}>
                  Open in New Window
                </Button>
              </CardFooter>
            </Card>
          </div>
        </Tab>

        <Tab 
          key="settings" 
          title={
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Settings</span>
            </div>
          }
        >
          <div className="py-6 max-w-4xl space-y-8">
            
            {/* Configuration */}
            <Card className="border-border/50 bg-background/50 shadow-sm">
              <CardHeader className="px-6 py-4 border-b border-border/50">
                <h3 className="text-lg font-semibold text-foreground">Instance Configuration</h3>
              </CardHeader>
              <CardBody className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border/50">
                  <div>
                    <h4 className="font-medium text-foreground">Instance Name</h4>
                    <p className="text-sm text-muted-foreground mt-1">Change the display name of this server.</p>
                  </div>
                  <Button variant="bordered" onClick={() => handleAction('rename')}>Rename Instance</Button>
                </div>
                
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-border/50">
                  <div>
                    <h4 className="font-medium text-foreground">Scale Plan</h4>
                    <p className="text-sm text-muted-foreground mt-1">Upgrade or downgrade your server resources. Requires a reboot.</p>
                  </div>
                  <Button color="primary" variant="flat" onClick={() => handleAction('resize')}>Resize Instance</Button>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-medium text-foreground">Rebuild OS</h4>
                    <p className="text-sm text-muted-foreground mt-1">Wipe the server and install a fresh operating system.</p>
                  </div>
                  <Button color="warning" variant="flat" onClick={() => handleAction('rebuild')}>Rebuild Server</Button>
                </div>
              </CardBody>
            </Card>

            {/* Danger Zone */}
            <Card className="border-danger/30 bg-danger/5 shadow-sm">
              <CardHeader className="px-6 py-4 border-b border-danger/20">
                <div className="flex items-center gap-2 text-danger">
                  <AlertTriangle className="w-5 h-5" />
                  <h3 className="text-lg font-semibold">Danger Zone</h3>
                </div>
              </CardHeader>
              <CardBody className="p-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h4 className="font-medium text-foreground">Delete Instance</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Permanently destroy this instance and all associated data. This action cannot be undone.
                    </p>
                  </div>
                  <Button 
                    color="danger" 
                    startContent={<Trash2 className="w-4 h-4" />}
                    onClick={() => handleAction('delete')}
                    className="font-medium"
                  >
                    Delete Instance
                  </Button>
                </div>
              </CardBody>
            </Card>

          </div>
        </Tab>
      </Tabs>

      {/* DB Connection Required Modal */}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Action Unavailable</ModalHeader>
              <ModalBody>
                <div className="flex flex-col items-center justify-center py-4 text-center gap-4">
                  <div className="w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-2">
                    <Database className="w-8 h-8 text-amber-500" />
                  </div>
                  <p className="text-foreground font-medium text-lg">Database Connection Required</p>
                  <p className="text-muted-foreground text-sm">
                    This action requires a live database connection to persist changes. Please connect your MongoDB database in the Integrations tab to enable full functionality.
                  </p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="default" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="warning" onPress={onClose}>
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