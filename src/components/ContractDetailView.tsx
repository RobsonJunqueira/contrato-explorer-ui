
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

              {contract.class1_setor && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Setor Responsável</h3>
                  <p className="text-navy-900 font-medium">{contract.class1_setor}</p>
                </div>
              )}
              
              {contract.nmSubacao && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Subação</h3>
                  <p className="text-navy-900 font-medium">{contract.nmSubacao}</p>
                </div>
              )}
              
              {contract.cod_tipo_documento_legal && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Tipo de Documento Legal</h3>
                  <p className="text-navy-900 font-medium">{contract.dsc_tipo_documento_legal || contract.cod_tipo_documento_legal}</p>
                </div>
              )}
              
              {contract.cod_modalidade && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Modalidade</h3>
                  <p className="text-navy-900 font-medium">{contract.nom_modalidade || contract.cod_modalidade}</p>
                </div>
              )}
              
              {contract.num_edital && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Número do Edital</h3>
                  <p className="text-navy-900 font-medium">{contract.num_edital}</p>
                </div>
              )}
              
              {contract.dsc_email_credor && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Email do Credor</h3>
                  <p className="text-navy-900 font-medium">{contract.dsc_email_credor}</p>
                </div>
              )}
              
              {contract.nom_responsavel_pj_credor && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Responsável PJ do Credor</h3>
                  <p className="text-navy-900 font-medium">{contract.nom_responsavel_pj_credor}</p>
                </div>
              )}
              
              {contract.nom_representante_credor && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Representante do Credor</h3>
                  <p className="text-navy-900 font-medium">{contract.nom_representante_credor}</p>
                </div>
              )}
              
              {contract.cod_situacao_contrato && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Situação do Contrato</h3>
                  <p className="text-navy-900 font-medium">{contract.dsc_situacao_contrato || contract.cod_situacao_contrato}</p>
                </div>
              )}
              
              {contract.link_processo && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Link do Processo</h3>
                  <a href={contract.link_processo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">{contract.link_processo}</a>
                </div>
              )}
              
              {contract.val_contrato_original && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Valor Original do Contrato</h3>
                  <p className="text-navy-900 font-medium">{formatCurrency(contract.val_contrato_original)}</p>
                </div>
              )}
              
              {contract.val_contrato_original_atualizado && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Valor Original Atualizado</h3>
                  <p className="text-navy-900 font-medium">{formatCurrency(contract.val_contrato_original_atualizado)}</p>
                </div>
              )}
              
              {contract.dat_carga && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Data de Carga</h3>
                  <p className="text-navy-900 font-medium">{contract.dat_carga}</p>
                </div>
              )}
              
              {contract.dat_atual && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Data Atual</h3>
                  <p className="text-navy-900 font-medium">{contract.dat_atual}</p>
                </div>
              )}
              
              {contract.dat_fim_vigencia_atual && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Data Fim de Vigência Atual</h3>
                  <p className="text-navy-900 font-medium">{contract.dat_fim_vigencia_atual}</p>
                </div>
              )}
              
              {contract.num_documento_legal && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Número do Documento Legal</h3>
                  <p className="text-navy-900 font-medium">{contract.num_documento_legal}</p>
                </div>
              )}
              
              {contract.num_processo && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Número do Processo</h3>
                  <p className="text-navy-900 font-medium">{contract.num_processo}</p>
                </div>
              )}
              
              {contract.class2_tipo && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Tipo</h3>
                  <p className="text-navy-900 font-medium">{contract.class2_tipo}</p>
                </div>
              )}
              
              {contract.nmPrograma && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Programa</h3>
                  <p className="text-navy-900 font-medium">{contract.nmPrograma}</p>
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
            
            {contract.dsc_objeto_contrato && contract.dsc_objeto_contrato !== contract.object_contrato && (
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Descrição do Objeto</h3>
                <p className="text-gray-700 mt-1">{contract.dsc_objeto_contrato}</p>
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
