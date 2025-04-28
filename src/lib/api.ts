
import { Contract, ContractFilters } from "../types/Contract";

const API_URL = "http://200.19.215.246:3000/public/question/fe7ca3d2-cb3c-441f-a181-265205566b99.json";

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
  }
];

export async function fetchContracts(): Promise<Contract[]> {
  try {
    const response = await fetch(API_URL);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (!data.data || !Array.isArray(data.data.rows)) {
      throw new Error("Invalid API response format");
    }
    
    // Map the rows to our Contract interface
    return data.data.rows.map((row: any, index: number) => ({
      id: `${index}-${row[0] || ""}`,
      num_contrato: row[0] || "",
      dsc_resumo: row[1] || "",
      nom_credor: row[2] || "",
      num_cnpj_cpf: row[3] || "",
      dat_inicio: row[4] || "",
      dat_fim: row[5] || "",
      val_global: parseFloat(row[6]) || 0,
      dias_restantes: parseInt(row[7]) || 0,
      status_vigencia: row[8] || "",
      observacoes: row[9] || "",
      object_contrato: row[10] || "",
      contato_gestor: row[11] || "",
      dat_publicacao: row[12] || ""
    }));
  } catch (error) {
    console.error("Failed to fetch contracts:", error);
    // Return mock data when API fails
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
    
    // Filter by status_vigencia
    if (filters.status_vigencia && contract.status_vigencia !== filters.status_vigencia) {
      return false;
    }
    
    return true;
  });
}
