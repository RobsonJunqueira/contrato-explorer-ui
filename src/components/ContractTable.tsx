
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Contract } from "@/types/Contract";
import { formatCurrency } from "@/lib/formatters";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { Eye, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ContractTableProps {
  contracts: Contract[];
  isLoading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  sortField: keyof Contract;
  sortDirection: "asc" | "desc";
  onSortChange: (field: keyof Contract) => void;
}

// Extended list of available columns with display names
const availableColumns = [
  { id: "num_contrato", name: "Número", visible: true },
  { id: "nom_credor", name: "Credor", visible: true },
  { id: "dat_fim", name: "Data Fim", visible: true },
  { id: "dias_restantes", name: "Dias Restantes", visible: true },
  { id: "val_global", name: "Valor Global", visible: true },
  { id: "status_vigencia", name: "Status", visible: false },
  { id: "class1_setor", name: "Setor", visible: false },
  { id: "nmSubacao", name: "Subação", visible: false },
  { id: "dsc_tipo_documento_legal", name: "Tipo Doc.", visible: false },
  { id: "dsc_objeto_contrato", name: "Objeto", visible: false },
  { id: "classif1", name: "Classificação 1", visible: true }, // Set to visible by default
  { id: "classif2", name: "Classificação 2", visible: true }, // Set to visible by default
  { id: "actions", name: "Ações", visible: true }
];

export const ContractTable = ({
  contracts,
  isLoading,
  currentPage,
  totalPages,
  onPageChange,
  sortField,
  sortDirection,
  onSortChange
}: ContractTableProps) => {
  const navigate = useNavigate();
  const [visibleColumns, setVisibleColumns] = useState(availableColumns);
  
  // Function to determine the sort icon based on current sort state
  const getSortIcon = (field: keyof Contract) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? "↑" : "↓";
  };

  // Create a sortable header
  const renderSortableHeader = (field: keyof Contract, label: string) => {
    return (
      <div 
        className="flex items-center cursor-pointer hover:text-navy-800"
        onClick={() => onSortChange(field)}
      >
        {label} 
        <span className="ml-1">{getSortIcon(field)}</span>
      </div>
    );
  };

  // Toggle column visibility
  const toggleColumnVisibility = (columnId: string) => {
    setVisibleColumns(
      visibleColumns.map(col => 
        col.id === columnId ? { ...col, visible: !col.visible } : col
      )
    );
  };

  // Is column visible
  const isColumnVisible = (columnId: string) => {
    return visibleColumns.find(col => col.id === columnId)?.visible || false;
  };

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full my-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-700"></div>
      </div>
    );
  }

  // Function to render the appropriate cell based on column ID
  const renderCell = (contract: Contract, columnId: string) => {
    switch (columnId) {
      case "num_contrato":
        return (
          <TableCell>
            <div className="flex flex-col">
              <span className="text-navy-900 font-medium">{contract.num_contrato}</span>
              <span className="text-xs text-gray-500">{contract.dsc_tipo_documento_legal}</span>
            </div>
          </TableCell>
        );
      case "nom_credor":
        return (
          <TableCell>
            <div className="flex flex-col">
              <span className="text-navy-900 font-medium truncate max-w-[200px]">
                {contract.nom_credor}
              </span>
              <span className="text-xs text-gray-500">{contract.num_cnpj_cpf}</span>
            </div>
          </TableCell>
        );
      case "dat_fim":
        return (
          <TableCell>{contract.dat_fim || "-"}</TableCell>
        );
      case "dias_restantes":
        return (
          <TableCell>
            <Badge 
              variant={
                contract.dias_restantes < 30 ? "destructive" : 
                contract.dias_restantes < 90 ? "secondary" : 
                "outline"
              }
            >
              {contract.dias_restantes}
            </Badge>
          </TableCell>
        );
      case "val_global":
        return (
          <TableCell>{formatCurrency(contract.val_global)}</TableCell>
        );
      case "status_vigencia":
        return (
          <TableCell>{contract.status_vigencia}</TableCell>
        );
      case "class1_setor":
        return (
          <TableCell>{contract.class1_setor || "-"}</TableCell>
        );
      case "nmSubacao":
        return (
          <TableCell>{contract.nmSubacao || "-"}</TableCell>
        );
      case "dsc_tipo_documento_legal":
        return (
          <TableCell>{contract.dsc_tipo_documento_legal || "-"}</TableCell>
        );
      case "dsc_objeto_contrato":
        return (
          <TableCell>
            <span className="truncate block max-w-[200px]">
              {contract.dsc_objeto_contrato || "-"}
            </span>
          </TableCell>
        );
      case "classif1":
        return (
          <TableCell>{contract.classif1 || "-"}</TableCell>
        );
      case "classif2":
        return (
          <TableCell>{contract.classif2 || "-"}</TableCell>
        );
      case "actions":
        return (
          <TableCell className="text-right">
            <Button
              variant="ghost"
              size="sm"
              className="text-navy-700 hover:text-navy-900 hover:bg-navy-50 p-2 h-8 w-8"
              onClick={() => navigate(`/contrato/${contract.id}`)}
            >
              <Eye className="h-4 w-4" />
              <span className="sr-only">Ver detalhes</span>
            </Button>
          </TableCell>
        );
      default:
        return <TableCell>-</TableCell>;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end mb-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              <Settings className="h-4 w-4 mr-2" />
              Colunas
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Colunas visíveis</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableColumns.filter(col => col.id !== "actions").map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={isColumnVisible(column.id)}
                onCheckedChange={() => toggleColumnVisibility(column.id)}
              >
                {column.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {visibleColumns.filter(col => col.visible).map((column) => (
                column.id === "actions" ? (
                  <TableHead key={column.id} className="font-medium text-right">
                    {column.name}
                  </TableHead>
                ) : (
                  <TableHead key={column.id} className="font-medium">
                    {renderSortableHeader(column.id as keyof Contract, column.name)}
                  </TableHead>
                )
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts && contracts.length > 0 ? (
              contracts.map((contract) => (
                <TableRow key={contract.id || contract.num_contrato}>
                  {visibleColumns.filter(col => col.visible).map((column) => (
                    <React.Fragment key={column.id}>
                      {renderCell(contract, column.id)}
                    </React.Fragment>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumns.filter(col => col.visible).length} className="text-center py-8 text-gray-500">
                  Nenhum contrato encontrado com os filtros selecionados.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {totalPages > 1 && (
        <Pagination className="justify-center">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) onPageChange(currentPage - 1);
                }}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show 5 pages max with current in the middle when possible
              let pageToShow: number;
              
              if (totalPages <= 5) {
                // If total pages is 5 or less, show all pages
                pageToShow = i + 1;
              } else if (currentPage <= 3) {
                // If current page is close to start, show first 5 pages
                pageToShow = i + 1;
              } else if (currentPage >= totalPages - 2) {
                // If current page is close to end, show last 5 pages
                pageToShow = totalPages - 4 + i;
              } else {
                // Otherwise show 2 pages before and after current
                pageToShow = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageToShow}>
                  <PaginationLink 
                    href="#" 
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageToShow);
                    }}
                    isActive={pageToShow === currentPage}
                  >
                    {pageToShow}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage < totalPages) onPageChange(currentPage + 1);
                }}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
};
