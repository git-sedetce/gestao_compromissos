export class CadastroReunioes {
  constructor(
    public id?: number,
    public nome_reuniao?: string,
    public data_reuniao?: Date,
    public horario_inicial?: string,
    public duracao?: string,
    public horario_final?: string,
    public projeto_id?: number,
    public coord_id?: number,
    public sexec_id?: number,
    public periodicidade?: number,
    public pauta?: string,
    public ata_registrada?: boolean,
    public compromissos_concluidos?: boolean,
  ) {}
}
