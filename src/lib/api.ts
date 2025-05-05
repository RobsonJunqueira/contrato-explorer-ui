import { Contract, ContractFilters } from "../types/Contract";
import { supabase } from "@/integrations/supabase/client";

// Mock data to use when API is unavailable
const mockContracts: Contract[] = [
  {
    id: "1",
    num_contrato: "CONT-2023-001",
    dsc_resumo: "Serviço de manutenção predial",
    nom_credor: "Empresa XYZ Ltda",
    num_cnpj_cpf: "12.345.678/0001-90",
    dat_inicio: "2023-01-15",
    dat_fim: "2025-01-14",
    val_global: 250000,
    dias_restantes: 120,
    status_vigencia: "VIGENTE",
    observacoes: "Contrato renovável",
    object_contrato: "Manutenção dos sistemas elétricos e hidráulicos",
    contato_gestor: "João Silva - (41) 99999-1234",
    dat_publicacao: "2023-01-10"
  },
  {
    id: "2",
    num_contrato: "CONT-2023-002",
    dsc_resumo: "Fornecimento de material de escritório",
    nom_credor: "Papelaria ABC",
    num_cnpj_cpf: "23.456.789/0001-12",
    dat_inicio: "2023-02-01",
    dat_fim: "2024-01-31",
    val_global: 50000,
    dias_restantes: 20,
    status_vigencia: "VIGENTE",
    observacoes: "Entrega mensal",
    object_contrato: "Material de escritório diversos",
    contato_gestor: "Maria Santos - (41) 99999-5678",
    dat_publicacao: "2023-01-25"
  },
  {
    id: "3",
    num_contrato: "CONT-2022-015",
    dsc_resumo: "Licenças de software",
    nom_credor: "Tech Solutions S.A.",
    num_cnpj_cpf: "34.567.890/0001-23",
    dat_inicio: "2022-08-15",
    dat_fim: "2023-08-14",
    val_global: 180000,
    dias_restantes: 0,
    status_vigencia: "ENCERRADO",
    observacoes: "Renovação pendente de aprovação",
    object_contrato: "Licenças de uso de software ERP",
    contato_gestor: "Carlos Oliveira - (41) 99999-9012",
    dat_publicacao: "2022-08-10"
  },
  {
    id: "4",
    num_contrato: "CONT-2023-045",
    dsc_resumo: "Serviço de limpeza",
    nom_credor: "Limpeza Total Ltda",
    num_cnpj_cpf: "45.678.901/0001-34",
    dat_inicio: "2023-03-01",
    dat_fim: "2024-02-29",
    val_global: 120000,
    dias_restantes: 60,
    status_vigencia: "VIGENTE",
    observacoes: "Inclui materiais",
    object_contrato: "Serviços gerais de limpeza e conservação",
    contato_gestor: "Ana Costa - (41) 99999-5678",
    dat_publicacao: "2023-02-20"
  },
  {
    id: "5",
    num_contrato: "CONT-2022-098",
    dsc_resumo: "Fornecimento de equipamentos de TI",
    nom_credor: "InfoTech Comércio Ltda",
    num_cnpj_cpf: "56.789.012/0001-45",
    dat_inicio: "2022-10-15",
    dat_fim: "2023-10-14",
    val_global: 320000,
    dias_restantes: 0,
    status_vigencia: "ENCERRADO",
    observacoes: "Contrato com garantia estendida",
    object_contrato: "Notebooks, monitores e periféricos",
    contato_gestor: "Ricardo Alves - (41) 99999-3456",
    dat_publicacao: "2022-10-10"
  }
];

