
import React from "react";

interface ContractFieldProps {
  label: string;
  value: string | number | undefined;
  className?: string;
}

export function ContractField({ label, value, className }: ContractFieldProps) {
  return (
    <div className={className}>
      <h3 className="text-sm font-semibold text-gray-500">{label}</h3>
      <p className="text-navy-900 font-medium">{value || "-"}</p>
    </div>
  );
}
