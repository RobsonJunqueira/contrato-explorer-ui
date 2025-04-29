
import { FilterBar } from "@/components/FilterBar";
import { ContractTable } from "@/components/ContractTable";
import { useContracts } from "@/hooks/useContracts";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const Index = () => {
  const { 
    contracts, 
    isLoading, 
    error, 
    filters, 
    setFilters, 
    statusOptions,
    sectorOptions,
    subacaoOptions
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
        />
        
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-navy-900">
            Lista de Contratos 
            <span className="ml-2 text-sm font-normal text-gray-500">
              {contracts.length} contratos encontrados
            </span>
          </h2>
        </div>
        
        <ContractTable contracts={contracts} isLoading={isLoading} />
      </main>
    </div>
  );
};

export default Index;
