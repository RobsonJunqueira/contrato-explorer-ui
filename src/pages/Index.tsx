
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContractTable } from "@/components/ContractTable";
import { FilterBar } from "@/components/FilterBar";
import { useContracts } from "@/hooks/useContracts";
import { ContractFilters } from "@/types/Contract";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut } from "lucide-react";

export default function Index() {
  const { 
    contracts,
    allContracts, 
    isLoading, 
    error,
    filters: hookFilters,
    setFilters: setHookFilters,
    filteredCount,
    statusOptions,
    sectorOptions,
    subacaoOptions,
    classif1Options,
    classif2Options,
    documentTypeOptions,
    currentPage,
    setCurrentPage,
    totalPages,
    sortField,
    setSortField,
    sortDirection,
    setSortDirection
  } = useContracts();
  
  // Initialize filters state - but sync with hook filters
  const [filters, setFilters] = useState<ContractFilters>(hookFilters);
  const { isAuthenticated, logout } = useAuth();

  // Update hook filters when local filters change
  const handleFilterChange = (newFilters: ContractFilters) => {
    setFilters(newFilters);
    setHookFilters(newFilters);
    // Reset to first page when filters change
    setCurrentPage(1);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-navy-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Gerenciador de Contratos</h1>
              <p className="text-navy-100">Visualize e gerencie todos os contratos ativos e encerrados</p>
            </div>
            {isAuthenticated ? (
              <Button variant="outline" className="text-white border-white hover:bg-navy-800 bg-navy-700" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            ) : (
              <Button variant="outline" className="text-white border-white hover:bg-navy-800 bg-navy-700" asChild>
                <Link to="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Login
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            statusOptions={statusOptions}
            sectorOptions={sectorOptions}
            subacaoOptions={subacaoOptions}
            classif1Options={classif1Options}
            classif2Options={classif2Options}
            documentTypeOptions={documentTypeOptions || []}
            defaultExpanded={false} // Set filters to be collapsed by default
          />
        </div>

        {/* Show filtered count */}
        <div className="mb-4 text-sm text-gray-600">
          Exibindo {contracts.length > 0 ? (currentPage - 1) * 20 + 1 : 0} - {Math.min(currentPage * 20, filteredCount)} de {filteredCount} contratos
        </div>

        <ContractTable 
          contracts={contracts}
          isLoading={isLoading}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          sortField={sortField}
          sortDirection={sortDirection}
          onSortChange={(field) => {
            // If clicking the same field, toggle direction
            if (field === sortField) {
              setSortDirection(sortDirection === "asc" ? "desc" : "asc");
            } else {
              // New field, default to ascending
              setSortField(field);
              setSortDirection("asc");
            }
          }}
        />
      </main>
    </div>
  );
}
