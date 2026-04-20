import React, { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Button,
  Chip,
  User
} from "@heroui/react";
import { Trophy, Database, Medal, TrendingUp, Cookie } from "lucide-react";
import { LeaderboardEntry } from "../types";
import { formatNumber, cn } from "../utils";

// Static mock data since no database integration is connected
const MOCK_LEADERBOARD: LeaderboardEntry[] = [
  { username: "GrandmaBakes99", totalCookiesBaked: 1542000000, cps: 45000 },
  { username: "CookieMonster", totalCookiesBaked: 890500000, cps: 21000 },
  { username: "ClickerPro", totalCookiesBaked: 450200000, cps: 12500 },
  { username: "DoughBoy", totalCookiesBaked: 120000000, cps: 5400 },
  { username: "SugarRush", totalCookiesBaked: 85000000, cps: 3200 },
  { username: "CasualBaker", totalCookiesBaked: 4200000, cps: 850 },
  { username: "NewbieClicker", totalCookiesBaked: 150000, cps: 45 },
  { username: "JustStarted", totalCookiesBaked: 1200, cps: 1 },
];

export function LeaderboardPage(): JSX.Element {
  const [showDbWarning, setShowDbWarning] = useState<boolean>(true);

  // Helper to render rank badges
  const renderRank = (index: number) => {
    const rank = index + 1;
    if (rank === 1) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900/30 dark:text-yellow-500 font-bold">
          <Trophy className="w-4 h-4" />
        </div>
      );
    }
    if (rank === 2) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400 font-bold">
          <Medal className="w-4 h-4" />
        </div>
      );
    }
    if (rank === 3) {
      return (
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-500 font-bold">
          <Medal className="w-4 h-4" />
        </div>
      );
    }
    return (
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-muted text-muted-foreground font-bold text-sm">
        {rank}
      </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 min-h-[calc(100vh-140px)] animate-in fade-in duration-500">
      
      {/* Database Integration Warning Banner */}
      {showDbWarning && (
        <Card className="mb-8 bg-warning-50/50 border-warning-200 dark:bg-warning-900/20 dark:border-warning-900/50 shadow-none">
          <CardBody className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-4 px-5 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning-100 dark:bg-warning-900/50 rounded-full shrink-0">
                <Database className="text-warning-600 dark:text-warning-400 w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-warning-800 dark:text-warning-300">
                  Live Leaderboard Disabled
                </p>
                <p className="text-xs text-warning-700 dark:text-warning-400/80 mt-0.5">
                  Connect a database integration to enable global rankings. Currently showing placeholder data.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button 
                size="sm" 
                color="warning" 
                variant="solid" 
                className="w-full sm:w-auto font-medium shadow-sm"
                onClick={() => alert("Please configure the MongoDB integration in the Integrations tab to enable live leaderboards.")}
              >
                Connect Database
              </Button>
              <Button 
                size="sm" 
                color="warning" 
                variant="light" 
                isIconOnly
                aria-label="Dismiss warning"
                onClick={() => setShowDbWarning(false)}
              >
                ✕
              </Button>
            </div>
          </CardBody>
        </Card>
      )}

      <div className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-card p-6 rounded-2xl border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
          
          <div className="relative z-10">
            <h1 className="text-3xl font-black text-foreground flex items-center gap-3 tracking-tight">
              <Trophy className="w-8 h-8 text-accent" />
              Global Hall of Fame
            </h1>
            <p className="text-muted-foreground mt-2 max-w-xl">
              The most dedicated bakers in the world. Compete to reach the top by maximizing your cookie production and total lifetime bakes.
            </p>
          </div>
        </div>

        {/* Leaderboard Table */}
        <Card className="border border-border shadow-sm">
          <Table 
            aria-label="Global Cookie Clicker Leaderboard"
            classNames={{
              wrapper: "p-0 bg-transparent shadow-none rounded-none",
              th: "bg-muted/50 text-muted-foreground font-bold text-xs uppercase tracking-wider py-4",
              td: "py-4 border-b border-border/50 last:border-0",
            }}
          >
            <TableHeader>
              <TableColumn className="w-20 text-center">Rank</TableColumn>
              <TableColumn>Baker</TableColumn>
              <TableColumn className="text-right">Total Baked</TableColumn>
              <TableColumn className="text-right">Production (CPS)</TableColumn>
            </TableHeader>
            <TableBody>
              {MOCK_LEADERBOARD.map((entry, index) => (
                <TableRow key={entry.username} className="hover:bg-muted/30 transition-colors">
                  <TableCell>
                    <div className="flex justify-center">
                      {renderRank(index)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <User
                      name={entry.username}
                      description={`Joined recently`}
                      avatarProps={{
                        src: `https://api.dicebear.com/7.x/avataaars/svg?seed=${entry.username}&backgroundColor=ffdfbf`,
                        className: "w-10 h-10 border-2 border-background shadow-sm"
                      }}
                      classNames={{
                        name: "font-bold text-foreground text-base",
                        description: "text-xs text-muted-foreground"
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2 font-bold text-foreground text-lg">
                      {formatNumber(entry.totalCookiesBaked)}
                      <Cookie className="w-4 h-4 text-primary" />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end">
                      <Chip
                        color="secondary"
                        variant="flat"
                        startContent={<TrendingUp className="w-3.5 h-3.5 ml-1" />}
                        className="font-bold"
                      >
                        {formatNumber(entry.cps)} / sec
                      </Chip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}