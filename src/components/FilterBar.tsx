
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContractFilters } from "@/types/Contract";
import { Search } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface FilterBarProps {
  filters: ContractFilters;
  onFilterChange: (filters: ContractFilters) => void;
  statusOptions: string[];
  sectorOptions: string[];
  subacaoOptions: string[];
}

export function FilterBar({ filters, onFilterChange, statusOptions, sectorOptions, subacaoOptions }: FilterBarProps) {
  const handleFilterChange = (key: keyof ContractFilters, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const handleSwitchChange = (checked: boolean) => {
    onFilterChange({ ...filters, status_vigencia: checked ? "VIGENTE" : "ENCERRADO" });
  };

  return (
    <div className="bg-white p-4 rounded-md shadow mb-6">
      <h2 className="text-lg font-semibold text-navy-900 mb-4">Filtros</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
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
              value={filters.num_contrato || ''}
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
              value={filters.nom_credor || ''}
              onChange={e => handleFilterChange("nom_credor", e.target.value)}
            />
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="status_vigencia" className="text-sm font-medium text-gray-700">
              Status de Vigência
            </Label>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">ENCERRADO</span>
              <Switch 
                id="status_vigencia" 
                checked={filters.status_vigencia === "VIGENTE"}
                onCheckedChange={handleSwitchChange}
              />
              <span className="text-xs text-gray-500">VIGENTE</span>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="class1_setor" className="text-sm font-medium text-gray-700">
            Setor Responsável
          </label>
          <Select
            value={filters.class1_setor || ""}
            onValueChange={value => handleFilterChange("class1_setor", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um setor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todos</SelectItem>
              {sectorOptions.map(sector => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="nmSubacao" className="text-sm font-medium text-gray-700">
            Subação
          </label>
          <Select
            value={filters.nmSubacao || ""}
            onValueChange={value => handleFilterChange("nmSubacao", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione uma subação" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Todas</SelectItem>
              {subacaoOptions.map(subacao => (
                <SelectItem key={subacao} value={subacao}>
                  {subacao}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="dsc_objeto_contrato" className="text-sm font-medium text-gray-700">
            Objeto
          </label>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              id="dsc_objeto_contrato"
              placeholder="Buscar por objeto"
              className="pl-8"
              value={filters.dsc_objeto_contrato || ''}
              onChange={e => handleFilterChange("dsc_objeto_contrato", e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
