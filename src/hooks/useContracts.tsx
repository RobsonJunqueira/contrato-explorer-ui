
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
    status_vigencia: "",
    class1_setor: "",
    nmSubacao: "",
    dsc_objeto_contrato: ""
  });

  const { data: allContracts = [], isLoading, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: fetchContracts,
    retry: 2,
    retryDelay: 1000,
    meta: {
      errorHandler: (error: any) => {
        console.error("Error fetching contracts from Supabase:", error);
        toast({
          title: "Erro ao carregar contratos",
          description: "Usando dados de exemplo para visualização",
          variant: "destructive",
        });
      }
    }
  });

  // Apply filters, removing special values like "_all_" which just mean "no filter"
  const filteredContracts = filterContracts(allContracts, {
    ...filters,
    class1_setor: filters.class1_setor === "_all_" ? "" : filters.class1_setor,
    nmSubacao: filters.nmSubacao === "_all_" ? "" : filters.nmSubacao
  });

  // Get unique status values for filter dropdown
  const statusOptions = Array.from(new Set(allContracts.map(c => c.status_vigencia)))
    .filter(Boolean)
    .sort();
    
  // Get unique sector values for filter dropdown
  const sectorOptions = Array.from(new Set(allContracts.map(c => c.class1_setor)))
    .filter(Boolean)
    .sort();
    
  // Get unique subacao values for filter dropdown
  const subacaoOptions = Array.from(new Set(allContracts.map(c => c.nmSubacao)))
    .filter(Boolean)
    .sort();

  return {
    contracts: filteredContracts,
    allContracts,
    isLoading,
    error,
    filters,
    setFilters,
    statusOptions,
    sectorOptions,
    subacaoOptions
  };
}
