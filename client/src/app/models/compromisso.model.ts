export class Compromisso {
  constructor(
    public id?: number,
    public compromisso?: string,
    public responsavel_id?: number,
    public nome_usuario?: number,
    public status_id?: number,
    public data_inicial?: Date,
    public prazo?: number,
    public data_conclusao?: Date,
    public reuniao_id?: number,
    public coord_id?: number,
    public sexec_id?: number,
    public arquivo?: string,
    public solicita?: boolean
  ) {}
}
