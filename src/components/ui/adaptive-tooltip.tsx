import React from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

interface AdaptiveTooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
}

export function AdaptiveTooltip({ content, children }: AdaptiveTooltipProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");

  if (isMobile) {
    return (
      <Popover>
        <PopoverTrigger asChild>{children}</PopoverTrigger>
        <PopoverContent className="relative">
          <div>{content}</div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="max-w-[200px]">{content}</TooltipContent>
    </Tooltip>
  );
}
