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
      dat_publicacao: row.dat_assinatura || ""
    }));
  } catch (error) {
    console.error("Failed to fetch contracts:", error);
    // Return mock data when Supabase fails
    return mockContracts;
  }
}

export function filterContracts(contracts: Contract[], filters: ContractFilters): Contract[] {
  return contracts.filter(contract => {
    // Filter by num_contrato
    if (filters.num_contrato && !contract.num_contrato.toLowerCase().includes(filters.num_contrato.toLowerCase())) {
      return false;
    }
    
    // Filter by nom_credor
    if (filters.nom_credor && !contract.nom_credor.toLowerCase().includes(filters.nom_credor.toLowerCase())) {
      return false;
    }
    
    // Filter by status_vigencia (skip if "todos" is selected)
    if (filters.status_vigencia && filters.status_vigencia !== "todos" && contract.status_vigencia !== filters.status_vigencia) {
      return false;
    }
    
    return true;
  });
}
