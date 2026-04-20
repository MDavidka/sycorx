import React, { useEffect, useState } from 'react';
import { 
  Card, 
  CardBody, 
  Table, 
  TableHeader, 
  TableColumn, 
  TableBody, 
  TableRow, 
  TableCell, 
  Chip, 
  Button,
  Spinner
} from "@heroui/react";
import { Trophy, Medal, Database, AlertCircle } from 'lucide-react';
import { formatExactNumber, cn } from '../utils';
import { getLeaderboard, IS_DB_CONNECTED } from '../db';

interface LeaderboardEntry {
  id: string;
  playerName: string;
  score: number;
}

export function LeaderboardPage(): JSX.Element {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchLeaderboard() {
      setIsLoading(true);
      try {
        const data = await getLeaderboard();
        if (isMounted) {
          setLeaderboard(data);
        }
      } catch (error) {
        console.error("Failed to fetch leaderboard:", error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  const renderRankIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Medal className="w-6 h-6 text-yellow-500 drop-shadow-md" />;
      case 1:
        return <Medal className="w-6 h-6 text-gray-400 drop-shadow-md" />;
      case 2:
        return <Medal className="w-6 h-6 text-amber-700 drop-shadow-md" />;
      default:
        return <span className="font-bold text-muted-foreground w-6 text-center">{index + 1}</span>;
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500 gap-6">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-2">
        <div className="p-3 bg-primary/20 rounded-2xl border border-primary/30 shadow-sm">
          <Trophy className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-black tracking-tight text-foreground">Global Leaderboard</h1>
          <p className="text-muted-foreground font-medium">See how your bakery stacks up against the world!</p>
        </div>
      </div>

      {/* Integration Warning Banner */}
      {!IS_DB_CONNECTED && (
        <Card className="bg-secondary/30 border-secondary shadow-none">
          <CardBody className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4">
            <div className="flex items-start sm:items-center gap-3">
              <div className="p-2 bg-background rounded-full shrink-0">
                <AlertCircle className="w-5 h-5 text-accent" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-sm">Offline Mode Active</h3>
                <p className="text-xs text-muted-foreground mt-0.5">
                  You are currently viewing local and mock data. Connect a database to enable live global leaderboards and cross-device saves.
                </p>
              </div>
            </div>
            <Button 
              color="secondary" 
              variant="flat" 
              startContent={<Database className="w-4 h-4" />}
              className="w-full sm:w-auto font-semibold shrink-0"
              onPress={() => alert("Please configure the MongoDB integration in the Integrations tab to enable live data.")}
            >
              Connect database to enable data
            </Button>
          </CardBody>
        </Card>
      )}

      {/* Leaderboard Table */}
      <Card className="border-border/50 shadow-sm">
        <Table 
          aria-label="Global high scores leaderboard"
          classNames={{
            base: "min-w-full",
            table: "min-w-full",
            th: "bg-secondary/40 text-foreground font-bold text-sm uppercase tracking-wider py-4",
            td: "py-4 border-b border-border/20",
          }}
          bottomContent={
            isLoading ? (
              <div className="flex justify-center py-8">
                <Spinner color="primary" size="lg" />
              </div>
            ) : leaderboard.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No scores recorded yet. Start clicking!
              </div>
            ) : null
          }
        >
          <TableHeader>
            <TableColumn width={80} align="center">Rank</TableColumn>
            <TableColumn>Baker Name</TableColumn>
            <TableColumn align="end">Cookies Baked</TableColumn>
          </TableHeader>
          <TableBody items={leaderboard} isLoading={isLoading}>
            {(item) => {
              const index = leaderboard.indexOf(item);
              const isTopThree = index < 3;
              
              return (
                <TableRow key={item.id} className="hover:bg-secondary/10 transition-colors">
                  <TableCell>
                    <div className="flex justify-center items-center">
                      {renderRankIcon(index)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className={cn(
                      "font-semibold text-base",
                      isTopThree ? "text-foreground" : "text-muted-foreground"
                    )}>
                      {item.playerName}
                    </span>
                    {index === 0 && (
                      <Chip size="sm" color="primary" variant="flat" className="ml-3 font-bold text-[10px] uppercase tracking-wider h-5">
                        Champion
                      </Chip>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex justify-end items-center gap-2">
                      <span className={cn(
                        "font-black tabular-nums tracking-tight",
                        isTopThree ? "text-lg text-primary" : "text-base text-foreground"
                      )}>
                        {formatExactNumber(item.score)}
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </Card>

    </div>
  );
}