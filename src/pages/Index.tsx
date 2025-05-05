
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ContractTable } from "@/components/ContractTable";
import { FilterBar } from "@/components/FilterBar";
import { useContracts } from "@/hooks/useContracts";
import { ContractFilters } from "@/types/Contract";
import { filterContracts } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogIn, LogOut } from "lucide-react";

export default function Index() {
  const { allContracts, isLoading, error } = useContracts();
  const [filters, setFilters] = useState<ContractFilters>({});
  const [filteredContracts, setFilteredContracts] = useState(allContracts);
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (allContracts) {
      setFilteredContracts(filterContracts(allContracts, filters));
    }
  }, [allContracts, filters]);

  const handleFilterChange = (newFilters: ContractFilters) => {
    setFilters(newFilters);
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
              <Button variant="outline" className="text-white border-white hover:bg-navy-800" onClick={logout}>
                <LogOut className="mr-2 h-4 w-4" />
                Sair
              </Button>
            ) : (
              <Button variant="outline" className="text-white border-white hover:bg-navy-800" asChild>
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
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange} 
            contractsCount={filteredContracts.length}
            totalCount={allContracts.length}
          />
        </div>

        <ContractTable 
          contracts={filteredContracts}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}
