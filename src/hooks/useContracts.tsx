
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchContracts, filterContracts, updateContract } from "../lib/api";
import { Contract, ContractFilters } from "../types/Contract";
import { useToast } from "@/components/ui/use-toast";

// Helper to get stored values from localStorage
const getStoredValue = <T,>(key: string, defaultValue: T): T => {
  if (typeof window === "undefined") return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return defaultValue;
  }
};

export function useContracts() {
  const { toast } = useToast();
  const [filters, setFilters] = useState<ContractFilters>(() => 
    getStoredValue("contractFilters", {
      num_contrato: "",
      nom_credor: "",
      status_vigencia: "",
      class1_setor: "_all_",
      nmSubacao: "_all_",
      dsc_objeto_contrato: "",
      classif1: "_all_",
      classif2: "_all_"
    })
  );
  
  // Add pagination state with localStorage persistence
  const [currentPage, setCurrentPage] = useState(() => 
    getStoredValue("contractCurrentPage", 1)
  );
  const [itemsPerPage] = useState(20);
  
  // Add sorting state with localStorage persistence
  const [sortField, setSortField] = useState<keyof Contract>(() => 
    getStoredValue("contractSortField", "num_contrato" as keyof Contract)
  );
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">(() => 
    getStoredValue("contractSortDirection", "asc" as "asc" | "desc")
  );

  // Save filters to localStorage when they change
  useEffect(() => {
    localStorage.setItem("contractFilters", JSON.stringify(filters));
  }, [filters]);

  // Save pagination state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("contractCurrentPage", JSON.stringify(currentPage));
  }, [currentPage]);

  // Save sorting state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("contractSortField", JSON.stringify(sortField));
    localStorage.setItem("contractSortDirection", JSON.stringify(sortDirection));
  }, [sortField, sortDirection]);

  const { data: allContracts = [], isLoading, error, refetch } = useQuery({
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
    nmSubacao: filters.nmSubacao === "_all_" ? "" : filters.nmSubacao,
    classif1: filters.classif1 === "_all_" ? "" : filters.classif1,
    classif2: filters.classif2 === "_all_" ? "" : filters.classif2
  });
  
  // Store the filtered count to display in UI
  const filteredCount = filteredContracts.length;
  
  // Apply sorting
  const sortedContracts = [...filteredContracts].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (aValue === bValue) return 0;
    
    const direction = sortDirection === "asc" ? 1 : -1;
    
    // Handle different data types
    if (typeof aValue === "string" && typeof bValue === "string") {
      return aValue.localeCompare(bValue) * direction;
    } else if (typeof aValue === "number" && typeof bValue === "number") {
      return (aValue - bValue) * direction;
    } else if (aValue === null || aValue === undefined) {
      return direction;
    } else if (bValue === null || bValue === undefined) {
      return -direction;
    }
    
    return 0;
  });

  // Apply pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedContracts = sortedContracts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedContracts.length / itemsPerPage);
  
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
    
  // Get unique classif1 values for filter dropdown
  const classif1Options = Array.from(new Set(allContracts.map(c => c.classif1)))
    .filter(Boolean)
    .sort();
    
  // Get classif2 values that correspond to the selected classif1
  const classif2Options = Array.from(new Set(
    allContracts
      .filter(c => filters.classif1 === "_all_" || c.classif1 === filters.classif1)
      .map(c => c.classif2)
  ))
    .filter(Boolean)
    .sort();

  // Add contract update function
  const updateContractField = async (id: string, updates: Partial<Contract>) => {
    try {
      await updateContract(id, updates);
      toast({
        title: "Contrato atualizado",
        description: "As informações do contrato foram atualizadas com sucesso.",
      });
      refetch();
      return true;
    } catch (error) {
      console.error("Error updating contract:", error);
      toast({
        title: "Erro ao atualizar contrato",
        description: "Não foi possível atualizar as informações do contrato.",
        variant: "destructive",
      });
      return false;
    }
  };

  return {
    contracts: paginatedContracts,
    allContracts,
    filteredCount,
    isLoading,
    error,
    filters,
    setFilters,
    statusOptions,
    sectorOptions,
    subacaoOptions,
    classif1Options,
    classif2Options,
    // Pagination
    currentPage,
    setCurrentPage,
    totalPages,
    // Sorting
    sortField,
    setSortField,
    sortDirection,
    setSortDirection,
    // Updates
    updateContractField
  };
}
