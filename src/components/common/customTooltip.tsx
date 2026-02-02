"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ComponentProps, ReactNode, useState } from "react";

interface Props extends ComponentProps<"div"> {
  trigger: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  isHide?: boolean;
}

const CustomTooltip = ({ children, trigger, side, isHide }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={!isHide && open} onOpenChange={setOpen} delayDuration={200}>
      <TooltipTrigger asChild onClick={() => setOpen(true)}>
        <div>{trigger}</div>
      </TooltipTrigger>

      <TooltipContent side={side} className="z-9999">
        {children}
      </TooltipContent>
    </Tooltip>
  );
};

export default CustomTooltip;
