"use client";
import * as Tooltip from "@radix-ui/react-tooltip"
import clsx from "clsx";
import { ReactNode } from "react";

interface TooltipProps {
  content: string | undefined;
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left";
}

export const AppTooltip = ({
  content,
  children,
  side = "bottom",
}: TooltipProps) => {
  return (
    <Tooltip.Provider delayDuration={200}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          {children}
        </Tooltip.Trigger>

        <Tooltip.Portal>
          <Tooltip.Content
            side={side}
            sideOffset={6}
            className={clsx(
              'z-50 rounded-md bg-[#757575] px-4 py-3 w-37.5 text-xs text-white shadow-md animate-in fade-in zoom-in-95',
              {'hidden': content === undefined}
            )}>
            {content}

            <Tooltip.Arrow className="fill-gray-900" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};
