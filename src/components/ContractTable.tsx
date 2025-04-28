
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Contract } from "@/types/Contract";
import { useNavigate } from "react-router-dom";

interface ContractTableProps {
  contracts: Contract[];
  isLoading: boolean;
}

export function ContractTable({ contracts, isLoading }: ContractTableProps) {
  const navigate = useNavigate();

  const handleViewDetails = (contract: Contract) => {
    navigate(`/contrato/${contract.id}`);
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
    <div className="bg-white rounded-md shadow overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader className="bg-navy-50">
            <TableRow>
              <TableHead className="font-semibold">Número</TableHead>
              <TableHead className="font-semibold">Resumo</TableHead>
              <TableHead className="font-semibold text-center">Dias Restantes</TableHead>
              <TableHead className="font-semibold text-center">Status</TableHead>
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
  );
}
