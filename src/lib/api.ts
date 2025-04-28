
import { Contract, ContractFilters } from "../types/Contract";

const API_URL = "http://200.19.215.246:3000/public/question/fe7ca3d2-cb3c-441f-a181-265205566b99.json";

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
    throw error;
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
