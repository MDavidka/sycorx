import React, { useEffect, useState, useRef } from 'react';
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Textarea,
  Select,
  SelectItem,
  Spinner,
  Avatar,
  useDisclosure
} from '@heroui/react';
import { Ticket, TicketMessage, User, TicketPriority, TicketStatus } from '../types';
import { getUserTickets, createSupportTicket, addTicketMessage, IS_DB_CONNECTED } from '../db';
import { formatDate, formatDateTime, getStatusColor, generateId } from '../utils';

export interface SupportPageProps {
  onNavigate: (path: string) => void;
}

// Mock user for the support portal
const mockUser: User = {
  id: 'user_1',
  email: 'admin@example.com',
  name: 'Alex Developer',
  role: 'Customer',
  createdAt: new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString(),
  activeServices: []
};

// Static fallback data to keep the UI functional when the database is not connected
const fallbackTickets: Ticket[] = [
  {
    id: 'tkt_1042',
    userId: 'user_1',
    subject: 'Cannot connect to database cluster from external IP',
    status: 'Open',
    priority: 'High',
    relatedServiceId: 'srv_3',
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updatedAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // 15 mins ago
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_1',
        senderName: 'Alex Developer',
        isAdmin: false,
        content: 'Hi, I recently provisioned a new dedicated database cluster (db-cluster-main) but I am unable to connect to it from my office IP address. I have already added the IP to the firewall rules in the dashboard. Can you please check if there is a routing issue?',
        createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'msg_2',
        senderId: 'admin_1',
        senderName: 'Sarah (Support)',
        isAdmin: true,
        content: 'Hello Alex, thank you for reaching out. I am looking into the firewall configuration for db-cluster-main right now. It appears the rule propagation might have stalled. I am manually syncing the rules to the edge nodes now. Please give it about 5 minutes and try again.',
        createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'tkt_1038',
    userId: 'user_1',
    subject: 'Question about upgrading VPS plan',
    status: 'Resolved',
    priority: 'Low',
    relatedServiceId: 'srv_1',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 'msg_3',
        senderId: 'user_1',
        senderName: 'Alex Developer',
        isAdmin: false,
        content: 'I need to upgrade my Professional VPS to the next tier. Will there be any downtime during the upgrade process?',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      },
      {
        id: 'msg_4',
        senderId: 'admin_2',
        senderName: 'Mike (Support)',
        isAdmin: true,
        content: 'Hi Alex, upgrading your VPS plan requires a quick reboot to allocate the new CPU and RAM resources. The expected downtime is typically less than 2 minutes. You can schedule this upgrade from your dashboard at a time that works best for you.',
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  },
  {
    id: 'tkt_1021',
    userId: 'user_1',
    subject: 'Billing inquiry for last month',
    status: 'Closed',
    priority: 'Medium',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    messages: [
      {
        id: 'msg_5',
        senderId: 'user_1',
        senderName: 'Alex Developer',
        isAdmin: false,
        content: 'I noticed a slight increase in my bill for last month. Can you provide a breakdown?',
        createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
      }
    ]
  }
];

