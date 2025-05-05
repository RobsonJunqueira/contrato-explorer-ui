
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Contract } from "@/types/Contract";

interface ContractHeaderProps {
  contract: Contract | undefined;
}

export function ContractHeader({ contract }: ContractHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between">
      <Button 
        variant="outline" 
        onClick={() => navigate("/")}
        className="border-navy-700 text-navy-700 hover:bg-navy-50"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Voltar para lista
      </Button>
      
      {contract && (
        <span 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            contract.status_vigencia === 'VIGENTE' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {contract.status_vigencia}
        </span>
      )}
    </div>
  );
}
