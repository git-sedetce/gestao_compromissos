export class CadastroSubTarefas {
  constructor(
    public id?: number,
    public nome_sub_tarefa?: string,
    public responsavel_id?: number,
    public status_id?: number,
    public data_inicial?: Date,
    public prazo?: number,
    public data_conclusao?: Date,
    public execucao?: number,
    public tarefa_id?: number,
    public pendencia?: string,
    public tarefa_pendente?: number
  ) {}
}
