
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchContracts, filterContracts } from "../lib/api";
import { Contract, ContractFilters } from "../types/Contract";
import { useToast } from "@/components/ui/use-toast";

export function useContracts() {
  const { toast } = useToast();
  const [filters, setFilters] = useState<ContractFilters>({
    num_contrato: "",
    nom_credor: "",
    status_vigencia: ""
  });

  const { data: allContracts = [], isLoading, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: fetchContracts,
    retry: 2,
    retryDelay: 1000,
    meta: {
      errorHandler: (error: any) => {
        console.error("Error fetching contracts:", error);
        toast({
          title: "Erro ao carregar contratos",
          description: "Usando dados de exemplo para visualização",
          variant: "destructive",
        });
      }
    }
  });

  const filteredContracts = filterContracts(allContracts, filters);

  // Get unique status values for filter dropdown
  const statusOptions = Array.from(new Set(allContracts.map(c => c.status_vigencia)))
    .filter(Boolean)
    .sort();

  return {
    contracts: filteredContracts,
    allContracts,
    isLoading,
    error,
    filters,
    setFilters,
    statusOptions
  };
}
