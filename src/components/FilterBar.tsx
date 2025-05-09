
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContractFilters } from "@/types/Contract";
import { Search, ChevronDown, ChevronUp } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { 
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface FilterBarProps {
  filters: ContractFilters;
  onFilterChange: (filters: ContractFilters) => void;
  statusOptions: string[];
  sectorOptions: string[];
  subacaoOptions: string[];
  classif1Options: string[];
  classif2Options: string[];
  documentTypeOptions: string[];
  defaultExpanded?: boolean; // New prop to control initial expanded state
}

export function FilterBar({ 
  filters, 
  onFilterChange, 
  statusOptions, 
  sectorOptions, 
  subacaoOptions,
  classif1Options,
  classif2Options,
  documentTypeOptions = [], // Provide a default empty array
  defaultExpanded = true // Default to expanded if not specified
}: FilterBarProps) {
  // Track selected document types
  const [selectedDocTypes, setSelectedDocTypes] = useState<string[]>(
    filters.dsc_tipo_documento_legal ? filters.dsc_tipo_documento_legal.split(',') : []
  );
  
  // Track if filters are expanded or collapsed - use the defaultExpanded prop
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);

  const handleFilterChange = (key: keyof ContractFilters, value: string) => {
    // If classif1 changes, reset classif2
    if (key === "classif1") {
      onFilterChange({ ...filters, [key]: value, classif2: "_all_" });
    } else {
      onFilterChange({ ...filters, [key]: value });
    }
  };

  const handleSwitchChange = (checked: boolean) => {
    // When switch is on, show only active contracts (VIGENTE)
    // When switch is off, show all contracts (empty status filter)
    onFilterChange({ ...filters, status_vigencia: checked ? "VIGENTE" : "" });
  };

  // Handle document type filter changes
  const handleDocTypeChange = (type: string, checked: boolean) => {
    const newSelected = checked 
      ? [...selectedDocTypes, type] 
      : selectedDocTypes.filter(t => t !== type);
    
    setSelectedDocTypes(newSelected);
    onFilterChange({ 
      ...filters, 
      dsc_tipo_documento_legal: newSelected.length > 0 ? newSelected.join(',') : '' 
    });
  };

  // Update selectedDocTypes when filters change (in case they're set externally)
  useEffect(() => {
    if (filters.dsc_tipo_documento_legal) {
      setSelectedDocTypes(filters.dsc_tipo_documento_legal.split(','));
    } else {
      setSelectedDocTypes([]);
    }
  }, [filters.dsc_tipo_documento_legal]);

  return (
    <Collapsible className="w-full" open={isExpanded} onOpenChange={setIsExpanded}>
      <div className="p-4 flex items-center justify-between border-b">
        <h2 className="text-lg font-semibold text-navy-900">Filtros</h2>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="hover:bg-navy-50">
            {isExpanded ? (
              <>
                <ChevronUp className="h-4 w-4 mr-1" />
                <span>Recolher</span>
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-1" />
                <span>Expandir</span>
              </>
            )}
          </Button>
        </CollapsibleTrigger>
      </div>
      
      <CollapsibleContent>
        <div className="p-4">
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
                  <span className="text-xs text-gray-500">TODOS</span>
                  <Switch 
                    id="status_vigencia" 
                    checked={filters.status_vigencia === "VIGENTE"}
                    onCheckedChange={handleSwitchChange}
                  />
                  <span className="text-xs text-gray-500">VIGENTES</span>
                </div>
              </div>
            </div>
            
            {/* Document Type Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Tipo de Documento Legal
              </label>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between">
                    {selectedDocTypes.length > 0 
                      ? `${selectedDocTypes.length} selecionado${selectedDocTypes.length > 1 ? 's' : ''}` 
                      : 'Selecionar tipos'}
                    <span className="ml-2 h-4 w-4 shrink-0 opacity-50">▼</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuLabel>Tipos de Documento</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {documentTypeOptions.map(type => (
                    <DropdownMenuCheckboxItem
                      key={type}
                      checked={selectedDocTypes.includes(type)}
                      onCheckedChange={(checked) => handleDocTypeChange(type, checked)}
                    >
                      {type}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="class1_setor" className="text-sm font-medium text-gray-700">
                Setor Responsável
              </label>
              <Select
                value={filters.class1_setor || "_all_"}
                onValueChange={value => handleFilterChange("class1_setor", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um setor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_all_">Todos</SelectItem>
                  {sectorOptions.filter(Boolean).map(sector => (
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
                value={filters.nmSubacao || "_all_"}
                onValueChange={value => handleFilterChange("nmSubacao", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma subação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_all_">Todas</SelectItem>
                  {subacaoOptions.filter(Boolean).map(subacao => (
                    <SelectItem key={subacao} value={subacao}>
                      {subacao}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            {/* Classification filters (classif1 and classif2) */}
            <div className="space-y-2">
              <label htmlFor="classif1" className="text-sm font-medium text-gray-700">
                Classificação - Nível 1
              </label>
              <Select
                value={filters.classif1 || "_all_"}
                onValueChange={value => handleFilterChange("classif1", value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione uma classificação" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_all_">Todas</SelectItem>
                  {classif1Options.filter(Boolean).map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="classif2" className="text-sm font-medium text-gray-700">
                Classificação - Nível 2
              </label>
              <Select
                value={filters.classif2 || "_all_"}
                onValueChange={value => handleFilterChange("classif2", value)}
                disabled={filters.classif1 === "_all_"}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={filters.classif1 === "_all_" ? "Selecione Nível 1 primeiro" : "Selecione uma subclassificação"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="_all_">Todas</SelectItem>
                  {classif2Options.filter(Boolean).map(option => (
                    <SelectItem key={option} value={option}>
                      {option}
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
      </CollapsibleContent>
    </Collapsible>
  );
}
