import React, { useEffect, useState } from 'react';
import { 
  Button, 
  Card, 
  CardHeader, 
  CardBody, 
  Chip, 
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tabs,
  Tab,
  Progress,
  Spinner,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem
} from '@heroui/react';
import { ActiveService, User } from '../types';
import { getUserServices, IS_DB_CONNECTED } from '../db';
import { formatDate, getStatusColor } from '../utils';

export interface DashboardPageProps {
  onNavigate: (path: string) => void;
}

// Static fallback data to keep the UI functional when the database is not connected
const fallbackServices: ActiveService[] = [
  {
    id: 'srv_1',
    userId: 'user_1',
    planId: 'plan_vps_1',
    name: 'prod-web-01',
    type: 'VPS',
    status: 'Active',
    ipAddress: '198.51.100.24',
    region: 'New York (US-East)',
    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString(), // 15 days from now
    autoRenew: true,
    usage: { cpu: 45, ram: 62, storage: 28 }
  },
  {
    id: 'srv_2',
    userId: 'user_1',
    planId: 'plan_shared_1',
    name: 'dev-blog-staging',
    type: 'Shared',
    status: 'Active',
    ipAddress: '198.51.100.89',
    region: 'London (UK-South)',
    nextBillingDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), // 5 days from now
    autoRenew: true,
    usage: { cpu: 12, ram: 35, storage: 85 }
  },
  {
    id: 'srv_3',
    userId: 'user_1',
    planId: 'plan_dedi_1',
    name: 'db-cluster-main',
    type: 'Dedicated',
    status: 'Provisioning',
    region: 'Frankfurt (EU-Central)',
    nextBillingDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
    autoRenew: true,
    usage: { cpu: 0, ram: 0, storage: 0 }
  },
  {
    id: 'srv_4',
    userId: 'user_1',
    planId: 'plan_vps_2',
    name: 'legacy-app-server',
    type: 'VPS',
    status: 'Suspended',
    ipAddress: '203.0.113.42',
    region: 'Singapore (AP-Southeast)',
    nextBillingDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), // Past due
    autoRenew: false,
    usage: { cpu: 0, ram: 0, storage: 45 }
  }
];

