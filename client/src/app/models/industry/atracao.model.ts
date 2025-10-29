export class Atracao {
  constructor(
    public id?: number,
    public detalhamento?: string,
    public mou: boolean = false,
    public contato?: string,
    public email_contato?: string,
    public fone_contato?: string,
    public data_inicio?: Date,
    public descricao?: string,
    public valor_investimento?: number,
    public qtde_empregos?: number,
    public tem_fdi: boolean = false,
    public proximo_passo?: string,
    public status_id?: number,
    public empresa_id?: number,
    public city_id?: number,

  ) {}
}
