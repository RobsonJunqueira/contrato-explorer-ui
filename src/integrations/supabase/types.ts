export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      aux_contratos: {
        Row: {
          cd_unidade_gestora: number | null
          clas1_setor: string | null
          clas2_tipo: string | null
          clas3_providencia: string | null
          cod_subacao: string | null
          lnk_processo: string | null
          lnk_processo_providencia: string | null
          num_contrato: string
          num_processo: string | null
          processo_providencia: string | null
        }
        Insert: {
          cd_unidade_gestora?: number | null
          clas1_setor?: string | null
          clas2_tipo?: string | null
          clas3_providencia?: string | null
          cod_subacao?: string | null
          lnk_processo?: string | null
          lnk_processo_providencia?: string | null
          num_contrato: string
          num_processo?: string | null
          processo_providencia?: string | null
        }
        Update: {
          cd_unidade_gestora?: number | null
          clas1_setor?: string | null
          clas2_tipo?: string | null
          clas3_providencia?: string | null
          cod_subacao?: string | null
          lnk_processo?: string | null
          lnk_processo_providencia?: string | null
          num_contrato?: string
          num_processo?: string | null
          processo_providencia?: string | null
        }
        Relationships: []
      }
      aux_subacao: {
        Row: {
          classif1: string | null
          classif2: string | null
          codSubacao: string
          nmPrograma: string | null
          nmSubacao: string | null
        }
        Insert: {
          classif1?: string | null
          classif2?: string | null
          codSubacao: string
          nmPrograma?: string | null
          nmSubacao?: string | null
        }
        Update: {
          classif1?: string | null
          classif2?: string | null
          codSubacao?: string
          nmPrograma?: string | null
          nmSubacao?: string | null
        }
        Relationships: []
      }
      contratos: {
        Row: {
          class1_setor: string | null
          class2_tipo: string | null
          classif1: string | null
          classif2: string | null
          cod_contrato_classificacao: string | null
          cod_modalidade: string | null
          cod_situacao_contrato: string | null
          cod_subacao: string | null
          cod_tipo_contrato: string | null
          cod_tipo_documento_legal: string | null
          cod_unidade_gestora: string | null
          codSuabacao: string | null
          dat_assinatura: string | null
          dat_atual: string | null
          dat_carga: string | null
          dat_fim_vigencia: string | null
          dat_fim_vigencia_atual: string | null
          dat_inicio_vigencia: string | null
          dias_restantes: number | null
          dsc_email_credor: string | null
          dsc_objeto_contrato: string | null
          dsc_resumo_contrato: string | null
          dsc_situacao_contrato: string | null
          dsc_tipo_documento_legal: string | null
          "dsc_tipo-contrato": string | null
          link_processo: string | null
          link_processo_providencia: string | null
          nmPrograma: string | null
          nmSubacao: string | null
          nom_credor: string | null
          nom_modalidade: string | null
          nom_representante_credor: string | null
          nom_responsavel_pj_credor: string | null
          "nom-contrato_classificacao": string | null
          num_contrato: string
          num_documento_credor: string | null
          num_documento_legal: string | null
          num_edital: string | null
          num_processo: string | null
          processo_providencia: string | null
          status_vigencia: boolean | null
          val_contrato: number | null
          val_contrato_original: number | null
          val_contrato_original_atualizado: number | null
        }
        Insert: {
          class1_setor?: string | null
          class2_tipo?: string | null
          classif1?: string | null
          classif2?: string | null
          cod_contrato_classificacao?: string | null
          cod_modalidade?: string | null
          cod_situacao_contrato?: string | null
          cod_subacao?: string | null
          cod_tipo_contrato?: string | null
          cod_tipo_documento_legal?: string | null
          cod_unidade_gestora?: string | null
          codSuabacao?: string | null
          dat_assinatura?: string | null
          dat_atual?: string | null
          dat_carga?: string | null
          dat_fim_vigencia?: string | null
          dat_fim_vigencia_atual?: string | null
          dat_inicio_vigencia?: string | null
          dias_restantes?: number | null
          dsc_email_credor?: string | null
          dsc_objeto_contrato?: string | null
          dsc_resumo_contrato?: string | null
          dsc_situacao_contrato?: string | null
          dsc_tipo_documento_legal?: string | null
          "dsc_tipo-contrato"?: string | null
          link_processo?: string | null
          link_processo_providencia?: string | null
          nmPrograma?: string | null
          nmSubacao?: string | null
          nom_credor?: string | null
          nom_modalidade?: string | null
          nom_representante_credor?: string | null
          nom_responsavel_pj_credor?: string | null
          "nom-contrato_classificacao"?: string | null
          num_contrato: string
          num_documento_credor?: string | null
          num_documento_legal?: string | null
          num_edital?: string | null
          num_processo?: string | null
          processo_providencia?: string | null
          status_vigencia?: boolean | null
          val_contrato?: number | null
          val_contrato_original?: number | null
          val_contrato_original_atualizado?: number | null
        }
        Update: {
          class1_setor?: string | null
          class2_tipo?: string | null
          classif1?: string | null
          classif2?: string | null
          cod_contrato_classificacao?: string | null
          cod_modalidade?: string | null
          cod_situacao_contrato?: string | null
          cod_subacao?: string | null
          cod_tipo_contrato?: string | null
          cod_tipo_documento_legal?: string | null
          cod_unidade_gestora?: string | null
          codSuabacao?: string | null
          dat_assinatura?: string | null
          dat_atual?: string | null
          dat_carga?: string | null
          dat_fim_vigencia?: string | null
          dat_fim_vigencia_atual?: string | null
          dat_inicio_vigencia?: string | null
          dias_restantes?: number | null
          dsc_email_credor?: string | null
          dsc_objeto_contrato?: string | null
          dsc_resumo_contrato?: string | null
          dsc_situacao_contrato?: string | null
          dsc_tipo_documento_legal?: string | null
          "dsc_tipo-contrato"?: string | null
          link_processo?: string | null
          link_processo_providencia?: string | null
          nmPrograma?: string | null
          nmSubacao?: string | null
          nom_credor?: string | null
          nom_modalidade?: string | null
          nom_representante_credor?: string | null
          nom_responsavel_pj_credor?: string | null
          "nom-contrato_classificacao"?: string | null
          num_contrato?: string
          num_documento_credor?: string | null
          num_documento_legal?: string | null
          num_edital?: string | null
          num_processo?: string | null
          processo_providencia?: string | null
          status_vigencia?: boolean | null
          val_contrato?: number | null
          val_contrato_original?: number | null
          val_contrato_original_atualizado?: number | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
