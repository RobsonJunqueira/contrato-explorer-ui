
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
  class1_setor?: string; // Added for Setor Responsável
  nmSubacao?: string; // Added for Subação
  dsc_objeto_contrato?: string; // Added for Objeto
  // Additional fields from the Contratos table
  cod_tipo_documento_legal?: string;
  dsc_tipo_documento_legal?: string;
  cod_contrato_classificacao?: string;
  nom_contrato_classificacao?: string;
  cod_tipo_contrato?: string;
  dsc_tipo_contrato?: string;
  cod_modalidade?: string;
  nom_modalidade?: string;
  num_edital?: string;
  dsc_email_credor?: string;
  nom_responsavel_pj_credor?: string;
  nom_representante_credor?: string;
  cod_situacao_contrato?: string;
  dsc_situacao_contrato?: string;
  link_processo?: string;
  cod_subacao?: string;
  class2_tipo?: string;
  val_contrato_original?: number;
  link_processo_providencia?: string;
  codSubacao?: string;
  classif1?: string;
  classif2?: string;
  nmPrograma?: string;
  val_contrato_original_atualizado?: number;
  dat_carga?: string;
  dat_atual?: string;
  dat_assinatura?: string;
  dat_fim_vigencia_atual?: string;
  num_documento_legal?: string;
  num_processo?: string;
}

export interface ContractFilters {
  num_contrato?: string;
  nom_credor?: string;
  status_vigencia?: string;
  class1_setor?: string; // Added for Setor Responsável
  nmSubacao?: string; // Added for Subação
  dsc_objeto_contrato?: string; // Added for Objeto
}
