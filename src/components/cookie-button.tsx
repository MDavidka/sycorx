import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@heroui/react";
import { Cookie } from "lucide-react";
import { CookieButtonProps } from "../types";
import { cn } from "../utils";

interface ClickEffect {
  id: number;
  x: number;
  y: number;
  value: number;
}

export function CookieButton({ onClick, clickPower, disabled = false }: CookieButtonProps): JSX.Element {
  const [clickEffects, setClickEffects] = useState<ClickEffect[]>([]);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup timeouts on unmount to prevent memory leaks
  useEffect(() => {
    const currentTimeouts = timeoutsRef.current;
    return () => {
      currentTimeouts.forEach(clearTimeout);
    };
  }, []);

  const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Trigger the main game logic
    onClick();

    // Calculate coordinates for the floating text relative to the button
    const rect = e.currentTarget.getBoundingClientRect();
    
    // Add a slight random offset so rapid clicks don't perfectly overlap
    const randomOffsetX = (Math.random() - 0.5) * 40;
    const randomOffsetY = (Math.random() - 0.5) * 40;
    
    const x = e.clientX - rect.left + randomOffsetX;
    const y = e.clientY - rect.top + randomOffsetY;

    const newEffect: ClickEffect = {
      id: Date.now() + Math.random(),
      x,
      y,
      value: clickPower,
    };

    setClickEffects((prev) => [...prev, newEffect]);

    // Remove the effect after the animation completes (1s matching animate-float-up)
    const timeoutId = setTimeout(() => {
      setClickEffects((prev) => prev.filter((effect) => effect.id !== newEffect.id));
    }, 1000);

    timeoutsRef.current.push(timeoutId);
  }, [disabled, onClick, clickPower]);

  return (
    <div className="relative flex flex-col items-center justify-center p-8">
      {/* 
        The main cookie button. 
        We use active:scale-95 for immediate, responsive feedback during rapid clicking.
      */}
      <Button
        isIconOnly
        variant="light"
        disableRipple // Disable default ripple in favor of our custom floating text
        className={cn(
          "w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-full text-primary",
          "transition-transform duration-75 active:scale-95 hover:scale-105",
          "hover:bg-transparent hover:drop-shadow-2xl",
          disabled && "opacity-50 cursor-not-allowed hover:scale-100 active:scale-100"
        )}
        onClick={handleClick}
        disabled={disabled}
        aria-label="Bake Cookie"
      >
        <Cookie 
          className="w-full h-full drop-shadow-xl" 
          strokeWidth={1.2}
        />
      </Button>

      {/* Render the floating "+X" text effects */}
      {clickEffects.map((effect) => (
        <div
          key={effect.id}
          className="absolute pointer-events-none animate-float-up text-2xl sm:text-3xl font-black text-accent drop-shadow-md select-none z-50"
          style={{ 
            left: effect.x, 
            top: effect.y,
            // Center the text on the click coordinate
            transform: 'translate(-50%, -50%)' 
          }}
          aria-hidden="true"
        >
          +{effect.value}
        </div>
      ))}
      
      {/* Subtle glow effect behind the cookie */}
      <div className="absolute inset-0 -z-10 bg-primary/5 rounded-full blur-3xl animate-pulse-slow pointer-events-none" />
    </div>
  );
}