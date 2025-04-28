
export interface Contract {
  id: string;
  num_contrato: string;
  dsc_resumo: string;
  nom_credor: string;
  num_cnpj_cpf: string;
  dat_inicio: string;
  dat_fim: string;
  val_global: number;
  dias_restantes: number;
  status_vigencia: string;
  observacoes?: string;
  object_contrato?: string;
  contato_gestor?: string;
  dat_publicacao?: string;
}

export interface ContractFilters {
  num_contrato?: string;
  nom_credor?: string;
  status_vigencia?: string;
}
