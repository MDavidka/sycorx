import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Skeleton,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@heroui/react";
import { 
  Server, 
  Play, 
  Square, 
  RefreshCw, 
  Trash2, 
  MoreVertical, 
  Activity,
  Plus,
  Database,
  AlertCircle
} from "lucide-react";
import { getInstances, IS_DB_CONNECTED } from "../db";
import { Instance, InstanceStatus } from "../types";
import { formatDate } from "../utils";

// Mock data for when DB is not connected
const MOCK_INSTANCES: Instance[] = [
  {
    id: "inst_1a2b3c",
    userId: "user_1",
    name: "prod-web-server",
    planId: "plan_pro",
    status: "running",
    region: "us-east-1",
    ipAddress: "198.51.100.23",
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "inst_4d5e6f",
    userId: "user_1",
    name: "staging-api",
    planId: "plan_starter",
    status: "stopped",
    region: "eu-west-1",
    ipAddress: "198.51.100.45",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "inst_7g8h9i",
    userId: "user_1",
    name: "db-replica-01",
    planId: "plan_dedicated",
    status: "starting",
    region: "us-east-1",
    ipAddress: "198.51.100.89",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

const columns = [
  { name: "INSTANCE", uid: "name" },
  { name: "STATUS", uid: "status" },
  { name: "IP ADDRESS", uid: "ipAddress" },
  { name: "REGION", uid: "region" },
  { name: "CREATED", uid: "createdAt" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<InstanceStatus, "success" | "danger" | "warning" | "default"> = {
  running: "success",
  stopped: "default",
  starting: "warning",
  error: "danger",
  pending: "warning",
};

export function DashboardPage() {
  const [instances, setInstances] = useState<Instance[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function fetchInstances() {
      setIsLoading(true);
      if (IS_DB_CONNECTED) {
        try {
          // In a real app, we'd get the user ID from auth context
          const response = await getInstances("user_1");
          if (response.data) {
            setInstances(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch instances:", error);
        }
      } else {
        // Simulate network delay for mock data
        setTimeout(() => {
          setInstances(MOCK_INSTANCES);
          setIsLoading(false);
        }, 800);
        return;
      }
      setIsLoading(false);
    }

    fetchInstances();
  }, []);

  const navigateTo = (path: string) => {
    window.history.pushState({}, "", path);
    window.dispatchEvent(new Event("popstate"));
  };

  const handleAction = (action: string, instanceId: string) => {
    if (!IS_DB_CONNECTED) {
      onOpen();
      return;
    }
    console.log(`Action ${action} triggered for instance ${instanceId}`);
    // Implement actual action logic here when DB is connected
  };

  const renderCell = useCallback((instance: Instance, columnKey: React.Key) => {
    switch (columnKey) {
      case "name":
        return (
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-foreground cursor-pointer hover:text-primary transition-colors" onClick={() => navigateTo(`/instance/${instance.id}`)}>
              {instance.name}
            </p>
            <p className="text-xs text-muted-foreground">{instance.id}</p>
          </div>
        );
      case "status":
        return (
          <Chip 
            className="capitalize" 
            color={statusColorMap[instance.status]} 
            size="sm" 
            variant="flat"
          >
            {instance.status}
          </Chip>
        );
      case "ipAddress":
        return (
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground font-mono">{instance.ipAddress || "Unassigned"}</span>
          </div>
        );
      case "region":
        return (
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-foreground">{instance.region}</span>
          </div>
        );
      case "createdAt":
        return (
          <span className="text-sm text-muted-foreground">
            {formatDate(instance.createdAt)}
          </span>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <MoreVertical className="text-muted-foreground w-4 h-4" />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Instance Actions" onAction={(key) => handleAction(key.toString(), instance.id)}>
                <DropdownItem key="view" startContent={<Activity className="w-4 h-4" />} onClick={() => navigateTo(`/instance/${instance.id}`)}>
                  View Details
                </DropdownItem>
                <DropdownItem key="start" startContent={<Play className="w-4 h-4" />} className={instance.status === 'running' ? 'hidden' : ''}>
                  Start Instance
                </DropdownItem>
                <DropdownItem key="stop" startContent={<Square className="w-4 h-4" />} className={instance.status !== 'running' ? 'hidden' : ''}>
                  Stop Instance
                </DropdownItem>
                <DropdownItem key="restart" startContent={<RefreshCw className="w-4 h-4" />}>
                  Restart
                </DropdownItem>
                <DropdownItem key="delete" className="text-danger" color="danger" startContent={<Trash2 className="w-4 h-4" />}>
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return null;
    }
  }, []);

  const activeInstances = instances.filter(i => i.status === 'running').length;
  const totalInstances = instances.length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full min-h-[calc(100vh-4rem)]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Manage your cloud infrastructure and instances.</p>
        </div>
        <Button 
          color="primary" 
          startContent={<Plus className="w-4 h-4" />}
          onClick={() => !IS_DB_CONNECTED ? onOpen() : console.log('Deploy modal')}
          className="font-medium"
        >
          Deploy Instance
        </Button>
      </div>

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
                Database integration is not connected. Displaying mock data. Connect a database in the Integrations tab to enable live instance management.
              </p>
            </div>
            <Button size="sm" color="warning" variant="flat" className="shrink-0 font-medium">
              Connect Database
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-border/50 bg-background/50 shadow-sm">
          <CardBody className="p-6 flex flex-row items-center gap-4">
            <div className="p-3 bg-primary/10 rounded-lg">
              <Server className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Instances</p>
              {isLoading ? <Skeleton className="h-8 w-16 mt-1 rounded-md" /> : <p className="text-2xl font-bold text-foreground">{totalInstances}</p>}
            </div>
          </CardBody>
        </Card>
        
        <Card className="border-border/50 bg-background/50 shadow-sm">
          <CardBody className="p-6 flex flex-row items-center gap-4">
            <div className="p-3 bg-success/10 rounded-lg">
              <Activity className="w-6 h-6 text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Active Instances</p>
              {isLoading ? <Skeleton className="h-8 w-16 mt-1 rounded-md" /> : <p className="text-2xl font-bold text-foreground">{activeInstances}</p>}
            </div>
          </CardBody>
        </Card>

        <Card className="border-border/50 bg-background/50 shadow-sm">
          <CardBody className="p-6 flex flex-row items-center gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <AlertCircle className="w-6 h-6 text-foreground" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">System Status</p>
              <p className="text-2xl font-bold text-foreground flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-success"></span>
                All Systems Operational
              </p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Instances Table */}
      <Card className="border-border/50 bg-background/50 shadow-sm">
        <CardHeader className="px-6 py-4 border-b border-border/50">
          <h2 className="text-lg font-semibold text-foreground">Your Instances</h2>
        </CardHeader>
        <CardBody className="p-0">
          <Table 
            aria-label="Instances management table"
            classNames={{
              wrapper: "bg-transparent shadow-none p-0 rounded-none",
              th: "bg-secondary/50 text-muted-foreground text-xs font-semibold tracking-wider uppercase px-6 py-4",
              td: "px-6 py-4 border-b border-border/50",
              tr: "hover:bg-secondary/20 transition-colors group"
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody 
              items={instances} 
              isLoading={isLoading}
              loadingContent={<Skeleton className="w-full h-[300px] rounded-none" />}
              emptyContent={
                <div className="py-12 text-center">
                  <Server className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">No instances found</p>
                  <p className="text-muted-foreground text-sm mt-1 mb-6">You don't have any active servers yet.</p>
                  <Button color="primary" startContent={<Plus className="w-4 h-4" />}>
                    Deploy Your First Instance
                  </Button>
                </div>
              }
            >
              {(item) => (
                <TableRow key={item.id}>
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>

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