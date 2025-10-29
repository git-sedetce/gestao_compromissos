export class CadastroProjetos {
  constructor(
    public id?: number,
    public name?: string,
    public descricao?: string,
    // public responsavel_id?: number,
    // public criadoPor_id?: number,
    public data_inicio?: Date,
    public previsao_conclusao?: Date,
    // public coordenacao_id?: number,
    public coord_id?: number,
    public sexec_id?: number,
    public status_id?: number,
    public usuario_id?: number,
    public numero_programa?: string,
    public valor?: number,
  ) {}
}
