export class CadastroUsers {
  constructor(
    public id?: number,
    public name?: string,
    public user_name?: string,
    public user_email?: string,
    public user_active?: boolean,
    public user_password?: string,
    public user_phone?: string,
    public user_confirm_password?: string,
    public profile_id?: number,
    public coord_id?: number,
    public sexec_id?: number,
  ) {}
}
