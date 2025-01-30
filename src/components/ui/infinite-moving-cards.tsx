import { cn } from "../../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "normal",
  className,
}: {
  items: {
    logo: React.ReactNode;
    name: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  className?: string;
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    setStart(true);
  }, []);

  const speeds = {
    fast: 20,
    normal: 40,
    slow: 60
  };

  const cardContent = items.map((item, idx) => (
    <div
      key={idx}
      className="relative flex-shrink-0 w-24 sm:w-28 h-14 sm:h-16 bg-gradient-to-br from-white to-cream-50/95 rounded-lg shadow-md backdrop-blur-sm border border-rich-blue-100/20 flex items-center justify-center px-2"
    >
      {item.logo}
    </div>
  ));

  return (
    <div ref={containerRef} className={cn("group relative flex overflow-hidden", className)}>
      <div
        className={cn(
          "flex items-center gap-4 py-2",
          start && "animate-infinite-scroll",
          direction === "right" && "animate-infinite-scroll-reverse"
        )}
        style={{
          "--animation-duration": `${speeds[speed]}s`,
        } as React.CSSProperties}
      >
        {cardContent}
      </div>
      <div
        className={cn(
          "flex items-center gap-4 py-2",
          start && "animate-infinite-scroll",
          direction === "right" && "animate-infinite-scroll-reverse"
        )}
        style={{
          "--animation-duration": `${speeds[speed]}s`,
        } as React.CSSProperties}
      >
        {cardContent}
      </div>
    </div>
  );
};