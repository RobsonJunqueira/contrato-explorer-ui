
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContractFilters } from "@/types/Contract";
import { Search } from "lucide-react";

interface FilterBarProps {
  filters: ContractFilters;
  onFilterChange: (filters: ContractFilters) => void;
  statusOptions: string[];
}

export function FilterBar({ filters, onFilterChange, statusOptions }: FilterBarProps) {
  const handleFilterChange = (key: keyof ContractFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mb-6">
      <h2 className="text-lg font-semibold text-navy-900 mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label htmlFor="num_contrato" className="text-sm font-medium text-gray-700">
            Número do Contrato
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="num_contrato"
              placeholder="Buscar por número"
              className="pl-8"
              value={filters.num_contrato}
              onChange={e => handleFilterChange("num_contrato", e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="nom_credor" className="text-sm font-medium text-gray-700">
            Nome do Credor
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="nom_credor"
              placeholder="Buscar por credor"
              className="pl-8"
              value={filters.nom_credor}
              onChange={e => handleFilterChange("nom_credor", e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="status_vigencia" className="text-sm font-medium text-gray-700">
            Status de Vigência
          </label>
          <Select
            value={filters.status_vigencia || ""}
            onValueChange={value => handleFilterChange("status_vigencia", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>
                  {status}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
