import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Tabs,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Progress,
  Avatar
} from '@heroui/react';
import { 
  Server, 
  CreditCard, 
  LifeBuoy, 
  Settings, 
  MoreVertical, 
  Play, 
  Square, 
  RefreshCw,
  AlertCircle,
  Database,
  Activity,
  Cpu,
  HardDrive
} from 'lucide-react';
import { getActiveServices, getTickets, IS_DB_CONNECTED } from '../db';
import { ActiveService, Ticket } from '../types';
import { formatCurrency, formatDate } from '../utils';

export function DashboardPage(): JSX.Element {
  const [services, setServices] = useState<ActiveService[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<string>("overview");

  // Mock user ID for demonstration
  const MOCK_USER_ID = "user_123";

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      try {
        const [servicesData, ticketsData] = await Promise.all([
          getActiveServices(MOCK_USER_ID),
          getTickets(MOCK_USER_ID)
        ]);
        setServices(servicesData);
        setTickets(ticketsData);
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active': return 'success';
      case 'suspended': return 'danger';
      case 'pending': return 'warning';
      case 'cancelled': return 'default';
      case 'open': return 'primary';
      case 'in-progress': return 'warning';
      case 'closed': return 'default';
      default: return 'default';
    }
  };

  const renderServicesTable = () => (
    <Table aria-label="Active Services" className="bg-background shadow-sm border border-border rounded-2xl">
      <TableHeader>
        <TableColumn>SERVICE</TableColumn>
        <TableColumn>IP ADDRESS</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>NEXT BILLING</TableColumn>
        <TableColumn align="end">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No active services found."} items={services}>
        {(service) => (
          <TableRow key={service._id} className="border-b border-border/50 last:border-none hover:bg-surface/50 transition-colors">
            <TableCell>
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 p-2 rounded-lg text-primary">
                  <Server size={20} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{service.planName}</p>
                  <p className="text-xs text-muted">{service.domain || 'No domain assigned'}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="font-mono text-sm text-muted-foreground">
              {service.ipAddress || 'Pending Allocation'}
            </TableCell>
            <TableCell>
              <Chip size="sm" color={getStatusColor(service.status)} variant="flat" className="capitalize">
                {service.status}
              </Chip>
            </TableCell>
            <TableCell>
              <div className="flex flex-col">
                <span className="text-sm">{formatDate(service.nextBillingDate)}</span>
                <span className="text-xs text-muted">{formatCurrency(service.billingAmount)} / {service.billingCycle}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex justify-end items-center gap-2">
                <Button size="sm" variant="flat" color="primary">Manage</Button>
                <Dropdown>
                  <DropdownTrigger>
                    <Button isIconOnly size="sm" variant="light">
                      <MoreVertical size={16} className="text-muted" />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu aria-label="Service Actions">
                    <DropdownItem key="restart" startContent={<RefreshCw size={14} />}>Restart Server</DropdownItem>
                    <DropdownItem key="stop" startContent={<Square size={14} />} className="text-danger" color="danger">Stop Server</DropdownItem>
                    <DropdownItem key="upgrade" startContent={<Activity size={14} />}>Upgrade Plan</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  const renderTicketsTable = () => (
    <Table aria-label="Support Tickets" className="bg-background shadow-sm border border-border rounded-2xl">
      <TableHeader>
        <TableColumn>SUBJECT</TableColumn>
        <TableColumn>DEPARTMENT</TableColumn>
        <TableColumn>STATUS</TableColumn>
        <TableColumn>LAST UPDATED</TableColumn>
        <TableColumn align="end">ACTIONS</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No support tickets found."} items={tickets}>
        {(ticket) => (
          <TableRow key={ticket._id} className="border-b border-border/50 last:border-none hover:bg-surface/50 transition-colors">
            <TableCell>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{ticket.subject}</span>
                <span className="text-xs text-muted">#{ticket._id.substring(0, 8).toUpperCase()}</span>
              </div>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground capitalize">
              {ticket.department}
            </TableCell>
            <TableCell>
              <Chip size="sm" color={getStatusColor(ticket.status)} variant="flat" className="capitalize">
                {ticket.status}
              </Chip>
            </TableCell>
            <TableCell className="text-sm text-muted-foreground">
              {formatDate(ticket.updatedAt)}
            </TableCell>
            <TableCell>
              <div className="flex justify-end">
                <Button size="sm" variant="bordered">View Ticket</Button>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <div className="flex flex-col min-h-screen bg-surface/30 pb-24">
      {/* Integration Banner */}
      {!IS_DB_CONNECTED && (
        <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-warning-600 dark:text-warning-500">
              <Database size={20} className="shrink-0" />
              <p className="text-sm font-medium">
                Database not connected. Displaying mock data. Connect your database in the Integrations tab to manage real services.
              </p>
            </div>
            <Button size="sm" color="warning" variant="flat" className="shrink-0 font-semibold">
              Connect Database
            </Button>
          </div>
        </div>
      )}

      {/* Dashboard Header */}
      <header className="bg-background border-b border-border pt-12 pb-8 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar 
              src="https://placehold.co/150x150.png?text=JD" 
              size="lg" 
              isBordered 
              color="primary"
              className="w-16 h-16 text-large"
            />
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">Welcome back, John</h1>
              <p className="text-muted mt-1">Manage your infrastructure and billing.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Button color="primary" startContent={<Server size={18} />}>
              Deploy New Server
            </Button>
            <Button variant="bordered" startContent={<LifeBuoy size={18} />}>
              Get Support
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8 w-full flex-1">
        <Tabs 
          aria-label="Dashboard Navigation" 
          selectedKey={activeTab} 
          onSelectionChange={(key) => setActiveTab(key as string)}
          color="primary"
          variant="underlined"
          classNames={{
            tabList: "gap-6 w-full relative rounded-none p-0 border-b border-border",
            cursor: "w-full bg-primary",
            tab: "max-w-fit px-0 h-12",
            tabContent: "group-data-[selected=true]:text-primary font-medium"
          }}
        >
          <Tab 
            key="overview" 
            title={
              <div className="flex items-center gap-2">
                <Activity size={18} />
                <span>Overview</span>
              </div>
            }
          >
            <div className="py-6 flex flex-col gap-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-background border border-border shadow-sm">
                  <CardBody className="p-6 flex flex-row items-center gap-4">
                    <div className="bg-primary/10 p-4 rounded-xl text-primary">
                      <Server size={24} />
                    </div>
                    <div>
                      <p className="text-muted text-sm font-medium">Active Services</p>
                      <p className="text-3xl font-bold">{isLoading ? '-' : services.filter(s => s.status === 'active').length}</p>
                    </div>
                  </CardBody>
                </Card>
                <Card className="bg-background border border-border shadow-sm">
                  <CardBody className="p-6 flex flex-row items-center gap-4">
                    <div className="bg-warning/10 p-4 rounded-xl text-warning">
                      <CreditCard size={24} />
                    </div>
                    <div>
                      <p className="text-muted text-sm font-medium">Unpaid Invoices</p>
                      <p className="text-3xl font-bold">1</p>
                    </div>
                  </CardBody>
                </Card>
                <Card className="bg-background border border-border shadow-sm">
                  <CardBody className="p-6 flex flex-row items-center gap-4">
                    <div className="bg-success/10 p-4 rounded-xl text-success">
                      <LifeBuoy size={24} />
                    </div>
                    <div>
                      <p className="text-muted text-sm font-medium">Open Tickets</p>
                      <p className="text-3xl font-bold">{isLoading ? '-' : tickets.filter(t => t.status !== 'closed').length}</p>
                    </div>
                  </CardBody>
                </Card>
              </div>

              {/* Resource Usage Preview */}
              <Card className="bg-background border border-border shadow-sm">
                <CardHeader className="px-6 pt-6 pb-0">
                  <h3 className="text-lg font-semibold">Overall Resource Usage</h3>
                </CardHeader>
                <CardBody className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Cpu size={16} className="text-muted" /> CPU Usage
                        </div>
                        <span className="text-sm font-bold">45%</span>
                      </div>
                      <Progress value={45} color="primary" size="sm" aria-label="CPU Usage" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <Server size={16} className="text-muted" /> RAM Usage
                        </div>
                        <span className="text-sm font-bold">6.2 / 16 GB</span>
                      </div>
                      <Progress value={38} color="secondary" size="sm" aria-label="RAM Usage" />
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          <HardDrive size={16} className="text-muted" /> Storage
                        </div>
                        <span className="text-sm font-bold">120 / 500 GB</span>
                      </div>
                      <Progress value={24} color="success" size="sm" aria-label="Storage Usage" />
                    </div>
                  </div>
                </CardBody>
              </Card>

              {/* Recent Services Preview */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">Recent Services</h3>
                  <Button size="sm" variant="light" color="primary" onPress={() => setActiveTab("services")}>
                    View All
                  </Button>
                </div>
                {isLoading ? (
                  <div className="flex justify-center py-12"><Spinner color="primary" /></div>
                ) : (
                  renderServicesTable()
                )}
              </div>
            </div>
          </Tab>

          <Tab 
            key="services" 
            title={
              <div className="flex items-center gap-2">
                <Server size={18} />
                <span>My Services</span>
              </div>
            }
          >
            <div className="py-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Active Infrastructure</h2>
                <Button color="primary" startContent={<Server size={16} />}>Deploy New</Button>
              </div>
              {isLoading ? (
                <div className="flex justify-center py-12"><Spinner color="primary" /></div>
              ) : (
                renderServicesTable()
              )}
            </div>
          </Tab>

          <Tab 
            key="billing" 
            title={
              <div className="flex items-center gap-2">
                <CreditCard size={18} />
                <span>Billing</span>
              </div>
            }
          >
            <div className="py-6 flex flex-col gap-6">
              <Card className="bg-warning/10 border border-warning/20 shadow-none">
                <CardBody className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="bg-warning/20 p-3 rounded-full text-warning-600">
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-warning-700 dark:text-warning-500">Payment Due</h4>
                      <p className="text-sm text-warning-600/80 dark:text-warning-500/80">Invoice #INV-2026-041 is due in 3 days.</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-2xl font-bold text-warning-700 dark:text-warning-500">$45.00</span>
                    <Button color="warning" variant="shadow">Pay Now</Button>
                  </div>
                </CardBody>
              </Card>

              <h3 className="text-lg font-semibold mt-4">Recent Invoices</h3>
              <Table aria-label="Invoices" className="bg-background shadow-sm border border-border rounded-2xl">
                <TableHeader>
                  <TableColumn>INVOICE</TableColumn>
                  <TableColumn>DATE</TableColumn>
                  <TableColumn>AMOUNT</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn align="end">ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-b border-border/50">
                    <TableCell className="font-medium">#INV-2026-041</TableCell>
                    <TableCell>{formatDate(new Date().toISOString())}</TableCell>
                    <TableCell>{formatCurrency(45.00)}</TableCell>
                    <TableCell><Chip size="sm" color="warning" variant="flat">Unpaid</Chip></TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button size="sm" variant="light" color="primary">Download PDF</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">#INV-2026-032</TableCell>
                    <TableCell>{formatDate(new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())}</TableCell>
                    <TableCell>{formatCurrency(45.00)}</TableCell>
                    <TableCell><Chip size="sm" color="success" variant="flat">Paid</Chip></TableCell>
                    <TableCell>
                      <div className="flex justify-end">
                        <Button size="sm" variant="light" color="primary">Download PDF</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Tab>

          <Tab 
            key="support" 
            title={
              <div className="flex items-center gap-2">
                <LifeBuoy size={18} />
                <span>Support</span>
              </div>
            }
          >
            <div className="py-6 flex flex-col gap-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Support Tickets</h2>
                <Button as={RouterLink} to="/contact" color="primary" startContent={<LifeBuoy size={16} />}>
                  Open Ticket
                </Button>
              </div>
              {isLoading ? (
                <div className="flex justify-center py-12"><Spinner color="primary" /></div>
              ) : (
                renderTicketsTable()
              )}
            </div>
          </Tab>

          <Tab 
            key="settings" 
            title={
              <div className="flex items-center gap-2">
                <Settings size={18} />
                <span>Settings</span>
              </div>
            }
          >
            <div className="py-6">
              <Card className="bg-background border border-border shadow-sm max-w-2xl">
                <CardHeader className="px-6 pt-6 pb-2">
                  <h3 className="text-lg font-semibold">Account Settings</h3>
                </CardHeader>
                <CardBody className="px-6 pb-6 flex flex-col gap-6">
                  <div className="flex items-center justify-between py-4 border-b border-border/50">
                    <div>
                      <p className="font-medium">Email Address</p>
                      <p className="text-sm text-muted">john.doe@example.com</p>
                    </div>
                    <Button size="sm" variant="bordered">Change</Button>
                  </div>
                  <div className="flex items-center justify-between py-4 border-b border-border/50">
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted">Last changed 3 months ago</p>
                    </div>
                    <Button size="sm" variant="bordered">Update</Button>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <p className="font-medium">Two-Factor Authentication</p>
                      <p className="text-sm text-muted">Secure your account with 2FA</p>
                    </div>
                    <Button size="sm" color="success" variant="flat">Enable 2FA</Button>
                  </div>
                </CardBody>
              </Card>
            </div>
          </Tab>
        </Tabs>
      </main>
    </div>
  );
}