export function DashboardPage({ onNavigate }: DashboardPageProps): JSX.Element {
  const [services, setServices] = useState<ActiveService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState<string>("services");

  // Mock user for the dashboard header
  const mockUser: User = {
    id: 'user_1',
    email: 'admin@example.com',
    name: 'Alex Developer',
    role: 'client',
    createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString()
  };

  useEffect(() => {
    async function loadDashboardData() {
      setIsLoading(true);
      if (IS_DB_CONNECTED) {
        try {
          // In a real app, we'd get the current user ID from auth context
          const response = await getUserServices(mockUser.id);
          if (response.documents && response.documents.length > 0) {
            setServices(response.documents);
          } else {
            setServices(fallbackServices);
          }
        } catch (error) {
          console.error("Failed to load services:", error);
          setServices(fallbackServices);
        }
      } else {
        // Use static fallback data if DB is not connected
        setServices(fallbackServices);
      }
      setIsLoading(false);
    }

    loadDashboardData();
  }, []);

  const activeCount = services.filter(s => s.status === 'Active').length;
  const pendingCount = services.filter(s => s.status === 'Provisioning' || s.status === 'Pending').length;

  const renderUsageBar = (value: number, label: string) => {
    const color = value > 80 ? "danger" : value > 60 ? "warning" : "success";
    return (
      <div className="w-full max-w-[120px]">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-[#8892B0]">{label}</span>
          <span className="text-[#CCD6F6]">{value}%</span>
        </div>
        <Progress 
          value={value} 
          color={color} 
          size="sm" 
          classNames={{
            track: "bg-[#233554]",
            indicator: value > 80 ? "bg-[#FF6B6B]" : value > 60 ? "bg-[#f1c40f]" : "bg-[#64FFDA]"
          }}
        />
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0A192F] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#CCD6F6] mb-2">Welcome back, {mockUser.name.split(' ')[0]}</h1>
            <p className="text-[#8892B0]">Manage your infrastructure and monitor performance.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="bordered" 
              className="border-[#233554] text-[#CCD6F6] hover:bg-[#112240]"
              onPress={() => onNavigate('/support')}
            >
              Support Tickets
            </Button>
            <Button 
              color="primary" 
              className="bg-[#64FFDA] text-[#0A192F] font-semibold"
              onPress={() => onNavigate('/pricing')}
              startContent={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              Deploy New Service
            </Button>
          </div>
        </div>

        {/* Database Connection Warning */}
        {!IS_DB_CONNECTED && (
          <Card className="bg-[#233554]/50 border border-[#f1c40f]/30 mb-8 shadow-none">
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="w-10 h-10 rounded-full bg-[#f1c40f]/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-[#f1c40f]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h4 className="text-[#CCD6F6] font-semibold text-sm mb-1">Preview Mode Active</h4>
                <p className="text-[#8892B0] text-sm">
                  You are viewing static dashboard data. To enable real-time service management, please connect your MongoDB integration.
                </p>
              </div>
              <Button 
                size="sm" 
                variant="flat" 
                className="bg-[#f1c40f]/20 text-[#f1c40f] font-medium shrink-0"
              >
                Connect Database
              </Button>
            </CardBody>
          </Card>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-[#112240] border border-[#233554] shadow-none">
            <CardBody className="p-6 flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#64FFDA]/10 flex items-center justify-center text-[#64FFDA]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
                </svg>
              </div>
              <div>
                <p className="text-[#8892B0] text-sm font-medium">Total Services</p>
                <p className="text-2xl font-bold text-[#CCD6F6]">{services.length}</p>
              </div>
            </CardBody>
          </Card>
          
          <Card className="bg-[#112240] border border-[#233554] shadow-none">
            <CardBody className="p-6 flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#2ecc71]/10 flex items-center justify-center text-[#2ecc71]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[#8892B0] text-sm font-medium">Active Instances</p>
                <p className="text-2xl font-bold text-[#CCD6F6]">{activeCount}</p>
              </div>
            </CardBody>
          </Card>

          <Card className="bg-[#112240] border border-[#233554] shadow-none">
            <CardBody className="p-6 flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#f1c40f]/10 flex items-center justify-center text-[#f1c40f]">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <p className="text-[#8892B0] text-sm font-medium">Provisioning</p>
                <p className="text-2xl font-bold text-[#CCD6F6]">{pendingCount}</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content Area */}
        <Card className="bg-[#112240] border border-[#233554] shadow-none overflow-hidden">
          <CardHeader className="px-6 pt-6 pb-0 border-b border-[#233554]">
            <Tabs 
              selectedKey={selectedTab} 
              onSelectionChange={(key) => setSelectedTab(key as string)}
              variant="underlined"
              classNames={{
                tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
                cursor: "w-full bg-[#64FFDA]",
                tab: "max-w-fit px-0 h-12",
                tabContent: "group-data-[selected=true]:text-[#64FFDA] text-[#8892B0]"
              }}
            >
              <Tab key="services" title="Active Services" />
              <Tab key="billing" title="Billing & Invoices" />
              <Tab key="settings" title="Account Settings" />
            </Tabs>
          </CardHeader>
          
          <CardBody className="p-0">
            {selectedTab === "services" && (
              <div className="w-full overflow-x-auto">
                {isLoading ? (
                  <div className="flex justify-center items-center py-20">
                    <Spinner size="lg" color="primary" />
                  </div>
                ) : services.length === 0 ? (
                  <div className="text-center py-20 px-6">
                    <div className="w-16 h-16 mx-auto bg-[#233554] rounded-full flex items-center justify-center mb-4">
                      <svg className="w-8 h-8 text-[#8892B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-[#CCD6F6] mb-2">No active services</h3>
                    <p className="text-[#8892B0] mb-6 max-w-md mx-auto">
                      You don't have any active hosting plans yet. Deploy your first server to get started.
                    </p>
                    <Button 
                      color="primary" 
                      className="bg-[#64FFDA] text-[#0A192F] font-semibold"
                      onPress={() => onNavigate('/pricing')}
                    >
                      View Hosting Plans
                    </Button>
                  </div>
                ) : (
                  <Table 
                    aria-label="Active services table"
                    classNames={{
                      base: "min-w-full",
                      table: "min-w-full",
                      wrapper: "bg-transparent p-0 shadow-none rounded-none",
                      th: "bg-[#0A192F] text-[#8892B0] font-medium text-xs uppercase tracking-wider py-4 px-6 border-b border-[#233554]",
                      td: "py-4 px-6 border-b border-[#233554]/50 text-[#CCD6F6]",
                    }}
                  >
                    <TableHeader>
                      <TableColumn>SERVICE</TableColumn>
                      <TableColumn>STATUS</TableColumn>
                      <TableColumn>REGION & IP</TableColumn>
                      <TableColumn>USAGE</TableColumn>
                      <TableColumn>NEXT BILLING</TableColumn>
                      <TableColumn align="end">ACTIONS</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {services.map((service) => (
                        <TableRow key={service.id} className="hover:bg-[#233554]/30 transition-colors">
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="font-semibold text-[#CCD6F6]">{service.name}</span>
                              <span className="text-xs text-[#8892B0]">{service.type} Hosting</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              size="sm" 
                              color={getStatusColor(service.status)}
                              variant="flat"
                              className="capitalize"
                            >
                              {service.status}
                            </Chip>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm text-[#CCD6F6]">{service.region}</span>
                              <span className="text-xs text-[#8892B0] font-mono mt-1">
                                {service.ipAddress || 'Assigning IP...'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {service.status === 'Active' && service.usage ? (
                              <div className="flex flex-col gap-2">
                                {renderUsageBar(service.usage.cpu, 'CPU')}
                                {renderUsageBar(service.usage.ram, 'RAM')}
                              </div>
                            ) : (
                              <span className="text-sm text-[#8892B0] italic">N/A</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-col">
                              <span className="text-sm text-[#CCD6F6]">{formatDate(service.nextBillingDate)}</span>
                              <span className="text-xs text-[#8892B0] mt-1">
                                {service.autoRenew ? 'Auto-renews' : 'Manual renewal'}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex justify-end">
                              <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                  <Button isIconOnly variant="light" className="text-[#8892B0] hover:text-[#CCD6F6]">
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                                    </svg>
                                  </Button>
                                </DropdownTrigger>
                                <DropdownMenu 
                                  aria-label="Service actions"
                                  className="bg-[#112240] border border-[#233554] text-[#CCD6F6]"
                                >
                                  <DropdownItem key="manage" className="hover:bg-[#233554]">Manage Service</DropdownItem>
                                  <DropdownItem key="console" className="hover:bg-[#233554]">Open Console</DropdownItem>
                                  <DropdownItem key="restart" className="hover:bg-[#233554]">Restart Server</DropdownItem>
                                  <DropdownItem key="upgrade" className="hover:bg-[#233554] text-[#64FFDA]">Upgrade Plan</DropdownItem>
                                  <DropdownItem key="cancel" className="text-[#FF6B6B] hover:bg-[#FF6B6B]/10">Cancel Service</DropdownItem>
                                </DropdownMenu>
                              </Dropdown>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </div>
            )}

            {selectedTab === "billing" && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-[#233554] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#8892B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#CCD6F6] mb-2">Billing History</h3>
                <p className="text-[#8892B0] mb-6 max-w-md mx-auto">
                  View your past invoices, manage payment methods, and update your billing address.
                </p>
                <Button variant="bordered" className="border-[#233554] text-[#CCD6F6]">
                  Manage Payment Methods
                </Button>
              </div>
            )}

            {selectedTab === "settings" && (
              <div className="p-8 text-center">
                <div className="w-16 h-16 mx-auto bg-[#233554] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#8892B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#CCD6F6] mb-2">Account Settings</h3>
                <p className="text-[#8892B0] mb-6 max-w-md mx-auto">
                  Update your profile, configure security settings like 2FA, and manage API keys.
                </p>
                <Button variant="bordered" className="border-[#233554] text-[#CCD6F6]">
                  Edit Profile
                </Button>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}