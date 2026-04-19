import React, { useEffect, useState } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Card,
  CardHeader,
  CardBody,
  Button
} from '@heroui/react';
import { ServerStatus } from '../types';
import { getStatusColor, formatUptime, formatDateTime } from '../utils';
import { getServerStatus, IS_DB_CONNECTED } from '../db';

const MOCK_STATUS_DATA: ServerStatus[] = [
  { id: 's1', name: 'US-East-1 (Virginia)', region: 'North America', status: 'operational', uptime: 99.99, lastUpdated: new Date().toISOString() },
  { id: 's2', name: 'EU-West-1 (London)', region: 'Europe', status: 'operational', uptime: 99.95, lastUpdated: new Date().toISOString() },
  { id: 's3', name: 'AP-South-1 (Mumbai)', region: 'Asia Pacific', status: 'degraded', uptime: 98.50, lastUpdated: new Date(Date.now() - 1000 * 60 * 5).toISOString() },
  { id: 's4', name: 'US-West-2 (Oregon)', region: 'North America', status: 'maintenance', uptime: 100, lastUpdated: new Date(Date.now() - 1000 * 60 * 60).toISOString() },
  { id: 's5', name: 'SA-East-1 (São Paulo)', region: 'South America', status: 'operational', uptime: 99.98, lastUpdated: new Date().toISOString() },
];

export function StatusTable(): JSX.Element {
  const [data, setData] = useState<ServerStatus[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchData() {
      if (!IS_DB_CONNECTED) {
        // Simulate network delay for mock data to show loading state
        setTimeout(() => {
          if (isMounted) {
            setData(MOCK_STATUS_DATA);
            setIsLoading(false);
          }
        }, 800);
        return;
      }

      try {
        setIsLoading(true);
        const response = await getServerStatus();
        if (isMounted) {
          if (response.error) {
            setError(response.error);
            setData(MOCK_STATUS_DATA); // Fallback to mock on error for demo purposes
          } else if (response.data) {
            setData(response.data);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to fetch server status.');
          setData(MOCK_STATUS_DATA); // Fallback
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderCell = React.useCallback((server: ServerStatus, columnKey: React.Key) => {
    switch (columnKey) {
      case 'name':
        return (
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[var(--color-text)]">{server.name}</span>
          </div>
        );
      case 'region':
        return (
          <span className="text-sm text-[var(--color-secondary)]">{server.region}</span>
        );
      case 'status':
        return (
          <Chip 
            className="capitalize font-medium" 
            color={getStatusColor(server.status)} 
            size="sm" 
            variant="flat"
          >
            {server.status}
          </Chip>
        );
      case 'uptime':
        return (
          <span className="text-sm font-medium text-[var(--color-text)]">
            {formatUptime(server.uptime)}
          </span>
        );
      case 'lastUpdated':
        return (
          <span className="text-xs text-[var(--color-secondary)]">
            {formatDateTime(server.lastUpdated)}
          </span>
        );
      default:
        return null;
    }
  }, []);

  return (
    <div className="w-full flex flex-col gap-6">
      {!IS_DB_CONNECTED && (
        <Card className="bg-[var(--color-warning)]/10 border border-[var(--color-warning)]/20 shadow-none">
          <CardBody className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-5 gap-4">
            <div className="flex items-start sm:items-center gap-3">
              <svg className="w-5 h-5 text-[var(--color-warning)] mt-0.5 sm:mt-0 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p className="text-sm text-[var(--color-text)]">
                <span className="font-semibold">Demo Mode:</span> Database integration is not connected. Showing sample server status data.
              </p>
            </div>
            <Button size="sm" color="warning" variant="flat" className="font-medium flex-shrink-0 w-full sm:w-auto">
              Connect Database
            </Button>
          </CardBody>
        </Card>
      )}

      <Card className="w-full border border-[var(--color-border)] shadow-sm bg-[var(--color-bg)]">
        <CardHeader className="flex flex-col items-start px-6 pt-6 pb-4 gap-1">
          <div className="flex items-center justify-between w-full">
            <h3 className="text-xl font-bold text-[var(--color-text)]">Global Infrastructure Status</h3>
            {error && (
              <Chip color="danger" variant="dot" size="sm">
                Live updates failed
              </Chip>
            )}
          </div>
          <p className="text-sm text-[var(--color-secondary)]">Real-time monitoring of Nivle hosting regions and core services.</p>
        </CardHeader>
        <CardBody className="px-6 pb-6 pt-0">
          <Table 
            aria-label="Server status monitoring table"
            removeWrapper
            className="w-full"
            classNames={{
              th: "bg-transparent text-[var(--color-secondary)] font-semibold border-b border-[var(--color-border)] px-4 py-3",
              td: "px-4 py-4 border-b border-[var(--color-border)]/40 group-last:border-0"
            }}
            bottomContent={
              isLoading ? (
                <div className="flex w-full justify-center py-8">
                  <Spinner color="primary" size="md" />
                </div>
              ) : null
            }
          >
            <TableHeader>
              <TableColumn key="name">SERVER</TableColumn>
              <TableColumn key="region">REGION</TableColumn>
              <TableColumn key="status">STATUS</TableColumn>
              <TableColumn key="uptime">UPTIME (30D)</TableColumn>
              <TableColumn key="lastUpdated">LAST UPDATED</TableColumn>
            </TableHeader>
            <TableBody 
              items={data} 
              emptyContent={!isLoading && "No server data available."}
              isLoading={isLoading}
            >
              {(item) => (
                <TableRow key={item.id} className="group hover:bg-[var(--color-border)]/20 transition-colors">
                  {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    </div>
  );
}