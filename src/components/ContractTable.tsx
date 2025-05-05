
import React from "react";
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
import { Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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

  // Handle loading state
  if (isLoading) {
    return (
      <div className="w-full my-8 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-700"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">
                {renderSortableHeader("num_contrato", "Número")}
              </TableHead>
              <TableHead className="font-medium">
                {renderSortableHeader("nom_credor", "Credor")}
              </TableHead>
              <TableHead className="font-medium hidden md:table-cell">
                {renderSortableHeader("dat_fim", "Data Fim")}
              </TableHead>
              <TableHead className="font-medium hidden md:table-cell">
                {renderSortableHeader("dias_restantes", "Dias Restantes")}
              </TableHead>
              <TableHead className="font-medium hidden lg:table-cell">
                {renderSortableHeader("val_global", "Valor Global")}
              </TableHead>
              <TableHead className="font-medium text-right">
                Ações
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {contracts.length > 0 ? (
              contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-navy-900 font-medium">{contract.num_contrato}</span>
                      <span className="text-xs text-gray-500">{contract.dsc_tipo_documento_legal}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-navy-900 font-medium truncate max-w-[200px]">
                        {contract.nom_credor}
                      </span>
                      <span className="text-xs text-gray-500">{contract.num_cnpj_cpf}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {contract.dat_fim || "-"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
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
                  <TableCell className="hidden lg:table-cell">
                    {formatCurrency(contract.val_global)}
                  </TableCell>
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
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
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
