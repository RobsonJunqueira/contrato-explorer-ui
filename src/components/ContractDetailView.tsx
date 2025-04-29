
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Contract } from "@/types/Contract";
import { formatCurrency } from "@/lib/formatters";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";

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

  // Create transparency portal URL
  const transparencyPortalURL = `https://www.transparencia.sc.gov.br/contratos/extratosigef?nucontratofiltro%5B%5D=${contract.num_contrato}&unidadegestorafiltro%5B%5D=${contract.cod_unidade_gestora || ""}&gestaofiltro%5B%5D=1`;

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
              {/* Main contract information - following original table order */}
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Número do Contrato</h3>
                <p className="text-navy-900 font-medium">{contract.num_contrato}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Tipo de Documento Legal</h3>
                <p className="text-navy-900 font-medium">{contract.dsc_tipo_documento_legal || contract.cod_tipo_documento_legal || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Classificação do Contrato</h3>
                <p className="text-navy-900 font-medium">{contract["nom-contrato_classificacao"] || contract.cod_contrato_classificacao || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Tipo de Contrato</h3>
                <p className="text-navy-900 font-medium">{contract["dsc_tipo-contrato"] || contract.cod_tipo_contrato || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Modalidade</h3>
                <p className="text-navy-900 font-medium">{contract.nom_modalidade || contract.cod_modalidade || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Número do Edital</h3>
                <p className="text-navy-900 font-medium">{contract.num_edital || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Credor</h3>
                <p className="text-navy-900 font-medium">{contract.nom_credor || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">CNPJ/CPF</h3>
                <p className="text-navy-900 font-medium">{contract.num_cnpj_cpf || contract.num_documento_credor || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Email do Credor</h3>
                <p className="text-navy-900 font-medium">{contract.dsc_email_credor || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Responsável PJ do Credor</h3>
                <p className="text-navy-900 font-medium">{contract.nom_responsavel_pj_credor || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Representante do Credor</h3>
                <p className="text-navy-900 font-medium">{contract.nom_representante_credor || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Situação do Contrato</h3>
                <p className="text-navy-900 font-medium">{contract.dsc_situacao_contrato || contract.cod_situacao_contrato || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Link do Processo</h3>
                {contract.link_processo ? (
                  <a href={contract.link_processo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium flex items-center">
                    Acessar <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                ) : "-"}
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Código da Subação</h3>
                <p className="text-navy-900 font-medium">{contract.cod_subacao || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Setor Responsável</h3>
                <p className="text-navy-900 font-medium">{contract.class1_setor || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Tipo</h3>
                <p className="text-navy-900 font-medium">{contract.class2_tipo || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Valor Original do Contrato</h3>
                <p className="text-navy-900 font-medium">{contract.val_contrato_original ? formatCurrency(contract.val_contrato_original) : "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Link do Processo de Providência</h3>
                {contract.link_processo_providencia ? (
                  <a href={contract.link_processo_providencia} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium flex items-center">
                    Acessar <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                ) : "-"}
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Código da Subação</h3>
                <p className="text-navy-900 font-medium">{contract.codSubacao || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Classificação 1</h3>
                <p className="text-navy-900 font-medium">{contract.classif1 || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Classificação 2</h3>
                <p className="text-navy-900 font-medium">{contract.classif2 || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Programa</h3>
                <p className="text-navy-900 font-medium">{contract.nmPrograma || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Subação</h3>
                <p className="text-navy-900 font-medium">{contract.nmSubacao || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Valor Original Atualizado</h3>
                <p className="text-navy-900 font-medium">
                  {contract.val_contrato_original_atualizado ? formatCurrency(contract.val_contrato_original_atualizado) : "-"}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Valor Global</h3>
                <p className="text-navy-900 font-medium">{contract.val_global ? formatCurrency(contract.val_global) : "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data de Carga</h3>
                <p className="text-navy-900 font-medium">{contract.dat_carga || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Status de Vigência</h3>
                <p className="text-navy-900 font-medium">{contract.status_vigencia || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data Atual</h3>
                <p className="text-navy-900 font-medium">{contract.dat_atual || "-"}</p>
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
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data de Assinatura</h3>
                <p className="text-navy-900 font-medium">{contract.dat_assinatura || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data de Início de Vigência</h3>
                <p className="text-navy-900 font-medium">{contract.dat_inicio_vigencia || contract.dat_inicio || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data de Fim de Vigência</h3>
                <p className="text-navy-900 font-medium">{contract.dat_fim_vigencia || contract.dat_fim || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Data Fim de Vigência Atual</h3>
                <p className="text-navy-900 font-medium">{contract.dat_fim_vigencia_atual || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Número do Documento Legal</h3>
                <p className="text-navy-900 font-medium">{contract.num_documento_legal || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Número do Processo</h3>
                <p className="text-navy-900 font-medium">{contract.num_processo || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Resumo do Contrato</h3>
                <p className="text-navy-900 font-medium">{contract.dsc_resumo_contrato || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Unidade Gestora</h3>
                <p className="text-navy-900 font-medium">{contract.cod_unidade_gestora || "-"}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-gray-500">Processo de Providência</h3>
                <p className="text-navy-900 font-medium">{contract.processo_providencia || "-"}</p>
              </div>
            </div>
            
            <Separator />
            
            {contract.dsc_objeto_contrato && (
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Objeto do Contrato</h3>
                <p className="text-gray-700 mt-1">{contract.dsc_objeto_contrato}</p>
              </div>
            )}
            
            {contract.observacoes && (
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Observações</h3>
                <p className="text-gray-700 mt-1">{contract.observacoes}</p>
              </div>
            )}
            
            <Separator />
            
            {/* Portal da Transparência link */}
            <div className="pt-4">
              <a 
                href={transparencyPortalURL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-navy-700 hover:text-navy-900 font-medium"
              >
                <ExternalLink className="mr-2 h-5 w-5" />
                Visualizar no Portal da Transparência
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
