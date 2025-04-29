
import { FilterBar } from "@/components/FilterBar";
import { ContractTable } from "@/components/ContractTable";
import { useContracts } from "@/hooks/useContracts";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";
import { Contract } from "@/types/Contract";

const Index = () => {
  const { 
    contracts, 
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
    setSortDirection
  } = useContracts();
  
  const { toast } = useToast();

  useEffect(() => {
    if (error) {
      toast({
        title: "Erro ao carregar contratos",
        description: "Não foi possível carregar a lista de contratos. Por favor, tente novamente.",
        variant: "destructive",
      });
    }
  }, [error, toast]);
  
  const handleSortChange = (field: keyof Contract) => {
    if (sortField === field) {
      // Toggle sort direction if clicking the same field
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Default to ascending for a new field
      setSortField(field);
      setSortDirection("asc");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-navy-900 text-white py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold">Explorador de Contratos</h1>
          <p className="text-navy-100 mt-2">Visualize e gerencie informações sobre contratos</p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <FilterBar 
          filters={filters} 
          onFilterChange={setFilters} 
          statusOptions={statusOptions}
          sectorOptions={sectorOptions}
          subacaoOptions={subacaoOptions}
          classif1Options={classif1Options}
          classif2Options={classif2Options}
        />
        
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy-900">
            Lista de Contratos 
            <span className="ml-2 text-sm font-normal text-gray-500">
              {contracts.length} contratos exibidos
            </span>
          </h2>
        </div>
        
        <ContractTable 
          contracts={contracts} 
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={handleSortChange}
        />
      </main>
    </div>
  );
};

export default Index;
