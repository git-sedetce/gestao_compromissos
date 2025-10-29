export class CadastroTarefa {
  constructor(
    public id?: number,
    public nome_ordem?: string,
    public responsavel_id?: number,
    public status_id?: number,
    public data_inicial?: Date,
    public prazo?: number,
    public data_conclusao?: Date,
    public execucao?: number,
    public projeto_id?: number,
    public mapp?: string,
    public valor_estimado?: number,
    public reuniao_id?: number,
    public solicita?: boolean
  ) {}
}
