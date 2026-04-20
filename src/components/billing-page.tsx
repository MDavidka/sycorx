import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Skeleton,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Divider
} from "@heroui/react";
import { 
  CreditCard, 
  Download, 
  FileText, 
  AlertCircle, 
  Database, 
  Plus,
  CheckCircle2,
  Clock
} from "lucide-react";
import { getBillingRecords, IS_DB_CONNECTED } from "../db";
import { BillingRecord, BillingStatus } from "../types";
import { formatCurrency, formatDate } from "../utils";

// Mock data for when DB is not connected
const MOCK_RECORDS: BillingRecord[] = [
  {
    id: "inv_7a8b9c",
    userId: "user_1",
    amount: 125.50,
    status: "pending",
    date: new Date().toISOString(),
    description: "Cloud Hosting - Pro Plan (Current Month)",
  },
  {
    id: "inv_4d5e6f",
    userId: "user_1",
    amount: 125.50,
    status: "paid",
    date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cloud Hosting - Pro Plan",
  },
  {
    id: "inv_1a2b3c",
    userId: "user_1",
    amount: 85.00,
    status: "paid",
    date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cloud Hosting - Starter Plan + Overage",
  },
  {
    id: "inv_9x8y7z",
    userId: "user_1",
    amount: 45.00,
    status: "failed",
    date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
    description: "Cloud Hosting - Starter Plan",
  }
];

