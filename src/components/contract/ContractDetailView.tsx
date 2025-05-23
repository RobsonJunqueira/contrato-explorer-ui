
import { useState } from "react";
import { Contract } from "@/types/Contract";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { formatCurrency } from "@/lib/formatters";
import { useContracts } from "@/hooks/useContracts";
import { useToast } from "@/hooks/use-toast";
import { ExternalLink, FileText, Save, AlertTriangle } from "lucide-react";
import { EditableField } from "./EditableField";
import { EditableSelectField } from "./EditableSelectField";
import { AddOptionDialog } from "./AddOptionDialog";
import { ContractHeader } from "./ContractHeader";
import { ContractField } from "./ContractField";
import { StatusIndicator } from "./StatusIndicator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

interface ContractDetailViewProps {
  contract: Contract | undefined;
  isLoading: boolean;
}

export function ContractDetailView({ contract, isLoading }: ContractDetailViewProps) {
  const { 
    updateContractField, 
    sectorOptions, 
    typeOptions, 
    classif1Options, 
    classif2Options 
  } = useContracts();
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  // Dialog state for adding new values
  const [isAddSectorDialogOpen, setIsAddSectorDialogOpen] = useState(false);
  const [isAddTypeDialogOpen, setIsAddTypeDialogOpen] = useState(false);
  const [isAddClassif1DialogOpen, setIsAddClassif1DialogOpen] = useState(false);
  const [isAddClassif2DialogOpen, setIsAddClassif2DialogOpen] = useState(false);
  
  // New values for each field
  const [newSector, setNewSector] = useState("");
  const [newType, setNewType] = useState("");
  const [newClassif1, setNewClassif1] = useState("");
  const [newClassif2, setNewClassif2] = useState("");

  // Store modified fields
  const [modifiedFields, setModifiedFields] = useState<Record<string, string>>({});

  // Generic function for adding a new option
  const handleAddNewOption = async (field: string, value: string, setDialogState: (state: boolean) => void) => {
    if (!contract || !value.trim()) return;
    
    try {
      const success = await updateContractField(contract.id, { [field]: value.trim() } as Partial<Contract>);
      if (success) {
        // Update the local contract data to reflect changes immediately
        (contract as any)[field] = value.trim();
        toast({
          title: "Valor adicionado",
          description: "O novo valor foi adicionado com sucesso.",
        });
      }
    } catch (error) {
      console.error(`Error adding ${field}:`, error);
      toast({
        title: `Erro ao adicionar ${field}`,
        description: "Não foi possível adicionar o novo valor.",
        variant: "destructive",
      });
    }
    
    // Reset state
    setDialogState(false);
    if (field === "class1_setor") setNewSector("");
    if (field === "class2_tipo") setNewType("");
    if (field === "classif1") setNewClassif1("");
    if (field === "classif2") setNewClassif2("");
  };

  const handleAddSector = () => handleAddNewOption("class1_setor", newSector, setIsAddSectorDialogOpen);
  const handleAddType = () => handleAddNewOption("class2_tipo", newType, setIsAddTypeDialogOpen);
  const handleAddClassif1 = () => handleAddNewOption("classif1", newClassif1, setIsAddClassif1DialogOpen);
  const handleAddClassif2 = () => handleAddNewOption("classif2", newClassif2, setIsAddClassif2DialogOpen);
  
  const handleSaveField = (field: string, value: string) => {
    setModifiedFields(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSaveAllChanges = async () => {
    if (!contract || Object.keys(modifiedFields).length === 0) return;
    
    try {
      const success = await updateContractField(contract.id, modifiedFields as unknown as Partial<Contract>);
      if (success) {
        // Update the local contract data to reflect changes immediately
        Object.entries(modifiedFields).forEach(([key, value]) => {
          (contract as any)[key] = value;
        });
        
        toast({
          title: "Alterações salvas",
          description: "Todas as alterações foram salvas com sucesso.",
        });
        
        // Reset modified fields
        setModifiedFields({});
      }
    } catch (error) {
      console.error("Error saving fields:", error);
      toast({
        title: "Erro ao salvar",
        description: "Não foi possível salvar as alterações.",
        variant: "destructive",
      });
    }
  };

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
          <ContractHeader contract={undefined} />
        </CardContent>
      </Card>
    );
  }

  // Create transparency portal URL with the correct unit code
  const transparencyPortalURL = `https://www.transparencia.sc.gov.br/contratos/extratosigef?nucontratofiltro%5B%5D=${contract.num_contrato}&unidadegestorafiltro%5B%5D=${contract.cod_unidade_gestora || ""}&gestaofiltro%5B%5D=1`;

  return (
    <div className="space-y-6">
      <ContractHeader contract={contract} />

      {/* Add new item dialogs */}
      <AddOptionDialog
        isOpen={isAddSectorDialogOpen}
        onOpenChange={setIsAddSectorDialogOpen}
        title="Adicionar novo setor"
        description="Informe o nome do novo setor a ser adicionado."
        value={newSector}
        onChange={setNewSector}
        onAdd={handleAddSector}
      />

      <AddOptionDialog
        isOpen={isAddTypeDialogOpen}
        onOpenChange={setIsAddTypeDialogOpen}
        title="Adicionar novo tipo"
        description="Informe o nome do novo tipo a ser adicionado."
        value={newType}
        onChange={setNewType}
        onAdd={handleAddType}
      />

      <AddOptionDialog
        isOpen={isAddClassif1DialogOpen}
        onOpenChange={setIsAddClassif1DialogOpen}
        title="Adicionar nova classificação nível 1"
        description="Informe o nome da nova classificação a ser adicionada."
        value={newClassif1}
        onChange={setNewClassif1}
        onAdd={handleAddClassif1}
      />

      <AddOptionDialog
        isOpen={isAddClassif2DialogOpen}
        onOpenChange={setIsAddClassif2DialogOpen}
        title="Adicionar nova classificação nível 2"
        description="Informe o nome da nova classificação a ser adicionada."
        value={newClassif2}
        onChange={setNewClassif2}
        onAdd={handleAddClassif2}
      />

      <Card>
        <CardHeader className="bg-navy-50">
          <CardTitle className="text-navy-900 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span>Contrato {contract?.num_contrato}</span>
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
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="general">
            <TabsList className="mb-4">
              <TabsTrigger value="general">Geral</TabsTrigger>
              <TabsTrigger value="creditor">Credor</TabsTrigger>
              <TabsTrigger value="settings">Ajustes</TabsTrigger>
            </TabsList>
            
            <TabsContent value="general" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Objeto e Resumo</h3>
                {contract.dsc_objeto_contrato && (
                  <div className="mt-2">
                    <h4 className="text-md font-medium text-gray-700">Objeto do Contrato</h4>
                    <p className="text-gray-700">{contract.dsc_objeto_contrato}</p>
                  </div>
                )}
                <div className="mt-2">
                  <h4 className="text-md font-medium text-gray-700">Resumo</h4>
                  <p className="text-gray-700">{contract.dsc_resumo}</p>
                </div>
              </div>
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Main contract information - removed creditor info which now has its own tab */}
                <ContractField label="Número do Contrato" value={contract.num_contrato} />
                <ContractField label="Tipo de Documento Legal" value={contract.dsc_tipo_documento_legal || contract.cod_tipo_documento_legal} />
                <ContractField label="Classificação do Contrato" value={contract["nom-contrato_classificacao"] || contract.cod_contrato_classificacao} />
                <ContractField label="Tipo de Contrato" value={contract["dsc_tipo-contrato"] || contract.cod_tipo_contrato} />
                <ContractField label="Modalidade" value={contract.nom_modalidade || contract.cod_modalidade} />
                <ContractField label="Número do Edital" value={contract.num_edital} />
                <ContractField label="Situação do Contrato" value={contract.dsc_situacao_contrato || contract.cod_situacao_contrato} />
                <ContractField label="Link do Processo" value={contract.link_processo} />
                <ContractField label="Código da Subação" value={contract.cod_subacao} />
                <ContractField label="Setor Responsável" value={contract.class1_setor} />
                <ContractField label="Tipo" value={contract.class2_tipo} />
                <ContractField 
                  label="Valor Original do Contrato" 
                  value={contract.val_contrato_original ? formatCurrency(contract.val_contrato_original) : "-"} 
                />
                <ContractField label="Link do Processo de Providência" value={contract.link_processo_providencia} />
                <ContractField label="Código da Subação" value={contract.codSubacao} />
                <ContractField label="Classificação 1" value={contract.classif1} />
                <ContractField label="Classificação 2" value={contract.classif2} />
                <ContractField label="Programa" value={contract.nmPrograma} />
                <ContractField label="Subação" value={contract.nmSubacao} />
                <ContractField 
                  label="Valor Original Atualizado" 
                  value={contract.val_contrato_original_atualizado ? formatCurrency(contract.val_contrato_original_atualizado) : "-"}
                />
                <ContractField 
                  label="Valor Global" 
                  value={contract.val_global ? formatCurrency(contract.val_global) : "-"}
                />
                <ContractField label="Data de Carga" value={contract.dat_carga} />
                <ContractField label="Status de Vigência" value={contract.status_vigencia} />
                <ContractField label="Data Atual" value={contract.dat_atual} />
                <div>
                  <h3 className="text-sm font-semibold text-gray-500">Dias Restantes</h3>
                  <p className="text-navy-900 font-medium">
                    <StatusIndicator days={contract.dias_restantes} />
                  </p>
                </div>
                <ContractField label="Data de Assinatura" value={contract.dat_assinatura} />
                <ContractField label="Data de Início de Vigência" value={contract.dat_inicio_vigencia || contract.dat_inicio} />
                <ContractField label="Data de Fim de Vigência" value={contract.dat_fim_vigencia || contract.dat_fim} />
                <ContractField label="Data Fim de Vigência Atual" value={contract.dat_fim_vigencia_atual} />
                <ContractField label="Número do Documento Legal" value={contract.num_documento_legal} />
                <ContractField label="Número do Processo" value={contract.num_processo} />
                <ContractField label="Resumo do Contrato" value={contract.dsc_resumo_contrato} />
                <ContractField label="Unidade Gestora" value={contract.cod_unidade_gestora} />
                <ContractField label="Processo de Providência" value={contract.processo_providencia} />
              </div>
              
              {contract.observacoes && (
                <div>
                  <h3 className="text-lg font-semibold text-navy-900">Observações</h3>
                  <p className="text-gray-700 mt-1">{contract.observacoes}</p>
                </div>
              )}
            </TabsContent>

            {/* New Creditor tab */}
            <TabsContent value="creditor" className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-navy-900">Informações do Credor</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  <ContractField label="Nome do Credor" value={contract.nom_credor} />
                  <ContractField label="CNPJ/CPF" value={contract.num_cnpj_cpf || contract.num_documento_credor} />
                  <ContractField label="Email do Credor" value={contract.dsc_email_credor} />
                  <ContractField label="Responsável PJ do Credor" value={contract.nom_responsavel_pj_credor} />
                  <ContractField label="Representante do Credor" value={contract.nom_representante_credor} />
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="settings" className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-navy-900">Campos Editáveis</h3>
                
                {isAuthenticated ? (
                  <Button 
                    onClick={handleSaveAllChanges} 
                    disabled={Object.keys(modifiedFields).length === 0}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Save className="mr-2 h-4 w-4" />
                    Salvar Alterações
                  </Button>
                ) : (
                  <div className="text-amber-600 flex items-center text-sm">
                    <AlertTriangle className="mr-2 h-4 w-4" />
                    Login necessário para editar
                  </div>
                )}
              </div>
              
              {!isAuthenticated && (
                <Alert className="bg-amber-50 border-amber-200">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertTitle className="text-amber-800">Acesso limitado</AlertTitle>
                  <AlertDescription className="text-amber-700">
                    Você precisa estar logado para editar as informações do contrato. 
                    Por favor, faça login para habilitar as funcionalidades de edição.
                  </AlertDescription>
                </Alert>
              )}
              
              <Separator />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EditableField
                  field="link_processo"
                  value={contract.link_processo}
                  label="Link do Processo"
                  onSave={(value) => handleSaveField("link_processo", value)}
                  disabled={!isAuthenticated}
                />
                
                <EditableSelectField
                  field="class1_setor"
                  value={contract.class1_setor}
                  label="Setor Responsável"
                  options={sectorOptions}
                  onSave={(value) => handleSaveField("class1_setor", value)}
                  onAddNew={() => setIsAddSectorDialogOpen(true)}
                  disabled={!isAuthenticated}
                />
                
                <EditableSelectField
                  field="class2_tipo"
                  value={contract.class2_tipo}
                  label="Tipo"
                  options={typeOptions}
                  onSave={(value) => handleSaveField("class2_tipo", value)}
                  onAddNew={() => setIsAddTypeDialogOpen(true)}
                  disabled={!isAuthenticated}
                />
                
                <EditableField
                  field="link_processo_providencia"
                  value={contract.link_processo_providencia}
                  label="Link do Processo de Providência"
                  onSave={(value) => handleSaveField("link_processo_providencia", value)}
                  disabled={!isAuthenticated}
                />
                
                <EditableSelectField
                  field="classif1"
                  value={contract.classif1}
                  label="Classificação 1"
                  options={classif1Options}
                  onSave={(value) => handleSaveField("classif1", value)}
                  onAddNew={() => setIsAddClassif1DialogOpen(true)}
                  disabled={!isAuthenticated}
                />
                
                <EditableSelectField
                  field="classif2"
                  value={contract.classif2}
                  label="Classificação 2" 
                  options={classif2Options}
                  onSave={(value) => handleSaveField("classif2", value)}
                  onAddNew={() => setIsAddClassif2DialogOpen(true)}
                  disabled={!isAuthenticated}
                />
                
                <EditableField
                  field="processo_providencia"
                  value={contract.processo_providencia}
                  label="Processo de Providência"
                  isTextarea={true}
                  onSave={(value) => handleSaveField("processo_providencia", value)}
                  disabled={!isAuthenticated}
                />
              </div>
            </TabsContent>
          </Tabs>
          
          <Separator className="my-6" />
          
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
        </CardContent>
      </Card>
    </div>
  );
}
