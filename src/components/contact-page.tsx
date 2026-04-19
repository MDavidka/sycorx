import React, { useState } from 'react';
import { 
  Card, 
  CardHeader, 
  CardBody, 
  Input, 
  Textarea, 
  Button, 
  Select, 
  SelectItem,
  Divider,
  Chip
} from '@heroui/react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageSquare, 
  Send, 
  LifeBuoy, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Database
} from 'lucide-react';
import { createTicket, IS_DB_CONNECTED } from '../db';
import { TicketPriority } from '../types';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  department: string;
  priority: TicketPriority;
  message: string;
}

const INITIAL_FORM_DATA: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  department: 'technical',
  priority: 'medium',
  message: ''
};

export function ContactPage(): JSX.Element {
  const [formData, setFormData] = useState<ContactFormData>(INITIAL_FORM_DATA);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Mock user ID for demonstration purposes
      const mockUserId = "user_123";

      await createTicket({
        userId: mockUserId,
        subject: formData.subject,
        message: formData.message,
        priority: formData.priority,
        status: 'open',
        // Note: department is included in form but not strictly in the base Ticket type, 
        // we'd normally pass it if the schema supported it, or prepend to message.
      });

      setSubmitStatus('success');
      setFormData(INITIAL_FORM_DATA);
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle');
      }, 5000);
    } catch (error) {
      console.error("Failed to submit ticket:", error);
      setSubmitStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Integration Banner */}
      {!IS_DB_CONNECTED && (
        <div className="bg-warning/10 border-b border-warning/20 px-6 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-warning-600 dark:text-warning-500">
              <Database size={20} className="shrink-0" />
              <p className="text-sm font-medium">
                Database not connected. Form submissions will be mocked. Connect your database in the Integrations tab to enable real support tickets.
              </p>
            </div>
            <Button size="sm" color="warning" variant="flat" className="shrink-0 font-semibold">
              Connect Database
            </Button>
          </div>
        </div>
      )}

      {/* Header Section */}
      <section className="pt-24 pb-12 px-6 lg:px-8 max-w-7xl mx-auto w-full text-center">
        <Chip 
          color="primary" 
          variant="flat" 
          className="mb-6"
          startContent={<LifeBuoy size={14} />}
        >
          24/7 Expert Support
        </Chip>
        <h1 className="text-4xl md:text-5xl font-heading font-extrabold tracking-tight mb-6">
          How can we help you today?
        </h1>
        <p className="text-lg text-muted max-w-2xl mx-auto">
          Whether you have a technical issue, a billing question, or need help choosing the right plan, our team is here to assist you.
        </p>
      </section>

      {/* Main Content Grid */}
      <section className="px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <Card className="bg-surface/50 border border-border shadow-sm">
              <CardBody className="p-8 flex flex-col gap-8">
                <div>
                  <h3 className="text-xl font-semibold mb-6">Contact Information</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-xl text-primary shrink-0">
                        <MessageSquare size={24} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Technical Support</p>
                        <p className="text-muted text-sm mb-1">Available 24/7 for active customers</p>
                        <a href="mailto:support@nivle.com" className="text-primary hover:underline font-medium">support@nivle.com</a>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="bg-success/10 p-3 rounded-xl text-success shrink-0">
                        <Mail size={24} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Sales & Billing</p>
                        <p className="text-muted text-sm mb-1">Mon-Fri, 9am - 5pm EST</p>
                        <a href="mailto:sales@nivle.com" className="text-primary hover:underline font-medium">sales@nivle.com</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-warning/10 p-3 rounded-xl text-warning shrink-0">
                        <Phone size={24} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Phone Support</p>
                        <p className="text-muted text-sm mb-1">Enterprise customers only</p>
                        <a href="tel:+18005550199" className="text-foreground hover:text-primary transition-colors font-medium">+1 (800) 555-0199</a>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-3 rounded-xl text-secondary-foreground shrink-0">
                        <MapPin size={24} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">Headquarters</p>
                        <p className="text-muted text-sm">
                          100 Cloud Way, Suite 400<br />
                          San Francisco, CA 94107<br />
                          United States
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <Divider />

                <div>
                  <h3 className="text-lg font-semibold mb-4">Average Response Times</h3>
                  <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted flex items-center gap-2"><Clock size={14} /> High Priority</span>
                      <span className="font-medium text-foreground">&lt; 15 minutes</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted flex items-center gap-2"><Clock size={14} /> Medium Priority</span>
                      <span className="font-medium text-foreground">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted flex items-center gap-2"><Clock size={14} /> Low Priority</span>
                      <span className="font-medium text-foreground">&lt; 12 hours</span>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card className="bg-background border border-border shadow-lg">
              <CardHeader className="px-8 pt-8 pb-4 flex-col items-start">
                <h2 className="text-2xl font-bold">Submit a Request</h2>
                <p className="text-muted text-sm mt-1">Fill out the form below and we'll get back to you as soon as possible.</p>
              </CardHeader>
              <CardBody className="px-8 pb-8">
                {submitStatus === 'success' ? (
                  <div className="bg-success/10 border border-success/20 rounded-xl p-8 text-center flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <div className="bg-success/20 p-4 rounded-full text-success mb-4">
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-success-700 dark:text-success-500 mb-2">Request Submitted Successfully!</h3>
                    <p className="text-success-600/80 dark:text-success-500/80 mb-6 max-w-md">
                      Your ticket has been created. We've sent a confirmation email with your ticket number. Our team will review it shortly.
                    </p>
                    <Button 
                      color="success" 
                      variant="flat" 
                      onPress={() => setSubmitStatus('idle')}
                    >
                      Submit Another Request
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    {submitStatus === 'error' && (
                      <div className="bg-danger/10 border border-danger/20 rounded-lg p-4 flex items-start gap-3 text-danger-600 dark:text-danger-500">
                        <AlertCircle size={20} className="shrink-0 mt-0.5" />
                        <div className="text-sm">
                          <p className="font-semibold">Failed to submit request</p>
                          <p className="opacity-80">{errorMessage}</p>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Input
                        isRequired
                        label="Full Name"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleInputChange}
                        variant="bordered"
                        labelPlacement="outside"
                        classNames={{ label: "font-medium" }}
                      />
                      <Input
                        isRequired
                        type="email"
                        label="Email Address"
                        name="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        variant="bordered"
                        labelPlacement="outside"
                        classNames={{ label: "font-medium" }}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select
                        isRequired
                        label="Department"
                        name="department"
                        placeholder="Select department"
                        selectedKeys={[formData.department]}
                        onChange={(e) => handleSelectChange('department', e.target.value)}
                        variant="bordered"
                        labelPlacement="outside"
                        classNames={{ label: "font-medium" }}
                      >
                        <SelectItem key="technical" value="technical">Technical Support</SelectItem>
                        <SelectItem key="billing" value="billing">Billing & Sales</SelectItem>
                        <SelectItem key="abuse" value="abuse">Report Abuse</SelectItem>
                        <SelectItem key="general" value="general">General Inquiry</SelectItem>
                      </Select>

                      <Select
                        isRequired
                        label="Priority"
                        name="priority"
                        placeholder="Select priority"
                        selectedKeys={[formData.priority]}
                        onChange={(e) => handleSelectChange('priority', e.target.value)}
                        variant="bordered"
                        labelPlacement="outside"
                        classNames={{ label: "font-medium" }}
                      >
                        <SelectItem key="low" value="low">Low - General Question</SelectItem>
                        <SelectItem key="medium" value="medium">Medium - Service Degraded</SelectItem>
                        <SelectItem key="high" value="high">High - Service Down</SelectItem>
                      </Select>
                    </div>

                    <Input
                      isRequired
                      label="Subject"
                      name="subject"
                      placeholder="Brief summary of your issue"
                      value={formData.subject}
                      onChange={handleInputChange}
                      variant="bordered"
                      labelPlacement="outside"
                      classNames={{ label: "font-medium" }}
                    />

                    <Textarea
                      isRequired
                      label="Message"
                      name="message"
                      placeholder="Please provide as much detail as possible..."
                      value={formData.message}
                      onChange={handleInputChange}
                      variant="bordered"
                      labelPlacement="outside"
                      minRows={6}
                      classNames={{ label: "font-medium" }}
                    />

                    <div className="pt-2 flex justify-end">
                      <Button
                        type="submit"
                        color="primary"
                        size="lg"
                        isLoading={isSubmitting}
                        endContent={!isSubmitting && <Send size={18} />}
                        className="w-full sm:w-auto font-semibold px-8"
                      >
                        {isSubmitting ? 'Submitting...' : 'Send Message'}
                      </Button>
                    </div>
                  </form>
                )}
              </CardBody>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}