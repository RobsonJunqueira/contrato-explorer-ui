
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchContracts, filterContracts } from "../lib/api";
import { Contract, ContractFilters } from "../types/Contract";

export function useContracts() {
  const [filters, setFilters] = useState<ContractFilters>({
    num_contrato: "",
    nom_credor: "",
    status_vigencia: ""
  });

  const { data: allContracts = [], isLoading, error } = useQuery({
    queryKey: ["contracts"],
    queryFn: fetchContracts,
    retryDelay: 1000,
    retry: 1
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
