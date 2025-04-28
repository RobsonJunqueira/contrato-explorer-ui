
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Contract } from "@/types/Contract";
import { formatCurrency } from "@/lib/formatters";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface ContractDetailViewProps {
  contract: Contract | undefined;
  isLoading: boolean;
}

export function ContractDetailView({ contract, isLoading }: ContractDetailViewProps) {
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-navy-700"></div>
      </div>
    );
  }

  if (!contract) {
    return (
      <Card>
        <CardContent className="pt-6 text-center">
          <h3 className="text-lg font-medium text-gray-500">Contrato não encontrado</h3>
          <p className="text-gray-400 mb-4">O contrato solicitado não está disponível</p>
          <Button onClick={() => navigate("/")} className="mt-2">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para lista
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button 
          variant="outline" 
          onClick={() => navigate("/")}
          className="border-navy-700 text-navy-700 hover:bg-navy-50"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Voltar para lista
        </Button>
        
        <span 
          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            contract.status_vigencia === 'VIGENTE' 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {contract.status_vigencia}
        </span>
      </div>

      <Card>
        <CardHeader className="bg-navy-50">
          <CardTitle className="text-navy-900">
            Contrato {contract.num_contrato}
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-navy-900">Resumo</h3>
              <p className="text-gray-700 mt-1">{contract.dsc_resumo}</p>
            </div>
            
            <Separator />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Credor</h3>
                <p className="text-navy-900 font-medium">{contract.nom_credor}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">CNPJ/CPF</h3>
                <p className="text-navy-900 font-medium">{contract.num_cnpj_cpf}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data de Início</h3>
                <p className="text-navy-900 font-medium">{contract.dat_inicio}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data de Fim</h3>
                <p className="text-navy-900 font-medium">{contract.dat_fim}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Valor Global</h3>
                <p className="text-navy-900 font-medium">{formatCurrency(contract.val_global)}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Dias Restantes</h3>
                <p className="text-navy-900 font-medium">
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
                </p>
              </div>
              
              {contract.dat_publicacao && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Data de Publicação</h3>
                  <p className="text-navy-900 font-medium">{contract.dat_publicacao}</p>
                </div>
              )}
              
              {contract.contato_gestor && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Contato do Gestor</h3>
                  <p className="text-navy-900 font-medium">{contract.contato_gestor}</p>
                </div>
              )}
            </div>
            
            <Separator />
            
            {contract.object_contrato && (
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Objeto do Contrato</h3>
                <p className="text-gray-700 mt-1">{contract.object_contrato}</p>
              </div>
            )}
            
            {contract.observacoes && (
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Observações</h3>
                <p className="text-gray-700 mt-1">{contract.observacoes}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
