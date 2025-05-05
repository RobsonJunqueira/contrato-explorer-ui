
import React from "react";

interface StatusIndicatorProps {
  days: number;
}

export function StatusIndicator({ days }: StatusIndicatorProps) {
  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        days < 30 
          ? 'bg-red-100 text-red-800' 
          : days < 90 
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-green-100 text-green-800'
      }`}
    >
      {days}
    </span>
  );
}