const columns = [
  { name: "INVOICE", uid: "id" },
  { name: "DATE", uid: "date" },
  { name: "DESCRIPTION", uid: "description" },
  { name: "AMOUNT", uid: "amount" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

const statusColorMap: Record<BillingStatus, "success" | "warning" | "danger"> = {
  paid: "success",
  pending: "warning",
  failed: "danger",
};

const statusIconMap: Record<BillingStatus, React.ReactNode> = {
  paid: <CheckCircle2 className="w-3 h-3 mr-1" />,
  pending: <Clock className="w-3 h-3 mr-1" />,
  failed: <AlertCircle className="w-3 h-3 mr-1" />,
};

export function BillingPage() {
  const [records, setRecords] = useState<BillingRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    async function fetchRecords() {
      setIsLoading(true);
      if (IS_DB_CONNECTED) {
        try {
          // In a real app, we'd get the user ID from auth context
          const response = await getBillingRecords("user_1");
          if (response.data) {
            setRecords(response.data);
          }
        } catch (error) {
          console.error("Failed to fetch billing records:", error);
        }
      } else {
        // Simulate network delay for mock data
        setTimeout(() => {
          setRecords(MOCK_RECORDS);
          setIsLoading(false);
        }, 700);
        return;
      }
      setIsLoading(false);
    }

    fetchRecords();
  }, []);

  const handleAction = (action: string, recordId?: string) => {
    if (!IS_DB_CONNECTED) {
      onOpen();
      return;
    }
    console.log(`Action ${action} triggered${recordId ? ` for record ${recordId}` : ''}`);
    // Implement actual action logic here when DB is connected
  };

  const renderCell = useCallback((record: BillingRecord, columnKey: React.Key) => {
    switch (columnKey) {
      case "id":
        return (
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm font-mono text-foreground">{record.id.toUpperCase()}</span>
          </div>
        );
      case "date":
        return (
          <span className="text-sm text-muted-foreground">
            {formatDate(record.date).split(',')[0]} {/* Just show the date part */}
          </span>
        );
      case "description":
        return (
          <span className="text-sm text-foreground">{record.description}</span>
        );
      case "amount":
        return (
          <span className="text-sm font-medium text-foreground">
            {formatCurrency(record.amount)}
          </span>
        );
      case "status":
        return (
          <Chip 
            className="capitalize pl-1 pr-2" 
            color={statusColorMap[record.status]} 
            size="sm" 
            variant="flat"
          >
            <span className="flex items-center">
              {statusIconMap[record.status]}
              {record.status}
            </span>
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Button 
              isIconOnly 
              size="sm" 
              variant="light" 
              color="default"
              onClick={() => handleAction('download_invoice', record.id)}
              aria-label="Download Invoice"
            >
              <Download className="text-muted-foreground w-4 h-4" />
            </Button>
          </div>
        );
      default:
        return null;
    }
  }, []);

  // Calculate summaries
  const currentBalance = records.filter(r => r.status === 'pending').reduce((acc, curr) => acc + curr.amount, 0);
  const totalSpent = records.filter(r => r.status === 'paid').reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 w-full min-h-[calc(100vh-4rem)]">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Billing & Payments</h1>
          <p className="text-muted-foreground mt-1">Manage your subscription, payment methods, and invoices.</p>
        </div>
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
                Database integration is not connected. Displaying mock billing data. Connect a database in the Integrations tab to enable live payment processing.
              </p>
            </div>
            <Button size="sm" color="warning" variant="flat" className="shrink-0 font-medium" onPress={onOpen}>
              Connect Database
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Current Balance */}
        <Card className="border-border/50 bg-background/50 shadow-sm lg:col-span-1">
          <CardHeader className="px-6 py-4 border-b border-border/50">
            <h2 className="text-lg font-semibold text-foreground">Current Balance</h2>
          </CardHeader>
          <CardBody className="p-6 flex flex-col justify-center">
            {isLoading ? (
              <Skeleton className="h-10 w-32 rounded-lg mb-2" />
            ) : (
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold text-foreground">{formatCurrency(currentBalance)}</span>
                <span className="text-sm text-muted-foreground">USD</span>
              </div>
            )}
            <p className="text-sm text-muted-foreground mb-6">
              Next invoice will be generated on {formatDate(new Date(Date.now() + 15 * 24 * 60 * 60 * 1000).toISOString()).split(',')[0]}.
            </p>
            <Button 
              color="primary" 
              className="w-full font-medium"
              onClick={() => handleAction('pay_balance')}
              isDisabled={currentBalance <= 0}
            >
              Pay Balance Now
            </Button>
          </CardBody>
        </Card>

        {/* Payment Method */}
        <Card className="border-border/50 bg-background/50 shadow-sm lg:col-span-2">
          <CardHeader className="px-6 py-4 border-b border-border/50 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-foreground">Payment Methods</h2>
            <Button size="sm" variant="flat" color="primary" startContent={<Plus className="w-4 h-4" />} onClick={() => handleAction('add_payment_method')}>
              Add Method
            </Button>
          </CardHeader>
          <CardBody className="p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between p-4 border border-border/50 rounded-xl bg-secondary/20">
              <div className="flex items-center gap-4 mb-4 sm:mb-0">
                <div className="w-12 h-8 bg-white rounded flex items-center justify-center border border-gray-200 shrink-0">
                  {/* Mock Visa Logo */}
                  <span className="text-blue-800 font-bold italic text-xs">VISA</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground flex items-center gap-2">
                    Visa ending in 4242
                    <Chip size="sm" color="success" variant="flat" className="h-5 text-[10px]">Default</Chip>
                  </p>
                  <p className="text-xs text-muted-foreground">Expires 12/2025</p>
                </div>
              </div>
              <div className="flex gap-2 w-full sm:w-auto">
                <Button size="sm" variant="bordered" className="flex-1 sm:flex-none" onClick={() => handleAction('edit_payment_method')}>
                  Edit
                </Button>
                <Button size="sm" color="danger" variant="light" isIconOnly onClick={() => handleAction('delete_payment_method')}>
                  <AlertCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardBody>
          <Divider className="opacity-50" />
          <CardFooter className="px-6 py-4 bg-secondary/10">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <AlertCircle className="w-4 h-4" />
              <span>Your payment information is securely stored and encrypted by Stripe.</span>
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Billing History Table */}
      <Card className="border-border/50 bg-background/50 shadow-sm">
        <CardHeader className="px-6 py-4 border-b border-border/50 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-foreground">Billing History</h2>
          <Button size="sm" variant="light" startContent={<Download className="w-4 h-4" />} onClick={() => handleAction('download_all')}>
            Export CSV
          </Button>
        </CardHeader>
        <CardBody className="p-0">
          <Table 
            aria-label="Billing history table"
            classNames={{
              wrapper: "bg-transparent shadow-none p-0 rounded-none",
              th: "bg-secondary/50 text-muted-foreground text-xs font-semibold tracking-wider uppercase px-6 py-4",
              td: "px-6 py-4 border-b border-border/50",
              tr: "hover:bg-secondary/20 transition-colors group"
            }}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.uid} align={column.uid === "actions" || column.uid === "amount" ? "end" : "start"}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>
            <TableBody 
              items={records} 
              isLoading={isLoading}
              loadingContent={<Skeleton className="w-full h-[300px] rounded-none" />}
              emptyContent={
                <div className="py-12 text-center">
                  <FileText className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-lg font-medium text-foreground">No billing history</p>
                  <p className="text-muted-foreground text-sm mt-1">You don't have any invoices yet.</p>
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
                    This action requires a live database connection to process payments or modify billing data. Please connect your MongoDB database in the Integrations tab.
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