export async function fetchContracts(): Promise<Contract[]> {
  try {
    console.log("Fetching contracts from Supabase...");
    
    const { data, error } = await supabase
      .from('contratos')
      .select('*');
    
    if (error) {
      console.error("Error fetching from Supabase:", error.message);
      return mockContracts;
    }
    
    if (!data || data.length === 0) {
      console.log("No contracts found in Supabase");
      return mockContracts;
    }
    
    console.log(`Successfully fetched ${data.length} contracts from Supabase`);
    
    // Map the data to our Contract interface
    return data.map((row: any) => ({
      id: row.num_contrato || "",
      num_contrato: row.num_contrato || "",
      dsc_resumo: row.dsc_resumo_contrato || "",
      nom_credor: row.nom_credor || "",
      num_cnpj_cpf: row.num_documento_credor || "",
      dat_inicio: row.dat_inicio_vigencia || "",
      dat_fim: row.dat_fim_vigencia || "",
      val_global: parseFloat(row.val_contrato) || 0,
      dias_restantes: parseInt(row.dias_restantes) || 0,
      status_vigencia: row.status_vigencia ? "VIGENTE" : "ENCERRADO",
      observacoes: "",
      object_contrato: row.dsc_objeto_contrato || "",
      contato_gestor: "",
      dat_publicacao: row.dat_assinatura || "",
      // Additional fields from contratos table
      class1_setor: row.class1_setor || "",
      nmSubacao: row.nmSubacao || "",
      dsc_objeto_contrato: row.dsc_objeto_contrato || "",
      cod_tipo_documento_legal: row.cod_tipo_documento_legal || "",
      dsc_tipo_documento_legal: row.dsc_tipo_documento_legal || "",
      cod_contrato_classificacao: row.cod_contrato_classificacao || "",
      nom_contrato_classificacao: row["nom-contrato_classificacao"] || "",
      cod_tipo_contrato: row.cod_tipo_contrato || "",
      dsc_tipo_contrato: row["dsc_tipo-contrato"] || "",
      cod_modalidade: row.cod_modalidade || "",
      nom_modalidade: row.nom_modalidade || "",
      num_edital: row.num_edital || "",
      dsc_email_credor: row.dsc_email_credor || "",
      nom_responsavel_pj_credor: row.nom_responsavel_pj_credor || "",
      nom_representante_credor: row.nom_representante_credor || "",
      cod_situacao_contrato: row.cod_situacao_contrato || "",
      dsc_situacao_contrato: row.dsc_situacao_contrato || "",
      link_processo: row.link_processo || "",
      cod_subacao: row.cod_subacao || "",
      class2_tipo: row.class2_tipo || "",
      val_contrato_original: parseFloat(row.val_contrato_original) || 0,
      link_processo_providencia: row.link_processo_providencia || "",
      codSubacao: row.codSubacao || "",
      classif1: row.classif1 || "",
      classif2: row.classif2 || "",
      nmPrograma: row.nmPrograma || "",
      val_contrato_original_atualizado: parseFloat(row.val_contrato_original_atualizado) || 0,
      dat_carga: row.dat_carga || "",
      dat_atual: row.dat_atual || "",
      dat_fim_vigencia_atual: row.dat_fim_vigencia_atual || "",
      num_documento_legal: row.num_documento_legal || "",
      num_processo: row.num_processo || ""
    }));
  } catch (error) {
    console.error("Failed to fetch contracts:", error);
    // Return mock data when Supabase fails
    return mockContracts;
  }
}

export const filterContracts = (contracts: Contract[], filters: ContractFilters): Contract[] => {
  return contracts.filter(contract => {
    // Filter by contract number
    if (filters.num_contrato && !contract.num_contrato?.toString().toLowerCase().includes(filters.num_contrato.toLowerCase())) {
      return false;
    }
    
    // Filter by contractor name
    if (filters.nom_credor && !contract.nom_credor?.toLowerCase().includes(filters.nom_credor.toLowerCase())) {
      return false;
    }
    
    // Filter by contract status
    if (filters.status_vigencia && contract.status_vigencia !== filters.status_vigencia) {
      return false;
    }
    
    // Filter by sector
    if (filters.class1_setor && contract.class1_setor !== filters.class1_setor) {
      return false;
    }
    
    // Filter by subacao
    if (filters.nmSubacao && contract.nmSubacao !== filters.nmSubacao) {
      return false;
    }
    
    // Filter by classif1
    if (filters.classif1 && contract.classif1 !== filters.classif1) {
      return false;
    }
    
    // Filter by classif2
    if (filters.classif2 && contract.classif2 !== filters.classif2) {
      return false;
    }
    
    // Filter by contract description (object)
    if (filters.dsc_objeto_contrato && 
        !contract.dsc_objeto_contrato?.toLowerCase().includes(filters.dsc_objeto_contrato.toLowerCase())) {
      return false;
    }
    
    // Filter by document type (multi-select)
    if (filters.dsc_tipo_documento_legal && filters.dsc_tipo_documento_legal.length > 0) {
      const selectedTypes = filters.dsc_tipo_documento_legal.split(',');
      const contractDocType = contract.dsc_tipo_documento_legal || contract.cod_tipo_documento_legal;
      if (!contractDocType || !selectedTypes.includes(contractDocType)) {
        return false;
      }
    }
    
    return true;
  });
};

export async function updateContract(id: string, updates: Partial<Contract>): Promise<boolean> {
  try {
    console.log("Updating contract in Supabase:", id, updates);
    
    // Create a copy of updates to modify for database compatibility
    const dbUpdates: any = { ...updates };
    
    // Convert status_vigencia from string to boolean if present
    if (updates.status_vigencia !== undefined) {
      dbUpdates.status_vigencia = updates.status_vigencia === "VIGENTE";
    }
    
    // Make sure these fields can be updated properly
    // No conversions needed for string fields, they can be saved directly:
    // - link_processo
    // - link_processo_providencia
    // - processo_providencia
    
    const { error } = await supabase
      .from('contratos')
      .update(dbUpdates)
      .eq('num_contrato', id);
    
    if (error) {
      console.error("Error updating contract in Supabase:", error.message);
      throw new Error(error.message);
    }
    
    console.log("Contract updated successfully");
    return true;
  } catch (error) {
    console.error("Failed to update contract:", error);
    throw error;
  }
}
