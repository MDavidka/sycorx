import React, { useState, useCallback, useRef } from 'react';
import { Card, CardBody } from "@heroui/react";
import { Cookie, MousePointerClick, Zap, TrendingUp } from 'lucide-react';
import { formatNumber, formatExactNumber } from '../utils';

export interface CookieClickerProps {
  /** Total number of cookies the player currently has */
  cookieCount: number;
  /** Current Cookies Per Second */
  cps: number;
  /** How many cookies are earned per click */
  clickPower: number;
  /** Callback fired when the cookie is clicked */
  onCookieClick: () => void;
}

interface FloatingText {
  id: number;
  x: number;
  y: number;
  value: number;
}

export function CookieClicker({
  cookieCount,
  cps,
  clickPower,
  onCookieClick
}: CookieClickerProps): JSX.Element {
  const [clicks, setClicks] = useState<FloatingText[]>([]);
  const clickIdRef = useRef(0);
  const cookieRef = useRef<HTMLButtonElement>(null);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    // Trigger the main game logic
    onCookieClick();

    // Calculate position for floating text
    const rect = cookieRef.current?.getBoundingClientRect();
    if (rect) {
      // If clientX/Y are 0 (e.g., keyboard Enter press), default to center of cookie
      const isKeyboardClick = e.clientX === 0 && e.clientY === 0;
      const x = isKeyboardClick ? rect.width / 2 : e.clientX - rect.left;
      const y = isKeyboardClick ? rect.height / 2 : e.clientY - rect.top;

      const newClick: FloatingText = {
        id: clickIdRef.current++,
        x,
        y,
        value: clickPower
      };

      setClicks(prev => [...prev, newClick]);

      // Remove the floating text after animation completes (1s)
      setTimeout(() => {
        setClicks(prev => prev.filter(c => c.id !== newClick.id));
      }, 1000);
    }
  }, [onCookieClick, clickPower]);

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 gap-8 animate-in fade-in duration-500">
      
      {/* Stats Header */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        <Card className="bg-secondary/20 border-border/50 shadow-sm">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-primary/20 rounded-xl">
              <Cookie className="w-6 h-6 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">Total Cookies</span>
              <span className="text-2xl font-bold text-foreground tracking-tight tabular-nums" title={formatExactNumber(cookieCount)}>
                {formatNumber(cookieCount)}
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary/20 border-border/50 shadow-sm">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-accent/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-accent" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">Per Second</span>
              <span className="text-2xl font-bold text-foreground tracking-tight tabular-nums" title={formatExactNumber(cps)}>
                {formatNumber(cps)}
              </span>
            </div>
          </CardBody>
        </Card>

        <Card className="bg-secondary/20 border-border/50 shadow-sm">
          <CardBody className="flex flex-row items-center gap-4 p-4">
            <div className="p-3 bg-destructive/20 rounded-xl">
              <MousePointerClick className="w-6 h-6 text-destructive" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-muted-foreground font-medium">Click Power</span>
              <span className="text-2xl font-bold text-foreground tracking-tight tabular-nums" title={formatExactNumber(clickPower)}>
                {formatNumber(clickPower)}
              </span>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Main Cookie Area */}
      <div className="relative flex flex-col items-center justify-center mt-8 mb-12 w-full">
        {/* Glowing background effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/20 blur-[100px] rounded-full w-64 h-64 sm:w-96 sm:h-96 -z-10 animate-pulse" />
        
        <button
          ref={cookieRef}
          className="relative group outline-none focus-visible:ring-4 focus-visible:ring-primary focus-visible:ring-offset-4 focus-visible:ring-offset-background rounded-full transition-transform active:scale-95 touch-manipulation"
          onClick={handleClick}
          aria-label="Click to bake cookies"
        >
          {/* The Big Cookie Visual */}
          <div className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 bg-primary rounded-full shadow-[inset_-10px_-20px_40px_rgba(0,0,0,0.3),_0_10px_30px_rgba(0,0,0,0.2)] border-4 border-accent/30 flex items-center justify-center overflow-hidden relative transition-all duration-100 group-hover:brightness-105">
            
            {/* Chocolate Chips */}
            <div className="absolute w-8 h-8 bg-accent rounded-full top-[20%] left-[25%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-10 h-10 bg-accent rounded-full top-[30%] right-[20%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-6 h-6 bg-accent rounded-full bottom-[35%] left-[30%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-12 h-12 bg-accent rounded-full bottom-[20%] right-[30%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-7 h-7 bg-accent rounded-full top-[50%] left-[15%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-9 h-9 bg-accent rounded-full top-[65%] right-[15%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            <div className="absolute w-8 h-8 bg-accent rounded-full top-[45%] left-[55%] shadow-[inset_-2px_-2px_4px_rgba(0,0,0,0.4)]" />
            
            {/* Texture overlay for baked look */}
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_100%)] mix-blend-overlay pointer-events-none" />
          </div>

          {/* Floating Click Texts */}
          {clicks.map(click => (
            <div
              key={click.id}
              className="absolute pointer-events-none animate-float-up text-2xl sm:text-3xl font-black text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] z-50 select-none"
              style={{
                left: click.x,
                top: click.y,
                transform: 'translate(-50%, -50%)'
              }}
              aria-hidden="true"
            >
              +{formatNumber(click.value)}
            </div>
          ))}
        </button>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-lg font-medium flex items-center justify-center gap-2">
            <Zap className="w-5 h-5 text-primary animate-pulse" />
            Keep clicking to bake more cookies!
          </p>
        </div>
      </div>
    </div>
  );
}