
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Contract } from "@/types/Contract";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight } from "lucide-react";
import { 
  Pagination, 
  PaginationContent, 
  PaginationEllipsis, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";

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

export function ContractTable({ 
  contracts, 
  isLoading, 
  currentPage, 
  totalPages, 
  onPageChange,
  sortField,
  sortDirection,
  onSortChange
}: ContractTableProps) {
  const navigate = useNavigate();

  const handleViewDetails = (contract: Contract) => {
    navigate(`/contrato/${contract.id}`);
  };
  
  const getSortIcon = (field: keyof Contract) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ArrowUp className="h-4 w-4 ml-1" /> : <ArrowDown className="h-4 w-4 ml-1" />;
  };
  
  const renderPagination = () => {
    const pages = [];
    const maxPageButtons = 5;
    
    // Always show first page
    pages.push(1);
    
    // Calculate range of pages to show
    let startPage = Math.max(2, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxPageButtons - 3);
    
    // Adjust if we're near the end
    if (endPage - startPage < maxPageButtons - 3 && startPage > 2) {
      startPage = Math.max(2, totalPages - maxPageButtons + 2);
    }
    
    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push("ellipsis1");
    }
    
    // Add page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push("ellipsis2");
    }
    
    // Always show last page if there is more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages.map((page, index) => {
      if (page === "ellipsis1" || page === "ellipsis2") {
        return (
          <PaginationItem key={`ellipsis-${index}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
      
      return (
        <PaginationItem key={`page-${page}`}>
          <PaginationLink 
            isActive={currentPage === page} 
            onClick={() => onPageChange(page as number)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>
      );
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-700"></div>
      </div>
    );
  }

  if (contracts.length === 0) {
    return (
      <div className="bg-white rounded-md shadow p-8 text-center">
        <h3 className="text-lg font-medium text-gray-500">Nenhum contrato encontrado</h3>
        <p className="text-gray-400">Tente ajustar os filtros para encontrar o que procura</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-md shadow overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-navy-50">
              <TableRow>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => onSortChange("num_contrato")}
                >
                  <div className="flex items-center">
                    Número
                    {getSortIcon("num_contrato")}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold cursor-pointer"
                  onClick={() => onSortChange("dsc_resumo")}
                >
                  <div className="flex items-center">
                    Resumo
                    {getSortIcon("dsc_resumo")}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-center cursor-pointer"
                  onClick={() => onSortChange("dias_restantes")}
                >
                  <div className="flex items-center justify-center">
                    Dias Restantes
                    {getSortIcon("dias_restantes")}
                  </div>
                </TableHead>
                <TableHead 
                  className="font-semibold text-center cursor-pointer"
                  onClick={() => onSortChange("status_vigencia")}
                >
                  <div className="flex items-center justify-center">
                    Status
                    {getSortIcon("status_vigencia")}
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contracts.map((contract) => (
                <TableRow key={contract.id} className="hover:bg-navy-50/50">
                  <TableCell className="font-medium">{contract.num_contrato}</TableCell>
                  <TableCell className="max-w-md truncate">{contract.dsc_resumo}</TableCell>
                  <TableCell className="text-center">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contract.dias_restantes < 30 
                          ? 'bg-red-100 text-red-800' 
                          : contract.dias_restantes < 90 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {contract.dias_restantes}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <span 
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        contract.status_vigencia === 'VIGENTE' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {contract.status_vigencia}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-navy-700 text-navy-700 hover:bg-navy-50"
                      onClick={() => handleViewDetails(contract)}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    
      {totalPages > 1 && (
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
            
            {renderPagination()}
            
            <PaginationItem>
              <PaginationNext
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