export function SupportPage({ onNavigate }: SupportPageProps): JSX.Element {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Detail Modal State
  const { isOpen: isDetailOpen, onOpen: onDetailOpen, onClose: onDetailClose } = useDisclosure();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyContent, setReplyContent] = useState('');
  const [isReplying, setIsReplying] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // New Ticket Modal State
  const { isOpen: isNewOpen, onOpen: onNewOpen, onClose: onNewClose } = useDisclosure();
  const [newSubject, setNewSubject] = useState('');
  const [newPriority, setNewPriority] = useState<TicketPriority>('Medium');
  const [newServiceId, setNewServiceId] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    loadTickets();
  }, []);

  // Scroll to bottom of messages when detail modal opens or new message added
  useEffect(() => {
    if (isDetailOpen && selectedTicket) {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [isDetailOpen, selectedTicket?.messages.length]);

  async function loadTickets() {
    setIsLoading(true);
    if (IS_DB_CONNECTED) {
      try {
        const response = await getUserTickets(mockUser.id);
        if (response.documents && response.documents.length > 0) {
          setTickets(response.documents);
        } else {
          setTickets(fallbackTickets);
        }
      } catch (error) {
        console.error("Failed to load tickets:", error);
        setTickets(fallbackTickets);
      }
    } else {
      setTickets(fallbackTickets);
    }
    setIsLoading(false);
  }

  const handleOpenTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    onDetailOpen();
  };

  const handleCreateTicket = async () => {
    if (!newSubject.trim() || !newMessage.trim()) return;
    
    setIsCreating(true);
    
    const newTicketData: Partial<Ticket> = {
      id: `tkt_${generateId()}`,
      userId: mockUser.id,
      subject: newSubject,
      status: 'Open',
      priority: newPriority,
      relatedServiceId: newServiceId || undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: `msg_${generateId()}`,
          senderId: mockUser.id,
          senderName: mockUser.name,
          isAdmin: false,
          content: newMessage,
          createdAt: new Date().toISOString()
        }
      ]
    };

    if (IS_DB_CONNECTED) {
      try {
        await createSupportTicket(newTicketData);
        await loadTickets();
      } catch (error) {
        console.error("Failed to create ticket:", error);
      }
    } else {
      // Optimistic update for preview mode
      setTickets([newTicketData as Ticket, ...tickets]);
    }

    // Reset form and close
    setNewSubject('');
    setNewPriority('Medium');
    setNewServiceId('');
    setNewMessage('');
    setIsCreating(false);
    onNewClose();
  };

  const handleReply = async () => {
    if (!replyContent.trim() || !selectedTicket) return;
    
    setIsReplying(true);
    
    const newMessageObj: TicketMessage = {
      id: `msg_${generateId()}`,
      senderId: mockUser.id,
      senderName: mockUser.name,
      isAdmin: false,
      content: replyContent,
      createdAt: new Date().toISOString()
    };

    if (IS_DB_CONNECTED) {
      try {
        await addTicketMessage(selectedTicket.id, replyContent, mockUser.id);
        // Reload tickets to get fresh data
        await loadTickets();
        // Update selected ticket locally to avoid closing modal
        setSelectedTicket(prev => prev ? {
          ...prev,
          updatedAt: new Date().toISOString(),
          messages: [...prev.messages, newMessageObj]
        } : null);
      } catch (error) {
        console.error("Failed to send reply:", error);
      }
    } else {
      // Optimistic update for preview mode
      const updatedTicket = {
        ...selectedTicket,
        updatedAt: new Date().toISOString(),
        messages: [...selectedTicket.messages, newMessageObj]
      };
      
      setSelectedTicket(updatedTicket);
      setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    }

    setReplyContent('');
    setIsReplying(false);
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0A192F] pt-24 pb-12">
      <div className="max-w-7xl mx-auto px-6 w-full">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#CCD6F6] mb-2">Support Center</h1>
            <p className="text-[#8892B0]">Manage your support tickets and communicate with our team.</p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="bordered" 
              className="border-[#233554] text-[#CCD6F6] hover:bg-[#112240]"
              onPress={() => onNavigate('/dashboard')}
            >
              Back to Dashboard
            </Button>
            <Button 
              color="primary" 
              className="bg-[#64FFDA] text-[#0A192F] font-semibold"
              onPress={onNewOpen}
              startContent={
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              }
            >
              New Ticket
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
                  You are viewing static support tickets. Any new tickets or replies will only exist locally until you connect your MongoDB integration.
                </p>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Tickets Table */}
        <Card className="bg-[#112240] border border-[#233554] shadow-none overflow-hidden">
          <CardBody className="p-0">
            {isLoading ? (
              <div className="flex justify-center items-center py-20">
                <Spinner size="lg" color="primary" />
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-20 px-6">
                <div className="w-16 h-16 mx-auto bg-[#233554] rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-[#8892B0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-[#CCD6F6] mb-2">No support tickets</h3>
                <p className="text-[#8892B0] mb-6 max-w-md mx-auto">
                  You don't have any open or past support tickets. If you need help, feel free to create one.
                </p>
                <Button 
                  color="primary" 
                  className="bg-[#64FFDA] text-[#0A192F] font-semibold"
                  onPress={onNewOpen}
                >
                  Create Ticket
                </Button>
              </div>
            ) : (
              <div className="w-full overflow-x-auto">
                <Table 
                  aria-label="Support tickets table"
                  classNames={{
                    base: "min-w-full",
                    table: "min-w-full",
                    wrapper: "bg-transparent p-0 shadow-none rounded-none",
                    th: "bg-[#0A192F] text-[#8892B0] font-medium text-xs uppercase tracking-wider py-4 px-6 border-b border-[#233554]",
                    td: "py-4 px-6 border-b border-[#233554]/50 text-[#CCD6F6]",
                  }}
                >
                  <TableHeader>
                    <TableColumn>TICKET ID</TableColumn>
                    <TableColumn>SUBJECT</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>PRIORITY</TableColumn>
                    <TableColumn>LAST UPDATED</TableColumn>
                    <TableColumn align="end">ACTION</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {tickets.map((ticket) => (
                      <TableRow key={ticket.id} className="hover:bg-[#233554]/30 transition-colors cursor-pointer" onClick={() => handleOpenTicket(ticket)}>
                        <TableCell>
                          <span className="font-mono text-sm text-[#8892B0]">{ticket.id}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium text-[#CCD6F6] line-clamp-1 max-w-xs md:max-w-md">
                            {ticket.subject}
                          </span>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="sm" 
                            color={getStatusColor(ticket.status)}
                            variant="flat"
                          >
                            {ticket.status}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            size="sm" 
                            color={getStatusColor(ticket.priority)}
                            variant="dot"
                            className="border-none bg-transparent px-0"
                          >
                            {ticket.priority}
                          </Chip>
                        </TableCell>
                        <TableCell>
                          <span className="text-sm text-[#8892B0]">
                            {formatDate(ticket.updatedAt)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <div className="flex justify-end">
                            <Button 
                              size="sm" 
                              variant="flat" 
                              className="bg-[#233554] text-[#CCD6F6] hover:bg-[#64FFDA] hover:text-[#0A192F]"
                              onPress={() => handleOpenTicket(ticket)}
                            >
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardBody>
        </Card>
      </div>

      {/* New Ticket Modal */}
      <Modal 
        isOpen={isNewOpen} 
        onClose={onNewClose}
        classNames={{
          base: "bg-[#112240] border border-[#233554]",
          header: "border-b border-[#233554] text-[#CCD6F6]",
          body: "py-6",
          footer: "border-t border-[#233554]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Create New Support Ticket</ModalHeader>
              <ModalBody>
                <div className="flex flex-col gap-4">
                  <Input 
                    label="Subject" 
                    placeholder="Brief description of the issue"
                    variant="bordered"
                    value={newSubject}
                    onValueChange={setNewSubject}
                    classNames={{
                      inputWrapper: "border-[#233554] hover:border-[#64FFDA] focus-within:border-[#64FFDA]",
                      label: "text-[#8892B0]",
                      input: "text-[#CCD6F6]"
                    }}
                  />
                  
                  <div className="flex gap-4">
                    <Select 
                      label="Priority" 
                      variant="bordered"
                      selectedKeys={[newPriority]}
                      onChange={(e) => setNewPriority(e.target.value as TicketPriority)}
                      className="flex-1"
                      classNames={{
                        trigger: "border-[#233554] hover:border-[#64FFDA]",
                        label: "text-[#8892B0]",
                        value: "text-[#CCD6F6]",
                        popoverContent: "bg-[#112240] border border-[#233554] text-[#CCD6F6]"
                      }}
                    >
                      <SelectItem key="Low" value="Low">Low</SelectItem>
                      <SelectItem key="Medium" value="Medium">Medium</SelectItem>
                      <SelectItem key="High" value="High">High</SelectItem>
                      <SelectItem key="Critical" value="Critical">Critical</SelectItem>
                    </Select>

                    <Input 
                      label="Related Service ID (Optional)" 
                      placeholder="e.g. srv_123"
                      variant="bordered"
                      value={newServiceId}
                      onValueChange={setNewServiceId}
                      className="flex-1"
                      classNames={{
                        inputWrapper: "border-[#233554] hover:border-[#64FFDA] focus-within:border-[#64FFDA]",
                        label: "text-[#8892B0]",
                        input: "text-[#CCD6F6]"
                      }}
                    />
                  </div>

                  <Textarea 
                    label="Message" 
                    placeholder="Please describe your issue in detail..."
                    variant="bordered"
                    minRows={5}
                    value={newMessage}
                    onValueChange={setNewMessage}
                    classNames={{
                      inputWrapper: "border-[#233554] hover:border-[#64FFDA] focus-within:border-[#64FFDA]",
                      label: "text-[#8892B0]",
                      input: "text-[#CCD6F6]"
                    }}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="light" className="text-[#8892B0]" onPress={onClose}>
                  Cancel
                </Button>
                <Button 
                  color="primary" 
                  className="bg-[#64FFDA] text-[#0A192F] font-semibold"
                  onPress={handleCreateTicket}
                  isLoading={isCreating}
                  isDisabled={!newSubject.trim() || !newMessage.trim()}
                >
                  Submit Ticket
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Ticket Detail Modal */}
      <Modal 
        isOpen={isDetailOpen} 
        onClose={onDetailClose}
        size="3xl"
        scrollBehavior="inside"
        classNames={{
          base: "bg-[#112240] border border-[#233554] h-[85vh]",
          header: "border-b border-[#233554] flex flex-col gap-1 pb-4",
          body: "p-0 bg-[#0A192F]/50",
          footer: "border-t border-[#233554] bg-[#112240] p-4"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>
                <div className="flex justify-between items-start w-full pr-6">
                  <div>
                    <h2 className="text-xl font-bold text-[#CCD6F6] mb-2">{selectedTicket?.subject}</h2>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="font-mono text-[#8892B0]">{selectedTicket?.id}</span>
                      <span className="text-[#233554]">|</span>
                      <span className="text-[#8892B0]">Created {selectedTicket ? formatDate(selectedTicket.createdAt) : ''}</span>
                      {selectedTicket?.relatedServiceId && (
                        <>
                          <span className="text-[#233554]">|</span>
                          <span className="text-[#8892B0]">Service: <span className="text-[#64FFDA]">{selectedTicket.relatedServiceId}</span></span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Chip size="sm" color={selectedTicket ? getStatusColor(selectedTicket.status) : 'default'} variant="flat">
                      {selectedTicket?.status}
                    </Chip>
                    <Chip size="sm" color={selectedTicket ? getStatusColor(selectedTicket.priority) : 'default'} variant="dot" className="border-none bg-transparent px-0">
                      {selectedTicket?.priority} Priority
                    </Chip>
                  </div>
                </div>
              </ModalHeader>
              
              <ModalBody>
                <div className="flex flex-col gap-6 p-6">
                  {selectedTicket?.messages.map((msg) => (
                    <div 
                      key={msg.id} 
                      className={`flex gap-4 max-w-[85%] ${msg.isAdmin ? 'self-start' : 'self-end flex-row-reverse'}`}
                    >
                      <Avatar 
                        src={msg.isAdmin ? "https://placehold.co/100x100.png?text=S" : "https://placehold.co/100x100.png?text=U"} 
                        className={`shrink-0 ${msg.isAdmin ? 'bg-[#233554] text-[#64FFDA]' : 'bg-[#64FFDA]/20 text-[#64FFDA]'}`}
                        size="sm"
                      />
                      <div className={`flex flex-col ${msg.isAdmin ? 'items-start' : 'items-end'}`}>
                        <div className="flex items-baseline gap-2 mb-1 px-1">
                          <span className="text-sm font-medium text-[#CCD6F6]">{msg.senderName}</span>
                          {msg.isAdmin && <Chip size="sm" className="h-4 text-[10px] bg-[#233554] text-[#8892B0]">Staff</Chip>}
                          <span className="text-xs text-[#8892B0]">{formatDateTime(msg.createdAt)}</span>
                        </div>
                        <div 
                          className={`p-4 rounded-2xl text-sm leading-relaxed ${
                            msg.isAdmin 
                              ? 'bg-[#233554] text-[#CCD6F6] rounded-tl-sm' 
                              : 'bg-[#64FFDA]/10 border border-[#64FFDA]/20 text-[#CCD6F6] rounded-tr-sm'
                          }`}
                        >
                          {msg.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ModalBody>

              <ModalFooter className="flex-col items-stretch gap-3">
                {selectedTicket?.status === 'Closed' ? (
                  <div className="text-center py-4 text-[#8892B0] bg-[#233554]/30 rounded-lg border border-[#233554]">
                    This ticket has been closed. If you need further assistance, please open a new ticket.
                  </div>
                ) : (
                  <>
                    <Textarea 
                      placeholder="Type your reply here..."
                      variant="bordered"
                      minRows={2}
                      maxRows={6}
                      value={replyContent}
                      onValueChange={setReplyContent}
                      classNames={{
                        inputWrapper: "border-[#233554] hover:border-[#64FFDA] focus-within:border-[#64FFDA] bg-[#0A192F]",
                        input: "text-[#CCD6F6]"
                      }}
                    />
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-[#8892B0]">
                        Support hours: 24/7. Average response time: ~15 mins.
                      </span>
                      <div className="flex gap-2">
                        <Button variant="light" className="text-[#8892B0]" onPress={onClose}>
                          Close
                        </Button>
                        <Button 
                          color="primary" 
                          className="bg-[#64FFDA] text-[#0A192F] font-semibold"
                          onPress={handleReply}
                          isLoading={isReplying}
                          isDisabled={!replyContent.trim()}
                          endContent={
                            !isReplying && (
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                              </svg>
                            )
                          }
                        >
                          Send Reply
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
}